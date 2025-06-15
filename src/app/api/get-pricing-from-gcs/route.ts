
// This Next.js API route has been removed.
// The logic for fetching pricing data from GCS is now intended to be handled
// by a dedicated Google Cloud Function, which will be called directly from the client-side
// (src/lib/data.ts via fetchPricingData).

// See the suggested Google Cloud Function code in the Firebase Studio chat
// for the new server-side implementation.

// If you need to respond with a specific status for any old calls to this route,
// you can do so, but it's generally better to ensure client-side code
// is updated to call the new Cloud Function endpoint.
// Example:
// import { NextResponse } from 'next/server';
// export async function GET() {
//   return NextResponse.json({ error: 'This API route is deprecated. Use the Google Cloud Function endpoint.' }, { status: 410 });
// }
