
import { NextRequest, NextResponse } from 'next/server';
import { BigQuery } from '@google-cloud/bigquery';
import type { PriceData } from '@/lib/types';

// Attempt to read environment variables at the module scope for early logging
const initialProjectId = process.env.BIGQUERY_PROJECT_ID;
const initialDatasetId = process.env.BIGQUERY_DATASET_ID;
const initialTableId = process.env.BIGQUERY_GCE_TABLE_ID;

console.log(`[GCE BQ API - Module Load] BIGQUERY_PROJECT_ID: ${initialProjectId ? 'SET (to: ' + initialProjectId + ')' : 'NOT SET'}`);
console.log(`[GCE BQ API - Module Load] BIGQUERY_DATASET_ID: ${initialDatasetId ? 'SET (to: ' + initialDatasetId + ')' : 'NOT SET'}`);
console.log(`[GCE BQ API - Module Load] BIGQUERY_GCE_TABLE_ID: ${initialTableId ? 'SET (to: ' + initialTableId + ')' : 'NOT SET'}`);

let bigquery: BigQuery | undefined;

export async function GET(request: NextRequest) {
  // Re-read environment variables within the request handler to ensure they are current if changed
  const PROJECT_ID = process.env.BIGQUERY_PROJECT_ID;
  const DATASET_ID = process.env.BIGQUERY_DATASET_ID;
  const TABLE_ID = process.env.BIGQUERY_GCE_TABLE_ID;

  console.log('[GCE BQ API] Received GET request. Processing...');
  console.log(`[GCE BQ API] Runtime BIGQUERY_PROJECT_ID: ${PROJECT_ID}`);
  console.log(`[GCE BQ API] Runtime BIGQUERY_DATASET_ID: ${DATASET_ID}`);
  console.log(`[GCE BQ API] Runtime BIGQUERY_GCE_TABLE_ID: ${TABLE_ID}`);

  if (!PROJECT_ID || !DATASET_ID || !TABLE_ID) {
    const missingVars = [];
    if (!PROJECT_ID) missingVars.push('BIGQUERY_PROJECT_ID');
    if (!DATASET_ID) missingVars.push('BIGQUERY_DATASET_ID');
    if (!TABLE_ID) missingVars.push('BIGQUERY_GCE_TABLE_ID');
    const errorMsg = `Server configuration error: Missing required BigQuery connection details. Please set the following environment variables: ${missingVars.join(', ')}.`;
    console.error(`[GCE BQ API] Error: ${errorMsg}`);
    return NextResponse.json({ error: errorMsg, details: `Missing: ${missingVars.join(', ')}` }, { status: 500 });
  }

  console.log('[GCE BQ API] Environment variables seem present. Attempting to initialize BigQuery client...');

  // Initialize BigQuery client if not already done, or if project ID changed (though unlikely for env vars)
  // This instance-level check for `bigquery` is mostly for subsequent calls if the API route instance is reused.
  if (!bigquery || (bigquery as any).projectId !== PROJECT_ID) {
    try {
      bigquery = new BigQuery({ projectId: PROJECT_ID });
      console.log(`[GCE BQ API] BigQuery client initialized successfully for project ID: ${PROJECT_ID}.`);
    } catch (error) {
      console.error('[GCE BQ API] Critical Error: Failed to initialize BigQuery client:', error);
      return NextResponse.json({ error: 'Server configuration error: Could not initialize BigQuery client.', details: (error as Error).message }, { status: 500 });
    }
  } else {
     console.log('[GCE BQ API] Using existing BigQuery client instance.');
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
    FROM \`${PROJECT_ID}.${DATASET_ID}.${TABLE_ID}\`
    WHERE
      region_id = @regionId
      AND instance_id = @instanceId
      AND pricing_model_value = @pricingModelValue
    LIMIT 1;
  `;

  const options = {
    query: query,
    location: 'US', // IMPORTANT: Or your BigQuery dataset location - consider making this an ENV VAR too if it varies
    params: {
      regionId: regionId,
      instanceId: instanceId,
      pricingModelValue: pricingModelValue,
    },
  };

  console.log(`[GCE BQ API] Executing BigQuery query for region: ${regionId}, instance: ${instanceId}, model: ${pricingModelValue}`);

  try {
    const [rows] = await bigquery.query(options);

    let price: number | null = null;
    if (rows.length > 0 && rows[0].price !== null && typeof rows[0].price === 'number') {
      price = parseFloat(Math.max(0.000001, rows[0].price).toFixed(6));
      console.log(`[GCE BQ API] Price found: ${price}`);
    } else if (rows.length > 0) {
        console.warn(`[GCE BQ API] Price found for ${instanceId} in ${regionId} (model: ${pricingModelValue}) but was not a number or was null:`, rows[0].price);
    } else {
        console.log(`[GCE BQ API] No price data returned from BigQuery for ${instanceId} in ${regionId} (model: ${pricingModelValue}). Query: ${query.substring(0,200)}... Params:`, options.params);
    }

    const responsePayload: Partial<PriceData> = {
        price: price,
        // Note: Other PriceData fields like machineFamilyName, regionName, pricingModelLabel are usually added by the client calling this API
    };

    return NextResponse.json(responsePayload, { status: 200 });

  } catch (error) {
    console.error('[GCE BQ API] Error querying BigQuery:', error);
    let errorMessage = 'Failed to fetch pricing data from BigQuery.';
    return NextResponse.json({ error: errorMessage, details: (error as Error).message }, { status: 500 });
  }
}

