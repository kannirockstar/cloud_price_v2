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
    const gceMachineFamilyCol = 'machinefamily';
    const gceOnDemandVcpuCol = 'ondemand_vcpu_per_hour';
    const gceOnDemandRamCol = 'ondemand_ram_per_gib_hour';
    const gce1yrCudVcpuCol = 'cud_1yr_vcpu_per_hour';
    const gce1yrCudRamCol = 'cud_1yr_ram_per_gib_hour';
    const gce3yrCudVcpuCol = 'cud_3yr_vcpu_per_hour';
    const gce3yrCudRamCol = 'cud_3yr_ram_per_gib_hour';
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
        console.warn(`[GCF/parseGceCsvForPrice] Unsupported GCE pricing model '${targetPricingModel}' for CSV parsing in ${filePath}.`);
        return null;
    }
    if (machineFamilyColIndex === -1) {
        console.error(`[GCF/parseGceCsvForPrice] CSV file ${filePath} is missing '${gceMachineFamilyCol}' column. Headers: ${headerRow.join(', ')}`);
        return null;
    }
    if (vcpuPriceColIndex === -1 || ramPriceColIndex === -1) {
        console.error(`[GCF/parseGceCsvForPrice] CSV file ${filePath} is missing required price columns for GCE model '${targetPricingModel}'. VCPU Col Idx: ${vcpuPriceColIndex}, RAM Col Idx: ${ramPriceColIndex}. Headers: ${headerRow.join(', ')}`);
        return null;
    }
    for (let i = 1; i < rows.length; i++) {
        const row = rows[i]?.trim();
        if (!row)
            continue;
        const rowValues = row.split(',');
        if (rowValues.length <= Math.max(machineFamilyColIndex, vcpuPriceColIndex, ramPriceColIndex)) {
            if (i < 5) { // Log only for first few rows to avoid excessive logging
                console.warn(`[GCF/parseGceCsvForPrice] Row ${i + 1} in ${filePath} has too few columns (${rowValues.length}) to access all required GCE indices. Max index needed: ${Math.max(machineFamilyColIndex, vcpuPriceColIndex, ramPriceColIndex)}. Row content: '${row}'`);
            }
            continue;
        }
        const csvMachineFamily = rowValues[machineFamilyColIndex]?.trim();
        if (csvMachineFamily === targetMachineFamily) {
            console.log(`[GCF/parseGceCsvForPrice] Found matching GCE machine family '${targetMachineFamily}' in ${filePath} at row ${i + 1}.`);
            const vcpuPriceStr = rowValues[vcpuPriceColIndex]?.trim();
            const ramPriceStr = rowValues[ramPriceColIndex]?.trim();
            console.log(`[GCF/parseGceCsvForPrice] Raw price strings for ${targetMachineFamily} (${targetPricingModel}): VCPU='${vcpuPriceStr}', RAM='${ramPriceStr}'`);
            const vcpuPrice = parseFloat(vcpuPriceStr);
            const ramPrice = parseFloat(ramPriceStr);
            if (isNaN(vcpuPrice))
                console.warn(`[GCF/parseGceCsvForPrice] VCPU price string '${vcpuPriceStr}' for ${targetMachineFamily} resulted in NaN.`);
            if (isNaN(ramPrice))
                console.warn(`[GCF/parseGceCsvForPrice] RAM price string '${ramPriceStr}' for ${targetMachineFamily} resulted in NaN.`);
            if (!isNaN(vcpuPrice) && !isNaN(ramPrice)) {
                const totalPrice = vcpuPrice + ramPrice;
                console.log(`[GCF/parseGceCsvForPrice] Calculated price for ${targetMachineFamily} (${targetPricingModel}): ${totalPrice}`);
                return totalPrice;
            }
            else {
                console.warn(`[GCF/parseGceCsvForPrice] Matched GCE row for ${targetMachineFamily} in ${filePath} but price components invalid. VCPU: '${vcpuPriceStr}', RAM: '${ramPriceStr}'.`);
            }
        }
    }
    console.warn(`[GCF/parseGceCsvForPrice] Price not found in GCE CSV ${filePath} for machine family ${targetMachineFamily} with pricing model ${targetPricingModel}.`);
    return null;
}
function parseAzureCsvForPrice(csvContent, targetInstanceId, targetPricingModel, filePath) {
    const rows = csvContent.split('\n');
    if (rows.length < 2) {
        console.error(`[GCF/parseAzureCsvForPrice] CSV file ${filePath} has no data rows or is malformed.`);
        return null;
    }
    const headerRow = rows[0].trim().toLowerCase().split(',');
    const azureInstanceNameCol = 'armskuname';
    const azureReservationTermCol = 'reservationterm';
    const azureMeterNameCol = 'metername';
    const azurePriceCol = 'unitprice';
    const instanceNameColIndex = headerRow.indexOf(azureInstanceNameCol);
    const reservationTermColIndex = headerRow.indexOf(azureReservationTermCol);
    const meterNameColIndex = headerRow.indexOf(azureMeterNameCol);
    const priceColIndex = headerRow.indexOf(azurePriceCol);
    if (instanceNameColIndex === -1 || reservationTermColIndex === -1 || meterNameColIndex === -1 || priceColIndex === -1) {
        console.error(`[GCF/parseAzureCsvForPrice] CSV file ${filePath} missing Azure columns. Expected: '${azureInstanceNameCol}', '${azureReservationTermCol}', '${azureMeterNameCol}', '${azurePriceCol}'. Headers: ${headerRow.join(', ')}.`);
        return null;
    }
    console.log(`[GCF/parseAzureCsvForPrice] Searching for Azure instance '${targetInstanceId}' model '${targetPricingModel}' in CSV ${filePath}.`);
    const lowerTargetPricingModel = targetPricingModel.toLowerCase();
    for (let i = 1; i < rows.length; i++) {
        const row = rows[i]?.trim();
        if (!row)
            continue;
        const rowValues = row.split(',');
        if (rowValues.length <= Math.max(instanceNameColIndex, reservationTermColIndex, meterNameColIndex, priceColIndex)) {
            if (i < 5) { // Log only for first few rows
                console.warn(`[GCF/parseAzureCsvForPrice] Row ${i + 1} in ${filePath} has too few columns (${rowValues.length}) to access all required Azure indices. Max index needed: ${Math.max(instanceNameColIndex, reservationTermColIndex, meterNameColIndex, priceColIndex)}. Row content: '${row}'`);
            }
            continue;
        }
        const csvInstanceId = rowValues[instanceNameColIndex]?.trim();
        if (csvInstanceId !== targetInstanceId)
            continue;
        const csvReservationTerm = rowValues[reservationTermColIndex]?.trim().toLowerCase() || '';
        const csvMeterName = rowValues[meterNameColIndex]?.trim().toLowerCase() || '';
        const csvPriceStr = rowValues[priceColIndex];
        const price = parseFloat(csvPriceStr);
        if (isNaN(price))
            continue;
        let modelMatch = false;
        if (lowerTargetPricingModel === 'on-demand') {
            if ((!csvReservationTerm || csvReservationTerm === 'null' || csvReservationTerm === 'na') && !csvMeterName.includes('spot'))
                modelMatch = true;
        }
        else if (lowerTargetPricingModel === 'azure-spot') {
            if ((!csvReservationTerm || csvReservationTerm === 'null' || csvReservationTerm === 'na') && csvMeterName.includes('spot'))
                modelMatch = true;
        }
        else if (lowerTargetPricingModel.includes('1yr') || lowerTargetPricingModel.includes('1 year')) {
            if (csvReservationTerm.includes('1 year') || csvReservationTerm.includes('1 yr'))
                modelMatch = true;
        }
        else if (lowerTargetPricingModel.includes('3yr') || lowerTargetPricingModel.includes('3 years')) {
            if (csvReservationTerm.includes('3 years') || csvReservationTerm.includes('3 yr'))
                modelMatch = true;
        }
        if (modelMatch) {
            console.log(`[GCF/parseAzureCsvForPrice] Found Azure price in CSV ${filePath} for ${targetInstanceId} (${targetPricingModel}): ${price}`);
            return price;
        }
    }
    console.warn(`[GCF/parseAzureCsvForPrice] Azure Price not found in CSV ${filePath} for instance ${targetInstanceId} model ${targetPricingModel}.`);
    return null;
}
function parseGenericCsvForPrice(csvContent, targetInstanceIdToLookup, originalInstanceId, targetPricingModel, // Used for logging & if modelColumnName is present
instanceColumnName, modelColumnName, // If empty, model matching is skipped (e.g., AWS On-Demand direct price column)
priceColumnName, filePath) {
    const rows = csvContent.split('\n');
    if (rows.length < 2) {
        console.error(`[GCF/parseGenericCsvForPrice] CSV file ${filePath} has no data rows or is malformed.`);
        return null;
    }
    const headerRow = rows[0].trim().toLowerCase().split(',');
    const instanceNameColIndex = headerRow.indexOf(instanceColumnName.toLowerCase());
    const hourlyPriceColIndex = headerRow.indexOf(priceColumnName.toLowerCase());
    let pricingModelColIndex = -1;
    if (modelColumnName) { // Only try to find index if a model column name is actually provided
        pricingModelColIndex = headerRow.indexOf(modelColumnName.toLowerCase());
    }
    console.log(`[GCF/parseGenericCsvForPrice] Searching for instance (lookup ID) '${targetInstanceIdToLookup}' (original ID: '${originalInstanceId}') model '${targetPricingModel}' in generic CSV ${filePath}.`);
    console.log(`[GCF/parseGenericCsvForPrice] Column indices: InstanceName=${instanceNameColIndex} ('${instanceColumnName}'), PricingModel=${modelColumnName ? pricingModelColIndex : "N/A (skipped for direct price column)"} ('${modelColumnName || "N/A"}'), HourlyPrice=${hourlyPriceColIndex} ('${priceColumnName}').`);
    console.log(`[GCF/parseGenericCsvForPrice] CSV Headers: ${headerRow.join(', ')}`);
    const missingColsMessages = [];
    if (instanceNameColIndex === -1)
        missingColsMessages.push(`Instance column '${instanceColumnName}'`);
    if (hourlyPriceColIndex === -1)
        missingColsMessages.push(`Price column '${priceColumnName}'`);
    if (modelColumnName && pricingModelColIndex === -1)
        missingColsMessages.push(`Model column '${modelColumnName}'`);
    if (missingColsMessages.length > 0) {
        console.error(`[GCF/parseGenericCsvForPrice] CSV ${filePath} missing required columns: ${missingColsMessages.join('; ')}. Actual headers: ${headerRow.join(', ')}.`);
        return null;
    }
    const normalizedTargetPricingModel = targetPricingModel.toLowerCase();
    console.log(`[GCF/parseGenericCsvForPrice] Normalized target pricing model for lookup (if used): '${normalizedTargetPricingModel}'`);
    for (let i = 1; i < rows.length; i++) {
        const rowString = rows[i]?.trim();
        if (!rowString)
            continue;
        const rowValues = rowString.split(',');
        const maxIndexNeeded = Math.max(instanceNameColIndex, hourlyPriceColIndex, (modelColumnName ? pricingModelColIndex : -1));
        if (rowValues.length <= maxIndexNeeded) {
            if (i < 5 || (rowValues[instanceNameColIndex]?.trim() || '') === targetInstanceIdToLookup) {
                console.warn(`[GCF/parseGenericCsvForPrice] Row ${i + 1} in ${filePath} has too few columns (${rowValues.length}) to access all required indices. Max index needed: ${maxIndexNeeded}. Row content: '${rowString}'`);
            }
            continue;
        }
        const csvInstanceId = rowValues[instanceNameColIndex]?.trim() || '';
        const csvHourlyPriceStr = rowValues[hourlyPriceColIndex]?.trim();
        if (i < 5 || targetInstanceIdToLookup === csvInstanceId) {
            const modelLog = modelColumnName && pricingModelColIndex !== -1 ? `Model(raw)='${rowValues[pricingModelColIndex]}', Model(norm)='${rowValues[pricingModelColIndex]?.trim().toLowerCase() || ''}'` : "Model column not used for this lookup.";
            console.log(`[GCF/parseGenericCsvForPrice] Row ${i + 1} Data: Instance='${csvInstanceId}', ${modelLog}, Price(raw)='${csvHourlyPriceStr}'`);
        }
        if (csvInstanceId === targetInstanceIdToLookup) {
            let modelConditionMet = false;
            if (!modelColumnName) { // If modelColumnName is empty, it means we don't filter by model (e.g., AWS On-Demand has a dedicated price column)
                modelConditionMet = true;
                console.log(`[GCF/parseGenericCsvForPrice] Instance '${csvInstanceId}' matched. Skipping model column check as per logic (e.g. AWS On-Demand).`);
            }
            else { // modelColumnName is provided, so we must match it
                const csvPricingModel = rowValues[pricingModelColIndex]?.trim().toLowerCase() || '';
                if (csvPricingModel === normalizedTargetPricingModel) {
                    modelConditionMet = true;
                    console.log(`[GCF/parseGenericCsvForPrice] Instance '${csvInstanceId}' and Model '${csvPricingModel}' matched.`);
                }
            }
            if (modelConditionMet) {
                console.log(`[GCF/parseGenericCsvForPrice] Matched row for ${targetInstanceIdToLookup} (model context: ${modelColumnName ? targetPricingModel : 'Direct Price Column'}). Raw price string: '${csvHourlyPriceStr}'`);
                if (csvHourlyPriceStr === undefined || csvHourlyPriceStr === null || csvHourlyPriceStr === '') {
                    console.warn(`[GCF/parseGenericCsvForPrice] Matched row for ${targetInstanceIdToLookup} (${targetPricingModel}) but hourly price string is empty/undefined in ${filePath}.`);
                    continue;
                }
                const price = parseFloat(csvHourlyPriceStr);
                if (!isNaN(price)) {
                    console.log(`[GCF/parseGenericCsvForPrice] Successfully parsed price: ${price}`);
                    return price;
                }
                else {
                    console.warn(`[GCF/parseGenericCsvForPrice] Matched row for ${targetInstanceIdToLookup} (${targetPricingModel}) but hourly price '${csvHourlyPriceStr}' is not valid number in ${filePath}.`);
                }
            }
        }
    }
    console.warn(`[GCF/parseGenericCsvForPrice] Price not found in generic CSV ${filePath} for instance (lookup ID) '${targetInstanceIdToLookup}' (original ID: '${originalInstanceId}') with pricing model context '${targetPricingModel}' (model column used: '${modelColumnName || "N/A"}'). Checked ${rows.length - 1} data rows.`);
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
            console.error('[GCF/getPricingData] CRITICAL: GCS_BUCKET_NAME env var not set.');
            res.status(500).send({ error: 'Server config error: Bucket name not set.' });
            return;
        }
        const { provider, regionId, instanceId, pricingModelValue } = req.query;
        console.log(`[GCF/getPricingData] Parsed query params - Provider: '${provider}', RegionId: '${regionId}', InstanceId: '${instanceId}', PricingModelValue: '${pricingModelValue}'`);
        if (!provider || !regionId || !instanceId || !pricingModelValue) {
            console.warn('[GCF/getPricingData] Missing one or more required query parameters.');
            res.status(400).send({ error: 'Missing required query parameters (provider, regionId, instanceId, pricingModelValue)' });
            return;
        }
        if (typeof provider !== 'string' || typeof regionId !== 'string' || typeof instanceId !== 'string' || typeof pricingModelValue !== 'string') {
            console.warn('[GCF/getPricingData] Query parameters are not all strings.');
            res.status(400).send({ error: 'All query parameters must be strings.' });
            return;
        }
        let gcsFolder = '';
        let csvFileName = '';
        let foundPrice = null;
        let filePath = '';
        try {
            if (provider === 'Google Cloud') {
                gcsFolder = 'GCE';
                csvFileName = `gce_all_models_${regionId}.csv`;
                console.log(`[GCF/getPricingData/GCE] Constructed csvFileName: '${csvFileName}' from regionId: '${regionId}'`);
                filePath = `${gcsFolder}/${csvFileName}`;
                console.log(`[GCF/getPricingData/GCE] Constructed filePath: '${filePath}'`);
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
                console.log(`[GCF/getPricingData/Azure] Constructed csvFileName: '${csvFileName}' from regionId: '${regionId}'`);
                filePath = `${gcsFolder}/${csvFileName}`;
                console.log(`[GCF/getPricingData/Azure] Constructed filePath: '${filePath}'`);
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
                csvFileName = `aws_ec2_all_pricing_${regionId}.csv`;
                console.log(`[GCF/getPricingData/AWS] Constructed csvFileName: '${csvFileName}' from regionId: '${regionId}'`);
                filePath = `${gcsFolder}/${csvFileName}`;
                console.log(`[GCF/getPricingData/AWS] Constructed filePath: '${filePath}'`);
                let awsInstanceIdToLookup = instanceId;
                if (instanceId.startsWith('aws-')) {
                    let strippedId = instanceId.substring(4); // e.g., "c5-12xlarge" from "aws-c5-12xlarge"
                    // Replace the first hyphen with a dot
                    const parts = strippedId.split('-');
                    if (parts.length > 1) {
                        awsInstanceIdToLookup = parts[0] + '.' + parts.slice(1).join('-'); // e.g., "c5.12xlarge"
                    }
                    else {
                        awsInstanceIdToLookup = strippedId; // No hyphen to replace, use as is
                    }
                }
                console.log(`[GCF/getPricingData/AWS] Original instanceId: '${instanceId}', Lookup instanceId: '${awsInstanceIdToLookup}'`);
                let awsInstanceColumn = 'instance_name';
                let awsModelColumnForLookup = 'pricing_model'; // Default for RIs, SPs
                let awsPriceColumnForLookup = 'hourly_price'; // Default for RIs, SPs
                if (pricingModelValue.toLowerCase() === 'on-demand') {
                    awsPriceColumnForLookup = 'OnDemand_Hourly'; // User specified column for AWS On-Demand
                    awsModelColumnForLookup = ''; // Signal to parseGenericCsvForPrice to skip model column matching
                    console.log(`[GCF/getPricingData/AWS] AWS On-Demand: Using direct price column '${awsPriceColumnForLookup}', skipping model column match.`);
                }
                console.log(`[GCF/getPricingData/AWS] Using columns for lookup: Instance='${awsInstanceColumn}', Model='${awsModelColumnForLookup || "N/A (direct price col)"}', Price='${awsPriceColumnForLookup}'`);
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
                foundPrice = parseGenericCsvForPrice(contentString, awsInstanceIdToLookup, instanceId, pricingModelValue, awsInstanceColumn, awsModelColumnForLookup, awsPriceColumnForLookup, filePath);
            }
            else {
                console.warn(`[GCF/getPricingData] Invalid provider received: '${provider}'`);
                res.status(400).send({ error: `Invalid provider: ${provider}` });
                return;
            }
            if (foundPrice !== null) {
                res.status(200).send({ hourlyPrice: foundPrice });
            }
            else {
                let specificErrorMsg = `Price not found for instance ${instanceId} with pricing model ${pricingModelValue} in CSV file ${filePath}.`;
                if (provider === 'Google Cloud') {
                    specificErrorMsg += ` Check GCE CSV content for matching 'MachineFamily' ('${instanceId.replace(/^gcp-/, '')}') and ensure model '${pricingModelValue}' maps to existing VCPU/RAM price columns.`;
                }
                else if (provider === 'Azure') {
                    specificErrorMsg += ` Check Azure CSV content for instance '${instanceId}', appropriate 'reservationTerm' and 'meterName' for model '${pricingModelValue}'.`;
                }
                else { // AWS
                    let lookupIdForError = instanceId;
                    if (instanceId.startsWith('aws-')) {
                        let stripped = instanceId.substring(4);
                        const parts = stripped.split('-');
                        lookupIdForError = parts.length > 1 ? parts[0] + '.' + parts.slice(1).join('-') : stripped;
                    }
                    const modelColNameToDisplay = (pricingModelValue.toLowerCase() === 'on-demand') ? "N/A (used OnDemand_Hourly)" : 'pricing_model';
                    const priceColNameToDisplay = (pricingModelValue.toLowerCase() === 'on-demand') ? 'OnDemand_Hourly' : 'hourly_price';
                    specificErrorMsg += ` Check AWS CSV content for instance (lookup ID '${lookupIdForError}') and model '${pricingModelValue}'. Ensure columns ('instance_name', '${modelColNameToDisplay}', '${priceColNameToDisplay}') match headers. For On-Demand, check for 'instance_name' and '${priceColNameToDisplay}'.`;
                }
                console.warn(`[GCF/getPricingData] FINAL - ${specificErrorMsg}`);
                res.status(404).send({ error: specificErrorMsg });
            }
        }
        catch (error) {
            const pathForError = filePath || (gcsFolder && csvFileName ? `${gcsFolder}/${csvFileName}` : 'N/A (filePath not set before error)');
            console.error(`[GCF/getPricingData] CRITICAL - Unhandled error during CSV processing. Attempted filePath (if set): 'gs://${configuredBucketName}/${pathForError}'. Query params: P='${provider}', R='${regionId}', I='${instanceId}', PM='${pricingModelValue}'. Error:`, error);
            let errorMessage = `Failed to process pricing data CSV from GCS. Check GCF logs for specific error details. Underlying error: ${error.message || 'Unknown error'}`;
            let statusCode = 500;
            if (error.code === 403 || (error.errors && error.errors.some((e) => e.reason === 'forbidden'))) {
                errorMessage = `Permission denied for GCF service account when accessing GCS bucket '${configuredBucketName}' for file '${pathForError}'. Ensure 'Storage Object Viewer' role.`;
                statusCode = 403;
            }
            else if (error.code === 404 || (error.message && error.message.toLowerCase().includes('no such object'))) {
                errorMessage = `CSV File not found in GCS: gs://${configuredBucketName}/${pathForError}. Verify path and name.`;
                statusCode = 404;
            }
            else if (error.message?.includes("CSV file is missing required columns") || error.message?.includes("has no data rows or is malformed")) {
                errorMessage = error.message;
                statusCode = 500;
            }
            else if (error.message?.includes("A file name must be specified")) {
                errorMessage = `Internal error: Cloud Function attempted to access GCS without a valid file path. This might indicate an issue with how the region or provider parameters are being processed to form the CSV file name. Last known filePath (if set): '${pathForError}'. Query params: provider='${provider}', regionId='${regionId}'.`;
                statusCode = 500;
            }
            res.status(statusCode).send({ error: errorMessage, details: error.message });
        }
    });
};
exports.getPricingData = getPricingData;
