"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPricingData = void 0;
const storage_1 = require("@google-cloud/storage");
const cors_1 = __importDefault(require("cors"));
// Initialize CORS middleware
const corsHandler = (0, cors_1.default)({ origin: true }); // Allows all origins, adjust for production
const storage = new storage_1.Storage();
const configuredBucketName = process.env.GCS_BUCKET_NAME;
/**
 * Parses GCE CSV content to find the hourly price for a specific instance and pricing model.
 * GCE CSV is expected to have unit prices for vCPU and RAM based on commitment for each machine family.
 * For a given MachineFamily (e.g., 'e2-standard-2'), the 'OnDemand_VCPU_per_Hour' column
 * is assumed to contain the total vCPU cost for that specific machine type, and
 * 'OnDemand_RAM_per_GiB_Hour' contains the total RAM cost for that type.
 * This function sums these two components to get the total hourly price.
 * @param csvContent The full string content of the CSV file.
 * @param targetMachineFamily The machine family to find (e.g., 'e2-standard-2' - after stripping 'gcp-' prefix).
 * @param targetPricingModel The GCE pricing model value (e.g., 'on-demand', 'gcp-1yr-cud').
 * @param filePath For logging purposes.
 * @returns The total hourly price as a number, or null if not found or error.
 */
function parseGceCsvForPrice(csvContent, targetMachineFamily, // e.g., "e2-standard-2" (after stripping 'gcp-')
targetPricingModel, // e.g., "on-demand", "gcp-1yr-cud"
filePath) {
    const rows = csvContent.split('\n');
    if (rows.length < 2) {
        console.error(`[GCF/parseGceCsvForPrice] CSV file ${filePath} has no data rows or is malformed.`);
        return null;
    }
    const headerRow = rows[0].trim().toLowerCase().split(',');
    // ---Expected GCE CSV Column Headers (case-insensitive matching)---
    const gceMachineFamilyCol = 'machinefamily';
    const gceOnDemandVcpuCol = 'ondemand_vcpu_per_hour';
    const gceOnDemandRamCol = 'ondemand_ram_per_gib_hour';
    const gce1yrCudVcpuCol = 'cud_1yr_vcpu_per_hour';
    const gce1yrCudRamCol = 'cud_1yr_ram_per_gib_hour';
    const gce3yrCudVcpuCol = 'cud_3yr_vcpu_per_hour';
    const gce3yrCudRamCol = 'cud_3yr_ram_per_gib_hour';
    // ----------------------------------------------------------------
    const machineFamilyColIndex = headerRow.indexOf(gceMachineFamilyCol);
    const onDemandVcpuColIndex = headerRow.indexOf(gceOnDemandVcpuCol);
    const onDemandRamColIndex = headerRow.indexOf(gceOnDemandRamCol);
    const yr1CudVcpuColIndex = headerRow.indexOf(gce1yrCudVcpuCol);
    const yr1CudRamColIndex = headerRow.indexOf(gce1yrCudRamCol);
    const yr3CudVcpuColIndex = headerRow.indexOf(gce3yrCudVcpuCol);
    const yr3CudRamColIndex = headerRow.indexOf(gce3yrCudRamCol);
    console.log(`[GCF/parseGceCsvForPrice] Header indices for GCE CSV ${filePath}: MachineFamily=${machineFamilyColIndex}, OnDemandVCPU=${onDemandVcpuColIndex}, OnDemandRAM=${onDemandRamColIndex}, 1yrCUDVCPU=${yr1CudVcpuColIndex}, 1yrCUDRAM=${yr1CudRamColIndex}, 3yrCUDVCPU=${yr3CudVcpuColIndex}, 3yrCUDRAM=${yr3CudRamColIndex}`);
    let vcpuPriceColIndex = -1;
    let ramPriceColIndex = -1;
    const lowerTargetPricingModel = targetPricingModel.toLowerCase();
    if (lowerTargetPricingModel === 'on-demand') {
        vcpuPriceColIndex = onDemandVcpuColIndex;
        ramPriceColIndex = onDemandRamColIndex;
    }
    else if (lowerTargetPricingModel === 'gcp-1yr-cud') {
        vcpuPriceColIndex = yr1CudVcpuColIndex;
        ramPriceColIndex = yr1CudRamColIndex;
    }
    else if (lowerTargetPricingModel === 'gcp-3yr-cud') {
        vcpuPriceColIndex = yr3CudVcpuColIndex;
        ramPriceColIndex = yr3CudRamColIndex;
    }
    else {
        console.warn(`[GCF/parseGceCsvForPrice] Unsupported GCE pricing model '${targetPricingModel}' for CSV parsing in ${filePath}. Only 'on-demand', 'gcp-1yr-cud', 'gcp-3yr-cud' are directly supported by current GCE CSV headers. Flexible CUDs or other models need different handling or CSV columns.`);
        return null; // Flexible CUDs or other models not directly in headers
    }
    if (machineFamilyColIndex === -1) {
        console.error(`[GCF/parseGceCsvForPrice] CSV file ${filePath} is missing '${gceMachineFamilyCol}' column. Found headers: ${headerRow.join(', ')}`);
        return null;
    }
    if (vcpuPriceColIndex === -1 || ramPriceColIndex === -1) {
        console.error(`[GCF/parseGceCsvForPrice] CSV file ${filePath} is missing required price columns for GCE pricing model '${targetPricingModel}'. VCPU Col Idx: ${vcpuPriceColIndex}, RAM Col Idx: ${ramPriceColIndex}. Found headers: ${headerRow.join(', ')}`);
        return null;
    }
    for (let i = 1; i < rows.length; i++) {
        const row = rows[i].trim();
        if (!row)
            continue;
        const rowValues = row.split(',');
        if (rowValues.length <= Math.max(machineFamilyColIndex, vcpuPriceColIndex, ramPriceColIndex)) {
            // console.warn(`[GCF/parseGceCsvForPrice] Skipping short row ${i+1} in ${filePath}. Values: ${rowValues.join(',')}, Expected min columns: ${Math.max(machineFamilyColIndex, vcpuPriceColIndex, ramPriceColIndex) +1}`);
            continue;
        }
        const csvMachineFamily = rowValues[machineFamilyColIndex]?.trim();
        if (csvMachineFamily === targetMachineFamily) {
            console.log(`[GCF/parseGceCsvForPrice] Found matching machine family '${targetMachineFamily}' in GCE CSV ${filePath} at row ${i + 1}.`);
            const vcpuPriceStr = rowValues[vcpuPriceColIndex]?.trim();
            const ramPriceStr = rowValues[ramPriceColIndex]?.trim();
            console.log(`[GCF/parseGceCsvForPrice] Raw price strings for ${targetMachineFamily} (${targetPricingModel}): VCPU='${vcpuPriceStr}', RAM='${ramPriceStr}'`);
            const vcpuPrice = parseFloat(vcpuPriceStr);
            const ramPrice = parseFloat(ramPriceStr);
            if (isNaN(vcpuPrice)) {
                console.warn(`[GCF/parseGceCsvForPrice] VCPU price string '${vcpuPriceStr}' for ${targetMachineFamily} resulted in NaN.`);
            }
            if (isNaN(ramPrice)) {
                console.warn(`[GCF/parseGceCsvForPrice] RAM price string '${ramPriceStr}' for ${targetMachineFamily} resulted in NaN.`);
            }
            if (!isNaN(vcpuPrice) && !isNaN(ramPrice)) {
                const totalPrice = vcpuPrice + ramPrice;
                console.log(`[GCF/parseGceCsvForPrice] Successfully calculated price in GCE CSV ${filePath} for ${targetMachineFamily} (${targetPricingModel}): ${totalPrice} (vCPU: ${vcpuPrice}, RAM: ${ramPrice})`);
                return totalPrice;
            }
            else {
                console.warn(`[GCF/parseGceCsvForPrice] Found matching GCE row for ${targetMachineFamily} in ${filePath} but price components are not valid numbers. vCPU_price_str: '${vcpuPriceStr}', RAM_price_str: '${ramPriceStr}'.`);
            }
        }
    }
    console.warn(`[GCF/parseGceCsvForPrice] Price not found in GCE CSV ${filePath} for machine family ${targetMachineFamily} with pricing model ${targetPricingModel}.`);
    return null;
}
/**
 * Parses Azure CSV content to find the hourly price for a specific instance and pricing model.
 * Logic:
 * - For 'on-demand': reservationTerm is empty, meterName does not contain "Spot".
 * - For 'azure-spot': reservationTerm is empty, meterName contains "Spot".
 * - For reservations ('azure-1yr-*', 'azure-3yr-*'): matches reservationTerm "1 Year" or "3 Years".
 * @param csvContent The full string content of the CSV file.
 * @param targetInstanceId The Azure instance SKU name (e.g., 'Standard_D2s_v3').
 * @param targetPricingModel The Azure pricing model value from frontend (e.g., 'on-demand', 'azure-spot', 'azure-1yr-ri-no-upfront').
 * @param filePath For logging purposes.
 * @returns The total hourly price as a number, or null if not found or error.
 */
