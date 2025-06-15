
// This API route is no longer used for fetching GCE pricing data for the main UI.
// GCE pricing is now fetched directly from Google Cloud Storage in src/lib/data.ts's fetchPricingData function.
// This file is kept as a placeholder or for potential future use with direct BigQuery access if needed for other purposes.

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json(
    { 
      message: 'This GCE BigQuery API route is deprecated for UI price fetching. GCE prices are now sourced from GCS.',
      note: 'If you intended to query BigQuery directly for other purposes, you would need to implement that logic here, ensuring environment variables like BIGQUERY_PROJECT_ID, BIGQUERY_DATASET_ID, and BIGQUERY_GCE_TABLE_ID are set and the service account has permissions.'
    },
    { status: 410 } // 410 Gone might be appropriate
  );
}
