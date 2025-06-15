
import { HttpFunction } from '@google-cloud/functions-framework';
import { Storage } from '@google-cloud/storage';
import cors from 'cors';

// Initialize CORS middleware
const corsHandler = cors({ origin: true }); // Allows all origins, adjust for production

const storage = new Storage();
const bucketName = process.env.GCS_BUCKET_NAME;

/**
 * Parses GCE CSV content to find the hourly price for a specific instance and pricing model.
 * GCE CSV is expected to have unit prices for vCPU and RAM based on commitment.
 * @param csvContent The full string content of the CSV file.
 * @param targetMachineFamily The machine family to find (e.g., 'e2-standard-2').
 * @param targetPricingModel The GCE pricing model value (e.g., 'on-demand', 'gcp-1yr-cud').
 * @param filePath For logging purposes.
 * @returns The total hourly price as a number, or null if not found or error.
 */
function parseGceCsvForPrice(
  csvContent: string,
  targetMachineFamily: string,
  targetPricingModel: string,
  filePath: string
): number | null {
  const rows = csvContent.split('\n');
  if (rows.length < 2) {
    console.error(`[GCF/parseGceCsvForPrice] CSV file ${filePath} has no data rows or is malformed.`);
    return null;
  }

  const headerRow = rows[0].trim().toLowerCase().split(',');
  const machineFamilyColIndex = headerRow.indexOf('machinefamily'); // Matched case-insensitively

  let vcpuPriceColIndex = -1;
  let ramPriceColIndex = -1;

  const lowerTargetPricingModel = targetPricingModel.toLowerCase();

  if (lowerTargetPricingModel === 'on-demand') {
    vcpuPriceColIndex = headerRow.indexOf('ondemand_vcpu_per_hour');
    ramPriceColIndex = headerRow.indexOf('ondemand_ram_per_gib_hour');
  } else if (lowerTargetPricingModel === 'gcp-1yr-cud') {
    vcpuPriceColIndex = headerRow.indexOf('cud_1yr_vcpu_per_hour');
    ramPriceColIndex = headerRow.indexOf('cud_1yr_ram_per_gib_hour');
  } else if (lowerTargetPricingModel === 'gcp-3yr-cud') {
    vcpuPriceColIndex = headerRow.indexOf('cud_3yr_vcpu_per_hour');
    ramPriceColIndex = headerRow.indexOf('cud_3yr_ram_per_gib_hour');
  } else {
    console.warn(`[GCF/parseGceCsvForPrice] Unsupported GCE pricing model '${targetPricingModel}' for CSV parsing in ${filePath}. Only 'on-demand', 'gcp-1yr-cud', 'gcp-3yr-cud' are supported by current CSV headers.`);
    return null; // Flexible CUDs or other models not in headers
  }

  if (machineFamilyColIndex === -1) {
    console.error(`[GCF/parseGceCsvForPrice] CSV file ${filePath} is missing 'MachineFamily' column. Found headers: ${headerRow.join(', ')}`);
    return null;
  }
  if (vcpuPriceColIndex === -1 || ramPriceColIndex === -1) {
    console.error(`[GCF/parseGceCsvForPrice] CSV file ${filePath} is missing required price columns for pricing model '${targetPricingModel}'. VCPU Col Idx: ${vcpuPriceColIndex}, RAM Col Idx: ${ramPriceColIndex}. Found headers: ${headerRow.join(', ')}`);
    return null;
  }

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i].trim();
    if (!row) continue;

    const rowValues = row.split(',');
    if (rowValues.length > Math.max(machineFamilyColIndex, vcpuPriceColIndex, ramPriceColIndex)) {
      const csvMachineFamily = rowValues[machineFamilyColIndex]?.trim();

      if (csvMachineFamily === targetMachineFamily) {
        const vcpuPriceStr = rowValues[vcpuPriceColIndex]?.trim();
        const ramPriceStr = rowValues[ramPriceColIndex]?.trim();

        const vcpuPrice = parseFloat(vcpuPriceStr);
        const ramPrice = parseFloat(ramPriceStr);

        if (!isNaN(vcpuPrice) && !isNaN(ramPrice)) {
          const totalPrice = vcpuPrice + ramPrice;
          console.log(`[GCF/parseGceCsvForPrice] Successfully calculated price in CSV ${filePath} for ${targetMachineFamily} (${targetPricingModel}): ${totalPrice} (vCPU: ${vcpuPrice}, RAM: ${ramPrice})`);
          return totalPrice;
        } else {
          console.warn(`[GCF/parseGceCsvForPrice] Found matching row for ${targetMachineFamily} in ${filePath} but price components are not valid numbers. vCPU_price_str: '${vcpuPriceStr}', RAM_price_str: '${ramPriceStr}'.`);
        }
      }
    }
  }
  console.warn(`[GCF/parseGceCsvForPrice] Price not found in CSV ${filePath} for machine family ${targetMachineFamily} with pricing model ${targetPricingModel}.`);
  return null;
}


