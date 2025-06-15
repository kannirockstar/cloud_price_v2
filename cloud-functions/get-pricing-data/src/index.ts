import { HttpFunction } from '@google-cloud/functions-framework';
import { Storage } from '@google-cloud/storage';
import cors from 'cors';

// Initialize CORS middleware
const corsHandler = cors({ origin: true }); // Allows all origins, adjust for production

const storage = new Storage();
const bucketName = process.env.GCS_BUCKET_NAME;

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

    let gcsFolderPathSegment = '';
    let filePath = '';
    let isGceCsv = false;

    if (provider === 'Google Cloud') {
      gcsFolderPathSegment = 'GCE';
      filePath = `${gcsFolderPathSegment}/gce_all_models_${regionId}.csv`;
      isGceCsv = true;
    } else if (provider === 'Azure') {
      gcsFolderPathSegment = 'azure_prices_python';
      filePath = `${gcsFolderPathSegment}/${regionId}/${instanceId}/${pricingModelValue}.json`;
    } else if (provider === 'AWS') {
      gcsFolderPathSegment = 'EC2';
      filePath = `${gcsFolderPathSegment}/${regionId}/${instanceId}/${pricingModelValue}.json`;
    } else {
      res.status(400).send({ error: `Invalid provider: ${provider}` });
      return;
    }

    console.log(`[GCF/getPricingData] Attempting to download from GCS: gs://${bucketName}/${filePath}`);

    try {
      const file = storage.bucket(bucketName).file(filePath);
      const [exists] = await file.exists();

      if (!exists) {
        console.warn(`[GCF/getPricingData] File not found in GCS: gs://${bucketName}/${filePath}`);
        res.status(404).send({ error: `Pricing data not found. File: ${filePath}` });
        return;
      }

      const [contentBuffer] = await file.download();
      const contentString = contentBuffer.toString();

      if (isGceCsv) {
        const rows = contentString.split('\n');
        if (rows.length < 2) {
          console.error(`[GCF/getPricingData] GCE CSV file gs://${bucketName}/${filePath} has no data rows or is malformed.`);
          res.status(500).send({ error: 'GCE CSV data is malformed or empty.' });
          return;
        }

        const headerRow = rows[0].trim().toLowerCase().split(',');
        // ASSUMPTION: CSV columns are 'instance_name', 'pricing_model', 'hourly_price'
        // Please verify these column names match your CSV.
        const instanceNameColIndex = headerRow.indexOf('instance_name');
        const pricingModelColIndex = headerRow.indexOf('pricing_model');
        const hourlyPriceColIndex = headerRow.indexOf('hourly_price');

        if (instanceNameColIndex === -1 || pricingModelColIndex === -1 || hourlyPriceColIndex === -1) {
          const errMsg = `GCE CSV file gs://${bucketName}/${filePath} is missing required columns. Expected 'instance_name', 'pricing_model', 'hourly_price'. Found headers: ${headerRow.join(', ')}. Please check CSV format.`;
          console.error(`[GCF/getPricingData] ${errMsg}`);
          res.status(500).send({ error: errMsg });
          return;
        }

        let foundPrice: number | null = null;
        const normalizedPricingModelValue = pricingModelValue.toLowerCase();

        for (let i = 1; i < rows.length; i++) {
          const rowValues = rows[i].trim().split(',');
          if (rowValues.length > Math.max(instanceNameColIndex, pricingModelColIndex, hourlyPriceColIndex)) {
            const csvInstanceId = rowValues[instanceNameColIndex]?.trim();
            const csvPricingModel = rowValues[pricingModelColIndex]?.trim().toLowerCase();
            const csvHourlyPriceStr = rowValues[hourlyPriceColIndex]?.trim();

            if (csvInstanceId === instanceId && csvPricingModel === normalizedPricingModelValue) {
              const price = parseFloat(csvHourlyPriceStr);
              if (!isNaN(price)) {
                foundPrice = price;
                break;
              } else {
                 console.warn(`[GCF/getPricingData] Found matching row for ${instanceId} but hourly_price '${csvHourlyPriceStr}' is not a valid number in GCS: gs://${bucketName}/${filePath}`);
              }
            }
          }
        }

        if (foundPrice !== null) {
          console.log(`[GCF/getPricingData] Successfully found price in GCE CSV for ${instanceId} (${pricingModelValue}): ${foundPrice}`);
          res.status(200).send({ hourlyPrice: foundPrice });
        } else {
          console.warn(`[GCF/getPricingData] Price not found in GCE CSV for ${instanceId} with pricing model ${pricingModelValue} in file gs://${bucketName}/${filePath}`);
          res.status(404).send({ error: `Price not found for GCE instance ${instanceId} with pricing model ${pricingModelValue}. Check CSV content and query parameters.` });
        }

      } else { // JSON parsing for Azure/AWS
        const jsonData = JSON.parse(contentString);
        console.log(`[GCF/getPricingData] Successfully fetched and parsed JSON: gs://${bucketName}/${filePath}`);
        if (typeof jsonData.hourlyPrice !== 'number') {
           console.error(`[GCF/getPricingData] 'hourlyPrice' not found or not a number in JSON data from ${filePath}. Data:`, jsonData);
           res.status(500).send({ error: `Malformed pricing data from ${filePath}: 'hourlyPrice' missing or invalid.` });
           return;
        }
        res.status(200).send({ hourlyPrice: jsonData.hourlyPrice });
      }

    } catch (error: any) {
      console.error(`[GCF/getPricingData] Error processing file from GCS (gs://${bucketName}/${filePath}):`, error);
      let errorMessage = 'Failed to process pricing data from GCS.';
      let statusCode = 500;

      if (error.code === 403 || (error.errors && error.errors.some((e: any) => e.reason === 'forbidden'))) {
          errorMessage = `Permission denied for GCF service account when accessing GCS bucket '${bucketName}' for file '${filePath}'. Ensure the GCF service account has 'Storage Object Viewer' role.`;
          statusCode = 403;
      } else if (error.code === 404 || (error.message && error.message.toLowerCase().includes('no such object'))) {
          errorMessage = `File not found in GCS: gs://${bucketName}/${filePath}. Please ensure the file path and name are correct, especially for GCE CSV files (e.g., gce_all_models_regionId.csv).`;
          statusCode = 404;
      } else if (error.name === 'SyntaxError' && !isGceCsv) {
          errorMessage = `Malformed JSON in GCS file: gs://${bucketName}/${filePath}.`;
          statusCode = 500;
      } else if (error.message.includes("GCE CSV data is malformed or empty") || error.message.includes("GCE CSV file is missing required columns")) {
          errorMessage = error.message; // Use specific GCE CSV error
          statusCode = 500;
      }
      res.status(statusCode).send({ error: errorMessage, details: error.message });
    }
  });
};
