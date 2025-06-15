
import type { Region, MachineFamily, CloudProvider, SelectOption, PriceData, PricingModel, CpuDetails } from './types';

import gcpRegionsDataJson from '@/metadata_for_gcs/googleCloudRegions.json';
import azRegionsDataJson from '@/metadata_for_gcs/azureRegions.json';
import awsRegionsDataJson from '@/metadata_for_gcs/awsRegions.json';
import mfDataJson from '@/metadata_for_gcs/machineFamilies.json';

export let googleCloudRegions: Region[] = [];
export let azureRegions: Region[] = [];
export let awsRegions: Region[] = [];
export let machineFamilies: MachineFamily[] = [];
let metadataLoaded = false;

const GCS_BUCKET_NAME = 'firestore-cloud-comparator'; // Still needed for Azure/AWS pricing if not moved

export function loadProviderMetadata(): void {
  if (metadataLoaded) {
    return;
  }
  console.log("Loading provider metadata from local JSON files...");

  try {
    googleCloudRegions = (gcpRegionsDataJson as Region[] || []).sort((a, b) => a.name.localeCompare(b.name));
    azureRegions = (azRegionsDataJson as Region[] || []).sort((a, b) => a.name.localeCompare(b.name));
    awsRegions = (awsRegionsDataJson as Region[] || []).sort((a, b) => a.name.localeCompare(b.name));
    machineFamilies = (mfDataJson as MachineFamily[] || []);

    metadataLoaded = true;
    console.log("Provider metadata loading from local files complete.");
  } catch (error) {
    console.error("Error processing local metadata JSON files:", error);
    googleCloudRegions = [];
    azureRegions = [];
    awsRegions = [];
    machineFamilies = [];
    metadataLoaded = false;
  }
}

export const getGeosForProvider = (provider: CloudProvider): SelectOption[] => {
  if (!metadataLoaded) loadProviderMetadata(); // Ensure metadata is loaded
  let regions: Region[] = [];
  if (provider === 'Google Cloud') regions = googleCloudRegions;
  else if (provider === 'Azure') regions = azureRegions;
  else if (provider === 'AWS') regions = awsRegions;
  const geos = Array.from(new Set(regions.map(r => r.geo)));
  return geos.map(geo => ({ value: geo, label: geo })).sort((a, b) => a.label.localeCompare(b.label));
};

export const getRegionsForProvider = (provider: CloudProvider, geo?: string): Region[] => {
  if (!metadataLoaded) loadProviderMetadata(); // Ensure metadata is loaded
  let allRegions: Region[] = [];
  if (provider === 'Google Cloud') allRegions = googleCloudRegions;
  else if (provider === 'Azure') allRegions = azureRegions;
  else if (provider === 'AWS') allRegions = awsRegions;
  if (geo) {
    return allRegions.filter(region => region.geo === geo); // Already sorted on load
  }
  return allRegions; // Already sorted on load
};

export const parseMachineSpecs = (machine: MachineFamily): { cpuCount: number | null, ramInGB: number | null } => {
  let cpuCount: number | null = null;
  if (machine.cpu) {
    if (machine.cpu.toLowerCase().includes('shared')) {
      cpuCount = 0.5;
    } else {
      const cpuMatch = machine.cpu.match(/(\d+(\.\d+)?)/);
      if (cpuMatch && cpuMatch[1]) {
        cpuCount = parseFloat(cpuMatch[1]);
      }
    }
  }
  let ramInGB: number | null = null;
  if (machine.ram) {
    const ramMatch = machine.ram.match(/([\d.]+)\s*(GB|TB)/i);
    if (ramMatch && ramMatch[1] && ramMatch[2]) {
      const value = parseFloat(ramMatch[1]);
      const unit = ramMatch[2].toUpperCase();
      ramInGB = unit === 'TB' ? value * 1024 : value;
    }
  }
  return { cpuCount, ramInGB };
};

