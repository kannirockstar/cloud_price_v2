
import { NextRequest, NextResponse } from 'next/server';
import { BigQuery } from '@google-cloud/bigquery';
import type { PriceData } from '@/lib/types';

// Environment variables for BigQuery configuration
const GCP_PROJECT_ID = process.env.BIGQUERY_PROJECT_ID;
const BIGQUERY_DATASET_ID = process.env.BIGQUERY_DATASET_ID;
const BIGQUERY_GCE_TABLE_ID = process.env.BIGQUERY_GCE_TABLE_ID;

let bigquery: BigQuery | undefined;

if (GCP_PROJECT_ID) {
  try {
    bigquery = new BigQuery({ projectId: GCP_PROJECT_ID });
  } catch (error) {
    console.error('[GCE BQ API] Error initializing BigQuery with explicit project ID:', error);
    // Fallback or further error handling can be done here
  }
} else {
  console.warn("[GCE BQ API] BIGQUERY_PROJECT_ID is not set. Attempting to initialize BigQuery client without explicit project ID (this may succeed in some GCP environments like Cloud Run).");
  try {
    bigquery = new BigQuery();
  } catch (error) {
    console.error('[GCE BQ API] Error initializing BigQuery without explicit project ID:', error);
  }
}


export async function GET(request: NextRequest) {
  if (!GCP_PROJECT_ID || !BIGQUERY_DATASET_ID || !BIGQUERY_GCE_TABLE_ID) {
    console.error('[GCE BQ API] Missing required environment variables: BIGQUERY_PROJECT_ID, BIGQUERY_DATASET_ID, or BIGQUERY_GCE_TABLE_ID');
    return NextResponse.json({ error: 'Server configuration error: Missing BigQuery connection details. Please set BIGQUERY_PROJECT_ID, BIGQUERY_DATASET_ID, and BIGQUERY_GCE_TABLE_ID environment variables.' }, { status: 500 });
  }

  if (!bigquery) {
    console.error('[GCE BQ API] BigQuery client not initialized. This likely means there was an issue during setup, or BIGQUERY_PROJECT_ID was not set and could not be inferred in a non-GCP environment.');
    return NextResponse.json({ error: 'Server configuration error: BigQuery client not initialized.' }, { status: 500 });
  }

  const { searchParams } = new URL(request.url);
  const regionId = searchParams.get('regionId');
  const instanceId = searchParams.get('instanceId');
  const pricingModelValue = searchParams.get('pricingModelValue');

  if (!regionId || !instanceId || !pricingModelValue) {
    return NextResponse.json({ error: 'Missing required query parameters: regionId, instanceId, pricingModelValue' }, { status: 400 });
  }

  const query = `
    SELECT
      hourly_price AS price
    FROM \`${GCP_PROJECT_ID}.${BIGQUERY_DATASET_ID}.${BIGQUERY_GCE_TABLE_ID}\`
    WHERE
      region_id = @regionId
      AND instance_id = @instanceId
      AND pricing_model_value = @pricingModelValue
    LIMIT 1;
  `;

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
    } else {
        console.log(`[GCE BQ API] No price data returned from BigQuery for ${instanceId} in ${regionId} (model: ${pricingModelValue}). Query: ${query.substring(0,200)}... Params:`, options.params);
    }

    const responsePayload: Partial<PriceData> = {
        price: price,
    };

    return NextResponse.json(responsePayload, { status: 200 });

  } catch (error) {
    console.error('[GCE BQ API] Error querying BigQuery:', error);
    let errorMessage = 'Failed to fetch pricing data from BigQuery.';
    return NextResponse.json({ error: errorMessage, details: (error as Error).message }, { status: 500 });
  }
}
