
import type { Region, MachineFamily, CloudProvider, SelectOption, PriceData, PricingModel, CpuDetails } from './types';

// These will be populated by loadProviderMetadata
export let googleCloudRegions: Region[] = [];
export let azureRegions: Region[] = [];
export let awsRegions: Region[] = [];
export let machineFamilies: MachineFamily[] = [];
let metadataLoaded = false;
const GCS_BUCKET_NAME = 'firestore-cloud-comparator';

async function fetchMetadataFile<T>(fileName: string): Promise<T[] | null> {
  const url = `https://storage.googleapis.com/${GCS_BUCKET_NAME}/metadata/${fileName}`;
  console.log(`[${fileName}] Attempting to fetch metadata from: ${url}`);

  let response: Response;
  let responseText: string = '';

  try {
    response = await fetch(url);
  } catch (networkError: any) {
    console.error(`[${fileName}] Network error during fetch for ${url}:`);
    console.error(`  Error Name: ${networkError.name}`);
    console.error(`  Error Message: ${networkError.message}`);
    if (networkError.stack) {
      console.error(`  Error Stack: ${networkError.stack}`);
    }
    if (networkError.cause) {
        console.error(`  Error Cause:`, networkError.cause);
    }
    return null;
  }

  // Check if the request was successful (e.g., not a 404 or 403)
  if (!response.ok) {
    console.error(`[${fileName}] HTTP error fetching metadata from ${url}. Status: ${response.status} ${response.statusText}`);
    try {
      const errorBody = await response.text();
      console.error(`[${fileName}] HTTP Error Response Body (Status ${response.status}):\n${errorBody}`);
    } catch (bodyReadError: any) {
      console.error(`[${fileName}] Could not read HTTP error response body. Status: ${response.status}. Body Read Error Name: ${bodyReadError.name}, Message: ${bodyReadError.message}`);
    }
    return null;
  }

  try {
    responseText = await response.text();
  } catch (textReadError: any) {
    console.error(`[${fileName}] Error reading response text from ${url}:`);
    console.error(`  Error Name: ${textReadError.name}`);
    console.error(`  Error Message: ${textReadError.message}`);
    if (textReadError.stack) {
      console.error(`  Error Stack: ${textReadError.stack}`);
    }
    return null;
  }

  const contentType = response.headers.get('content-type');
  if (!contentType || (!contentType.includes('application/json') && !contentType.includes('text/plain'))) {
      console.warn(`[${fileName}] WARNING: Metadata file from ${url} has unexpected Content-Type: ${contentType}. Expected 'application/json' or 'text/plain'. File will be ignored if parsing fails.`);
      console.warn(`[${fileName}] Raw text content (unexpected Content-Type ${contentType}):\n${responseText}`);
  }

  try {
    const data = JSON.parse(responseText);
    if (!Array.isArray(data)) {
      console.error(`[${fileName}] Parsed data from ${url} is not an array. Content:\n${responseText}\nParsed as:`, data);
      return null;
    }
    console.log(`[${fileName}] Successfully fetched and parsed from ${url}. Items: ${data.length}`);
    return data as T[];
  } catch (jsonParseError: any) {
    console.error(`[${fileName}] ERROR parsing JSON content from ${url}:`);
    console.error(`  Parse Error Name: ${jsonParseError.name}`);
    console.error(`  Parse Error Message: ${jsonParseError.message}`);
    if (jsonParseError.stack) {
        console.error(`  Parse Error Stack: ${jsonParseError.stack}`);
    }
    console.error(`  Raw text content that failed JSON parsing for ${fileName}:\n${responseText}`);
    return null;
  }
}


export async function loadProviderMetadata(): Promise<void> {
  if (metadataLoaded) {
    console.log("Metadata already loaded. Skipping re-fetch.");
    return;
  }
  console.log("Loading provider metadata from GCS...");

  const [gcpRegionsData, azRegionsData, awsRegionsData, mfData] = await Promise.all([
    fetchMetadataFile<Region>('googleCloudRegions.json'),
    fetchMetadataFile<Region>('azureRegions.json'),
    fetchMetadataFile<Region>('awsRegions.json'),
    fetchMetadataFile<MachineFamily>('machineFamilies.json')
  ]);

  googleCloudRegions = gcpRegionsData || [];
  azureRegions = azRegionsData || [];
  awsRegions = awsRegionsData || [];
  machineFamilies = mfData || [];

  metadataLoaded = true;

  console.log("Provider metadata loading attempt complete from GCS.");
  console.log("Loaded Google Cloud Regions:", googleCloudRegions.length, googleCloudRegions.length > 0 ? `First region: ${googleCloudRegions[0].id}` : '(empty or failed to load)');
  console.log("Loaded Azure Regions:", azureRegions.length, azureRegions.length > 0 ? `First region: ${azureRegions[0].id}` : '(empty or failed to load)');
  console.log("Loaded AWS Regions:", awsRegions.length, awsRegions.length > 0 ? `First region: ${awsRegions[0].id}` : '(empty or failed to load)');
  console.log("Loaded Machine Families (all providers):", machineFamilies.length, machineFamilies.length > 0 ? `First family: ${machineFamilies[0].id}` : '(empty or failed to load)');
}