function parseAzureCsvForPrice(csvContent, targetInstanceId, targetPricingModel, filePath) {
    const rows = csvContent.split('\n');
    if (rows.length < 2) {
        console.error(`[GCF/parseAzureCsvForPrice] CSV file ${filePath} has no data rows or is malformed.`);
        return null;
    }
    const headerRow = rows[0].trim().toLowerCase().split(',');
    // --- Expected Azure CSV Column Headers (case-insensitive matching) ---
    // Adjust these if your Azure CSV headers differ
    const azureInstanceNameCol = 'armskuname'; // Common in Azure exports, e.g. "Standard_D2s_v3"
    const azureReservationTermCol = 'reservationterm'; // e.g., "", "1 Year", "3 Years"
    const azureMeterNameCol = 'metername'; // e.g., "D2s v3 Spot", "D2s v3"
    const azurePriceCol = 'unitprice'; // The hourly price
    // ------------------------------------------------------------------
    const instanceNameColIndex = headerRow.indexOf(azureInstanceNameCol);
    const reservationTermColIndex = headerRow.indexOf(azureReservationTermCol);
    const meterNameColIndex = headerRow.indexOf(azureMeterNameCol);
    const priceColIndex = headerRow.indexOf(azurePriceCol);
    if (instanceNameColIndex === -1 || reservationTermColIndex === -1 || meterNameColIndex === -1 || priceColIndex === -1) {
        console.error(`[GCF/parseAzureCsvForPrice] CSV file ${filePath} is missing one or more required Azure columns. Expected: '${azureInstanceNameCol}', '${azureReservationTermCol}', '${azureMeterNameCol}', '${azurePriceCol}'. Found headers: ${headerRow.join(', ')}.`);
        return null;
    }
    console.log(`[GCF/parseAzureCsvForPrice] Searching for Azure instance '${targetInstanceId}' with model '${targetPricingModel}' in CSV ${filePath}.`);
    const lowerTargetPricingModel = targetPricingModel.toLowerCase();
    for (let i = 1; i < rows.length; i++) {
        const row = rows[i].trim();
        if (!row)
            continue;
        const rowValues = row.split(',');
        if (rowValues.length <= Math.max(instanceNameColIndex, reservationTermColIndex, meterNameColIndex, priceColIndex)) {
            // console.warn(`[GCF/parseAzureCsvForPrice] Skipping short row ${i+1} in ${filePath}. Values: ${rowValues.join(',')}`);
            continue;
        }
        const csvInstanceIdStr = rowValues[instanceNameColIndex];
        const csvInstanceId = typeof csvInstanceIdStr === 'string' ? csvInstanceIdStr.trim() : '';
        if (csvInstanceId !== targetInstanceId) {
            continue; // Not the instance we're looking for
        }
        const csvReservationTermStr = rowValues[reservationTermColIndex];
        const csvReservationTerm = typeof csvReservationTermStr === 'string' ? csvReservationTermStr.trim().toLowerCase() : '';
        const csvMeterNameStr = rowValues[meterNameColIndex];
        const csvMeterName = typeof csvMeterNameStr === 'string' ? csvMeterNameStr.trim().toLowerCase() : '';
        const csvPriceStr = rowValues[priceColIndex]; // parseFloat handles trim and undefined
        const price = parseFloat(csvPriceStr);
        if (isNaN(price)) {
            // console.warn(`[GCF/parseAzureCsvForPrice] Invalid price '${csvPriceStr}' for instance ${csvInstanceId} in ${filePath}.`);
            continue;
        }
        let modelMatch = false;
        if (lowerTargetPricingModel === 'on-demand') {
            if ((!csvReservationTerm || csvReservationTerm === 'null' || csvReservationTerm === 'na') && !csvMeterName.includes('spot')) {
                modelMatch = true;
            }
        }
        else if (lowerTargetPricingModel === 'azure-spot') {
            if ((!csvReservationTerm || csvReservationTerm === 'null' || csvReservationTerm === 'na') && csvMeterName.includes('spot')) {
                modelMatch = true;
            }
        }
        else if (lowerTargetPricingModel.includes('1yr') || lowerTargetPricingModel.includes('1 year')) {
            if (csvReservationTerm.includes('1 year') || csvReservationTerm.includes('1 yr')) {
                modelMatch = true;
            }
        }
        else if (lowerTargetPricingModel.includes('3yr') || lowerTargetPricingModel.includes('3 years')) {
            if (csvReservationTerm.includes('3 years') || csvReservationTerm.includes('3 yr')) {
                modelMatch = true;
            }
        }
        if (modelMatch) {
            console.log(`[GCF/parseAzureCsvForPrice] Successfully found Azure price in CSV ${filePath} for ${targetInstanceId} (${targetPricingModel}): ${price}`);
            return price;
        }
    }
    console.warn(`[GCF/parseAzureCsvForPrice] Azure Price not found in CSV ${filePath} for instance ${targetInstanceId} with pricing model ${targetPricingModel}.`);
    return null;
}
/**
 * Parses generic CSV content (for AWS) to find the hourly price for a specific instance and pricing model.
 * Assumes columns: instance_name, pricing_model, hourly_price
 */
