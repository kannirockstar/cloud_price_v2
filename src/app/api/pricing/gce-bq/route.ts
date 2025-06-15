
import { NextRequest, NextResponse } from 'next/server';
import { BigQuery } from '@google-cloud/bigquery';
import type { PriceData } from '@/lib/types';

// IMPORTANT: Configure your Google Cloud Project ID here
// You might want to use an environment variable for this in a real application
const PROJECT_ID = 'YOUR_PROJECT_ID'; // REPLACE THIS
const DATASET_ID = 'YOUR_DATASET_ID'; // REPLACE THIS
const TABLE_ID = 'YOUR_GCE_PRICING_TABLE';   // REPLACE THIS if your table name is different

const bigquery = new BigQuery({ projectId: PROJECT_ID });

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const regionId = searchParams.get('regionId');
  const instanceId = searchParams.get('instanceId'); // This is machineFamilyId in other contexts
  const pricingModelValue = searchParams.get('pricingModelValue');

  if (!regionId || !instanceId || !pricingModelValue) {
    return NextResponse.json({ error: 'Missing required query parameters: regionId, instanceId, pricingModelValue' }, { status: 400 });
  }

  // IMPORTANT: Adjust the SQL query to match your actual table schema and column names
  // This query assumes your table has 'hourly_price' and columns for filtering.
  const query = \`
    SELECT
      hourly_price AS price
    FROM \`\${PROJECT_ID}.\${DATASET_ID}.\${TABLE_ID}\`
    WHERE
      region_id = @regionId
      AND instance_id = @instanceId
      AND pricing_model_value = @pricingModelValue
    LIMIT 1;
  \`;

  const options = {
    query: query,
    location: 'US', // Or your BigQuery dataset location
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
        console.warn(\`[GCE BQ API] Price found for \${instanceId} in \${regionId} (model: \${pricingModelValue}) but was not a number or was null:\`, rows[0].price);
    }


    const responsePayload: Partial<PriceData> = {
        price: price,
    };

    return NextResponse.json(responsePayload, { status: 200 });

  } catch (error) {
    console.error('[GCE BQ API] Error querying BigQuery:', error);
    let errorMessage = 'Failed to fetch pricing data from BigQuery.';
    // if (error instanceof Error) { // Avoid sending raw error messages to client in prod
    //     errorMessage += \` Details: \${error.message}\`;
    // }
    return NextResponse.json({ error: errorMessage, details: (error as Error).message }, { status: 500 });
  }
}
