
import type { Region, MachineFamily, CloudProvider, SelectOption, PriceData, PricingModel } from './types';

export let googleCloudRegions: Region[] = [];
export let azureRegions: Region[] = [];
export let awsRegions: Region[] = [];
export let machineFamilies: MachineFamily[] = [];
let metadataLoaded = false;
let metadataLoadingPromise: Promise<void> | null = null;

const coreMetadataFilePaths: { [key: string]: string } = {
  googleCloudRegions: '/metadata/googleCloudRegions.json',
  azureRegions: '/metadata/azureRegions.json',
  awsRegions: '/metadata/awsRegions.json',
  machineFamilies: '/metadata/machineFamilies.json',
};

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
    try {
      const [gcpRegionsData, azRegionsData, awsRegionsData, mfData] = await Promise.all([
        fetch(coreMetadataFilePaths.googleCloudRegions, { cache: 'no-store' }).then(res => {
          if (!res.ok) throw new Error(`Failed to fetch ${coreMetadataFilePaths.googleCloudRegions}: ${res.status} ${res.statusText}. Check public/metadata folder and Next.js server.`);
          return res.json();
        }),
        fetch(coreMetadataFilePaths.azureRegions, { cache: 'no-store' }).then(res => {
          if (!res.ok) throw new Error(`Failed to fetch ${coreMetadataFilePaths.azureRegions}: ${res.status} ${res.statusText}. Check public/metadata folder and Next.js server.`);
          return res.json();
        }),
        fetch(coreMetadataFilePaths.awsRegions, { cache: 'no-store' }).then(res => {
          if (!res.ok) throw new Error(`Failed to fetch ${coreMetadataFilePaths.awsRegions}: ${res.status} ${res.statusText}. Check public/metadata folder and Next.js server.`);
          return res.json();
        }),
        fetch(coreMetadataFilePaths.machineFamilies, { cache: 'no-store' }).then(res => {
          if (!res.ok) throw new Error(`Failed to fetch ${coreMetadataFilePaths.machineFamilies}: ${res.status} ${res.statusText}. Check public/metadata folder and Next.js server.`);
          return res.json();
        }),
      ]);

      googleCloudRegions = (gcpRegionsData as Region[] || []).sort((a, b) => a.name.localeCompare(b.name));
      azureRegions = (azRegionsData as Region[] || []).sort((a, b) => a.name.localeCompare(b.name));
      awsRegions = (awsRegionsData as Region[] || []).sort((a, b) => a.name.localeCompare(b.name));
      machineFamilies = (mfData as MachineFamily[] || []);

      metadataLoaded = true;
      console.log("[Metadata] Core metadata loaded from local /public directory successfully.");
      console.log(`[Metadata] Loaded ${googleCloudRegions.length} GCP regions, ${azureRegions.length} Azure regions, ${awsRegions.length} AWS regions, ${machineFamilies.length} machine families.`);

    } catch (error: any) {
      let detailMessage = `[Metadata] CRITICAL OVERALL ERROR during local metadata loading process: ${error.message}.`;
       if (error.message && error.message.toLowerCase().includes("failed to fetch")) {
        detailMessage += `🔴 A "Failed to fetch" error occurred while trying to load core metadata from /public. This is unexpected for local static assets. Potential causes:
    1. **Build Issue:** Files might not be correctly copied to 'public/metadata'. Verify they exist at this relative path.
    2. **Server Not Running/Reachable:** The Next.js development server ('npm run dev') might have issues or was stopped. Check terminal.
    3. **Cloud Workstations Network Policy:** Although less likely for local paths, extremely restrictive egress policies or proxies in Cloud Workstations *could* interfere with how the browser resolves or accesses even localhost/same-origin resources. Check your workstation's network settings and for any active proxies.
    4. **Browser Extensions:** Ad blockers or other extensions could interfere. Try incognito mode.
    5. **Path Mismatch:** Double-check that 'public/metadata/*.json' paths are exactly correct. Filenames are case-sensitive.`;
      } else if (error instanceof SyntaxError) {
        detailMessage += `🔴 MALFORMED JSON in one of the local metadata files (e.g. regions.json, machineFamilies.json). Error: ${error.message}. Please validate the JSON content in your 'public/metadata' files.`;
      }
      console.error(detailMessage, error);
      googleCloudRegions = [];
      azureRegions = [];
      awsRegions = [];
      machineFamilies = [];
      metadataLoaded = false; // Explicitly set to false on error
      throw error; // Re-throw to ensure calling code knows about the failure
    } finally {
      metadataLoadingPromise = null;
    }
  })();
  return metadataLoadingPromise;
}