function parseGenericCsvForPrice(csvContent, targetInstanceId, targetPricingModel, instanceColumnName, // Configurable column name for instance ID
modelColumnName, // Configurable column name for pricing model
priceColumnName, // Configurable column name for price
filePath // For logging
) {
    const rows = csvContent.split('\n');
    if (rows.length < 2) {
        console.error(`[GCF/parseGenericCsvForPrice] CSV file ${filePath} has no data rows or is malformed.`);
        return null;
    }
    const headerRow = rows[0].trim().toLowerCase().split(',');
    const instanceNameColIndex = headerRow.indexOf(instanceColumnName.toLowerCase());
    const pricingModelColIndex = headerRow.indexOf(modelColumnName.toLowerCase());
    const hourlyPriceColIndex = headerRow.indexOf(priceColumnName.toLowerCase());
    console.log(`[GCF/parseGenericCsvForPrice] Searching for instance '${targetInstanceId}' with model '${targetPricingModel}' in generic CSV ${filePath}.`);
    console.log(`[GCF/parseGenericCsvForPrice] Using column indices: InstanceName=${instanceNameColIndex} ('${instanceColumnName}'), PricingModel=${pricingModelColIndex} ('${modelColumnName}'), HourlyPrice=${hourlyPriceColIndex} ('${priceColumnName}').`);
    console.log(`[GCF/parseGenericCsvForPrice] CSV Headers found: ${headerRow.join(', ')}`);
    if (instanceNameColIndex === -1 || pricingModelColIndex === -1 || hourlyPriceColIndex === -1) {
        let missingCols = [];
        if (instanceNameColIndex === -1)
            missingCols.push(`'${instanceColumnName}' (for instance ID)`);
        if (pricingModelColIndex === -1)
            missingCols.push(`'${modelColumnName}' (for pricing model)`);
        if (hourlyPriceColIndex === -1)
            missingCols.push(`'${priceColumnName}' (for price)`);
        const errMsg = `CSV file ${filePath} is missing one or more required columns for generic parsing. Missing: ${missingCols.join(', ')}. Expected headers (case-insensitive): '${instanceColumnName}', '${modelColumnName}', '${priceColumnName}'. Actual headers found: ${headerRow.join(', ')}. Please check CSV format.`;
        console.error(`[GCF/parseGenericCsvForPrice] ${errMsg}`);
        return null;
    }
    const normalizedTargetPricingModel = targetPricingModel.toLowerCase();
    console.log(`[GCF/parseGenericCsvForPrice] Normalized target pricing model for lookup: '${normalizedTargetPricingModel}'`);
    for (let i = 1; i < rows.length; i++) {
        const rowString = rows[i]?.trim();
        if (!rowString) {
            // console.warn(`[GCF/parseGenericCsvForPrice] Skipping empty row ${i+1} in ${filePath}.`);
            continue;
        }
        const rowValues = rowString.split(',');
        if (rowValues.length <= Math.max(instanceNameColIndex, pricingModelColIndex, hourlyPriceColIndex)) {
            // console.warn(`[GCF/parseGenericCsvForPrice] Skipping short row ${i+1} in ${filePath}. Values: '${rowString}', Expected min columns: ${Math.max(instanceNameColIndex, pricingModelColIndex, hourlyPriceColIndex) + 1}`);
            continue;
        }
        const csvInstanceIdStr = rowValues[instanceNameColIndex];
        const csvPricingModelStr = rowValues[pricingModelColIndex];
        const csvHourlyPriceStr = rowValues[hourlyPriceColIndex];
        const csvInstanceId = typeof csvInstanceIdStr === 'string' ? csvInstanceIdStr.trim() : '';
        const csvPricingModel = typeof csvPricingModelStr === 'string' ? csvPricingModelStr.trim().toLowerCase() : '';
        if (i < 5 || targetInstanceId === csvInstanceId) { // Log first few rows and any row matching target instance for easier debugging
            console.log(`[GCF/parseGenericCsvForPrice] Row ${i + 1} Data: Instance='${csvInstanceIdStr}', RawModel='${csvPricingModelStr}', Model(normalized)='${csvPricingModel}', RawPrice='${csvHourlyPriceStr}'`);
        }
        if (csvInstanceId === targetInstanceId && csvPricingModel === normalizedTargetPricingModel) {
            console.log(`[GCF/parseGenericCsvForPrice] Found matching row for ${targetInstanceId} (${targetPricingModel}) in ${filePath}. Raw price string: '${csvHourlyPriceStr}'`);
            const price = parseFloat(csvHourlyPriceStr);
            if (!isNaN(price)) {
                console.log(`[GCF/parseGenericCsvForPrice] Successfully parsed price: ${price}`);
                return price;
            }
            else {
                console.warn(`[GCF/parseGenericCsvForPrice] Matched row for ${targetInstanceId} (${targetPricingModel}) but hourly price '${csvHourlyPriceStr}' is not a valid number in ${filePath}.`);
            }
        }
    }
    console.warn(`[GCF/parseGenericCsvForPrice] Price not found in generic CSV ${filePath} for instance '${targetInstanceId}' with pricing model '${normalizedTargetPricingModel}'. Checked ${rows.length - 1} data rows.`);
    return null;
}
const getPricingData = async (req, res) => {
    console.log(`[GCF/getPricingData] Function invoked. Configured GCS_BUCKET_NAME: ${configuredBucketName || 'NOT SET'}`);
    if (req.method === 'OPTIONS') {
        corsHandler(req, res, () => { res.status(204).send(''); });
        return;
    }
    corsHandler(req, res, async () => {
        if (!configuredBucketName) {
            console.error('[GCF/getPricingData] CRITICAL: GCS_BUCKET_NAME environment variable not set in Cloud Function.');
            res.status(500).send({ error: 'Server configuration error: Bucket name not set.' });
            return;
        }
        const { provider, regionId, instanceId, pricingModelValue } = req.query;
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
        let foundPrice = null;
        let filePath = '';
        const awsInstanceColumn = 'instance_name';
        const awsModelColumn = 'pricing_model';
        const awsPriceColumn = 'hourly_price';
        try {
            // Note: 'file' variable is initialized inside specific provider block now
            if (provider === 'Google Cloud') {
                gcsFolder = 'GCE';
                csvFileName = `gce_all_models_${regionId}.csv`;
                filePath = `${gcsFolder}/${csvFileName}`;
                const gceMachineFamilyToLookup = instanceId.replace(/^gcp-/, '');
                console.log(`[GCF/getPricingData] Attempting GCE CSV download: gs://${configuredBucketName}/${filePath}`);
                const gceFile = storage.bucket(configuredBucketName).file(filePath);
                const [exists] = await gceFile.exists();
                if (!exists) {
                    console.warn(`[GCF/getPricingData] GCE CSV File not found: gs://${configuredBucketName}/${filePath}`);
                    res.status(404).send({ error: `Pricing data CSV not found. File: ${filePath}` });
                    return;
                }
                const [contentBuffer] = await gceFile.download();
                const contentString = contentBuffer.toString();
                foundPrice = parseGceCsvForPrice(contentString, gceMachineFamilyToLookup, pricingModelValue, filePath);
            }
            else if (provider === 'Azure') {
                gcsFolder = 'Azure';
                csvFileName = `${regionId}_prices.csv`;
                filePath = `${gcsFolder}/${csvFileName}`;
                console.log(`[GCF/getPricingData] Attempting Azure CSV download: gs://${configuredBucketName}/${filePath}`);
                const azureFile = storage.bucket(configuredBucketName).file(filePath);
                const [exists] = await azureFile.exists();
                if (!exists) {
                    console.warn(`[GCF/getPricingData] Azure CSV File not found: gs://${configuredBucketName}/${filePath}`);
                    res.status(404).send({ error: `Pricing data CSV not found. File: ${filePath}` });
                    return;
                }
                const [contentBuffer] = await azureFile.download();
                const contentString = contentBuffer.toString();
                foundPrice = parseAzureCsvForPrice(contentString, instanceId, pricingModelValue, filePath);
            }
            else if (provider === 'AWS') {
                gcsFolder = 'EC2';
                csvFileName = `ec2_pricing_${regionId}.csv`;
                filePath = `${gcsFolder}/${csvFileName}`;
                console.log(`[GCF/getPricingData] Attempting AWS CSV download: gs://${configuredBucketName}/${filePath}`);
                const awsFile = storage.bucket(configuredBucketName).file(filePath);
                const [exists] = await awsFile.exists();
                if (!exists) {
                    console.warn(`[GCF/getPricingData] AWS CSV File not found: gs://${configuredBucketName}/${filePath}`);
                    res.status(404).send({ error: `Pricing data CSV not found. File: ${filePath}` });
                    return;
                }
                const [contentBuffer] = await awsFile.download();
                const contentString = contentBuffer.toString();
                foundPrice = parseGenericCsvForPrice(contentString, instanceId, pricingModelValue, awsInstanceColumn, awsModelColumn, awsPriceColumn, filePath);
            }
            else {
                res.status(400).send({ error: `Invalid provider: ${provider}` });
                return;
            }
            if (foundPrice !== null) {
                res.status(200).send({ hourlyPrice: foundPrice });
            }
            else {
                let specificErrorMsg = `Price not found for instance ${instanceId} with pricing model ${pricingModelValue} in CSV file ${filePath}.`;
                if (provider === 'Google Cloud') {
                    specificErrorMsg += ` Check GCE CSV content for matching 'MachineFamily' ('${instanceId.replace(/^gcp-/, '')}') and ensure model '${pricingModelValue}' maps to existing VCPU/RAM price columns (e.g., OnDemand_VCPU_per_Hour, CUD_1yr_RAM_per_GiB_Hour). Also check GCF logs for parsing details.`;
                }
                else if (provider === 'Azure') {
                    specificErrorMsg += ` Check Azure CSV content for instance '${instanceId}', appropriate 'reservationTerm' and 'meterName' values for model '${pricingModelValue}', and correct column headers (expected: armSkuName, reservationTerm, meterName, unitPrice). Also check GCF logs for parsing details.`;
                }
                else { // AWS
                    specificErrorMsg += ` Check AWS CSV content for instance '${instanceId}' and model '${pricingModelValue}'. Ensure column names ('${awsInstanceColumn}', '${awsModelColumn}', '${awsPriceColumn}') match your CSV headers, and that a row exists with these exact values. Also check GCF logs for parsing details.`;
                }
                console.warn(`[GCF/getPricingData] FINAL - ${specificErrorMsg}`);
                res.status(404).send({ error: specificErrorMsg });
            }
        }
        catch (error) {
            console.error(`[GCF/getPricingData] CRITICAL - Unhandled error processing CSV (gs://${configuredBucketName}/${filePath}):`, error);
            let errorMessage = `Failed to process pricing data CSV from GCS. Check GCF logs for specific error details. Underlying error: ${error.message || 'Unknown error'}`;
            let statusCode = 500;
            if (error.code === 403 || (error.errors && error.errors.some((e) => e.reason === 'forbidden'))) {
                errorMessage = `Permission denied for GCF service account when accessing GCS bucket '${configuredBucketName}' for file '${filePath}'. Ensure the GCF service account has 'Storage Object Viewer' role.`;
                statusCode = 403;
            }
            else if (error.code === 404 || (error.message && error.message.toLowerCase().includes('no such object'))) {
                errorMessage = `CSV File not found in GCS: gs://${configuredBucketName}/${filePath}. Please ensure the file path and name are correct.`;
                statusCode = 404;
            }
            else if (error.message?.includes("CSV file is missing required columns") || error.message?.includes("has no data rows or is malformed")) {
                errorMessage = error.message; // Use the specific error from parsing functions
                statusCode = 500; // Keep as 500 as it's a server-side processing/data format issue
            }
            res.status(statusCode).send({ error: errorMessage, details: error.message });
        }
    });
};
exports.getPricingData = getPricingData;
