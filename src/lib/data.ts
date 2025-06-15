
import type { Region, MachineFamily, CloudProvider, SelectOption, PriceData, PricingModel, CpuDetails } from './types';

export let googleCloudRegions: Region[] = [];
export let azureRegions: Region[] = [];
export let awsRegions: Region[] = [];
export let machineFamilies: MachineFamily[] = [];
let metadataLoaded = false;
let metadataLoadingPromise: Promise<void> | null = null;

const GCS_BUCKET_NAME = 'cloudprice-comparator.firebasestorage.app'; // Your GCS bucket

export async function loadProviderMetadata(): Promise<void> {
  if (metadataLoaded) {
    console.log("[Metadata] Already loaded.");
    return;
  }
  if (metadataLoadingPromise) {
    console.log("[Metadata] Loading in progress, awaiting existing promise.");
    return metadataLoadingPromise;
  }

  metadataLoadingPromise = (async () => {
    console.log("[Metadata] Fetching provider metadata from GCS...");
    try {
      const metadataFileNames = [
        'googleCloudRegions.json',
        'azureRegions.json',
        'awsRegions.json',
        'machineFamilies.json',
      ];

      const [gcpRegionsData, azRegionsData, awsRegionsData, mfData] = await Promise.all(
        metadataFileNames.map(async (fileName) => {
          const response = await fetch(`https://storage.googleapis.com/${GCS_BUCKET_NAME}/metadata/${fileName}`, { cache: 'no-store' });
          if (!response.ok) {
            throw new Error(`Failed to fetch ${fileName} from GCS: ${response.status} ${response.statusText}`);
          }
          return response.json();
        })
      );

      googleCloudRegions = (gcpRegionsData as Region[] || []).sort((a, b) => a.name.localeCompare(b.name));
      azureRegions = (azRegionsData as Region[] || []).sort((a, b) => a.name.localeCompare(b.name));
      awsRegions = (awsRegionsData as Region[] || []).sort((a, b) => a.name.localeCompare(b.name));
      machineFamilies = (mfData as MachineFamily[] || []);

      metadataLoaded = true;
      console.log("[Metadata] Provider metadata fetching from GCS complete.");
      console.log(`[Metadata] Loaded ${googleCloudRegions.length} GCP regions, ${azureRegions.length} Azure regions, ${awsRegions.length} AWS regions, ${machineFamilies.length} machine families.`);
    } catch (error) {
      console.error("[Metadata] Error fetching or processing metadata from GCS:", error);
      // Keep arrays empty or use stale data if a more sophisticated caching/fallback is desired
      googleCloudRegions = [];
      azureRegions = [];
      awsRegions = [];
      machineFamilies = [];
      metadataLoaded = false; // Ensure it retries if needed
      throw error; // Re-throw to allow UI to handle loading failure
    } finally {
      metadataLoadingPromise = null; // Clear the promise after completion or failure
    }
  })();
  return metadataLoadingPromise;
}


export const getGeosForProvider = (provider: CloudProvider): SelectOption[] => {
  if (!metadataLoaded) {
    console.warn(`[Metadata] getGeosForProvider called before metadata was successfully loaded. Data may be incomplete. Consider awaiting loadProviderMetadata(). Provider: ${provider}`);
  }
  let regions: Region[] = [];
  if (provider === 'Google Cloud') regions = googleCloudRegions;
  else if (provider === 'Azure') regions = azureRegions;
  else if (provider === 'AWS') regions = awsRegions;

  if (!regions || regions.length === 0) {
    console.warn(`[Metadata] No regions found for provider ${provider} in getGeosForProvider. This might indicate a metadata loading issue or data not yet loaded.`);
    return [];
  }
  const geos = Array.from(new Set(regions.map(r => r.geo)));
  return geos.map(geo => ({ value: geo, label: geo })).sort((a, b) => a.label.localeCompare(b.label));
};

