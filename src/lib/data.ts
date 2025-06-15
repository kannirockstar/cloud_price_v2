
import type { Region, MachineFamily, CloudProvider, SelectOption, PriceData, PricingModel } from './types';
import { storage } from './firebase'; // Import Firebase storage instance
import { ref, getDownloadURL, type StorageReference } from 'firebase/storage';

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
    console.log("[Metadata] Attempting to load provider metadata using Firebase getDownloadURL()...");
    if (!storage) {
      console.error("[Metadata] CRITICAL: Firebase Storage instance is not available. Check Firebase initialization in src/lib/firebase.ts and your .env configuration.");
      metadataLoaded = false;
      metadataLoadingPromise = null;
      throw new Error("Firebase Storage not initialized. Cannot load metadata.");
    } else {
      console.log("[Metadata] Firebase Storage instance appears to be available.");
    }

    try {
      const results = await Promise.all(
        metadataFileNames.map(async (fileName) => {
          const filePath = `metadata/${fileName}`;
          let downloadURL = '';
          try {
            console.log(`[Metadata] Getting ref for: ${filePath}`);
            const fileRef: StorageReference = ref(storage, filePath);
            console.log(`[Metadata] Attempting getDownloadURL for: ${filePath}`);
            downloadURL = await getDownloadURL(fileRef);
            console.log(`[Metadata] Successfully got downloadURL for ${fileName}: ${downloadURL}`);

            console.log(`[Metadata] Fetching ${fileName} from: ${downloadURL}`);
            const response = await fetch(downloadURL, { cache: 'no-store' });
            if (!response.ok) {
              const errorText = await response.text();
              console.error(`[Metadata] Failed to fetch ${fileName} (via downloadURL ${downloadURL}). Status: ${response.status} ${response.statusText}. Response: ${errorText}`);
              throw new Error(`Failed to fetch ${fileName} (status ${response.status}). URL: ${downloadURL}`);
            }
            console.log(`[Metadata] Successfully fetched ${fileName}. Attempting to parse JSON.`);
            const jsonData = await response.json();
            console.log(`[Metadata] Successfully parsed JSON for ${fileName}.`);
            return jsonData;
          } catch (fileError: any) {
            let errorMessage = `[Metadata] Error processing ${fileName}. `;
            if (fileError.message.includes('storage/object-not-found')) {
              errorMessage += `File not found at path '${filePath}' in Firebase Storage. Please verify the file exists.`;
            } else if (fileError.message.includes('storage/unauthorized')) {
              errorMessage += `Unauthorized to access '${filePath}' in Firebase Storage. Check Firebase Storage rules.`;
            } else if (fileError.message.includes('Failed to fetch')) {
               errorMessage += `Network error or issue with download URL for '${filePath}'. URL was: ${downloadURL || 'not yet generated'}. Details: ${fileError.message}`;
            } else if (fileError instanceof SyntaxError) {
              errorMessage += `Malformed JSON in file '${fileName}'. Details: ${fileError.message}`;
            }
            else {
              errorMessage += `Details: ${fileError.message}`;
            }
            console.error(errorMessage, fileError);
            throw new Error(`Could not load ${fileName}. ${fileError.message}`);
          }
        })
      );

      googleCloudRegions = (results[0] as Region[] || []).sort((a, b) => a.name.localeCompare(b.name));
      azureRegions = (results[1] as Region[] || []).sort((a, b) => a.name.localeCompare(b.name));
      awsRegions = (results[2] as Region[] || []).sort((a, b) => a.name.localeCompare(b.name));
      machineFamilies = (results[3] as MachineFamily[] || []);

      metadataLoaded = true;
      console.log("[Metadata] Provider metadata fetching using Firebase getDownloadURL() successful.");
      console.log(`[Metadata] Loaded ${googleCloudRegions.length} GCP regions, ${azureRegions.length} Azure regions, ${awsRegions.length} AWS regions, ${machineFamilies.length} machine families.`);
    } catch (error: any) {
      console.error("[Metadata] CRITICAL ERROR during metadata loading process:", error.message);
      googleCloudRegions = [];
      azureRegions = [];
      awsRegions = [];
      machineFamilies = [];
      metadataLoaded = false;
      metadataLoadingPromise = null;
      throw error;
    }
  })();
  return metadataLoadingPromise;
}