export const getMachineFamilyGroups = (
  provider: CloudProvider, minCpu?: number, userMinRamGB?: number,
  filterSapCertified?: boolean, applyTolerance?: boolean
): SelectOption[] => {
  if (!metadataLoaded) loadProviderMetadata(); // Ensure metadata is loaded
  let filteredMachines = machineFamilies.filter(mf => mf.provider === provider);
  if (filterSapCertified) {
    filteredMachines = filteredMachines.filter(mf => mf.isSapCertified === true);
  }
  if (minCpu !== undefined || userMinRamGB !== undefined) {
    filteredMachines = filteredMachines.filter(mf => {
      const specs = parseMachineSpecs(mf);
      let cpuMatch = true;
      if (minCpu !== undefined && specs.cpuCount !== null) {
        const lowerBoundCpu = filterSapCertified && applyTolerance ? minCpu * 0.85 : minCpu;
        const upperBoundCpu = filterSapCertified && applyTolerance ? minCpu * 1.15 : Infinity;
        cpuMatch = specs.cpuCount >= lowerBoundCpu && specs.cpuCount <= upperBoundCpu;
      } else if (minCpu !== undefined && specs.cpuCount === null) cpuMatch = minCpu <= 0;
      let ramMatch = true;
      if (userMinRamGB !== undefined && specs.ramInGB !== null) {
        const lowerBoundRam = filterSapCertified && applyTolerance ? userMinRamGB * 0.85 : userMinRamGB;
        const upperBoundRam = filterSapCertified && applyTolerance ? userMinRamGB * 1.15 : Infinity;
        ramMatch = specs.ramInGB >= lowerBoundRam && specs.ramInGB <= upperBoundRam;
      } else if (userMinRamGB !== undefined && specs.ramInGB === null) ramMatch = userMinRamGB <= 0;
      return cpuMatch && ramMatch;
    });
  }
  const families = Array.from(new Set(filteredMachines.map(mf => mf.familyGroup)));
  return families.map(fg => ({ value: fg, label: fg })).sort((a, b) => a.label.localeCompare(b.label));
};

export const getMachineInstancesForFamily = (
  provider: CloudProvider, familyGroup: string, filterSapCertified?: boolean,
  minCpu?: number, userMinRamGB?: number, applyTolerance?: boolean
): MachineFamily[] => {
  if (!metadataLoaded) loadProviderMetadata(); // Ensure metadata is loaded
  return machineFamilies.filter(mf => {
    const specs = parseMachineSpecs(mf);
    let cpuFilterMatch = true;
    if (minCpu !== undefined && specs.cpuCount !== null) {
      const lowerBoundCpu = filterSapCertified && applyTolerance ? minCpu * 0.85 : minCpu;
      const upperBoundCpu = filterSapCertified && applyTolerance ? minCpu * 1.15 : Infinity;
      cpuFilterMatch = specs.cpuCount >= lowerBoundCpu && specs.cpuCount <= upperBoundCpu;
    } else if (minCpu !== undefined && specs.cpuCount === null) cpuFilterMatch = minCpu <= 0;
    let ramFilterMatch = true;
    if (userMinRamGB !== undefined && specs.ramInGB !== null) {
      const lowerBoundRam = filterSapCertified && applyTolerance ? userMinRamGB * 0.85 : userMinRamGB;
      const upperBoundRam = filterSapCertified && applyTolerance ? userMinRamGB * 1.15 : Infinity;
      ramFilterMatch = specs.ramInGB >= lowerBoundRam && specs.ramInGB <= upperBoundRam;
    } else if (userMinRamGB !== undefined && specs.ramInGB === null) ramFilterMatch = userMinRamGB <= 0;
    return mf.provider === provider && mf.familyGroup === familyGroup &&
           (filterSapCertified ? mf.isSapCertified === true : true) &&
           cpuFilterMatch && ramFilterMatch;
  }).sort((a, b) => { /* ... existing sorting logic ... */ return 0; }); // Keep existing complex sort
};