export const getRegionsForProvider = (provider: CloudProvider, geo?: string): Region[] => {
  if (!metadataLoaded) {
    console.warn(`[Metadata] getRegionsForProvider called before metadata was successfully loaded. Data may be incomplete. Consider awaiting loadProviderMetadata(). Provider: ${provider}, Geo: ${geo}`);
  }
  let allRegions: Region[] = [];
  if (provider === 'Google Cloud') allRegions = googleCloudRegions;
  else if (provider === 'Azure') allRegions = azureRegions;
  else if (provider === 'AWS') allRegions = awsRegions;

  if (!allRegions || allRegions.length === 0) {
    console.warn(`[Metadata] No regions found for provider ${provider} in getRegionsForProvider (geo: ${geo}).`);
    return [];
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
      cpuCount = 0.5; // Approximate value for shared/burstable CPUs
    } else {
      const cpuMatch = machine.cpu.match(/(\d+(\.\d+)?)/); // Match integer or decimal
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
  if (!metadataLoaded) {
     console.warn(`[Metadata] getMachineFamilyGroups called before metadata was successfully loaded. Data may be incomplete. Provider: ${provider}`);
  }
  if (!machineFamilies || machineFamilies.length === 0) {
    console.warn(`[Metadata] No machine families loaded for provider ${provider} in getMachineFamilyGroups.`);
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
        const lowerBoundCpu = filterSapCertified && applyTolerance ? minCpu * 0.85 : minCpu;
        const upperBoundCpu = filterSapCertified && applyTolerance ? minCpu * 1.15 : Infinity; 
        cpuMatch = specs.cpuCount >= lowerBoundCpu && specs.cpuCount <= upperBoundCpu;
      } else if (minCpu !== undefined && specs.cpuCount === null) {
         // If minCpu is specified but instance has no CPU spec, it fails unless minCpu is 0 or less
         cpuMatch = minCpu <= 0;
      }

      let ramMatch = true;
      if (userMinRamGB !== undefined && specs.ramInGB !== null) {
        const lowerBoundRam = filterSapCertified && applyTolerance ? userMinRamGB * 0.85 : userMinRamGB;
        const upperBoundRam = filterSapCertified && applyTolerance ? userMinRamGB * 1.15 : Infinity;
        ramMatch = specs.ramInGB >= lowerBoundRam && specs.ramInGB <= upperBoundRam;
      } else if (userMinRamGB !== undefined && specs.ramInGB === null) {
        // If userMinRamGB is specified but instance has no RAM spec, it fails unless userMinRamGB is 0 or less
        ramMatch = userMinRamGB <= 0;
      }
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
  if (!metadataLoaded) {
    console.warn(`[Metadata] getMachineInstancesForFamily called before metadata was successfully loaded. Data may be incomplete. Provider: ${provider}, Family: ${familyGroup}`);
  }
   if (!machineFamilies || machineFamilies.length === 0) {
    console.warn(`[Metadata] No machine families loaded for provider ${provider} in getMachineInstancesForFamily.`);
    return [];
  }

  return machineFamilies.filter(mf => {
    const providerMatch = mf.provider === provider;
    const familyGroupMatch = mf.familyGroup === familyGroup;
    const sapMatch = filterSapCertified ? mf.isSapCertified === true : true;

    const specs = parseMachineSpecs(mf);
    let cpuFilterMatch = true;
    if (minCpu !== undefined && specs.cpuCount !== null) {
       const lowerBoundCpu = filterSapCertified && applyTolerance ? minCpu * 0.85 : minCpu;
       const upperBoundCpu = filterSapCertified && applyTolerance ? minCpu * 1.15 : Infinity;
       cpuFilterMatch = specs.cpuCount >= lowerBoundCpu && specs.cpuCount <= upperBoundCpu;
    } else if (minCpu !== undefined && specs.cpuCount === null) {
       cpuFilterMatch = minCpu <= 0; 
    }

    let ramFilterMatch = true;
    if (userMinRamGB !== undefined && specs.ramInGB !== null) {
       const lowerBoundRam = filterSapCertified && applyTolerance ? userMinRamGB * 0.85 : userMinRamGB;
       const upperBoundRam = filterSapCertified && applyTolerance ? userMinRamGB * 1.15 : Infinity;
       ramFilterMatch = specs.ramInGB >= lowerBoundRam && specs.ramInGB <= upperBoundRam;
    } else if (userMinRamGB !== undefined && specs.ramInGB === null) {
        ramFilterMatch = userMinRamGB <= 0;
    }

    return providerMatch && familyGroupMatch && sapMatch && cpuFilterMatch && ramFilterMatch;
  }).sort((a,b) => {
        // Enhanced sorting logic for instance names
        const extractSortKey = (name: string) => {
          // Split by common delimiters, then try to parse numbers, otherwise keep as string
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
            // Define a sensible order for common size indicators
            const sizeOrder = ['nano', 'micro', 'small', 'medium', 'large', 'xlarge', '2xlarge', '3xlarge', '4xlarge', '6xlarge', '8xlarge', '9xlarge', '10xlarge', '12xlarge', '16xlarge', '18xlarge', '20xlarge', '22xlarge', '24xlarge', '30xlarge', '32xlarge', '40xlarge', '44xlarge', '48xlarge', '56xlarge', '60xlarge', '64xlarge', '72xlarge', '80xlarge', '88xlarge', '96xlarge', '104xlarge', '112xlarge', '128xlarge', '160xlarge', '176xlarge', '180xlarge', '192xlarge', '208xlarge', '224xlarge', '360xlarge', '416xlarge', 'metal'];
            const aSizeIndex = sizeOrder.findIndex(s => aPart.includes(s));
            const bSizeIndex = sizeOrder.findIndex(s => bPart.includes(s));

            if (aSizeIndex !== -1 && bSizeIndex !== -1 && aSizeIndex !== bSizeIndex) {
              return aSizeIndex - bSizeIndex;
            }
            // Fallback to localeCompare if not a recognized size or if sizes are the same
            const comparison = aPart.localeCompare(bPart);
            if (comparison !== 0) return comparison;
          } else {
            // Prefer numbers over strings if one is a number and the other isn't (e.g. '2' vs 'large')
            return typeof aPart === 'number' ? -1 : 1;
          }
        }
        // If all parts are equal, sort by length (shorter names first)
        return aParts.length - bParts.length;
    });
};