export const getGeosForProvider = (provider: CloudProvider): SelectOption[] => {
  if (!metadataLoaded) {
    console.warn(`[MetadataAccess] getGeosForProvider called before metadata was successfully loaded or after a loading failure. Provider: ${provider}`);
  }
  let regions: Region[] = [];
  if (provider === 'Google Cloud') regions = googleCloudRegions;
  else if (provider === 'Azure') regions = azureRegions;
  else if (provider === 'AWS') regions = awsRegions;

  if (!regions || regions.length === 0) {
    console.warn(`[MetadataAccess] No regions array found for provider ${provider} in getGeosForProvider. Metadata might be missing or failed to load.`);
    return [];
  }
  const geos = Array.from(new Set(regions.map(r => r.geo)));
  return geos.map(geo => ({ value: geo, label: geo })).sort((a, b) => a.label.localeCompare(b.label));
};

export const getRegionsForProvider = (provider: CloudProvider, geo?: string): Region[] => {
  if (!metadataLoaded) {
    console.warn(`[MetadataAccess] getRegionsForProvider called before metadata was successfully loaded or after a loading failure. Provider: ${provider}, Geo: ${geo}`);
  }
  let allRegions: Region[] = [];
  if (provider === 'Google Cloud') allRegions = googleCloudRegions;
  else if (provider === 'Azure') allRegions = azureRegions;
  else if (provider === 'AWS') allRegions = awsRegions;

  if (!allRegions || allRegions.length === 0) {
    console.warn(`[MetadataAccess] No regions array found for provider ${provider} in getRegionsForProvider (geo: ${geo}).`);
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
  if (!metadataLoaded) {
     console.warn(`[MetadataAccess] getMachineFamilyGroups called before metadata was successfully loaded or after a loading failure. Provider: ${provider}`);
  }
  if (!machineFamilies || machineFamilies.length === 0) {
    console.warn(`[MetadataAccess] No machine families loaded for provider ${provider} in getMachineFamilyGroups.`);
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
    console.warn(`[MetadataAccess] getMachineInstancesForFamily called before metadata was successfully loaded or after a loading failure. Provider: ${provider}, Family: ${familyGroup}`);
  }
   if (!machineFamilies || machineFamilies.length === 0) {
    console.warn(`[MetadataAccess] No machine families loaded for provider ${provider} in getMachineInstancesForFamily.`);
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
      console.warn(`[MetadataAccess] getInstanceFullDescription called before metadata loaded for instance: ${instanceId}, provider: ${provider}`);
  }
  const mf = machineFamilies.find(m => m.id === instanceId && m.provider === provider);
  return mf ? mf.fullDescription : `${provider} Instance ${instanceId} (Details not found - metadata may not be loaded yet)`;
};

export const getRegionNameById = (provider: CloudProvider, regionId: string): string => {
  if (!metadataLoaded) {
      console.warn(`[MetadataAccess] getRegionNameById called before metadata loaded for region: ${regionId}, provider: ${provider}`);
  }
  let regions: Region[] = [];
  if (provider === 'Google Cloud') regions = googleCloudRegions;
  else if (provider === 'Azure') regions = azureRegions;
  else if (provider === 'AWS') regions = awsRegions;
  const region = regions.find(r => r.id === regionId);
  return region ? region.name : `${provider} Region ${regionId} (Name not found - metadata may not be loaded yet)`;
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
  if (!metadataLoaded && !metadataLoadingPromise) { // If not loaded and not even trying to load
    console.warn("[Pricing] Metadata not loaded and not being loaded. Attempting to load metadata first in fetchPricingData.");
    try {
        await loadProviderMetadata(); // This will set metadataLoadingPromise
    } catch (error) {
        console.error("[Pricing] Failed to initiate metadata loading in fetchPricingData. Pricing will be unavailable.", error);
    }
  } else if (metadataLoadingPromise && !metadataLoaded) { // If loading is in progress
     console.log("[Pricing] Metadata loading is in progress. Awaiting completion before fetching pricing data...");
     try {
        await metadataLoadingPromise; // Wait for the existing loading process to finish
     } catch (error) {
        console.error("[Pricing] Error occurred during metadata loading (awaited in fetchPricingData). Pricing will be unavailable.", error);
     }
  }


  const modelDetails = getPricingModelDetails(pricingModelValue) ||
                     pricingModelOptions.find(m => m.value === 'on-demand') ||
                     { label: pricingModelValue, value: pricingModelValue, providers: [], discountFactor: 1.0 }; // Fallback
  const machineFamilyName = getInstanceFullDescription(provider, instanceId);
  const regionName = getRegionNameById(provider, regionId);
  let price: number | null = null;

  let gcsFolderPathSegment = '';
  if (provider === 'Google Cloud') gcsFolderPathSegment = 'GCE';
  else if (provider === 'Azure') gcsFolderPathSegment = 'azure_prices_python';
  else if (provider === 'AWS') gcsFolderPathSegment = 'EC2';

  if (!gcsFolderPathSegment) {
    console.error(`[Pricing] No GCS folder path segment defined for provider ${provider}. Cannot fetch pricing.`);
    return {
      provider, machineFamilyId: instanceId, machineFamilyName, price: null,
      regionId, regionName, pricingModelLabel: modelDetails.label, pricingModelValue: modelDetails.value,
    };
  }

  const safeInstanceId = instanceId; // Already used as file names
  const safePricingModelValue = pricingModelValue; // Already used as file names
  const safeRegionId = regionId; // Already used as folder names

  const pricingFilePath = `${gcsFolderPathSegment}/${safeRegionId}/${safeInstanceId}/${safePricingModelValue}.json`;
  console.log(`[Pricing] Attempting to get download URL for Firebase Storage path: ${pricingFilePath}`);
  let downloadURL = '';

  try {
    const pricingFileRef = ref(storage, pricingFilePath);
    downloadURL = await getDownloadURL(pricingFileRef);
    console.log(`[Pricing] Fetching ${provider} pricing data for ${instanceId} from: ${downloadURL}`);
    const response = await fetch(downloadURL, { cache: 'no-store' });

    if (!response.ok) {
      const responseText = await response.text(); // Read error response
      console.error(`[Pricing] HTTP error fetching ${provider} pricing for ${instanceId} (via ${downloadURL}): ${response.status} ${response.statusText}. Response: ${responseText}`);
    } else {
      const pricingDataObject: { hourlyPrice?: number; [key: string]: any } = await response.json();
      if (pricingDataObject && typeof pricingDataObject.hourlyPrice === 'number') {
        price = parseFloat(Math.max(0.000001, pricingDataObject.hourlyPrice).toFixed(6));
      } else {
        console.warn(`[Pricing] Hourly price not found or not a number in ${provider} data for ${instanceId} from ${downloadURL}. Received data:`, pricingDataObject);
      }
    }
  } catch (error: any) {
    let errorMessage = `[Pricing] Error processing pricing for ${provider} ${instanceId} in ${regionId} (model: ${pricingModelValue}). Path: '${pricingFilePath}'. `;
    if (error.message.includes('storage/object-not-found')) {
      errorMessage += `File not found. Please verify the file exists in Firebase Storage.`;
    } else if (error.message.includes('storage/unauthorized')) {
      errorMessage += `Unauthorized. Check Firebase Storage rules.`;
    } else if (error.message.includes('Failed to fetch')) {
       errorMessage += `Network error or issue with download URL. URL was: ${downloadURL || 'not yet generated'}. Details: ${error.message}`;
    } else if (error instanceof SyntaxError) {
       errorMessage += `Malformed JSON in pricing file. Details: ${error.message}`;
    } else {
      errorMessage += `Details: ${error.message}`;
    }
    console.error(errorMessage, error);
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