export const getGeosForProvider = (provider: CloudProvider): SelectOption[] => {
  let regions: Region[] = [];
  if (provider === 'Google Cloud') regions = googleCloudRegions;
  else if (provider === 'Azure') regions = azureRegions;
  else if (provider === 'AWS') regions = awsRegions;

  console.log(`getGeosForProvider for ${provider}: source regions array length = ${regions.length}`);
  if (regions.length > 0) {
    console.log(`First region for ${provider} in getGeosForProvider: id=${regions[0].id}, name=${regions[0].name}, geo=${regions[0].geo}`);
  }

  if (regions.length === 0 && metadataLoaded) {
    console.warn(`Metadata loaded, but no regions found for provider ${provider} in getGeosForProvider. This means either the GCS file was empty/malformed or the module array wasn't populated correctly.`);
  } else if (regions.length === 0 && !metadataLoaded) {
     console.warn(`Metadata not yet loaded when getGeosForProvider for ${provider} was called. This is expected during initial render. Regions for ${provider} will be empty initially.`);
  }

  const geos = Array.from(new Set(regions.map(r => r.geo)));
  return geos.map(geo => ({ value: geo, label: geo })).sort((a, b) => a.label.localeCompare(b.label));
};

export const getRegionsForProvider = (provider: CloudProvider, geo?: string): Region[] => {
  let allRegions: Region[] = [];
  if (provider === 'Google Cloud') allRegions = googleCloudRegions;
  else if (provider === 'Azure') allRegions = azureRegions;
  else if (provider === 'AWS') allRegions = awsRegions;

   if (allRegions.length === 0 && metadataLoaded) {
    console.warn(`Metadata loaded, but no regions available for provider ${provider} in getRegionsForProvider. Check GCS metadata files or population of module arrays.`);
  } else if (allRegions.length === 0 && !metadataLoaded) {
     console.warn(`Metadata not yet loaded when getRegionsForProvider for ${provider} was called. Region list for ${provider} will be empty initially.`);
  }


  if (geo) {
    return allRegions.filter(region => region.geo === geo).sort((a,b) => a.name.localeCompare(b.name));
  }
  return allRegions.sort((a,b) => a.name.localeCompare(b.name));
};

export const parseMachineSpecs = (machine: MachineFamily): { cpuCount: number | null, ramInGB: number | null } => {
  let cpuCount: number | null = null;
  if (machine.cpu) {
    if (machine.cpu.toLowerCase().includes('shared')) {
      cpuCount = 0.5;
    } else {
      const cpuMatch = machine.cpu.match(/(\d+)/);
      if (cpuMatch && cpuMatch[1]) {
        cpuCount = parseInt(cpuMatch[1], 10);
      }
    }
  }

  let ramInGB: number | null = null;
  if (machine.ram) {
    const ramMatch = machine.ram.match(/([\d.]+)\s*(GB|TB)/i);
    if (ramMatch && ramMatch[1] && ramMatch[2]) {
      const value = parseFloat(ramMatch[1]);
      const unit = ramMatch[2].toUpperCase();
      if (unit === 'TB') {
        ramInGB = value * 1024;
      } else {
        ramInGB = value;
      }
    }
  }
  return { cpuCount, ramInGB };
};