export const pricingModelOptions: PricingModel[] = [
  { value: 'on-demand', label: 'On-Demand', providers: ['Google Cloud', 'Azure', 'AWS'], discountFactor: 1.0 },
  // Google Cloud
  { value: 'gcp-1yr-cud', label: '1-Year CUD', providers: ['Google Cloud'], discountFactor: 0.70 },
  { value: 'gcp-3yr-cud', label: '3-Year CUD', providers: ['Google Cloud'], discountFactor: 0.50 },
  { value: 'gcp-1yr-flex-cud', label: 'Flexible CUD (1-Year)', providers: ['Google Cloud'], discountFactor: 0.80 },
  { value: 'gcp-3yr-flex-cud', label: 'Flexible CUD (3-Year)', providers: ['Google Cloud'], discountFactor: 0.60 },
  // Azure (RIs and SPs)
  { value: 'azure-1yr-ri-no-upfront', label: '1-Year RI (No Upfront)', providers: ['Azure'], discountFactor: 0.72 },
  { value: 'azure-3yr-ri-no-upfront', label: '3-Year RI (No Upfront)', providers: ['Azure'], discountFactor: 0.53 },
  { value: 'azure-1yr-ri-all-upfront', label: '1-Year RI (All Upfront)', providers: ['Azure'], discountFactor: 0.65 },
  { value: 'azure-3yr-ri-all-upfront', label: '3-Year RI (All Upfront)', providers: ['Azure'], discountFactor: 0.45 },
  { value: 'azure-1yr-sp', label: 'Savings Plan (1-Year)', providers: ['Azure'], discountFactor: 0.70 },
  { value: 'azure-3yr-sp', label: 'Savings Plan (3-Year)', providers: ['Azure'], discountFactor: 0.50 },

  // AWS
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
              return 5; // Default for any other AWS models
          }
          // Priorities for GCP and Azure
          if (label.includes('RI')) return 1; // Azure RIs
          if (label.includes('Savings Plan')) return 2; // Azure SPs
          if (label.includes('Flexible CUD')) return 4; // GCP Flex CUDs
          if (label.includes('CUD')) return 3; // GCP CUDs
          return 5; // Default for others
        };

        const priorityA = getPriority(a.label, a.value);
        const priorityB = getPriority(b.label, b.value);

        if (priorityA !== priorityB) return priorityA - priorityB;

        // Secondary sort by commitment length (1-year before 3-year)
        const getYear = (val: string) => (val.includes('1yr') ? 1 : (val.includes('3yr') ? 3 : 0));
        const yearA = getYear(a.value);
        const yearB = getYear(b.value);
        if (yearA !== yearB) return yearA - yearB;

        // Tertiary sort by upfront option (No < Partial < All)
        const getUpfrontOrder = (val: string) => {
            if (val.includes('noupfront')) return 1;
            if (val.includes('partialupfront')) return 2;
            if (val.includes('allupfront')) return 3;
            return 0; // Default if no upfront specified
        };
        const upfrontA = getUpfrontOrder(a.value);
        const upfrontB = getUpfrontOrder(b.value);
        if (upfrontA !== upfrontB) return upfrontA - upfrontB;

        return a.label.localeCompare(b.label);
      });
};

const getInstanceFullDescription = (provider: CloudProvider, instanceId: string): string => {
  if (!metadataLoaded) {
      console.warn(`[Metadata] getInstanceFullDescription called before metadata loaded. Instance: ${instanceId}`);
      // Potentially trigger loadProviderMetadata here or ensure it's called earlier
  }
  const mf = machineFamilies.find(m => m.id === instanceId && m.provider === provider);
  return mf ? mf.fullDescription : `${provider} Instance ${instanceId} (Details not found)`;
};