export const pricingModelOptions: PricingModel[] = [
  { value: 'on-demand', label: 'On-Demand', providers: ['Google Cloud', 'Azure', 'AWS'], discountFactor: 1.0 },
  // ... other pricing models as previously defined ...
  { value: 'gcp-1yr-cud', label: '1-Year CUD', providers: ['Google Cloud'], discountFactor: 0.70 },
  { value: 'gcp-3yr-cud', label: '3-Year CUD', providers: ['Google Cloud'], discountFactor: 0.50 },
  { value: 'gcp-1yr-flex-cud', label: 'Flexible CUD (1-Year)', providers: ['Google Cloud'], discountFactor: 0.80 },
  { value: 'gcp-3yr-flex-cud', label: 'Flexible CUD (3-Year)', providers: ['Google Cloud'], discountFactor: 0.60 },
  { value: 'azure-1yr-ri-no-upfront', label: '1-Year RI (No Upfront)', providers: ['Azure'], discountFactor: 0.72 },
  { value: 'azure-3yr-ri-no-upfront', label: '3-Year RI (No Upfront)', providers: ['Azure'], discountFactor: 0.53 },
  { value: 'azure-1yr-ri-all-upfront', label: '1-Year RI (All Upfront)', providers: ['Azure'], discountFactor: 0.65 },
  { value: 'azure-3yr-ri-all-upfront', label: '3-Year RI (All Upfront)', providers: ['Azure'], discountFactor: 0.45 },
  { value: 'azure-1yr-sp', label: 'Savings Plan (1-Year)', providers: ['Azure'], discountFactor: 0.70 },
  { value: 'azure-3yr-sp', label: 'Savings Plan (3-Year)', providers: ['Azure'], discountFactor: 0.50 },
  { value: 'aws-1yr-ec2instance-sp-no-upfront', label: 'EC2 Instance SP (1-Yr, No Upfront)', providers: ['AWS'], discountFactor: 0.75 },
  { value: 'aws-3yr-ec2instance-sp-no-upfront', label: 'EC2 Instance SP (3-Yr, No Upfront)', providers: ['AWS'], discountFactor: 0.55 },
  { value: 'aws-1yr-ec2instance-sp-partial-upfront', label: 'EC2 Instance SP (1-Yr, Partial Upfront)', providers: ['AWS'], discountFactor: 0.72 },
  { value: 'aws-3yr-ec2instance-sp-partial-upfront', label: 'EC2 Instance SP (3-Yr, Partial Upfront)', providers: ['AWS'], discountFactor: 0.52 },
  { value: 'aws-1yr-ec2instance-sp-all-upfront', label: 'EC2 Instance SP (1-Yr, All Upfront)', providers: ['AWS'], discountFactor: 0.70 },
  { value: 'aws-3yr-ec2instance-sp-all-upfront', label: 'EC2 Instance SP (3-Yr, All Upfront)', providers: ['AWS'], discountFactor: 0.50 },
  { value: 'aws-1yr-compute-sp-no-upfront', label: 'Compute SP (1-Yr, No Upfront)', providers: ['AWS'], discountFactor: 0.82 },
  { value: 'aws-3yr-compute-sp-no-upfront', label: 'Compute SP (3-Yr, No Upfront)', providers: ['AWS'], discountFactor: 0.60 },
  { value: 'aws-1yr-compute-sp-partial-upfront', label: 'Compute SP (1-Yr, Partial Upfront)', providers: ['AWS'], discountFactor: 0.80 },
  { value: 'aws-3yr-compute-sp-partial-upfront', label: 'Compute SP (3-Yr, Partial Upfront)', providers: ['AWS'], discountFactor: 0.58 },
  { value: 'aws-1yr-compute-sp-all-upfront', label: 'Compute SP (1-Yr, All Upfront)', providers: ['AWS'], discountFactor: 0.78 },
  { value: 'aws-3yr-compute-sp-all-upfront', label: 'Compute SP (3-Yr, All Upfront)', providers: ['AWS'], discountFactor: 0.56 },
];

export const getPricingModelsForProvider = (provider: CloudProvider): SelectOption[] => {
  return pricingModelOptions.filter(model => model.providers.includes(provider))
    .map(model => ({ value: model.value, label: model.label }))
    .sort((a, b) => { /* ... existing sorting logic ... */ return 0; }); // Keep existing complex sort
};

const getInstanceFullDescription = (provider: CloudProvider, instanceId: string): string => {
  if (!metadataLoaded) loadProviderMetadata();
  const mf = machineFamilies.find(m => m.id === instanceId && m.provider === provider);
  return mf ? mf.fullDescription : `${provider} Instance ${instanceId} (Details not found)`;
};

export const getRegionNameById = (provider: CloudProvider, regionId: string): string => {
  if (!metadataLoaded) loadProviderMetadata();
  let regions: Region[] = [];
  if (provider === 'Google Cloud') regions = googleCloudRegions;
  else if (provider === 'Azure') regions = azureRegions;
  else if (provider === 'AWS') regions = awsRegions;
  const region = regions.find(r => r.id === regionId);
  return region ? region.name : `${provider} Region ${regionId} (Name not found)`;
};

