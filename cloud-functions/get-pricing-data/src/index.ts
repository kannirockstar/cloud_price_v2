
import { HttpFunction } from '@google-cloud/functions-framework';
import { Storage } from '@google-cloud/storage';
import cors from 'cors';

// Initialize CORS middleware
const corsHandler = cors({ origin: true }); // Allows all origins, adjust for production

const storage = new Storage();
const bucketName = process.env.GCS_BUCKET_NAME;

/**
 * Parses CSV content to find the hourly price for a specific instance and pricing model.
 * @param csvContent The full string content of the CSV file.
 * @param targetInstanceId The instance ID (e.g., 'e2-standard-2', 'm5.large') to find.
 * @param targetPricingModel The pricing model value (e.g., 'on-demand', 'gcp-1yr-cud') to find.
 * @param instanceColumnName The header name for the instance identifier column in the CSV.
 * @param modelColumnName The header name for the pricing model column in the CSV.
 * @param priceColumnName The header name for the hourly price column in the CSV.
 * @param filePath For logging purposes.
 * @returns The hourly price as a number, or null if not found or error.
 */
function parseCsvForPrice(
  csvContent: string,
  targetInstanceId: string,
  targetPricingModel: string,
  instanceColumnName: string,
  modelColumnName: string,
  priceColumnName: string,
  filePath: string // For logging
): number | null {
  const rows = csvContent.split('\n');
  if (rows.length < 2) {
    console.error(`[GCF/parseCsvForPrice] CSV file ${filePath} has no data rows or is malformed.`);
    return null;
  }

  const headerRow = rows[0].trim().toLowerCase().split(',');
  const instanceNameColIndex = headerRow.indexOf(instanceColumnName.toLowerCase());
  const pricingModelColIndex = headerRow.indexOf(modelColumnName.toLowerCase());
  const hourlyPriceColIndex = headerRow.indexOf(priceColumnName.toLowerCase());

  if (instanceNameColIndex === -1 || pricingModelColIndex === -1 || hourlyPriceColIndex === -1) {
    const errMsg = `CSV file ${filePath} is missing required columns. Expected '${instanceColumnName}', '${modelColumnName}', '${priceColumnName}'. Found headers: ${headerRow.join(', ')}. Please check CSV format.`;
    console.error(`[GCF/parseCsvForPrice] ${errMsg}`);
    return null;
  }

  const normalizedTargetPricingModel = targetPricingModel.toLowerCase();

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i].trim();
    if (!row) continue; // Skip empty lines

    // Handle CSVs with commas within quoted fields if necessary, simple split for now
    const rowValues = row.split(',');
    if (rowValues.length > Math.max(instanceNameColIndex, pricingModelColIndex, hourlyPriceColIndex)) {
      const csvInstanceId = rowValues[instanceNameColIndex]?.trim();
      const csvPricingModel = rowValues[pricingModelColIndex]?.trim().toLowerCase();
      const csvHourlyPriceStr = rowValues[hourlyPriceColIndex]?.trim();

      if (csvInstanceId === targetInstanceId && csvPricingModel === normalizedTargetPricingModel) {
        const price = parseFloat(csvHourlyPriceStr);
        if (!isNaN(price)) {
          console.log(`[GCF/parseCsvForPrice] Successfully found price in CSV ${filePath} for ${targetInstanceId} (${targetPricingModel}): ${price}`);
          return price;
        } else {
          console.warn(`[GCF/parseCsvForPrice] Found matching row for ${targetInstanceId} in ${filePath} but ${priceColumnName} '${csvHourlyPriceStr}' is not a valid number.`);
        }
      }
    }
  }
  console.warn(`[GCF/parseCsvForPrice] Price not found in CSV ${filePath} for ${targetInstanceId} with pricing model ${targetPricingModel}.`);
  return null;
}


