
import { NextRequest, NextResponse } from 'next/server';
import { BigQuery } from '@google-cloud/bigquery';
import type { PriceData } from '@/lib/types';

// Environment variables for BigQuery configuration
const GCP_PROJECT_ID = process.env.BIGQUERY_PROJECT_ID;
const BIGQUERY_DATASET_ID = process.env.BIGQUERY_DATASET_ID;
const BIGQUERY_GCE_TABLE_ID = process.env.BIGQUERY_GCE_TABLE_ID;

let bigquery: BigQuery;

if (GCP_PROJECT_ID) {
  bigquery = new BigQuery({ projectId: GCP_PROJECT_ID });
} else {
  // If BIGQUERY_PROJECT_ID is not set, BigQuery client will try to infer it
  // from the environment (e.g., GOOGLE_APPLICATION_CREDENTIALS or GCE metadata service)
  // This might be sufficient if the service account belongs to the same project as the BQ table.
  console.warn("[GCE BQ API] BIGQUERY_PROJECT_ID is not set. Attempting to initialize BigQuery client without explicit project ID.");
  bigquery = new BigQuery();
}


export async function GET(request: NextRequest) {
  if (!BIGQUERY_DATASET_ID || !BIGQUERY_GCE_TABLE_ID) {
    console.error('[GCE BQ API] Missing required environment variables: BIGQUERY_DATASET_ID or BIGQUERY_GCE_TABLE_ID');
    return NextResponse.json({ error: 'Server configuration error: Missing BigQuery dataset or table ID environment variables.' }, { status: 500 });
  }
  // If GCP_PROJECT_ID was not set and BigQuery client couldn't infer it, it would throw an error during instantiation or first query.
  // It's better to ensure the client is initialized. If not, it means a fundamental setup issue.
  if (!bigquery) {
    console.error('[GCE BQ API] BigQuery client not initialized. This likely means BIGQUERY_PROJECT_ID was not set and could not be inferred.');
    return NextResponse.json({ error: 'Server configuration error: BigQuery client not initialized.' }, { status: 500 });
  }


  const { searchParams } = new URL(request.url);
  const regionId = searchParams.get('regionId');
  const instanceId = searchParams.get('instanceId'); // This is machineFamilyId in other contexts
  const pricingModelValue = searchParams.get('pricingModelValue');

  if (!regionId || !instanceId || !pricingModelValue) {
    return NextResponse.json({ error: 'Missing required query parameters: regionId, instanceId, pricingModelValue' }, { status: 400 });
  }

  // IMPORTANT: Adjust the SQL query to match your actual table schema and column names
  // This query assumes your table has 'hourly_price' and columns for filtering.
  const query = `
    SELECT
      hourly_price AS price
    FROM \`${GCP_PROJECT_ID || 'YOUR_PROJECT_ID_FALLBACK'}.${BIGQUERY_DATASET_ID}.${BIGQUERY_GCE_TABLE_ID}\`
    WHERE
      region_id = @regionId
      AND instance_id = @instanceId
      AND pricing_model_value = @pricingModelValue
    LIMIT 1;
  `;
  // Note: The \`${GCP_PROJECT_ID || 'YOUR_PROJECT_ID_FALLBACK'}\` is a safety, but if GCP_PROJECT_ID is essential for your setup (e.g. cross-project access where service account project != data project),
  // you might want a stricter check for GCP_PROJECT_ID at the top as well.

  const options = {
    query: query,
    location: 'US', // Or your BigQuery dataset location - consider making this an ENV VAR too if it varies
    params: {
      regionId: regionId,
      instanceId: instanceId,
      pricingModelValue: pricingModelValue,
    },
  };

  try {
    const [rows] = await bigquery.query(options);

    let price: number | null = null;
    if (rows.length > 0 && rows[0].price !== null && typeof rows[0].price === 'number') {
      price = parseFloat(Math.max(0.000001, rows[0].price).toFixed(6));
    } else if (rows.length > 0) {
        console.warn(`[GCE BQ API] Price found for ${instanceId} in ${regionId} (model: ${pricingModelValue}) but was not a number or was null:`, rows[0].price);
    }

    const responsePayload: Partial<PriceData> = {
        price: price,
    };

    return NextResponse.json(responsePayload, { status: 200 });

  } catch (error) {
    console.error('[GCE BQ API] Error querying BigQuery:', error);
    let errorMessage = 'Failed to fetch pricing data from BigQuery.';
    // Consider not sending detailed error messages to the client in production
    // if (error instanceof Error) {
    //     errorMessage += \` Details: ${error.message}\`;
    // }
    return NextResponse.json({ error: errorMessage, details: (error as Error).message }, { status: 500 });
  }
}