export const getMachineFamilyGroups = (
  provider: CloudProvider,
  minCpu?: number,
  userMinRamGB?: number,
  filterSapCertified?: boolean,
  applyTolerance?: boolean
): SelectOption[] => {
  if (machineFamilies.length === 0 && metadataLoaded) {
    console.warn(`Metadata loaded, but machineFamilies is empty in getMachineFamilyGroups. Filtering for provider ${provider} will yield no results.`);
    return [];
  } else if (machineFamilies.length === 0 && !metadataLoaded) {
    console.warn(`Metadata not yet loaded when getMachineFamilyGroups for ${provider} was called. Machine family groups for ${provider} will be empty initially.`);
    return [];
  }

  let filteredMachines = machineFamilies.filter(mf => mf.provider === provider);

  if (filterSapCertified) {
    filteredMachines = filteredMachines.filter(mf => mf.isSapCertified === true);
  }

  if (minCpu !== undefined || userMinRamGB !== undefined) {
    filteredMachines = filteredMachines.filter(mf => {
      const specs = parseMachineSpecs(mf);
      let cpuMatch = true;
      if (minCpu !== undefined && specs.cpuCount !== null) {
        if (filterSapCertified && applyTolerance) {
          const lowerBoundCpu = minCpu * 0.85;
          const upperBoundCpu = minCpu * 1.15;
          cpuMatch = specs.cpuCount >= lowerBoundCpu && specs.cpuCount <= upperBoundCpu;
        } else {
          cpuMatch = specs.cpuCount >= minCpu;
        }
      } else if (minCpu !== undefined && specs.cpuCount === null) {
        cpuMatch = minCpu <= 0;
      }

      let ramMatch = true;
      if (userMinRamGB !== undefined && specs.ramInGB !== null) {
        if (filterSapCertified && applyTolerance) {
          const lowerBoundRam = userMinRamGB * 0.85;
          const upperBoundRam = userMinRamGB * 1.15;
          ramMatch = specs.ramInGB >= lowerBoundRam && specs.ramInGB <= upperBoundRam;
        } else {
          ramMatch = specs.ramInGB >= userMinRamGB;
        }
      } else if (userMinRamGB !== undefined && specs.ramInGB === null) {
        ramMatch = userMinRamGB <= 0;
      }
      return cpuMatch && ramMatch;
    });
  }

  const families = filteredMachines.map(mf => mf.familyGroup);
  return Array.from(new Set(families)).map(fg => ({ value: fg, label: fg })).sort((a,b) => a.label.localeCompare(b.label));
};

export const getMachineInstancesForFamily = (
  provider: CloudProvider,
  familyGroup: string,
  filterSapCertified?: boolean,
  minCpu?: number,
  userMinRamGB?: number,
  applyTolerance?: boolean
): MachineFamily[] => {
   if (machineFamilies.length === 0 && metadataLoaded) {
    console.warn(`Metadata loaded, but machineFamilies is empty in getMachineInstancesForFamily. Instances for provider ${provider} and familyGroup ${familyGroup} will be empty.`);
    return [];
  } else if (machineFamilies.length === 0 && !metadataLoaded) {
    console.warn(`Metadata not yet loaded when getMachineInstancesForFamily for ${provider} / ${familyGroup} was called. Instances will be empty initially.`);
    return [];
  }

  return machineFamilies
    .filter(mf => {
      const providerMatch = mf.provider === provider;
      const familyGroupMatch = mf.familyGroup === familyGroup;
      const sapMatch = filterSapCertified ? mf.isSapCertified === true : true;

      const specs = parseMachineSpecs(mf);
      let cpuFilterMatch = true;
      if (minCpu !== undefined && specs.cpuCount !== null) {
         if (filterSapCertified && applyTolerance) {
            const lowerBoundCpu = minCpu * 0.85;
            const upperBoundCpu = minCpu * 1.15;
            cpuFilterMatch = specs.cpuCount >= lowerBoundCpu && specs.cpuCount <= upperBoundCpu;
        } else {
            cpuFilterMatch = specs.cpuCount >= minCpu;
        }
      } else if (minCpu !== undefined && specs.cpuCount === null) {
        cpuFilterMatch = minCpu <= 0;
      }

      let ramFilterMatch = true;
      if (userMinRamGB !== undefined && specs.ramInGB !== null) {
         if (filterSapCertified && applyTolerance) {
            const lowerBoundRam = userMinRamGB * 0.85;
            const upperBoundRam = userMinRamGB * 1.15;
            ramFilterMatch = specs.ramInGB >= lowerBoundRam && specs.ramInGB <= upperBoundRam;
        } else {
            ramFilterMatch = specs.ramInGB >= userMinRamGB;
        }
      } else if (userMinRamGB !== undefined && specs.ramInGB === null) {
        ramFilterMatch = userMinRamGB <= 0;
      }

      return providerMatch && familyGroupMatch && sapMatch && cpuFilterMatch && ramFilterMatch;
    })
    .sort((a,b) => {
        const extractSortKey = (name: string) => {
          const parts = name.toLowerCase().split(/[^a-z0-9.]+/).map(part => {
            const num = parseFloat(part);
            return isNaN(num) ? part : num;
          });
          return parts;
        };
        const aParts = extractSortKey(a.instanceName);
        const bParts = extractSortKey(b.instanceName);
        for (let i = 0; i < Math.min(aParts.length, bParts.length); i++) {
          const aPart = aParts[i];
          const bPart = bParts[i];
          if (typeof aPart === 'number' && typeof bPart === 'number') {
            if (aPart !== bPart) return aPart - bPart;
          } else if (typeof aPart === 'string' && typeof bPart === 'string') {
            const sizeOrder = ['nano', 'micro', 'small', 'medium', 'large', 'xlarge', '2xlarge', '4xlarge', '6xlarge', '8xlarge', '9xlarge', '12xlarge', '16xlarge', '18xlarge', '20xlarge', '22xlarge', '24xlarge', '30xlarge', '32xlarge', '40xlarge', '44xlarge', '48xlarge', '56xlarge', '60xlarge', '64xlarge', '72xlarge', '80xlarge', '88xlarge', '96xlarge','104xlarge','112xlarge', '128xlarge', '160xlarge', '176xlarge', '180xlarge', '192xlarge', '208xlarge', '224xlarge', '360xlarge', '416xlarge', 'metal'];
            const aSizeIndex = sizeOrder.findIndex(s => aPart.includes(s));
            const bSizeIndex = sizeOrder.findIndex(s => bPart.includes(s));
            if (aSizeIndex !== -1 && bSizeIndex !== -1 && aSizeIndex !== bSizeIndex) {
              return aSizeIndex - bSizeIndex;
            }
            const comparison = aPart.localeCompare(bPart);
            if (comparison !== 0) return comparison;
          } else {
            return typeof aPart === 'number' ? -1 : 1;
          }
        }
        return aParts.length - bParts.length;
    });
};

