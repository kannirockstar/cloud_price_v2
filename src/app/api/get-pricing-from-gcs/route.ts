
import { NextRequest, NextResponse } from 'next/server';
import { Storage } from '@google-cloud/storage';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const provider = searchParams.get('provider');
  const regionId = searchParams.get('regionId');
  const instanceId = searchParams.get('instanceId');
  const pricingModelValue = searchParams.get('pricingModelValue');

  if (!provider || !regionId || !instanceId || !pricingModelValue) {
    return NextResponse.json({ error: 'Missing required query parameters (provider, regionId, instanceId, pricingModelValue)' }, { status: 400 });
  }

  const bucketName = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
  if (!bucketName) {
    console.error('[API/get-pricing-from-gcs] NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET is not set.');
    return NextResponse.json({ error: 'Server configuration error: Storage bucket not defined.' }, { status: 500 });
  }

  let gcsFolderPathSegment = '';
  if (provider === 'Google Cloud') gcsFolderPathSegment = 'GCE';
  else if (provider === 'Azure') gcsFolderPathSegment = 'azure_prices_python';
  else if (provider === 'AWS') gcsFolderPathSegment = 'EC2';
  else {
    return NextResponse.json({ error: `Invalid provider: ${provider}` }, { status: 400 });
  }

  const filePath = `${gcsFolderPathSegment}/${regionId}/${instanceId}/${pricingModelValue}.json`;

  try {
    const storage = new Storage(); // ADC will be used for authentication
    const file = storage.bucket(bucketName).file(filePath);
    
    console.log(`[API/get-pricing-from-gcs] Attempting to download from GCS: gs://${bucketName}/${filePath}`);

    const [exists] = await file.exists();
    if (!exists) {
      console.warn(`[API/get-pricing-from-gcs] File not found in GCS: gs://${bucketName}/${filePath}`);
      return NextResponse.json({ error: `Pricing data not found for the specified configuration. File path: ${filePath}` }, { status: 404 });
    }

    const [content] = await file.download();
    const jsonData = JSON.parse(content.toString());
    
    console.log(`[API/get-pricing-from-gcs] Successfully fetched and parsed: gs://${bucketName}/${filePath}`);
    return NextResponse.json(jsonData, { status: 200 });

  } catch (error: any) {
    console.error(`[API/get-pricing-from-gcs] Error fetching file from GCS (gs://${bucketName}/${filePath}):`, error);
    let errorMessage = 'Failed to fetch pricing data from GCS.';
    let statusCode = 500;

    if (error.code === 403 || (error.errors && error.errors.some((e: any) => e.reason === 'forbidden'))) {
        errorMessage = `Permission denied when accessing GCS bucket '${bucketName}' for file '${filePath}'. Ensure the service account for this Next.js backend (e.g., App Hosting's default service account) has 'Storage Object Viewer' role.`;
        statusCode = 403;
    } else if (error.code === 404 || error.message.includes('No such object')) {
        errorMessage = `File not found in GCS: gs://${bucketName}/${filePath}. This specific pricing configuration might not be available.`;
        statusCode = 404;
    } else if (error.name === 'SyntaxError') {
        errorMessage = `Malformed JSON in GCS file: gs://${bucketName}/${filePath}.`;
        statusCode = 500;
    }
    
    return NextResponse.json({ error: errorMessage, details: error.message }, { status: statusCode });
  }
}
