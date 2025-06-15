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
const bucketName = process.env.GCS_BUCKET_NAME;
const getPricingData = async (req, res) => {
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
        const { provider, regionId, instanceId, pricingModelValue } = req.query;
        if (!provider || !regionId || !instanceId || !pricingModelValue) {
            res.status(400).send({ error: 'Missing required query parameters (provider, regionId, instanceId, pricingModelValue)' });
            return;
        }
        if (typeof provider !== 'string' || typeof regionId !== 'string' || typeof instanceId !== 'string' || typeof pricingModelValue !== 'string') {
            res.status(400).send({ error: 'All query parameters must be strings.' });
            return;
        }
        let gcsFolderPathSegment = '';
        if (provider === 'Google Cloud')
            gcsFolderPathSegment = 'GCE';
        else if (provider === 'Azure')
            gcsFolderPathSegment = 'azure_prices_python';
        else if (provider === 'AWS')
            gcsFolderPathSegment = 'EC2';
        else {
            res.status(400).send({ error: `Invalid provider: ${provider}` });
            return;
        }
        const filePath = `${gcsFolderPathSegment}/${regionId}/${instanceId}/${pricingModelValue}.json`;
        console.log(`[GCF/getPricingData] Attempting to download from GCS: gs://${bucketName}/${filePath}`);
        try {
            const file = storage.bucket(bucketName).file(filePath);
            const [exists] = await file.exists();
            if (!exists) {
                console.warn(`[GCF/getPricingData] File not found in GCS: gs://${bucketName}/${filePath}`);
                res.status(404).send({ error: `Pricing data not found. File: ${filePath}` });
                return;
            }
            const [content] = await file.download();
            const jsonData = JSON.parse(content.toString());
            console.log(`[GCF/getPricingData] Successfully fetched and parsed: gs://${bucketName}/${filePath}`);
            res.status(200).send(jsonData);
        }
        catch (error) {
            console.error(`[GCF/getPricingData] Error fetching file from GCS (gs://${bucketName}/${filePath}):`, error);
            let errorMessage = 'Failed to fetch pricing data from GCS.';
            let statusCode = 500;
            if (error.code === 403 || (error.errors && error.errors.some((e) => e.reason === 'forbidden'))) {
                errorMessage = `Permission denied for GCF service account when accessing GCS bucket '${bucketName}' for file '${filePath}'. Ensure the GCF service account has 'Storage Object Viewer' role.`;
                statusCode = 403;
            }
            else if (error.code === 404 || error.message.includes('No such object')) {
                errorMessage = `File not found in GCS: gs://${bucketName}/${filePath}.`;
                statusCode = 404;
            }
            else if (error.name === 'SyntaxError') {
                errorMessage = `Malformed JSON in GCS file: gs://${bucketName}/${filePath}.`;
                statusCode = 500;
            }
            res.status(statusCode).send({ error: errorMessage, details: error.message });
        }
    });
};
exports.getPricingData = getPricingData;
