
import type { Region, MachineFamily, CloudProvider, SelectOption, PriceData, PricingModel, CpuDetails } from './types';
import { storage } from './firebase'; // Import Firebase storage instance
import { ref, getDownloadURL } from 'firebase/storage';

export let googleCloudRegions: Region[] = [];
export let azureRegions: Region[] = [];
export let awsRegions: Region[] = [];
export let machineFamilies: MachineFamily[] = [];
let metadataLoaded = false;
let metadataLoadingPromise: Promise<void> | null = null;

const metadataFileNames = [
  'googleCloudRegions.json',
  'azureRegions.json',
  'awsRegions.json',
  'machineFamilies.json',
];

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
    console.log("[Metadata] Fetching provider metadata using Firebase getDownloadURL()...");
    try {
      const results = await Promise.all(
        metadataFileNames.map(async (fileName) => {
          const filePath = `metadata/${fileName}`;
          try {
            const fileRef = ref(storage, filePath);
            const downloadURL = await getDownloadURL(fileRef);
            const response = await fetch(downloadURL, { cache: 'no-store' });
            if (!response.ok) {
              throw new Error(`Failed to fetch ${fileName} (via ${downloadURL}): ${response.status} ${response.statusText}`);
            }
            return await response.json();
          } catch (fileError: any) {
            console.error(`[Metadata] Error fetching/processing ${fileName}:`, fileError.message);
            throw new Error(`Could not load ${fileName}. Error: ${fileError.message}`); // Re-throw to fail Promise.all
          }
        })
      );

      googleCloudRegions = (results[0] as Region[] || []).sort((a, b) => a.name.localeCompare(b.name));
      azureRegions = (results[1] as Region[] || []).sort((a, b) => a.name.localeCompare(b.name));
      awsRegions = (results[2] as Region[] || []).sort((a, b) => a.name.localeCompare(b.name));
      machineFamilies = (results[3] as MachineFamily[] || []);

      metadataLoaded = true;
      console.log("[Metadata] Provider metadata fetching using Firebase getDownloadURL() complete.");
      console.log(`[Metadata] Loaded ${googleCloudRegions.length} GCP regions, ${azureRegions.length} Azure regions, ${awsRegions.length} AWS regions, ${machineFamilies.length} machine families.`);
    } catch (error: any) {
      console.error("[Metadata] CRITICAL ERROR loading metadata:", error.message);
      // Log specific instructions if it's a Firebase Storage permission error (though unlikely with public rules)
      if (error.message && (error.message.includes('storage/object-not-found') || error.message.includes('storage/unauthorized'))) {
        console.error("[Metadata] This might be due to files not existing at the expected paths in Firebase Storage or incorrect Firebase Storage rules.");
        console.error("  Expected paths in your Firebase Storage bucket's root:");
        metadataFileNames.forEach(fileName => console.error(`    metadata/${fileName}`));
        console.error("  Ensure your Firebase Storage Rules allow public read (e.g., `allow read: if true;`). Current rules should be sufficient if deployed.");
      } else {
        console.error("[Metadata] An unexpected error occurred. Check Firebase project setup, .env config, and network.", error);
      }
      googleCloudRegions = [];
      azureRegions = [];
      awsRegions = [];
      machineFamilies = [];
      metadataLoaded = false; // Ensure it reflects loading failure
      metadataLoadingPromise = null; // Clear promise on error
      throw error; // Re-throw to allow UI to handle loading failure
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
         cpuMatch = minCpu <= 0;
      }

      let ramMatch = true;
      if (userMinRamGB !== undefined && specs.ramInGB !== null) {
        const lowerBoundRam = filterSapCertified && applyTolerance ? userMinRamGB * 0.85 : userMinRamGB;
        const upperBoundRam = filterSapCertified && applyTolerance ? userMinRamGB * 1.15 : Infinity;
        ramMatch = specs.ramInGB >= lowerBoundRam && specs.ramInGB <= upperBoundRam;
      } else if (userMinRamGB !== undefined && specs.ramInGB === null) {
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
            const sizeOrder = ['nano', 'micro', 'small', 'medium', 'large', 'xlarge', '2xlarge', '3xlarge', '4xlarge', '6xlarge', '8xlarge', '9xlarge', '10xlarge', '12xlarge', '16xlarge', '18xlarge', '20xlarge', '22xlarge', '24xlarge', '30xlarge', '32xlarge', '40xlarge', '44xlarge', '48xlarge', '56xlarge', '60xlarge', '64xlarge', '72xlarge', '80xlarge', '88xlarge', '96xlarge', '104xlarge', '112xlarge', '128xlarge', '160xlarge', '176xlarge', '180xlarge', '192xlarge', '208xlarge', '224xlarge', '360xlarge', '416xlarge', 'metal'];
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
  if (!metadataLoaded) {
      console.warn(`[Metadata] getInstanceFullDescription called before metadata loaded. Instance: ${instanceId}`);
  }
  const mf = machineFamilies.find(m => m.id === instanceId && m.provider === provider);
  return mf ? mf.fullDescription : `${provider} Instance ${instanceId} (Details not found)`;
};