export const getGeosForProvider = (provider: CloudProvider): SelectOption[] => {
  if (!metadataLoaded) {
    console.warn(`[MetadataAccess] getGeosForProvider called before metadata was successfully loaded or after a loading failure. Provider: ${provider}. Returning empty array.`);
  }
  let regions: Region[] = [];
  if (provider === 'Google Cloud') regions = googleCloudRegions;
  else if (provider === 'Azure') regions = azureRegions;
  else if (provider === 'AWS') regions = awsRegions;

  if (!regions || regions.length === 0) {
    return [];
  }
  const geos = Array.from(new Set(regions.map(r => r.geo)));
  return geos.map(geo => ({ value: geo, label: geo })).sort((a, b) => a.label.localeCompare(b.label));
};

export const getRegionsForProvider = (provider: CloudProvider, geo?: string): Region[] => {
  if (!metadataLoaded) {
    console.warn(`[MetadataAccess] getRegionsForProvider called before metadata was successfully loaded or after a loading failure. Provider: ${provider}, Geo: ${geo}. Returning empty array.`);
  }
  let allRegions: Region[] = [];
  if (provider === 'Google Cloud') allRegions = googleCloudRegions;
  else if (provider === 'Azure') allRegions = azureRegions;
  else if (provider === 'AWS') allRegions = awsRegions;

  if (!allRegions || allRegions.length === 0) {
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
     console.warn(`[MetadataAccess] getMachineFamilyGroups called before metadata was successfully loaded or after a loading failure. Provider: ${provider}. Returning empty array.`);
  }
  if (!machineFamilies || machineFamilies.length === 0) {
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
        ramMatch = userMinRamGB <=0;
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
    console.warn(`[MetadataAccess] getMachineInstancesForFamily called before metadata was successfully loaded or after a loading failure. Provider: ${provider}, Family: ${familyGroup}. Returning empty array.`);
  }
   if (!machineFamilies || machineFamilies.length === 0) {
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
  // Spot
  { value: 'azure-spot', label: 'Azure Spot', providers: ['Azure'], discountFactor: 1.0 }, // Actual discount varies
  { value: 'spot-hourly', label: 'AWS Spot', providers: ['AWS'], discountFactor: 1.0 }, // Actual discount varies for AWS Spot
  // Google Cloud CUDs
  { value: 'gcp-1yr-cud', label: 'GCP CUD (1-Year)', providers: ['Google Cloud'], discountFactor: 0.70 },
  { value: 'gcp-3yr-cud', label: 'GCP CUD (3-Year)', providers: ['Google Cloud'], discountFactor: 0.50 },
  { value: 'gcp-1yr-flex-cud', label: 'GCP Flexible CUD (1-Year)', providers: ['Google Cloud'], discountFactor: 0.80 },
  { value: 'gcp-3yr-flex-cud', label: 'GCP Flexible CUD (3-Year)', providers: ['Google Cloud'], discountFactor: 0.60 },
  // Azure RIs & SPs
  { value: 'azure-1yr-ri-no-upfront', label: 'Azure RI (1-Yr, No Upfront)', providers: ['Azure'], discountFactor: 0.72 },
  { value: 'azure-3yr-ri-no-upfront', label: 'Azure RI (3-Yr, No Upfront)', providers: ['Azure'], discountFactor: 0.53 },
  { value: 'azure-1yr-ri-all-upfront', label: 'Azure RI (1-Yr, All Upfront)', providers: ['Azure'], discountFactor: 0.65 },
  { value: 'azure-3yr-ri-all-upfront', label: 'Azure RI (3-Yr, All Upfront)', providers: ['Azure'], discountFactor: 0.45 },
  { value: 'azure-1yr-sp', label: 'Azure Savings Plan (1-Year)', providers: ['Azure'], discountFactor: 0.70 },
  { value: 'azure-3yr-sp', label: 'Azure Savings Plan (3-Year)', providers: ['Azure'], discountFactor: 0.50 },
  // AWS RIs (based on CSV columns)
  { value: 'aws-ri-1yr-noupfront', label: 'AWS RI (1-Yr, No Upfront)', providers: ['AWS'], discountFactor: 0.70 },
  { value: 'aws-ri-3yr-noupfront', label: 'AWS RI (3-Yr, No Upfront)', providers: ['AWS'], discountFactor: 0.50 },
  { value: 'aws-ri-1yr-partialupfront', label: 'AWS RI (1-Yr, Partial Upfront)', providers: ['AWS'], discountFactor: 0.65 },
  { value: 'aws-ri-3yr-partialupfront', label: 'AWS RI (3-Yr, Partial Upfront)', providers: ['AWS'], discountFactor: 0.45 },
  { value: 'aws-ri-1yr-allupfront', label: 'AWS RI (1-Yr, All Upfront)', providers: ['AWS'], discountFactor: 0.60 },
  { value: 'aws-ri-3yr-allupfront', label: 'AWS RI (3-Yr, All Upfront)', providers: ['AWS'], discountFactor: 0.40 },
];

export const getPricingModelsForProvider = (provider: CloudProvider): SelectOption[] => {
  return pricingModelOptions
    .filter(model => model.providers.includes(provider))
    .map(model => ({ value: model.value, label: model.label }))
    .sort((a, b) => {
        if (a.value === 'on-demand') return -1;
        if (b.value === 'on-demand') return 1;
        if (provider === 'Azure' && a.value === 'azure-spot') return -1;
        if (provider === 'Azure' && b.value === 'azure-spot') return 1;
        if (provider === 'AWS' && a.value === 'spot-hourly') return -1;
        if (provider === 'AWS' && b.value === 'spot-hourly') return 1;

        const getPriority = (value: string) => {
          if (value.includes('-ri-')) return 1; 
          if (value.includes('-cud')) return 2; 
          if (value.includes('-sp')) return 3;  
          return 4;
        };

        const priorityA = getPriority(a.value);
        const priorityB = getPriority(b.value);
        if (priorityA !== priorityB) return priorityA - priorityB;

        const yearA = a.value.includes('1yr') ? 1 : (a.value.includes('3yr') ? 3 : 0);
        const yearB = b.value.includes('1yr') ? 1 : (b.value.includes('3yr') ? 3 : 0);
        if (yearA !== yearB) return yearA - yearB;

        const upfrontOrder = ['noupfront', 'partialupfront', 'allupfront'];
        const upfrontA = upfrontOrder.findIndex(u => a.value.includes(u));
        const upfrontB = upfrontOrder.findIndex(u => b.value.includes(u));

        if (upfrontA !== -1 && upfrontB !== -1 && upfrontA !== upfrontB) {
            return upfrontA - upfrontB;
        }
        if (upfrontA !== -1 && upfrontB === -1) return -1; 
        if (upfrontA === -1 && upfrontB !== -1) return 1;

        return a.label.localeCompare(b.label);
      });
};

const getInstanceFullDescription = (provider: CloudProvider, instanceId: string): string => {
  if (!metadataLoaded) {
      console.warn(`[MetadataAccess] getInstanceFullDescription called before metadata loaded for instance: ${instanceId}, provider: ${provider}. Returning default description.`);
  }
  const mf = machineFamilies.find(m => m.id === instanceId && m.provider === provider);
  return mf ? mf.fullDescription : `${provider} Instance ${instanceId} (Details not found - metadata may not be loaded yet)`;
};

export const getRegionNameById = (provider: CloudProvider, regionId: string): string => {
  if (!metadataLoaded) {
      console.warn(`[MetadataAccess] getRegionNameById called before metadata loaded for region: ${regionId}, provider: ${provider}. Returning default name.`);
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
  if (!metadataLoaded) {
    if (metadataLoadingPromise) {
      console.log("[PricingData] Core metadata loading is in progress. Awaiting completion before fetching pricing data...");
      await metadataLoadingPromise;
    } else {
      console.warn("[PricingData] Core metadata not loaded and no loading promise found. Attempting to load metadata first.");
      try {
        await loadProviderMetadata();
      } catch (error) {
        console.error("[PricingData] CRITICAL: Failed to load core metadata in fetchPricingData. Pricing will be unavailable.", error);
        const modelDetailsFall = getPricingModelDetails(pricingModelValue) || { label: pricingModelValue, value: pricingModelValue, providers: [], discountFactor: 1.0 };
        return {
          provider, machineFamilyId: instanceId, machineFamilyName: `Error loading: ${instanceId}`, price: null,
          regionId, regionName: `Error loading: ${regionId}`, pricingModelLabel: modelDetailsFall.label, pricingModelValue: modelDetailsFall.value,
          error: "Core metadata loading failed."
        };
      }
    }
  }
  if (!metadataLoaded) {
      const errorMsg = `[PricingData] Core metadata still not loaded after attempt for provider ${provider}, instance ${instanceId}. Pricing will be unavailable.`;
      console.error(errorMsg);
      const modelDetailsFall = getPricingModelDetails(pricingModelValue) || { label: pricingModelValue, value: pricingModelValue, providers: [], discountFactor: 1.0 };
      return {
          provider, machineFamilyId: instanceId, machineFamilyName: `Metadata load failed: ${instanceId}`, price: null,
          regionId, regionName: `Metadata load failed: ${regionId}`, pricingModelLabel: modelDetailsFall.label, pricingModelValue: modelDetailsFall.value,
          error: "Core metadata failed to load, cannot fetch pricing."
      };
  }

  const modelDetails = getPricingModelDetails(pricingModelValue) ||
                     pricingModelOptions.find(m => m.value === 'on-demand') || 
                     { label: pricingModelValue, value: pricingModelValue, providers: [], discountFactor: 1.0 }; 
  const machineFamilyName = getInstanceFullDescription(provider, instanceId);
  const regionName = getRegionNameById(provider, regionId);
  let price: number | null = null;
  let vcpuHourlyPrice: number | undefined = undefined;
  let ramHourlyPrice: number | undefined = undefined;
  let gcfErrorDetails: string | undefined = undefined;

  const cloudFunctionUrl = process.env.NEXT_PUBLIC_PRICING_FUNCTION_URL;

  if (!cloudFunctionUrl) {
    const errorMsg = "[PricingData] CRITICAL: NEXT_PUBLIC_PRICING_FUNCTION_URL is not set. Cannot fetch pricing data.";
    console.error(errorMsg);
    return {
      provider, machineFamilyId: instanceId, machineFamilyName, price: null,
      regionId, regionName, pricingModelLabel: modelDetails.label, pricingModelValue: modelDetails.value,
      error: errorMsg
    };
  }

  const params = new URLSearchParams({
    provider: provider,
    regionId: regionId,
    instanceId: instanceId,
    pricingModelValue: pricingModelValue,
  });
  const fullUrl = `${cloudFunctionUrl}?${params.toString()}`;

  try {
    console.log(`[PricingData] Fetching from Cloud Function: ${fullUrl}`);
    const response = await fetch(fullUrl, { cache: 'no-store' }); 

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: "Failed to parse error response from Cloud Function" }));
      console.error(`[PricingData] Cloud Function Error for ${provider} ${instanceId} in ${regionId} (model: ${pricingModelValue}): ${response.status} ${response.statusText}. Details: ${errorData?.error || 'N/A'}`);
      gcfErrorDetails = errorData?.error || `Cloud Function returned ${response.status} ${response.statusText || ''}`.trim();
    } else {
      const pricingDataObject: { hourlyPrice?: number; vcpuHourlyPrice?: number; ramHourlyPrice?: number; [key: string]: any } = await response.json();
      if (pricingDataObject && typeof pricingDataObject.hourlyPrice === 'number') {
        price = parseFloat(Math.max(0.000001, pricingDataObject.hourlyPrice).toFixed(6));
        vcpuHourlyPrice = pricingDataObject.vcpuHourlyPrice; // Will be undefined if not present
        ramHourlyPrice = pricingDataObject.ramHourlyPrice;   // Will be undefined if not present
        console.log(`[PricingData] Successfully fetched and parsed price via Cloud Function for ${provider} ${instanceId} in ${regionId} (model: ${pricingModelValue}): Total=${price}, VCPU=${vcpuHourlyPrice}, RAM=${ramHourlyPrice}`);
      } else {
        const warnMsg = `[PricingData] Hourly price not found or not a number in Cloud Function response for ${provider} ${instanceId}. Received data: ${JSON.stringify(pricingDataObject)}`;
        console.warn(warnMsg);
        gcfErrorDetails = "Cloud Function returned invalid pricing data format.";
      }
    }
  } catch (error: any) {
     let errorMessage = `[PricingData] Client-side error calling Cloud Function for ${provider} ${instanceId} in ${regionId} (model: ${pricingModelValue}). URL: '${fullUrl}'. `;
    if (error.message && error.message.toLowerCase().includes('failed to fetch')) {
        errorMessage += `NETWORK ERROR ("Failed to fetch") when calling the Cloud Function. This could be due to:
    - The Cloud Function URL being incorrect or the function not being deployed/reachable.
    - CORS issues if the Cloud Function is not configured to allow requests from your app's domain (should be handled by 'cors({ origin: true })' in GCF).
    - **Cloud Workstations Network Policy:** Egress policies might be blocking access to the GCF URL.
    - Local firewall, VPN, or proxy settings on your machine or network.
    - Browser extensions (like ad-blockers or privacy tools) interfering.`;
    } else {
        errorMessage += `Details: ${error.message}.`;
    }
    console.error(errorMessage, error);
    gcfErrorDetails = `Client-side error: ${error.message}`;
  }

  return {
    provider,
    machineFamilyId: instanceId,
    machineFamilyName,
    price, 
    vcpuHourlyPrice,
    ramHourlyPrice,
    regionId,
    regionName,
    pricingModelLabel: modelDetails.label,
    pricingModelValue: modelDetails.value,
    error: gcfErrorDetails,
  };
};