export const getPricingData: HttpFunction = async (req, res) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    corsHandler(req, res, () => {
      res.status(204).send('');
    });
    return;
  }

  // Apply CORS to actual requests
  corsHandler(req, res, async () => {
    if (!bucketName) {
      console.error('GCS_BUCKET_NAME environment variable not set.');
      res.status(500).send({ error: 'Server configuration error: Bucket name not set.' });
      return;
    }

    const { provider, regionId, instanceId, pricingModelValue } = req.query as {
      provider: string;
      regionId: string;
      instanceId: string;
      pricingModelValue: string;
    };

    if (!provider || !regionId || !instanceId || !pricingModelValue) {
      res.status(400).send({ error: 'Missing required query parameters (provider, regionId, instanceId, pricingModelValue)' });
      return;
    }

    if (typeof provider !== 'string' || typeof regionId !== 'string' || typeof instanceId !== 'string' || typeof pricingModelValue !== 'string') {
        res.status(400).send({ error: 'All query parameters must be strings.' });
        return;
    }

    let gcsFolder = '';
    let csvFileName = '';
    // Define these based on your CSV structure, assuming consistency for now
    const csvInstanceColumn = 'instance_name'; 
    const csvModelColumn = 'pricing_model';
    const csvPriceColumn = 'hourly_price';

    if (provider === 'Google Cloud') {
      gcsFolder = 'GCE';
      csvFileName = `gce_all_models_${regionId}.csv`;
    } else if (provider === 'Azure') {
      gcsFolder = 'Azure'; // Per your new structure
      csvFileName = `${regionId}_prices.csv`;
    } else if (provider === 'AWS') {
      gcsFolder = 'EC2'; // Per your new structure
      csvFileName = `ec2_pricing_${regionId}.csv`;
    } else {
      res.status(400).send({ error: `Invalid provider: ${provider}` });
      return;
    }

    const filePath = `${gcsFolder}/${csvFileName}`;
    console.log(`[GCF/getPricingData] Attempting to download CSV from GCS: gs://${bucketName}/${filePath}`);

    try {
      const file = storage.bucket(bucketName).file(filePath);
      const [exists] = await file.exists();

      if (!exists) {
        console.warn(`[GCF/getPricingData] CSV File not found in GCS: gs://${bucketName}/${filePath}`);
        res.status(404).send({ error: `Pricing data CSV not found. File: ${filePath}` });
        return;
      }

      const [contentBuffer] = await file.download();
      const contentString = contentBuffer.toString();

      const foundPrice = parseCsvForPrice(
        contentString,
        instanceId,
        pricingModelValue,
        csvInstanceColumn,
        csvModelColumn,
        csvPriceColumn,
        filePath
      );

      if (foundPrice !== null) {
        res.status(200).send({ hourlyPrice: foundPrice });
      } else {
        // parseCsvForPrice already logs details, so we just send a 404 if it returns null
        res.status(404).send({ 
          error: `Price not found for instance ${instanceId} with pricing model ${pricingModelValue} in CSV file ${filePath}. Check CSV content, query parameters, and ensure column names ('${csvInstanceColumn}', '${csvModelColumn}', '${csvPriceColumn}') match your CSV headers.` 
        });
      }

    } catch (error: any) {
      console.error(`[GCF/getPricingData] Error processing CSV file from GCS (gs://${bucketName}/${filePath}):`, error);
      let errorMessage = 'Failed to process pricing data CSV from GCS.';
      let statusCode = 500;

      if (error.code === 403 || (error.errors && error.errors.some((e: any) => e.reason === 'forbidden'))) {
          errorMessage = `Permission denied for GCF service account when accessing GCS bucket '${bucketName}' for file '${filePath}'. Ensure the GCF service account has 'Storage Object Viewer' role.`;
          statusCode = 403;
      } else if (error.code === 404 || (error.message && error.message.toLowerCase().includes('no such object'))) {
          errorMessage = `CSV File not found in GCS: gs://${bucketName}/${filePath}. Please ensure the file path and name are correct.`;
          statusCode = 404;
      } else if (error.message.includes("CSV file is missing required columns") || error.message.includes("has no data rows or is malformed")) {
          errorMessage = error.message; 
          statusCode = 500;
      }
      res.status(statusCode).send({ error: errorMessage, details: error.message });
    }
  });
};