export const getRegionNameById = (provider: CloudProvider, regionId: string): string => {
  if (!metadataLoaded) {
      console.warn(`[Metadata] getRegionNameById called before metadata loaded. Region: ${regionId}`);
      // Potentially trigger loadProviderMetadata here
  }
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
  if (!metadataLoaded) {
    console.warn("[Pricing] fetchPricingData called before metadata was successfully loaded. Attempting to load metadata first.");
    try {
        await loadProviderMetadata(); // Ensure metadata is loaded before proceeding
    } catch (error) {
        console.error("[Pricing] Failed to load metadata in fetchPricingData. Pricing will be unavailable.", error);
        // Fall through to return null price or throw specific error
    }
  }

  const modelDetails = getPricingModelDetails(pricingModelValue) ||
                     pricingModelOptions.find(m => m.value === 'on-demand') ||
                     { label: pricingModelValue, value: pricingModelValue, providers: [], discountFactor: 1.0 }; // Fallback
  const machineFamilyName = getInstanceFullDescription(provider, instanceId);
  const regionName = getRegionNameById(provider, regionId);
  let price: number | null = null;
  let responseText = ''; // To store raw response text for debugging

  let providerPathSegment = '';
  if (provider === 'Google Cloud') providerPathSegment = 'GCE';
  else if (provider === 'Azure') providerPathSegment = 'azure_prices_python';
  else if (provider === 'AWS') providerPathSegment = 'EC2';

  if (!providerPathSegment) {
    console.error(`[Pricing] No GCS path segment defined for provider ${provider}. Cannot fetch pricing.`);
    return {
      provider, machineFamilyId: instanceId, machineFamilyName, price: null,
      regionId, regionName, pricingModelLabel: modelDetails.label, pricingModelValue: modelDetails.value,
    };
  }
  
  const safeInstanceId = encodeURIComponent(instanceId);
  const safePricingModelValue = encodeURIComponent(pricingModelValue);
  const safeRegionId = encodeURIComponent(regionId);

  const gcsDataUrl = `https://storage.googleapis.com/${GCS_BUCKET_NAME}/${providerPathSegment}/${safeRegionId}/${safeInstanceId}/${safePricingModelValue}.json`;
  
  console.log(`[Pricing] Attempting to fetch ${provider} pricing data from GCS: ${gcsDataUrl}`);

  try {
    const response = await fetch(gcsDataUrl, { cache: 'no-store' }); // Prevent caching issues
    responseText = await response.text(); // Get raw text for better debugging if JSON parse fails

    if (!response.ok) {
      console.error(`[Pricing] HTTP error fetching ${provider} pricing from GCS (${gcsDataUrl}): ${response.status} ${response.statusText}`);
      console.error(`[Pricing] ${provider} GCS Error Response Body: ${responseText}`);
      // price remains null, will be handled by the UI as "not available"
    } else {
      const gcsDataObject: { hourlyPrice?: number; [key: string]: any } = JSON.parse(responseText); // Explicitly type to expect hourlyPrice
      if (gcsDataObject && typeof gcsDataObject.hourlyPrice === 'number') {
        price = parseFloat(Math.max(0.000001, gcsDataObject.hourlyPrice).toFixed(6));
      } else {
        console.warn(`[Pricing] Hourly price not found or not a number in ${provider} GCS data for ${gcsDataUrl}. Received data:`, gcsDataObject);
        // price remains null
      }
    }
  } catch (error: any) { // Catch any error, including JSON parsing errors
    console.error(`[Pricing] Catch block: Error during fetch or JSON parse for ${provider} ${instanceId} in ${regionId} (${pricingModelValue}) from GCS:`);
    console.error(`  URL: ${gcsDataUrl}`);
    console.error(`  Error Name: ${error.name}`);
    console.error(`  Error Message: ${error.message}`);
    if (error.stack) console.error('  Error stack:', error.stack);
    if (responseText) console.error(`  Raw text content (first 500 chars) that may have caused parsing error: ${responseText.substring(0, 500)}`);
    // price remains null
  }

  console.log(`[Pricing] Result for ${provider} ${instanceId} in ${regionId} (model: ${pricingModelValue}, label: ${modelDetails.label}): Price = ${price}`);
  return {
    provider,
    machineFamilyId: instanceId,
    machineFamilyName,
    price,
    regionId,
    regionName,
    pricingModelLabel: modelDetails.label,
    pricingModelValue: modelDetails.value,
  };
};