export const getRegionNameById = (provider: CloudProvider, regionId: string): string => {
  if (!metadataLoaded) {
      console.warn(`[Metadata] getRegionNameById called before metadata loaded. Region: ${regionId}`);
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
        await loadProviderMetadata();
    } catch (error) {
        console.error("[Pricing] Failed to load metadata in fetchPricingData. Pricing will be unavailable.", error);
    }
  }

  const modelDetails = getPricingModelDetails(pricingModelValue) ||
                     pricingModelOptions.find(m => m.value === 'on-demand') ||
                     { label: pricingModelValue, value: pricingModelValue, providers: [], discountFactor: 1.0 };
  const machineFamilyName = getInstanceFullDescription(provider, instanceId);
  const regionName = getRegionNameById(provider, regionId);
  let price: number | null = null;

  let gcsFolderPath = '';
  if (provider === 'Google Cloud') gcsFolderPath = 'GCE';
  else if (provider === 'Azure') gcsFolderPath = 'azure_prices_python';
  else if (provider === 'AWS') gcsFolderPath = 'EC2';

  if (!gcsFolderPath) {
    console.error(`[Pricing] No GCS folder path segment defined for provider ${provider}. Cannot fetch pricing.`);
    return {
      provider, machineFamilyId: instanceId, machineFamilyName, price: null,
      regionId, regionName, pricingModelLabel: modelDetails.label, pricingModelValue: modelDetails.value,
    };
  }

  const safeInstanceId = encodeURIComponent(instanceId);
  const safePricingModelValue = encodeURIComponent(pricingModelValue);
  const safeRegionId = encodeURIComponent(regionId);

  const pricingFilePath = `${gcsFolderPath}/${safeRegionId}/${safeInstanceId}/${safePricingModelValue}.json`;
  console.log(`[Pricing] Attempting to get download URL for Firebase Storage path: ${pricingFilePath}`);

  try {
    const pricingFileRef = ref(storage, pricingFilePath);
    const downloadURL = await getDownloadURL(pricingFileRef);
    console.log(`[Pricing] Fetching ${provider} pricing data using download URL: ${downloadURL}`);
    const response = await fetch(downloadURL, { cache: 'no-store' });

    if (!response.ok) {
      const responseText = await response.text();
      console.error(`[Pricing] HTTP error fetching ${provider} pricing via download URL (${downloadURL}): ${response.status} ${response.statusText}`);
      console.error(`[Pricing] ${provider} Firebase Storage Error Response Body: ${responseText}`);
    } else {
      const pricingDataObject: { hourlyPrice?: number; [key: string]: any } = await response.json();
      if (pricingDataObject && typeof pricingDataObject.hourlyPrice === 'number') {
        price = parseFloat(Math.max(0.000001, pricingDataObject.hourlyPrice).toFixed(6));
      } else {
        console.warn(`[Pricing] Hourly price not found or not a number in ${provider} data from ${downloadURL}. Received data:`, pricingDataObject);
      }
    }
  } catch (error: any) {
    console.error(`[Pricing] Error during Firebase getDownloadURL or fetch for ${provider} ${instanceId} in ${regionId} (model: ${pricingModelValue}):`);
    console.error(`  Storage Path: ${pricingFilePath}`);
    console.error(`  Error Name: ${error.name}`);
    console.error(`  Error Message: ${error.message}`);
    if (error.code) console.error(`  Error Code: ${error.code}`); // Firebase storage errors often have a code
    if (error.stack) console.error('  Error stack:', error.stack);
    if (error.code === 'storage/object-not-found') {
        console.error(`[Pricing] VERIFY FILE EXISTS: Ensure the file '${pricingFilePath}' exists in your Firebase Storage bucket.`);
    } else if (error.code === 'storage/unauthorized') {
        console.error(`[Pricing] VERIFY STORAGE RULES: Ensure your Firebase Storage rules allow read access to '${pricingFilePath}'. Current public read rule should cover this if correctly deployed.`);
    }
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

    