/**
 * Parses CSV content (for AWS/Azure) to find the hourly price for a specific instance and pricing model.
 * Assumes columns: instance_name, pricing_model, hourly_price
 */
function parseGenericCsvForPrice(
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
    console.error(`[GCF/parseGenericCsvForPrice] CSV file ${filePath} has no data rows or is malformed.`);
    return null;
  }

  const headerRow = rows[0].trim().toLowerCase().split(',');
  const instanceNameColIndex = headerRow.indexOf(instanceColumnName.toLowerCase());
  const pricingModelColIndex = headerRow.indexOf(modelColumnName.toLowerCase());
  const hourlyPriceColIndex = headerRow.indexOf(priceColumnName.toLowerCase());

  if (instanceNameColIndex === -1 || pricingModelColIndex === -1 || hourlyPriceColIndex === -1) {
    const errMsg = `CSV file ${filePath} is missing required columns for generic parsing. Expected '${instanceColumnName}', '${modelColumnName}', '${priceColumnName}'. Found headers: ${headerRow.join(', ')}. Please check CSV format.`;
    console.error(`[GCF/parseGenericCsvForPrice] ${errMsg}`);
    return null;
  }

  const normalizedTargetPricingModel = targetPricingModel.toLowerCase();

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i].trim();
    if (!row) continue; 

    const rowValues = row.split(',');
    if (rowValues.length > Math.max(instanceNameColIndex, pricingModelColIndex, hourlyPriceColIndex)) {
      const csvInstanceId = rowValues[instanceNameColIndex]?.trim();
      const csvPricingModel = rowValues[pricingModelColIndex]?.trim().toLowerCase();
      const csvHourlyPriceStr = rowValues[hourlyPriceColIndex]?.trim();

      if (csvInstanceId === targetInstanceId && csvPricingModel === normalizedTargetPricingModel) {
        const price = parseFloat(csvHourlyPriceStr);
        if (!isNaN(price)) {
          console.log(`[GCF/parseGenericCsvForPrice] Successfully found price in CSV ${filePath} for ${targetInstanceId} (${targetPricingModel}): ${price}`);
          return price;
        } else {
          console.warn(`[GCF/parseGenericCsvForPrice] Found matching row for ${targetInstanceId} in ${filePath} but ${priceColumnName} '${csvHourlyPriceStr}' is not a valid number.`);
        }
      }
    }
  }
  console.warn(`[GCF/parseGenericCsvForPrice] Price not found in CSV ${filePath} for ${targetInstanceId} with pricing model ${targetPricingModel}.`);
  return null;
}


