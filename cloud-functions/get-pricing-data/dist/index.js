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
 * Returns an object with totalPrice, vcpuComponentPrice, and ramComponentPrice, or null.
 * vcpuCount and ramGibiBytes are for the specific instance type being requested.
 */
function parseGceCsvForPrice(csvContent, targetMachineFamilyInCsv, // e.g., "e2", "n1", "c2" - THIS IS THE BASE FAMILY
targetPricingModel, vcpuCountForInstance, // Actual vCPU count of the specific instance (e.g., e2-standard-2 has 2)
ramGibiBytesForInstance, // Actual RAM (GiB) of the specific instance (e.g., e2-standard-2 has 8)
filePath) {
    const rows = csvContent.split('\n');
    if (rows.length < 2) {
        console.error(`[GCF/parseGceCsvForPrice] CSV file ${filePath} has no data rows or is malformed.`);
        return null;
    }
    const headerRow = rows[0].trim().split(',');
    // Exact case-sensitive GCE column names for PER-UNIT costs
    const gceMachineFamilyCol = 'MachineFamily'; // This column should contain base families like "e2", "n1"
    const gceOnDemandVcpuCol = 'OnDemand_VCPU_per_Hour';
    const gceOnDemandRamCol = 'OnDemand_RAM_per_GiB_Hour';
    const gce1yrCudVcpuCol = 'CUD_1yr_VCPU_per_Hour';
    const gce1yrCudRamCol = 'CUD_1yr_RAM_per_GiB_Hour';
    const gce3yrCudVcpuCol = 'CUD_3yr_VCPU_per_Hour';
    const gce3yrCudRamCol = 'CUD_3yr_RAM_per_GiB_Hour';
    const gceFlex1yrCudVcpuCol = 'CUD_Flex_1yr_VCPU_per_Hour';
    const gceFlex1yrCudRamCol = 'CUD_Flex_1yr_RAM_per_GiB_Hour';
    const gceFlex3yrCudVcpuCol = 'CUD_Flex_3yr_VCPU_per_Hour';
    const gceFlex3yrCudRamCol = 'CUD_Flex_3yr_RAM_per_GiB_Hour';
    const machineFamilyColIndex = headerRow.indexOf(gceMachineFamilyCol);
    let perUnitVcpuPriceColIndex = -1;
    let perUnitRamPriceColIndex = -1;
    const lowerTargetPricingModel = targetPricingModel.toLowerCase();
    if (lowerTargetPricingModel === 'on-demand') {
        perUnitVcpuPriceColIndex = headerRow.indexOf(gceOnDemandVcpuCol);
        perUnitRamPriceColIndex = headerRow.indexOf(gceOnDemandRamCol);
    }
    else if (lowerTargetPricingModel === 'gcp-1yr-cud') {
        perUnitVcpuPriceColIndex = headerRow.indexOf(gce1yrCudVcpuCol);
        perUnitRamPriceColIndex = headerRow.indexOf(gce1yrCudRamCol);
    }
    else if (lowerTargetPricingModel === 'gcp-3yr-cud') {
        perUnitVcpuPriceColIndex = headerRow.indexOf(gce3yrCudVcpuCol);
        perUnitRamPriceColIndex = headerRow.indexOf(gce3yrCudRamCol);
    }
    else if (lowerTargetPricingModel === 'gcp-1yr-flex-cud') {
        perUnitVcpuPriceColIndex = headerRow.indexOf(gceFlex1yrCudVcpuCol);
        perUnitRamPriceColIndex = headerRow.indexOf(gceFlex1yrCudRamCol);
    }
    else if (lowerTargetPricingModel === 'gcp-3yr-flex-cud') {
        perUnitVcpuPriceColIndex = headerRow.indexOf(gceFlex3yrCudVcpuCol);
        perUnitRamPriceColIndex = headerRow.indexOf(gceFlex3yrCudRamCol);
    }
    else {
        console.warn(`[GCF/parseGceCsvForPrice] Unsupported GCE pricing model '${targetPricingModel}' for CSV parsing in ${filePath}.`);
        return null;
    }
    console.log(`[GCF/parseGceCsvForPrice] Header indices for GCE CSV ${filePath} (case-sensitive): MachineFamily=${headerRow.indexOf(gceMachineFamilyCol)}, OnDemandVCPU=${headerRow.indexOf(gceOnDemandVcpuCol)}, OnDemandRAM=${headerRow.indexOf(gceOnDemandRamCol)}, 1yrCUDVCPU=${headerRow.indexOf(gce1yrCudVcpuCol)}, 1yrCUDRAM=${headerRow.indexOf(gce1yrCudRamCol)}, 3yrCUDVCPU=${headerRow.indexOf(gce3yrCudVcpuCol)}, 3yrCUDRAM=${headerRow.indexOf(gce3yrCudRamCol)}, Flex1yrVCPU=${headerRow.indexOf(gceFlex1yrCudVcpuCol)}, Flex1yrRAM=${headerRow.indexOf(gceFlex1yrCudRamCol)}, Flex3yrVCPU=${headerRow.indexOf(gceFlex3yrCudVcpuCol)}, Flex3yrRAM=${headerRow.indexOf(gceFlex3yrCudRamCol)}`);
    console.log(`[GCF/parseGceCsvForPrice] For model '${targetPricingModel}', using VCPU Col Idx: ${perUnitVcpuPriceColIndex}, RAM Col Idx: ${perUnitRamPriceColIndex}. Requested Instance: vCPUs=${vcpuCountForInstance}, RAM=${ramGibiBytesForInstance}GiB. Target CSV MachineFamily for lookup: '${targetMachineFamilyInCsv}'.`);
    if (machineFamilyColIndex === -1) {
        console.error(`[GCF/parseGceCsvForPrice] CSV file ${filePath} is missing '${gceMachineFamilyCol}' column (case-sensitive). Headers: ${headerRow.join(', ')}`);
        return null;
    }
    if (perUnitVcpuPriceColIndex === -1 || perUnitRamPriceColIndex === -1) {
        console.error(`[GCF/parseGceCsvForPrice] CSV file ${filePath} is missing required per-unit price columns for GCE model '${targetPricingModel}' (case-sensitive). VCPU Col Idx: ${perUnitVcpuPriceColIndex}, RAM Col Idx: ${perUnitRamPriceColIndex}. Headers: ${headerRow.join(', ')}`);
        return null;
    }
    for (let i = 1; i < rows.length; i++) {
        const row = rows[i]?.trim();
        if (!row)
            continue;
        const rowValues = row.split(',');
        if (rowValues.length <= Math.max(machineFamilyColIndex, perUnitVcpuPriceColIndex, perUnitRamPriceColIndex)) {
            if (i < 5) {
                console.warn(`[GCF/parseGceCsvForPrice] Row ${i + 1} in ${filePath} has too few columns (${rowValues.length}) to access all required GCE indices. Max index needed: ${Math.max(machineFamilyColIndex, perUnitVcpuPriceColIndex, perUnitRamPriceColIndex)}. Row content: '${row}'`);
            }
            continue;
        }
        const csvMachineFamily = rowValues[machineFamilyColIndex]?.trim();
        // Match the base family name (e.g., "e2", "n1") from CSV against targetMachineFamilyInCsv
        if (csvMachineFamily === targetMachineFamilyInCsv) {
            console.log(`[GCF/parseGceCsvForPrice] Found matching GCE base machine family in CSV '${targetMachineFamilyInCsv}' in ${filePath} at row ${i + 1}.`);
            const perUnitVcpuPriceStr = rowValues[perUnitVcpuPriceColIndex]?.trim();
            const perUnitRamPriceStr = rowValues[perUnitRamPriceColIndex]?.trim();
            console.log(`[GCF/parseGceCsvForPrice] Raw PER-UNIT price strings for base family ${targetMachineFamilyInCsv} (${targetPricingModel}): VCPU='${perUnitVcpuPriceStr}', RAM='${perUnitRamPriceStr}' from columns at VCPU_idx=${perUnitVcpuPriceColIndex}, RAM_idx=${perUnitRamPriceColIndex}`);
            const perUnitVcpuCost = parseFloat(perUnitVcpuPriceStr);
            const perUnitRamCost = parseFloat(perUnitRamPriceStr);
            if (isNaN(perUnitVcpuCost))
                console.warn(`[GCF/parseGceCsvForPrice] PER-UNIT VCPU price string '${perUnitVcpuPriceStr}' for base family ${targetMachineFamilyInCsv} resulted in NaN.`);
            if (isNaN(perUnitRamCost))
                console.warn(`[GCF/parseGceCsvForPrice] PER-UNIT RAM price string '${perUnitRamPriceStr}' for base family ${targetMachineFamilyInCsv} resulted in NaN.`);
            if (!isNaN(perUnitVcpuCost) && !isNaN(perUnitRamCost)) {
                const vcpuComponentPrice = perUnitVcpuCost * vcpuCountForInstance;
                const ramComponentPrice = perUnitRamCost * ramGibiBytesForInstance;
                const totalPrice = vcpuComponentPrice + ramComponentPrice;
                console.log(`[GCF/parseGceCsvForPrice] Calculated prices for specific instance (using ${vcpuCountForInstance} vCPU, ${ramGibiBytesForInstance} GiB RAM) based on CSV base family ${targetMachineFamilyInCsv} (${targetPricingModel}): Total Hourly=${totalPrice}, Total vCPU Component=${vcpuComponentPrice}, Total RAM Component=${ramComponentPrice}`);
                return { totalPrice, vcpuComponentPrice, ramComponentPrice };
            }
            else {
                console.warn(`[GCF/parseGceCsvForPrice] Matched GCE row for base family ${targetMachineFamilyInCsv} in ${filePath} but per-unit price components invalid. VCPU: '${perUnitVcpuPriceStr}', RAM: '${perUnitRamPriceStr}'.`);
            }
        }
    }
    console.warn(`[GCF/parseGceCsvForPrice] Price not found in GCE CSV ${filePath} for base machine family ${targetMachineFamilyInCsv} with pricing model ${targetPricingModel}.`);
    return null;
}
function parseAzureCsvForPrice(csvContent, targetInstanceId, targetPricingModel, filePath) {
    const rows = csvContent.split('\n');
    if (rows.length < 2) {
        console.error(`[GCF/parseAzureCsvForPrice] CSV file ${filePath} has no data rows or is malformed.`);
        return null;
    }
    const headerRow = rows[0].trim().split(','); // Case-sensitive for Azure
    const azureInstanceNameCol = 'ArmSkuName';
    const azureReservationTermCol = 'ReservationTerm';
    const azureMeterNameCol = 'MeterName';
    const azurePriceCol = 'UnitPrice';
    const instanceNameColIndex = headerRow.indexOf(azureInstanceNameCol);
    const reservationTermColIndex = headerRow.indexOf(azureReservationTermCol);
    const meterNameColIndex = headerRow.indexOf(azureMeterNameCol);
    const priceColIndex = headerRow.indexOf(azurePriceCol);
    if (instanceNameColIndex === -1 || reservationTermColIndex === -1 || meterNameColIndex === -1 || priceColIndex === -1) {
        console.error(`[GCF/parseAzureCsvForPrice] CSV file ${filePath} missing Azure columns (case-sensitive). Expected: '${azureInstanceNameCol}', '${azureReservationTermCol}', '${azureMeterNameCol}', '${azurePriceCol}'. Found Headers: ${headerRow.join(', ')}.`);
        return null;
    }
    console.log(`[GCF/parseAzureCsvForPrice] Searching for Azure instance '${targetInstanceId}' model '${targetPricingModel}' in CSV ${filePath}. Headers: ${headerRow.join(', ')}`);
    const lowerTargetPricingModel = targetPricingModel.toLowerCase();
    for (let i = 1; i < rows.length; i++) {
        const row = rows[i]?.trim();
        if (!row)
            continue;
        const rowValues = row.split(',');
        if (rowValues.length <= Math.max(instanceNameColIndex, reservationTermColIndex, meterNameColIndex, priceColIndex)) {
            if (i < 5) {
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
function parseGenericCsvForPrice(csvContent, targetInstanceIdToLookup, originalInstanceId, targetPricingModelContext, instanceColumnName, // Exact case from caller
modelColumnName, // Exact case from caller, or empty
priceColumnName, // Exact case from caller
filePath) {
    const rows = csvContent.split('\n');
    if (rows.length < 2) {
        console.error(`[GCF/parseGenericCsvForPrice] CSV file ${filePath} has no data rows or is malformed.`);
        return null;
    }
    const headerRow = rows[0].trim().split(','); // Keep original case for header matching
    console.log(`[GCF/parseGenericCsvForPrice] CSV Headers (case-sensitive): ${headerRow.join(', ')}`);
    const instanceNameColIndex = headerRow.indexOf(instanceColumnName);
    const hourlyPriceColIndex = headerRow.indexOf(priceColumnName);
    let pricingModelColIndex = -1;
    if (modelColumnName) {
        pricingModelColIndex = headerRow.indexOf(modelColumnName);
    }
    console.log(`[GCF/parseGenericCsvForPrice] Searching for instance (lookup ID) '${targetInstanceIdToLookup}' (original ID: '${originalInstanceId}') with pricing model context '${targetPricingModelContext}' in generic CSV ${filePath}.`);
    console.log(`[GCF/parseGenericCsvForPrice] Column indices (case-sensitive lookup): InstanceName=${instanceNameColIndex} (using '${instanceColumnName}'), PricingModel=${modelColumnName ? pricingModelColIndex : "N/A (direct price column)"} (using '${modelColumnName || "N/A"}'), HourlyPrice=${hourlyPriceColIndex} (using '${priceColumnName}').`);
    const missingColsMessages = [];
    if (instanceNameColIndex === -1)
        missingColsMessages.push(`Instance column '${instanceColumnName}'`);
    if (hourlyPriceColIndex === -1)
        missingColsMessages.push(`Price column '${priceColumnName}'`);
    if (modelColumnName && pricingModelColIndex === -1)
        missingColsMessages.push(`Model column '${modelColumnName}'`);
    if (missingColsMessages.length > 0) {
        console.error(`[GCF/parseGenericCsvForPrice] CSV ${filePath} missing required columns (case-sensitive check): ${missingColsMessages.join('; ')}. Actual headers found: ${headerRow.join(', ')}.`);
        return null;
    }
    const normalizedTargetPricingModelForValueComparison = modelColumnName ? targetPricingModelContext.toLowerCase() : '';
    if (modelColumnName) {
        console.log(`[GCF/parseGenericCsvForPrice] Normalized target pricing model for value comparison (if model column '${modelColumnName}' used): '${normalizedTargetPricingModelForValueComparison}'`);
    }
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
            const modelInRowRaw = modelColumnName && pricingModelColIndex !== -1 ? rowValues[pricingModelColIndex] : "N/A (model column not used)";
            const modelInRowNormalized = modelColumnName && pricingModelColIndex !== -1 ? (rowValues[pricingModelColIndex]?.trim().toLowerCase() || '') : "N/A (model column not used)";
            console.log(`[GCF/parseGenericCsvForPrice] Row ${i + 1} Data: Instance='${csvInstanceId}', ModelInCSV(raw)='${modelInRowRaw}', ModelInCSV(norm)='${modelInRowNormalized}', PriceInCSV(raw)='${csvHourlyPriceStr}'`);
        }
        if (csvInstanceId === targetInstanceIdToLookup) {
            let modelConditionMet = false;
            if (!modelColumnName) {
                modelConditionMet = true;
                console.log(`[GCF/parseGenericCsvForPrice] Instance '${csvInstanceId}' matched. No model column ('${modelColumnName}') was specified for filtering. Using price from column '${priceColumnName}'.`);
            }
            else {
                const csvPricingModelValue = rowValues[pricingModelColIndex]?.trim().toLowerCase() || '';
                if (csvPricingModelValue === normalizedTargetPricingModelForValueComparison) {
                    modelConditionMet = true;
                    console.log(`[GCF/parseGenericCsvForPrice] Instance '${csvInstanceId}' and Model '${csvPricingModelValue}' (from column '${modelColumnName}') matched target '${normalizedTargetPricingModelForValueComparison}'. Using price from column '${priceColumnName}'.`);
                }
            }
            if (modelConditionMet) {
                console.log(`[GCF/parseGenericCsvForPrice] Matched row for ${targetInstanceIdToLookup} (pricing model context from request: '${targetPricingModelContext}'). Raw price string from CSV column '${priceColumnName}': '${csvHourlyPriceStr}'`);
                if (csvHourlyPriceStr === undefined || csvHourlyPriceStr === null || csvHourlyPriceStr === '') {
                    console.warn(`[GCF/parseGenericCsvForPrice] Matched row for ${targetInstanceIdToLookup} (context: ${targetPricingModelContext}) but hourly price string is empty/undefined in ${filePath} from column '${priceColumnName}'.`);
                    continue;
                }
                const price = parseFloat(csvHourlyPriceStr);
                if (!isNaN(price)) {
                    console.log(`[GCF/parseGenericCsvForPrice] Successfully parsed price: ${price}`);
                    return price;
                }
                else {
                    console.warn(`[GCF/parseGenericCsvForPrice] Matched row for ${targetInstanceIdToLookup} (context: ${targetPricingModelContext}) but hourly price '${csvHourlyPriceStr}' from column '${priceColumnName}' is not valid number in ${filePath}.`);
                }
            }
        }
    }
    console.warn(`[GCF/parseGenericCsvForPrice] Price not found in generic CSV ${filePath} for instance (lookup ID) '${targetInstanceIdToLookup}' (original ID: '${originalInstanceId}') with pricing model context '${targetPricingModelContext}' (model column used: '${modelColumnName || "N/A (direct price column lookup)"}', price column checked: '${priceColumnName}'). Checked ${rows.length - 1} data rows.`);
    return null;
}
const getPricingData = async (req, res) => {
    console.log(`[GCF/getPricingData] Function invoked. Configured GCS_BUCKET_NAME: ${configuredBucketName || 'NOT SET'}`);
    let awsPriceColumnForLookup = '';
    let awsModelColumnForLookup = '';
    let awsInstanceColumn = '';
    let filePath = '';
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
        const { provider, regionId, instanceId, pricingModelValue, vcpuCount, ramGibiBytes, gceBaseFamilyForCsv } = req.query;
        console.log(`[GCF/getPricingData] Parsed query params - Provider: '${provider}', RegionId: '${regionId}', InstanceId: '${instanceId}', PricingModelValue: '${pricingModelValue}', VCPUCount: '${vcpuCount}', RamGibiBytes: '${ramGibiBytes}', GCEBaseFamilyForCsv: '${gceBaseFamilyForCsv}'`);
        if (!provider || !regionId || !instanceId || !pricingModelValue) {
            console.warn('[GCF/getPricingData] Missing one or more required query parameters (provider, regionId, instanceId, pricingModelValue).');
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
        let gcePriceDetails = null;
        let awsInstanceIdToLookup = instanceId;
        try {
            if (provider === 'Google Cloud') {
                const numVcpuCount = vcpuCount ? parseFloat(vcpuCount) : undefined;
                const numRamGibiBytes = ramGibiBytes ? parseFloat(ramGibiBytes) : undefined;
                if (numVcpuCount === undefined || isNaN(numVcpuCount) || numRamGibiBytes === undefined || isNaN(numRamGibiBytes)) {
                    console.warn(`[GCF/getPricingData/GCE] Missing or invalid vcpuCount ('${vcpuCount}') or ramGibiBytes ('${ramGibiBytes}') for GCE price calculation for instance ${instanceId}.`);
                    res.status(400).send({ error: 'Missing or invalid vcpuCount or ramGibiBytes for GCE pricing.' });
                    return;
                }
                if (!gceBaseFamilyForCsv) {
                    console.warn(`[GCF/getPricingData/GCE] Missing gceBaseFamilyForCsv for GCE instance ${instanceId}. This is required for CSV lookup.`);
                    res.status(400).send({ error: 'Missing gceBaseFamilyForCsv for GCE pricing.' });
                    return;
                }
                gcsFolder = 'GCE';
                csvFileName = `gce_all_models_${regionId}.csv`;
                filePath = `${gcsFolder}/${csvFileName}`;
                const gceMachineFamilyToLookupInCsv = gceBaseFamilyForCsv; // Use the base family passed from client
                console.log(`[GCF/getPricingData/GCE] Attempting GCE CSV download: gs://${configuredBucketName}/${filePath}. Will lookup base family '${gceMachineFamilyToLookupInCsv}' for specific instance ${instanceId}.`);
                const gceFile = storage.bucket(configuredBucketName).file(filePath);
                const [exists] = await gceFile.exists();
                if (!exists) {
                    console.warn(`[GCF/getPricingData/GCE] CSV File not found: gs://${configuredBucketName}/${filePath}`);
                    res.status(404).send({ error: `Pricing data CSV not found. File: ${filePath}` });
                    return;
                }
                const [contentBuffer] = await gceFile.download();
                const contentString = contentBuffer.toString();
                gcePriceDetails = parseGceCsvForPrice(contentString, gceMachineFamilyToLookupInCsv, pricingModelValue, numVcpuCount, numRamGibiBytes, filePath);
                if (gcePriceDetails) {
                    foundPrice = gcePriceDetails.totalPrice;
                }
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
                csvFileName = `aws_ec2_all_pricing_${regionId}.csv`;
                filePath = `${gcsFolder}/${csvFileName}`;
                awsInstanceColumn = 'InstanceType'; // Case-sensitive for AWS instance identifier
                if (instanceId.startsWith('aws-')) { // Keep transformation logic for lookup ID if needed
                    let strippedId = instanceId.substring(4);
                    const firstHyphenIndex = strippedId.indexOf('-');
                    if (firstHyphenIndex !== -1) {
                        awsInstanceIdToLookup = strippedId.substring(0, firstHyphenIndex) + '.' + strippedId.substring(firstHyphenIndex + 1);
                    }
                    else {
                        awsInstanceIdToLookup = strippedId;
                    }
                }
                else {
                    awsInstanceIdToLookup = instanceId;
                }
                console.log(`[GCF/getPricingData/AWS] Original instanceId: '${instanceId}', Transformed lookup: '${awsInstanceIdToLookup}' using column '${awsInstanceColumn}'`);
                const lowerPricingModelValue = pricingModelValue.toLowerCase();
                awsModelColumnForLookup = ''; // AWS direct price columns don't need a model column filter
                if (lowerPricingModelValue === 'on-demand') {
                    awsPriceColumnForLookup = 'OnDemand_Hourly';
                }
                else if (lowerPricingModelValue === 'spot-hourly') {
                    awsPriceColumnForLookup = 'Spot_Hourly';
                }
                else if (lowerPricingModelValue === 'aws-ri-1yr-noupfront') {
                    awsPriceColumnForLookup = 'RI_1yr_NoUpfront';
                }
                else if (lowerPricingModelValue === 'aws-ri-3yr-noupfront') {
                    awsPriceColumnForLookup = 'RI_3yr_NoUpfront';
                }
                else if (lowerPricingModelValue === 'aws-ri-1yr-partialupfront') {
                    awsPriceColumnForLookup = 'RI_1yr_PartialUpfront';
                }
                else if (lowerPricingModelValue === 'aws-ri-3yr-partialupfront') {
                    awsPriceColumnForLookup = 'RI_3yr_PartialUpfront';
                }
                else if (lowerPricingModelValue === 'aws-ri-1yr-allupfront') {
                    awsPriceColumnForLookup = 'RI_1yr_AllUpfront';
                }
                else if (lowerPricingModelValue === 'aws-ri-3yr-allupfront') {
                    awsPriceColumnForLookup = 'RI_3yr_AllUpfront';
                }
                else {
                    console.warn(`[GCF/getPricingData/AWS] Unknown AWS pricing model '${pricingModelValue}'. Attempting fallback to 'OnDemand_Hourly'.`);
                    awsPriceColumnForLookup = 'OnDemand_Hourly';
                }
                console.log(`[GCF/getPricingData/AWS] For model '${pricingModelValue}': Price column='${awsPriceColumnForLookup}'.`);
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
                if (provider === 'Google Cloud' && gcePriceDetails) {
                    res.status(200).send({
                        hourlyPrice: gcePriceDetails.totalPrice,
                        vcpuHourlyPrice: gcePriceDetails.vcpuComponentPrice,
                        ramHourlyPrice: gcePriceDetails.ramComponentPrice
                    });
                }
                else {
                    res.status(200).send({ hourlyPrice: foundPrice });
                }
            }
            else {
                let specificErrorMsg = `Price not found for instance ${instanceId} (lookup ID for AWS: ${provider === 'AWS' ? awsInstanceIdToLookup : instanceId}) with pricing model ${pricingModelValue} in CSV file ${filePath}.`;
                if (provider === 'Google Cloud') {
                    const gceBaseFamilyForError = gceBaseFamilyForCsv || "N/A";
                    specificErrorMsg += ` Check GCE CSV content for matching '${gceBaseFamilyForError}' (MachineFamily column) and ensure model '${pricingModelValue}' maps to existing VCPU/RAM price columns (case-sensitive: e.g., OnDemand_VCPU_per_Hour, CUD_Flex_1yr_VCPU_per_Hour). Also ensure vcpuCount ('${vcpuCount}') and ramGibiBytes ('${ramGibiBytes}') were provided and correct for instance ${instanceId}.`;
                }
                else if (provider === 'Azure') {
                    specificErrorMsg += ` Check Azure CSV content for instance '${instanceId}', appropriate 'ReservationTerm' and 'MeterName' for model '${pricingModelValue}'. Column headers are case-sensitive (e.g., ArmSkuName).`;
                }
                else if (provider === 'AWS') {
                    const priceColForErrorMsg = awsPriceColumnForLookup || "N/A";
                    const instanceColForErrorMsg = awsInstanceColumn || "N/A";
                    specificErrorMsg += ` Check AWS CSV content for instance (lookup ID '${awsInstanceIdToLookup}') using instance column '${instanceColForErrorMsg}'. Price was looked for in column '${priceColForErrorMsg}'. Column headers are case-sensitive.`;
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
            if (provider === 'AWS') {
                const priceColForCatch = awsPriceColumnForLookup || "N/A";
                const modelColForCatch = awsModelColumnForLookup || "N/A (direct price column lookup)";
                const instanceColForCatch = awsInstanceColumn || "N/A";
                errorMessage += ` AWS lookup details: Instance Column='${instanceColForCatch}', Price Column='${priceColForCatch}', Model Column='${modelColForCatch}'.`;
            }
            res.status(statusCode).send({ error: errorMessage, details: error.message });
        }
    });
};
exports.getPricingData = getPricingData;
