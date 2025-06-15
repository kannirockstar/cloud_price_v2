
import type { Region, MachineFamily, CloudProvider, SelectOption, PriceData, PricingModel, CpuDetails } from './types';

// --- PURGED DATA ---
// Hardcoded region and machine family data has been removed.
// This data should now be sourced from Google Cloud Storage.
export const googleCloudRegions: Region[] = [];
export const azureRegions: Region[] = [];
export const awsRegions: Region[] = [];
export const machineFamilies: MachineFamily[] = [];

const GCS_BUCKET_NAME = 'firestore-cloud-comparator';

export const getGeosForProvider = (provider: CloudProvider): SelectOption[] => {
  let regions: Region[] = [];
  if (provider === 'Google Cloud') regions = googleCloudRegions;
  else if (provider === 'Azure') regions = azureRegions;
  else if (provider === 'AWS') regions = awsRegions;

  if (regions.length === 0) {
    console.warn(`No regions defined for provider ${provider}, returning empty geo options. This data is intended to be sourced from GCS.`);
    return [];
  }
  const geos = Array.from(new Set(regions.map(r => r.geo)));
  return geos.map(geo => ({ value: geo, label: geo })).sort((a, b) => a.label.localeCompare(b.label));
};

export const getRegionsForProvider = (provider: CloudProvider, geo?: string): Region[] => {
  let allRegions: Region[] = [];
  if (provider === 'Google Cloud') allRegions = googleCloudRegions;
  else if (provider === 'Azure') allRegions = azureRegions;
  else if (provider === 'AWS') allRegions = awsRegions;

  if (allRegions.length === 0) {
    console.warn(`No regions defined for provider ${provider}, returning empty region list. This data is intended to be sourced from GCS.`);
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
  // This function now returns empty as machineFamilies is purged.
  // It needs to be updated to fetch/use data from GCS if this filtering is still required.
  if (machineFamilies.length === 0) {
    console.warn(`machineFamilies is empty. Filtering for provider ${provider} relies on GCS data for machine family groups.`);
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
        cpuMatch = false;
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
        ramMatch = false;
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
  // This function now returns empty as machineFamilies is purged.
  // It needs to be updated to fetch/use data from GCS if this filtering is still required.
   if (machineFamilies.length === 0) {
    console.warn(`machineFamilies is empty. Filtering for provider ${provider} and familyGroup ${familyGroup} relies on GCS data for instances.`);
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
        cpuFilterMatch = false;
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
        ramFilterMatch = false;
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
  // This function will need to be updated to use data from GCS
  // or the UI needs to be adapted if this level of detail isn't in GCS.
  const mf = machineFamilies.find(m => m.id === instanceId && m.provider === provider);
  return mf ? mf.fullDescription : `${provider} Instance ${instanceId} (Details from GCS)`;
};

export const getRegionNameById = (provider: CloudProvider, regionId: string): string => {
  let regions: Region[] = [];
  if (provider === 'Google Cloud') regions = googleCloudRegions;
  else if (provider === 'Azure') regions = azureRegions;
  else if (provider === 'AWS') regions = awsRegions;
  const region = regions.find(r => r.id === regionId);
  return region ? region.name : `${provider} Region ${regionId} (Details from GCS)`;
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

  if (provider === 'AWS') {
    providerPathSegment = 'EC2';
  } else if (provider === 'Google Cloud') {
    providerPathSegment = 'GCE'; 
  } else if (provider === 'Azure') {
    providerPathSegment = 'azure_prices_python';
  }

  // Construct the GCS URL. Ensure the sub-path (/${regionId}/${instanceId}/${pricingModelValue}.json)
  // matches your actual file naming convention within the provider-specific folders.
  const gcsDataUrl = `https://storage.googleapis.com/${GCS_BUCKET_NAME}/${providerPathSegment}/${regionId}/${instanceId}/${pricingModelValue}.json`;
  
  console.log(`Attempting to fetch pricing data from GCS: ${gcsDataUrl}`);
  
  // Simulate network delay. Replace with actual fetch call.
  await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 300));

  // --- BEGIN Placeholder Logic for fetching and parsing ---
  // In a real application, you would:
  // 1. Fetch data from `gcsDataUrl`:
  //    const response = await fetch(gcsDataUrl);
  //    if (!response.ok) {
  //      console.error(`Failed to fetch from GCS (${gcsDataUrl}): ${response.status} ${response.statusText}`);
  //      throw new Error(`Failed to fetch GCS data for ${provider} ${instanceId} in ${regionId}`);
  //    }
  //    const gcsDataObject = await response.json();
  // 2. Parse `gcsDataObject` and map it to the `PriceData` structure.
  //    The structure of `gcsDataObject` depends entirely on how you store data in GCS.
  //    For example, it might contain { "hourlyPrice": 0.123, "pricingModelName": "On-Demand", ... }

  // For now, returning placeholder data based on the selected model's discount factor:
  const modelDetails = getPricingModelDetails(pricingModelValue) || { label: pricingModelValue, value: pricingModelValue, providers: [], discountFactor: 1.0};
  const machineFamilyName = getInstanceFullDescription(provider, instanceId); // Still uses potentially purged machineFamilies
  const regionName = getRegionNameById(provider, regionId); // Still uses potentially purged region data

  // Example: Generate a mock price for demonstration. Replace with actual GCS data.
  // The discountFactor is applied here as an example; your GCS data might already be discounted, or structured differently.
  const baseMockPrice = (instanceId.length % 10) * 0.1 + (regionId.length % 5) * 0.05 + 0.05; // Consistent-ish random base
  let calculatedPrice = baseMockPrice * modelDetails.discountFactor;
  
  // Add a small random fluctuation to make it seem more dynamic for now
  calculatedPrice = calculatedPrice * (1 + (Math.random() - 0.5) * 0.02);


  const fetchedPriceData: PriceData = {
    provider,
    machineFamilyId: instanceId,
    machineFamilyName, // This will be a placeholder if machineFamilies is empty
    price: parseFloat(Math.max(0.000001, calculatedPrice).toFixed(6)), // Placeholder price
    regionId,
    regionName, // This will be a placeholder if region data is empty
    pricingModelLabel: modelDetails.label,
    pricingModelValue: modelDetails.value,
  };
  // --- END Placeholder Logic ---

  // console.log("Fetched (mocked) PriceData:", fetchedPriceData);
  return fetchedPriceData;
};