export const getPricingData: HttpFunction = async (req, res) => {
  if (req.method === 'OPTIONS') {
    corsHandler(req, res, () => { res.status(204).send(''); });
    return;
  }

  corsHandler(req, res, async () => {
    if (!bucketName) {
      console.error('GCS_BUCKET_NAME environment variable not set.');
      res.status(500).send({ error: 'Server configuration error: Bucket name not set.' });
      return;
    }

    const { provider, regionId, instanceId, pricingModelValue } = req.query as {
      provider: string; regionId: string; instanceId: string; pricingModelValue: string;
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
    let foundPrice: number | null = null;
    let filePath = '';
    
    // Standard column names for AWS/Azure simple CSVs
    const awsAzureInstanceColumn = 'instance_name'; 
    const awsAzureModelColumn = 'pricing_model';
    const awsAzurePriceColumn = 'hourly_price';

    try {
      if (provider === 'Google Cloud') {
        gcsFolder = 'GCE';
        csvFileName = `gce_all_models_${regionId}.csv`;
        filePath = `${gcsFolder}/${csvFileName}`;
        const targetMachineFamily = instanceId.replace(/^gcp-/, ''); // e.g., "e2-standard-2" from "gcp-e2-standard-2"
        
        console.log(`[GCF/getPricingData] Attempting GCE CSV download: gs://${bucketName}/${filePath}`);
        const file = storage.bucket(bucketName).file(filePath);
        const [exists] = await file.exists();
        if (!exists) {
          console.warn(`[GCF/getPricingData] GCE CSV File not found: gs://${bucketName}/${filePath}`);
          res.status(404).send({ error: `Pricing data CSV not found. File: ${filePath}` });
          return;
        }
        const [contentBuffer] = await file.download();
        const contentString = contentBuffer.toString();
        foundPrice = parseGceCsvForPrice(contentString, targetMachineFamily, pricingModelValue, filePath);

      } else if (provider === 'Azure') {
        gcsFolder = 'Azure';
        csvFileName = `${regionId}_prices.csv`;
        filePath = `${gcsFolder}/${csvFileName}`;

        console.log(`[GCF/getPricingData] Attempting Azure CSV download: gs://${bucketName}/${filePath}`);
        const file = storage.bucket(bucketName).file(filePath);
        const [exists] = await file.exists();
        if (!exists) {
          console.warn(`[GCF/getPricingData] Azure CSV File not found: gs://${bucketName}/${filePath}`);
          res.status(404).send({ error: `Pricing data CSV not found. File: ${filePath}` });
          return;
        }
        const [contentBuffer] = await file.download();
        const contentString = contentBuffer.toString();
        foundPrice = parseGenericCsvForPrice(contentString, instanceId, pricingModelValue, awsAzureInstanceColumn, awsAzureModelColumn, awsAzurePriceColumn, filePath);
      
      } else if (provider === 'AWS') {
        gcsFolder = 'EC2';
        csvFileName = `ec2_pricing_${regionId}.csv`;
        filePath = `${gcsFolder}/${csvFileName}`;

        console.log(`[GCF/getPricingData] Attempting AWS CSV download: gs://${bucketName}/${filePath}`);
        const file = storage.bucket(bucketName).file(filePath);
        const [exists] = await file.exists();
        if (!exists) {
          console.warn(`[GCF/getPricingData] AWS CSV File not found: gs://${bucketName}/${filePath}`);
          res.status(404).send({ error: `Pricing data CSV not found. File: ${filePath}` });
          return;
        }
        const [contentBuffer] = await file.download();
        const contentString = contentBuffer.toString();
        foundPrice = parseGenericCsvForPrice(contentString, instanceId, pricingModelValue, awsAzureInstanceColumn, awsAzureModelColumn, awsAzurePriceColumn, filePath);

      } else {
        res.status(400).send({ error: `Invalid provider: ${provider}` });
        return;
      }

      if (foundPrice !== null) {
        res.status(200).send({ hourlyPrice: foundPrice });
      } else {
        let specificErrorMsg = `Price not found for instance ${instanceId} with pricing model ${pricingModelValue} in CSV file ${filePath}.`;
        if (provider === 'Google Cloud') {
            specificErrorMsg += ` Check GCE CSV content for matching 'MachineFamily' ('${instanceId.replace(/^gcp-/, '')}') and ensure model '${pricingModelValue}' maps to existing VCPU/RAM price columns (e.g., OnDemand_VCPU_per_Hour, CUD_1yr_RAM_per_GiB_Hour).`;
        } else {
            specificErrorMsg += ` Check CSV content, query parameters, and ensure column names ('${awsAzureInstanceColumn}', '${awsAzureModelColumn}', '${awsAzurePriceColumn}') match your CSV headers.`;
        }
        res.status(404).send({ error: specificErrorMsg });
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
      } else if (error.message?.includes("CSV file is missing required columns") || error.message?.includes("has no data rows or is malformed")) {
          errorMessage = error.message; 
          statusCode = 500; // It's a server-side data format issue
      }
      res.status(statusCode).send({ error: errorMessage, details: error.message });
    }
  });
};

    