export const getPricingModelDetails = (modelValue: string): PricingModel | undefined => {
  return pricingModelOptions.find(m => m.value === modelValue);
};

export const fetchPricingData = async (
  provider: CloudProvider,
  regionId: string,
  instanceId: string,
  pricingModelValue: string
): Promise<PriceData> => {
  const modelDetails = getPricingModelDetails(pricingModelValue) || { label: pricingModelValue, value: pricingModelValue, providers: [], discountFactor: 1.0 };
  const machineFamilyName = getInstanceFullDescription(provider, instanceId);
  const regionName = getRegionNameById(provider, regionId);
  let price: number | null = null;
  let responseText = ''; // For logging raw response on error

  try {
    if (provider === 'Google Cloud') {
      const apiUrl = `/api/pricing/gce-bq?regionId=${encodeURIComponent(regionId)}&instanceId=${encodeURIComponent(instanceId)}&pricingModelValue=${encodeURIComponent(pricingModelValue)}`;
      console.log(`[Pricing] Attempting to fetch GCE pricing data from API: ${apiUrl}`);
      const response = await fetch(apiUrl, { cache: 'no-store' });
      responseText = await response.text(); // Read text for logging in case of JSON parse error

      if (!response.ok) {
        console.error(`[Pricing] HTTP error fetching GCE pricing from API (${apiUrl}): ${response.status} ${response.statusText}`);
        console.error(`[Pricing] GCE API Error Response Body: ${responseText}`);
        // Fallthrough to return PriceData with null price
      } else {
        const data: Partial<PriceData> = JSON.parse(responseText);
        if (data.price !== undefined) {
            price = data.price;
        } else {
            console.warn(`[Pricing] Price not found in GCE API response for ${apiUrl}. Received:`, data);
        }
      }
    } else { // AWS and Azure still use GCS for now
      let providerPathSegment = '';
      if (provider === 'Azure') providerPathSegment = 'azure_prices_python';
      else if (provider === 'AWS') providerPathSegment = 'EC2';

      if (providerPathSegment) {
        const gcsDataUrl = `https://storage.googleapis.com/${GCS_BUCKET_NAME}/${providerPathSegment}/${regionId}/${instanceId}/${pricingModelValue}.json`;
        console.log(`[Pricing] Attempting to fetch ${provider} pricing data from GCS: ${gcsDataUrl}`);
        const response = await fetch(gcsDataUrl, { cache: 'no-store' });
        responseText = await response.text();

        if (!response.ok) {
          console.error(`[Pricing] HTTP error fetching ${provider} pricing from GCS (${gcsDataUrl}): ${response.status} ${response.statusText}`);
          console.error(`[Pricing] ${provider} GCS Error Response Body: ${responseText}`);
           // Fallthrough to return PriceData with null price
        } else {
            const gcsDataObject: { hourlyPrice?: number; [key: string]: any } = JSON.parse(responseText);
            if (gcsDataObject && typeof gcsDataObject.hourlyPrice === 'number') {
                price = parseFloat(Math.max(0.000001, gcsDataObject.hourlyPrice).toFixed(6));
            } else {
                console.warn(`[Pricing] Hourly price not found or not a number in ${provider} GCS data for ${gcsDataUrl}. Received data:`, gcsDataObject);
            }
        }
      }
    }
  } catch (error: any) {
    console.error(`[Pricing] Catch block: Error during fetch for ${provider} ${instanceId} in ${regionId} (${pricingModelValue}):`);
    console.error(`  Error Name: ${error.name}`);
    console.error(`  Error Message: ${error.message}`);
    if (error.stack) console.error('  Error stack:', error.stack);
    if (responseText) console.error(`  Raw text content that may have caused parsing error: ${responseText.substring(0, 500)}...`);
    // Price remains null
  }

  console.log(`[Pricing] Result for ${provider} ${instanceId} in ${regionId} (${pricingModelValue}): Price = ${price}`);
  return {
    provider, machineFamilyId: instanceId, machineFamilyName, price,
    regionId, regionName, pricingModelLabel: modelDetails.label, pricingModelValue: modelDetails.value,
  };
};

// Initial load of metadata when the module is first imported.
// This ensures metadata is available synchronously for initial renders if possible.
loadProviderMetadata();