export const pricingModelOptions: PricingModel[] = [
  { value: 'on-demand', label: 'On-Demand', providers: ['Google Cloud', 'Azure', 'AWS'], discountFactor: 1.0 },
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
  return pricingModelOptions
    .filter(model => model.providers.includes(provider))
    .map(model => ({ value: model.value, label: model.label }))
    .sort((a, b) => {
      if (a.value === 'on-demand') return -1;
      if (b.value === 'on-demand') return 1;
      const getPriority = (label: string, value: string) => {
        if (provider === 'AWS') {
            if (value.includes('ec2instance-sp')) return 1;
            if (value.includes('compute-sp')) return 2;
            return 5;
        }
        if (label.includes('RI')) return 1;
        if (label.includes('Savings Plan')) return 2;
        if (label.includes('Flexible CUD')) return 4;
        if (label.includes('CUD')) return 3;
        return 5;
      };
      const priorityA = getPriority(a.label, a.value);
      const priorityB = getPriority(b.label, b.value);
      if (priorityA !== priorityB) return priorityA - priorityB;
      const getYear = (val: string) => (val.includes('1yr') ? 1 : (val.includes('3yr') ? 3 : 0));
      const yearA = getYear(a.value);
      const yearB = getYear(b.value);
      if (yearA !== yearB) return yearA - yearB;
      const getUpfrontOrder = (val: string) => {
          if (val.includes('noupfront')) return 1;
          if (val.includes('partialupfront')) return 2;
          if (val.includes('allupfront')) return 3;
          return 0;
      };
      const upfrontA = getUpfrontOrder(a.value);
      const upfrontB = getUpfrontOrder(b.value);
      if (upfrontA !== upfrontB) return upfrontA - upfrontB;
      return a.label.localeCompare(b.label);
    });
};

const getInstanceFullDescription = (provider: CloudProvider, instanceId: string): string => {
  const mf = machineFamilies.find(m => m.id === instanceId && m.provider === provider);
  return mf ? mf.fullDescription : `${provider} Instance ${instanceId} (Details not found in loaded metadata)`;
};

export const getRegionNameById = (provider: CloudProvider, regionId: string): string => {
  let regions: Region[] = [];
  if (provider === 'Google Cloud') regions = googleCloudRegions;
  else if (provider === 'Azure') regions = azureRegions;
  else if (provider === 'AWS') regions = awsRegions;
  const region = regions.find(r => r.id === regionId);
  return region ? region.name : `${provider} Region ${regionId} (Name not found in loaded metadata)`;
}

export const getPricingModelDetails = (modelValue: string): PricingModel | undefined => {
  return pricingModelOptions.find(m => m.value === modelValue);
};

export const fetchPricingData = async (
  provider: CloudProvider,
  regionId: string,
  instanceId: string,
  pricingModelValue: string
): Promise<PriceData> => {
  let providerPathSegment = '';
  if (provider === 'Google Cloud') {
    providerPathSegment = 'GCE';
  } else if (provider === 'Azure') {
    providerPathSegment = 'azure_prices_python';
  } else if (provider === 'AWS') {
    providerPathSegment = 'EC2';
  }

  const gcsDataUrl = `https://storage.googleapis.com/${GCS_BUCKET_NAME}/${providerPathSegment}/${regionId}/${instanceId}/${pricingModelValue}.json`;
  console.log(`[Pricing] Attempting to fetch pricing data from GCS: ${gcsDataUrl}`);

  const modelDetails = getPricingModelDetails(pricingModelValue) || { label: pricingModelValue, value: pricingModelValue, providers: [], discountFactor: 1.0 };
  const machineFamilyName = getInstanceFullDescription(provider, instanceId);
  const regionName = getRegionNameById(provider, regionId);

  let response;
  let responseText = '';

  try {
    response = await fetch(gcsDataUrl);
  } catch (networkError: any) {
    console.error(`[Pricing] Network error during fetch for ${gcsDataUrl}:`);
    console.error(`  Error Name: ${networkError.name}`);
    console.error(`  Error Message: ${networkError.message}`);
    if (networkError.stack) {
      console.error(`  Error Stack: ${networkError.stack}`);
    }
     if (networkError.cause) {
        console.error(`  Error Cause:`, networkError.cause);
    }
    return {
      provider, machineFamilyId: instanceId, machineFamilyName, price: null,
      regionId, regionName, pricingModelLabel: modelDetails.label, pricingModelValue: modelDetails.value,
    };
  }

  if (!response.ok) {
    console.error(`[Pricing] HTTP error fetching pricing data from GCS (${gcsDataUrl}): ${response.status} ${response.statusText}`);
    try {
      responseText = await response.text();
      console.error(`[Pricing] HTTP Error Response Body (Status ${response.status}):\n${responseText}`);
    } catch (bodyError: any) {
      console.error(`[Pricing] Could not read HTTP error response body. Status: ${response.status}. Body Read Error Name: ${bodyError.name}, Message: ${bodyError.message}`);
    }
    return {
      provider, machineFamilyId: instanceId, machineFamilyName, price: null,
      regionId, regionName, pricingModelLabel: modelDetails.label, pricingModelValue: modelDetails.value,
    };
  }

  try {
    responseText = await response.text();
    const gcsDataObject: { hourlyPrice?: number; [key: string]: any } = JSON.parse(responseText);

    let finalPrice = null;
    if (gcsDataObject && typeof gcsDataObject.hourlyPrice === 'number') {
      finalPrice = gcsDataObject.hourlyPrice * modelDetails.discountFactor;
      finalPrice = parseFloat(Math.max(0.000001, finalPrice).toFixed(6))
    } else {
      console.warn(`[Pricing] Hourly price not found or not a number in GCS data for ${gcsDataUrl}. Received data:`, gcsDataObject);
    }
    console.log(`[Pricing] Successfully fetched and calculated price for ${provider} ${instanceId} in ${regionId} (${pricingModelValue}): ${finalPrice}`);
    return {
      provider, machineFamilyId: instanceId, machineFamilyName, price: finalPrice,
      regionId, regionName, pricingModelLabel: modelDetails.label, pricingModelValue: modelDetails.value,
    };
  } catch (error: any) {
    console.error(`[Pricing] Catch block: Error reading or parsing pricing data response from ${gcsDataUrl}:`);
    console.error(`  Error Name: ${error.name}`);
    console.error(`  Error Message: ${error.message}`);
    if (error.stack) {
     console.error('  Error stack:', error.stack);
    }
    console.error(`  Raw text content (if available) that failed for ${gcsDataUrl}:\n${responseText || '(responseText not available)'}`);
    return {
      provider, machineFamilyId: instanceId, machineFamilyName, price: null,
      regionId, regionName, pricingModelLabel: modelDetails.label, pricingModelValue: modelDetails.value,
    };
  }
};

