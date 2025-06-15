
import type { Region, MachineFamily, CloudProvider, SelectOption, PriceData, PricingModel, CpuDetails } from './types';

export const googleCloudRegions: Region[] = [
  { id: 'africa-south1', name: 'Johannesburg (africa-south1)', geo: 'Africa' },
  { id: 'asia-east1', name: 'Taiwan (asia-east1)', geo: 'Asia Pacific' },
  { id: 'asia-east2', name: 'Hong Kong (asia-east2)', geo: 'Asia Pacific' },
  { id: 'asia-northeast1', name: 'Tokyo (asia-northeast1)', geo: 'Asia Pacific' },
  { id: 'asia-northeast2', name: 'Osaka (asia-northeast2)', geo: 'Asia Pacific' },
  { id: 'asia-northeast3', name: 'Seoul (asia-northeast3)', geo: 'Asia Pacific' },
  { id: 'asia-south1', name: 'Mumbai (asia-south1)', geo: 'Asia Pacific' },
  { id: 'asia-south2', name: 'Delhi (asia-south2)', geo: 'Asia Pacific' },
  { id: 'asia-southeast1', name: 'Singapore (asia-southeast1)', geo: 'Asia Pacific' },
  { id: 'asia-southeast2', name: 'Jakarta (asia-southeast2)', geo: 'Asia Pacific' },
  { id: 'australia-southeast1', name: 'Sydney (australia-southeast1)', geo: 'Australia' },
  { id: 'australia-southeast2', name: 'Melbourne (australia-southeast2)', geo: 'Australia' },
  { id: 'europe-central2', name: 'Warsaw (europe-central2)', geo: 'Europe' },
  { id: 'europe-north1', name: 'Finland (europe-north1)', geo: 'Europe' },
  { id: 'europe-southwest1', name: 'Madrid (europe-southwest1)', geo: 'Europe' },
  { id: 'europe-west1', name: 'Belgium (europe-west1)', geo: 'Europe' },
  { id: 'europe-west10', name: 'Berlin (europe-west10)', geo: 'Europe'},
  { id: 'europe-west12', name: 'Turin (europe-west12)', geo: 'Europe'},
  { id: 'europe-west2', name: 'London (europe-west2)', geo: 'Europe' },
  { id: 'europe-west3', name: 'Frankfurt (europe-west3)', geo: 'Europe' },
  { id: 'europe-west4', name: 'Netherlands (europe-west4)', geo: 'Europe' },
  { id: 'europe-west6', name: 'Zurich (europe-west6)', geo: 'Europe' },
  { id: 'europe-west8', name: 'Milan (europe-west8)', geo: 'Europe' },
  { id: 'europe-west9', name: 'Paris (europe-west9)', geo: 'Europe' },
  { id: 'me-central1', name: 'Doha (me-central1)', geo: 'Middle East' },
  { id: 'me-central2', name: 'Dammam (me-central2)', geo: 'Middle East' },
  { id: 'me-west1', name: 'Tel Aviv (me-west1)', geo: 'Middle East' },
  { id: 'northamerica-northeast1', name: 'Montréal (northamerica-northeast1)', geo: 'Canada' },
  { id: 'northamerica-northeast2', name: 'Toronto (northamerica-northeast2)', geo: 'Canada' },
  { id: 'southamerica-east1', name: 'São Paulo (southamerica-east1)', geo: 'South America' },
  { id: 'southamerica-west1', name: 'Santiago (southamerica-west1)', geo: 'South America' },
  { id: 'us-central1', name: 'Iowa (us-central1)', geo: 'North America' },
  { id: 'us-east1', name: 'N. Virginia (us-east1)', geo: 'North America' },
  { id: 'us-east4', name: 'S. Carolina (us-east4)', geo: 'North America' },
  { id: 'us-east5', name: 'Columbus (us-east5)', geo: 'North America' },
  { id: 'us-south1', name: 'Dallas (us-south1)', geo: 'North America'},
  { id: 'us-west1', name: 'Oregon (us-west1)', geo: 'North America' },
  { id: 'us-west2', name: 'Los Angeles (us-west2)', geo: 'North America' },
  { id: 'us-west3', name: 'Salt Lake City (us-west3)', geo: 'North America' },
  { id: 'us-west4', name: 'Las Vegas (us-west4)', geo: 'North America' },
].sort((a,b) => a.name.localeCompare(b.name));

export const azureRegions: Region[] = [
  { id: 'australiaeast', name: 'New South Wales (Australia East)', geo: 'Australia' },
  { id: 'australiacentral', name: 'Canberra (Australia Central)', geo: 'Australia' },
  { id: 'australiacentral2', name: 'Canberra (Australia Central 2)', geo: 'Australia' },
  { id: 'australiasoutheast', name: 'Victoria (Australia Southeast)', geo: 'Australia' },
  { id: 'brazilsouth', name: 'São Paulo State (Brazil South)', geo: 'South America' },
  { id: 'brazilsoutheast', name: 'Rio de Janeiro (Brazil Southeast)', geo: 'South America' },
  { id: 'canadacentral', name: 'Toronto (Canada Central)', geo: 'Canada' },
  { id: 'canadaeast', name: 'Quebec City (Canada East)', geo: 'Canada' },
  { id: 'centralindia', name: 'Pune (Central India)', geo: 'Asia Pacific' },
  { id: 'centralus', name: 'Iowa (Central US)', geo: 'North America' },
  { id: 'chilecentral', name: 'Santiago (Chile Central)', geo: 'South America'},
  { id: 'eastasia', name: 'Hong Kong (East Asia)', geo: 'Asia Pacific' },
  { id: 'eastus', name: 'Virginia (East US)', geo: 'North America' },
  { id: 'eastus2', name: 'Virginia (East US 2)', geo: 'North America' },
  { id: 'eastus3', name: 'Georgia (East US 3)', geo: 'North America' },
  { id: 'francecentral', name: 'Paris (France Central)', geo: 'Europe' },
  { id: 'francesouth', name: 'Marseille (France South)', geo: 'Europe' },
  { id: 'germanynorth', name: 'Berlin (Germany North)', geo: 'Europe' },
  { id: 'germanywestcentral', name: 'Frankfurt (Germany West Central)', geo: 'Europe' },
  { id: 'israelcentral', name: 'Tel Aviv (Israel Central)', geo: 'Middle East'},
  { id: 'italynorth', name: 'Milan (Italy North)', geo: 'Europe' },
  { id: 'japaneast', name: 'Tokyo (Japan East)', geo: 'Asia Pacific' },
  { id: 'japanwest', name: 'Osaka (Japan West)', geo: 'Asia Pacific' },
  { id: 'jioindiacentral', name: 'Maharashtra (Jio India Central)', geo: 'Asia Pacific'},
  { id: 'jioindiawest', name: 'Gujarat (Jio India West)', geo: 'Asia Pacific'},
  { id: 'koreacentral', name: 'Seoul (Korea Central)', geo: 'Asia Pacific' },
  { id: 'koreasouth', name: 'Busan (Korea South)', geo: 'Asia Pacific' },
  { id: 'malaysiacentral', name: 'Kuala Lumpur (Malaysia Central)', geo: 'Asia Pacific'},
  { id: 'mexicocentral', name: 'Querétaro State (Mexico Central)', geo: 'North America'},
  { id: 'northcentralus', name: 'Illinois (North Central US)', geo: 'North America' },
  { id: 'northeurope', name: 'Ireland (North Europe)', geo: 'Europe' },
  { id: 'norwayeast', name: 'Oslo (Norway East)', geo: 'Europe' },
  { id: 'norwaywest', name: 'Stavanger (Norway West)', geo: 'Europe' },
  { id: 'polandcentral', name: 'Warsaw (Poland Central)', geo: 'Europe' },
  { id: 'qatarcentral', name: 'Doha (Qatar Central)', geo: 'Middle East'},
  { id: 'southafricanorth', name: 'Johannesburg (South Africa North)', geo: 'Africa' },
  { id: 'southafricawest', name: 'Cape Town (South Africa West)', geo: 'Africa' },
  { id: 'southcentralus', name: 'Texas (South Central US)', geo: 'North America' },
  { id: 'southindia', name: 'Chennai (South India)', geo: 'Asia Pacific' },
  { id: 'southeastasia', name: 'Singapore (Southeast Asia)', geo: 'Asia Pacific' },
  { id: 'spaincentral', name: 'Madrid (Spain Central)', geo: 'Europe'},
  { id: 'swedencentral', name: 'Gävle (Sweden Central)', geo: 'Europe' },
  { id: 'switzerlandnorth', name: 'Zurich (Switzerland North)', geo: 'Europe' },
  { id: 'switzerlandwest', name: 'Geneva (Switzerland West)', geo: 'Europe' },
  { id: 'taiwannorth', name: 'Taipei (Taiwan North)', geo: 'Asia Pacific'},
  { id: 'taiwannorthwest', name: 'Taipei (Taiwan Northwest)', geo: 'Asia Pacific'},
  { id: 'uaecentral', name: 'Abu Dhabi (UAE Central)', geo: 'Middle East' },
  { id: 'uaenorth', name: 'Dubai (UAE North)', geo: 'Middle East' },
  { id: 'uksouth', name: 'London (UK South)', geo: 'Europe' },
  { id: 'ukwest', name: 'Cardiff (UK West)', geo: 'Europe' },
  { id: 'westcentralus', name: 'Wyoming (West Central US)', geo: 'North America' },
  { id: 'westeurope', name: 'Netherlands (West Europe)', geo: 'Europe' },
  { id: 'westindia', name: 'Mumbai (West India)', geo: 'Asia Pacific' },
  { id: 'westus', name: 'California (West US)', geo: 'North America' },
  { id: 'westus2', name: 'Washington (West US 2)', geo: 'North America' },
  { id: 'westus3', name: 'Arizona (West US 3)', geo: 'North America' },
].sort((a,b) => a.name.localeCompare(b.name));

export const awsRegions: Region[] = [
  { id: 'us-east-1', name: 'N. Virginia (us-east-1)', geo: 'North America' },
  { id: 'us-east-2', name: 'Ohio (us-east-2)', geo: 'North America' },
  { id: 'us-west-1', name: 'N. California (us-west-1)', geo: 'North America' },
  { id: 'us-west-2', name: 'Oregon (us-west-2)', geo: 'North America' },
  { id: 'af-south-1', name: 'Cape Town (af-south-1)', geo: 'Africa' },
  { id: 'ap-east-1', name: 'Hong Kong (ap-east-1)', geo: 'Asia Pacific' },
  { id: 'ap-south-1', name: 'Mumbai (ap-south-1)', geo: 'Asia Pacific' },
  { id: 'ap-northeast-3', name: 'Osaka (ap-northeast-3)', geo: 'Asia Pacific' },
  { id: 'ap-northeast-2', name: 'Seoul (ap-northeast-2)', geo: 'Asia Pacific' },
  { id: 'ap-southeast-1', name: 'Singapore (ap-southeast-1)', geo: 'Asia Pacific' },
  { id: 'ap-southeast-2', name: 'Sydney (ap-southeast-2)', geo: 'Australia' },
  { id: 'ap-northeast-1', name: 'Tokyo (ap-northeast-1)', geo: 'Asia Pacific' },
  { id: 'ca-central-1', name: 'Central Canada (ca-central-1)', geo: 'Canada' },
  { id: 'ca-west-1', name: 'Calgary (ca-west-1)', geo: 'Canada' },
  { id: 'eu-central-1', name: 'Frankfurt (eu-central-1)', geo: 'Europe' },
  { id: 'eu-west-1', name: 'Ireland (eu-west-1)', geo: 'Europe' },
  { id: 'eu-west-2', name: 'London (eu-west-2)', geo: 'Europe' },
  { id: 'eu-south-1', name: 'Milan (eu-south-1)', geo: 'Europe' },
  { id: 'eu-west-3', name: 'Paris (eu-west-3)', geo: 'Europe' },
  { id: 'eu-north-1', name: 'Stockholm (eu-north-1)', geo: 'Europe' },
  { id: 'me-south-1', name: 'Bahrain (me-south-1)', geo: 'Middle East' },
  { id: 'me-central-1', name: 'UAE (me-central-1)', geo: 'Middle East' },
  { id: 'sa-east-1', name: 'São Paulo (sa-east-1)', geo: 'South America' },
  { id: 'ap-south-2', name: 'Hyderabad (ap-south-2)', geo: 'Asia Pacific' },
  { id: 'ap-southeast-3', name: 'Jakarta (ap-southeast-3)', geo: 'Asia Pacific' },
  { id: 'ap-southeast-4', name: 'Melbourne (ap-southeast-4)', geo: 'Australia' },
  { id: 'eu-central-2', name: 'Zurich (eu-central-2)', geo: 'Europe' },
  { id: 'eu-south-2', name: 'Spain (eu-south-2)', geo: 'Europe' },
  { id: 'il-central-1', name: 'Tel Aviv (il-central-1)', geo: 'Middle East' },
].sort((a,b) => a.name.localeCompare(b.name));

export const getGeosForProvider = (provider: CloudProvider): SelectOption[] => {
  let regions: Region[] = [];
  if (provider === 'Google Cloud') regions = googleCloudRegions;
  else if (provider === 'Azure') regions = azureRegions;
  else if (provider === 'AWS') regions = awsRegions;

  const geos = Array.from(new Set(regions.map(r => r.geo)));
  return geos.map(geo => ({ value: geo, label: geo })).sort((a, b) => a.label.localeCompare(b.label));
};

export const getRegionsForProvider = (provider: CloudProvider, geo?: string): Region[] => {
  let allRegions: Region[] = [];
  if (provider === 'Google Cloud') allRegions = googleCloudRegions;
  else if (provider === 'Azure') allRegions = azureRegions;
  else if (provider === 'AWS') allRegions = awsRegions;

  if (geo) {
    return allRegions.filter(region => region.geo === geo).sort((a,b) => a.name.localeCompare(b.name));
  }
  return allRegions.sort((a,b) => a.name.localeCompare(b.name));
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

  // AWS - Adding distinct EC2 Instance SP and Compute SP
  // EC2 Instance Savings Plans (typically offer better discounts than Compute SPs for specific instance families)
  { value: 'aws-1yr-ec2instance-sp-no-upfront', label: 'EC2 Instance SP (1-Yr, No Upfront)', providers: ['AWS'], discountFactor: 0.75 }, // Example: 25%
  { value: 'aws-3yr-ec2instance-sp-no-upfront', label: 'EC2 Instance SP (3-Yr, No Upfront)', providers: ['AWS'], discountFactor: 0.55 }, // Example: 45%
  { value: 'aws-1yr-ec2instance-sp-partial-upfront', label: 'EC2 Instance SP (1-Yr, Partial Upfront)', providers: ['AWS'], discountFactor: 0.72 }, // Example: 28%
  { value: 'aws-3yr-ec2instance-sp-partial-upfront', label: 'EC2 Instance SP (3-Yr, Partial Upfront)', providers: ['AWS'], discountFactor: 0.52 }, // Example: 48%
  { value: 'aws-1yr-ec2instance-sp-all-upfront', label: 'EC2 Instance SP (1-Yr, All Upfront)', providers: ['AWS'], discountFactor: 0.70 }, // Example: 30%
  { value: 'aws-3yr-ec2instance-sp-all-upfront', label: 'EC2 Instance SP (3-Yr, All Upfront)', providers: ['AWS'], discountFactor: 0.50 }, // Example: 50%

  // Compute Savings Plans (more flexible, slightly lower discounts typically)
  { value: 'aws-1yr-compute-sp-no-upfront', label: 'Compute SP (1-Yr, No Upfront)', providers: ['AWS'], discountFactor: 0.82 }, // Example: 18%
  { value: 'aws-3yr-compute-sp-no-upfront', label: 'Compute SP (3-Yr, No Upfront)', providers: ['AWS'], discountFactor: 0.60 }, // Example: 40%
  { value: 'aws-1yr-compute-sp-partial-upfront', label: 'Compute SP (1-Yr, Partial Upfront)', providers: ['AWS'], discountFactor: 0.80 }, // Example: 20%
  { value: 'aws-3yr-compute-sp-partial-upfront', label: 'Compute SP (3-Yr, Partial Upfront)', providers: ['AWS'], discountFactor: 0.58 }, // Example: 42%
  { value: 'aws-1yr-compute-sp-all-upfront', label: 'Compute SP (1-Yr, All Upfront)', providers: ['AWS'], discountFactor: 0.78 }, // Example: 22%
  { value: 'aws-3yr-compute-sp-all-upfront', label: 'Compute SP (3-Yr, All Upfront)', providers: ['AWS'], discountFactor: 0.56 }, // Example: 44%
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
        // Priorities for GCP and Azure
        if (label.includes('RI')) return 1; // Azure RIs
        if (label.includes('Savings Plan')) return 2; // Azure SPs
        if (label.includes('Flexible CUD')) return 4; // GCP Flex CUDs
        if (label.includes('CUD')) return 3; // GCP CUDs
        return 5;
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
          return 0;
      };
      const upfrontA = getUpfrontOrder(a.value);
      const upfrontB = getUpfrontOrder(b.value);
      if (upfrontA !== upfrontB) return upfrontA - upfrontB;

      return a.label.localeCompare(b.label);
    });
};

export const machineFamilies: MachineFamily[] = [
  // --- Google Cloud ---
  // E2 General-Purpose
  { id: 'gcp-e2-micro', familyGroup: 'E2', instanceName: 'e2-micro (Shared vCPU, 1GB RAM)', fullDescription: 'E2, e2-micro (Shared vCPU, 1GB RAM)', provider: 'Google Cloud', cpu: 'Shared', ram: '1 GB', cpuArchitecture: 'Intel', cpuClockSpeed: 'Varies' },
  { id: 'gcp-e2-small', familyGroup: 'E2', instanceName: 'e2-small (Shared vCPU, 2GB RAM)', fullDescription: 'E2, e2-small (Shared vCPU, 2GB RAM)', provider: 'Google Cloud', cpu: 'Shared', ram: '2 GB', cpuArchitecture: 'Intel', cpuClockSpeed: 'Varies' },
  { id: 'gcp-e2-medium', familyGroup: 'E2', instanceName: 'e2-medium (Shared vCPU, 4GB RAM)', fullDescription: 'E2, e2-medium (Shared vCPU, 4GB RAM)', provider: 'Google Cloud', cpu: 'Shared', ram: '4 GB', cpuArchitecture: 'Intel', cpuClockSpeed: 'Varies' },
  { id: 'gcp-e2-standard-2', familyGroup: 'E2', instanceName: 'e2-standard-2 (2 vCPU, 8GB RAM)', fullDescription: 'E2, e2-standard-2 (2 vCPU, 8GB RAM)', provider: 'Google Cloud', cpu: '2 vCPU', ram: '8 GB', cpuArchitecture: 'Intel', cpuClockSpeed: '2.2-2.8 GHz' },
  { id: 'gcp-e2-standard-4', familyGroup: 'E2', instanceName: 'e2-standard-4 (4 vCPU, 16GB RAM)', fullDescription: 'E2, e2-standard-4 (4 vCPU, 16GB RAM)', provider: 'Google Cloud', cpu: '4 vCPU', ram: '16 GB', cpuArchitecture: 'Intel', cpuClockSpeed: '2.2-2.8 GHz' },
  { id: 'gcp-e2-standard-8', familyGroup: 'E2', instanceName: 'e2-standard-8 (8 vCPU, 32GB RAM)', fullDescription: 'E2, e2-standard-8 (8 vCPU, 32GB RAM)', provider: 'Google Cloud', cpu: '8 vCPU', ram: '32 GB', cpuArchitecture: 'Intel', cpuClockSpeed: '2.2-2.8 GHz' },
  { id: 'gcp-e2-standard-16', familyGroup: 'E2', instanceName: 'e2-standard-16 (16 vCPU, 64GB RAM)', fullDescription: 'E2, e2-standard-16 (16 vCPU, 64GB RAM)', provider: 'Google Cloud', cpu: '16 vCPU', ram: '64 GB', cpuArchitecture: 'Intel', cpuClockSpeed: '2.2-2.8 GHz' },
  { id: 'gcp-e2-standard-32', familyGroup: 'E2', instanceName: 'e2-standard-32 (32 vCPU, 128GB RAM)', fullDescription: 'E2, e2-standard-32 (32 vCPU, 128GB RAM)', provider: 'Google Cloud', cpu: '32 vCPU', ram: '128 GB', cpuArchitecture: 'Intel', cpuClockSpeed: '2.2-2.8 GHz' },
  { id: 'gcp-e2-highmem-2', familyGroup: 'E2', instanceName: 'e2-highmem-2 (2 vCPU, 16GB RAM)', fullDescription: 'E2, e2-highmem-2 (2 vCPU, 16GB RAM)', provider: 'Google Cloud', cpu: '2 vCPU', ram: '16 GB', cpuArchitecture: 'Intel', cpuClockSpeed: '2.2-2.8 GHz' },
  { id: 'gcp-e2-highmem-4', familyGroup: 'E2', instanceName: 'e2-highmem-4 (4 vCPU, 32GB RAM)', fullDescription: 'E2, e2-highmem-4 (4 vCPU, 32GB RAM)', provider: 'Google Cloud', cpu: '4 vCPU', ram: '32 GB', cpuArchitecture: 'Intel', cpuClockSpeed: '2.2-2.8 GHz' },
  { id: 'gcp-e2-highmem-8', familyGroup: 'E2', instanceName: 'e2-highmem-8 (8 vCPU, 64GB RAM)', fullDescription: 'E2, e2-highmem-8 (8 vCPU, 64GB RAM)', provider: 'Google Cloud', cpu: '8 vCPU', ram: '64 GB', cpuArchitecture: 'Intel', cpuClockSpeed: '2.2-2.8 GHz' },
  { id: 'gcp-e2-highmem-16', familyGroup: 'E2', instanceName: 'e2-highmem-16 (16 vCPU, 128GB RAM)', fullDescription: 'E2, e2-highmem-16 (16 vCPU, 128GB RAM)', provider: 'Google Cloud', cpu: '16 vCPU', ram: '128 GB', cpuArchitecture: 'Intel', cpuClockSpeed: '2.2-2.8 GHz' },
  { id: 'gcp-e2-highcpu-2', familyGroup: 'E2', instanceName: 'e2-highcpu-2 (2 vCPU, 2GB RAM)', fullDescription: 'E2, e2-highcpu-2 (2 vCPU, 2GB RAM)', provider: 'Google Cloud', cpu: '2 vCPU', ram: '2 GB', cpuArchitecture: 'Intel', cpuClockSpeed: '2.2-2.8 GHz' },
  { id: 'gcp-e2-highcpu-4', familyGroup: 'E2', instanceName: 'e2-highcpu-4 (4 vCPU, 4GB RAM)', fullDescription: 'E2, e2-highcpu-4 (4 vCPU, 4GB RAM)', provider: 'Google Cloud', cpu: '4 vCPU', ram: '4 GB', cpuArchitecture: 'Intel', cpuClockSpeed: '2.2-2.8 GHz' },
  { id: 'gcp-e2-highcpu-8', familyGroup: 'E2', instanceName: 'e2-highcpu-8 (8 vCPU, 8GB RAM)', fullDescription: 'E2, e2-highcpu-8 (8 vCPU, 8GB RAM)', provider: 'Google Cloud', cpu: '8 vCPU', ram: '8 GB', cpuArchitecture: 'Intel', cpuClockSpeed: '2.2-2.8 GHz' },
  { id: 'gcp-e2-highcpu-16', familyGroup: 'E2', instanceName: 'e2-highcpu-16 (16 vCPU, 16GB RAM)', fullDescription: 'E2, e2-highcpu-16 (16 vCPU, 16GB RAM)', provider: 'Google Cloud', cpu: '16 vCPU', ram: '16 GB', cpuArchitecture: 'Intel', cpuClockSpeed: '2.2-2.8 GHz' },
  { id: 'gcp-e2-highcpu-32', familyGroup: 'E2', instanceName: 'e2-highcpu-32 (32 vCPU, 32GB RAM)', fullDescription: 'E2, e2-highcpu-32 (32 vCPU, 32GB RAM)', provider: 'Google Cloud', cpu: '32 vCPU', ram: '32GB', cpuArchitecture: 'Intel', cpuClockSpeed: '2.2-2.8 GHz' },

  // N1 General-Purpose
  { id: 'gcp-n1-standard-1', familyGroup: 'N1', instanceName: 'n1-standard-1 (1 vCPU, 3.75GB RAM)', fullDescription: 'N1, n1-standard-1 (1 vCPU, 3.75GB RAM)', provider: 'Google Cloud', cpu: '1 vCPU', ram: '3.75 GB', cpuArchitecture: 'Intel Xeon (Skylake/Broadwell/Haswell)', cpuClockSpeed: 'Up to 3.1 GHz', isSapCertified: true, sapsRating: 2450 },
  { id: 'gcp-n1-standard-2', familyGroup: 'N1', instanceName: 'n1-standard-2 (2 vCPU, 7.5GB RAM)', fullDescription: 'N1, n1-standard-2 (2 vCPU, 7.5GB RAM)', provider: 'Google Cloud', cpu: '2 vCPU', ram: '7.5 GB', cpuArchitecture: 'Intel Xeon (Skylake/Broadwell/Haswell)', cpuClockSpeed: 'Up to 3.1 GHz', isSapCertified: true, sapsRating: 4900 },
  { id: 'gcp-n1-standard-4', familyGroup: 'N1', instanceName: 'n1-standard-4 (4 vCPU, 15GB RAM)', fullDescription: 'N1, n1-standard-4 (4 vCPU, 15GB RAM)', provider: 'Google Cloud', cpu: '4 vCPU', ram: '15 GB', cpuArchitecture: 'Intel Xeon (Skylake/Broadwell/Haswell)', cpuClockSpeed: 'Up to 3.1 GHz', isSapCertified: true, sapsRating: 9800 },
  { id: 'gcp-n1-standard-8', familyGroup: 'N1', instanceName: 'n1-standard-8 (8 vCPU, 30GB RAM)', fullDescription: 'N1, n1-standard-8 (8 vCPU, 30GB RAM)', provider: 'Google Cloud', cpu: '8 vCPU', ram: '30 GB', cpuArchitecture: 'Intel Xeon (Skylake/Broadwell/Haswell)', cpuClockSpeed: 'Up to 3.1 GHz', isSapCertified: true, sapsRating: 19600 },
  { id: 'gcp-n1-standard-16', familyGroup: 'N1', instanceName: 'n1-standard-16 (16 vCPU, 60GB RAM)', fullDescription: 'N1, n1-standard-16 (16 vCPU, 60GB RAM)', provider: 'Google Cloud', cpu: '16 vCPU', ram: '60 GB', cpuArchitecture: 'Intel Xeon (Skylake/Broadwell/Haswell)', cpuClockSpeed: 'Up to 3.1 GHz', isSapCertified: true, sapsRating: 39200 },
  { id: 'gcp-n1-standard-32', familyGroup: 'N1', instanceName: 'n1-standard-32 (32 vCPU, 120GB RAM)', fullDescription: 'N1, n1-standard-32 (32 vCPU, 120GB RAM)', provider: 'Google Cloud', cpu: '32 vCPU', ram: '120 GB', cpuArchitecture: 'Intel Xeon (Skylake/Broadwell/Haswell)', cpuClockSpeed: 'Up to 3.1 GHz', isSapCertified: true, sapsRating: 78400 },
  { id: 'gcp-n1-standard-64', familyGroup: 'N1', instanceName: 'n1-standard-64 (64 vCPU, 240GB RAM)', fullDescription: 'N1, n1-standard-64 (64 vCPU, 240GB RAM)', provider: 'Google Cloud', cpu: '64 vCPU', ram: '240 GB', cpuArchitecture: 'Intel Xeon (Skylake/Broadwell/Haswell)', cpuClockSpeed: 'Up to 3.1 GHz', isSapCertified: true, sapsRating: 156800 },
  { id: 'gcp-n1-standard-96', familyGroup: 'N1', instanceName: 'n1-standard-96 (96 vCPU, 360GB RAM)', fullDescription: 'N1, n1-standard-96 (96 vCPU, 360GB RAM)', provider: 'Google Cloud', cpu: '96 vCPU', ram: '360 GB', cpuArchitecture: 'Intel Xeon (Skylake/Broadwell/Haswell)', cpuClockSpeed: 'Up to 3.1 GHz', isSapCertified: true, sapsRating: 235200 },
  { id: 'gcp-n1-highmem-2', familyGroup: 'N1', instanceName: 'n1-highmem-2 (2 vCPU, 13GB RAM)', fullDescription: 'N1, n1-highmem-2 (2 vCPU, 13GB RAM)', provider: 'Google Cloud', cpu: '2 vCPU', ram: '13 GB', cpuArchitecture: 'Intel Xeon (Skylake/Broadwell/Haswell)', cpuClockSpeed: 'Up to 3.1 GHz', isSapCertified: true, sapsRating: 4900 },
  { id: 'gcp-n1-highmem-4', familyGroup: 'N1', instanceName: 'n1-highmem-4 (4 vCPU, 26GB RAM)', fullDescription: 'N1, n1-highmem-4 (4 vCPU, 26GB RAM)', provider: 'Google Cloud', cpu: '4 vCPU', ram: '26 GB', cpuArchitecture: 'Intel Xeon (Skylake/Broadwell/Haswell)', cpuClockSpeed: 'Up to 3.1 GHz', isSapCertified: true, sapsRating: 9800 },
  { id: 'gcp-n1-highmem-8', familyGroup: 'N1', instanceName: 'n1-highmem-8 (8 vCPU, 52GB RAM)', fullDescription: 'N1, n1-highmem-8 (8 vCPU, 52GB RAM)', provider: 'Google Cloud', cpu: '8 vCPU', ram: '52 GB', cpuArchitecture: 'Intel Xeon (Skylake/Broadwell/Haswell)', cpuClockSpeed: 'Up to 3.1 GHz', isSapCertified: true, sapsRating: 19600 },
  { id: 'gcp-n1-highmem-16', familyGroup: 'N1', instanceName: 'n1-highmem-16 (16 vCPU, 104GB RAM)', fullDescription: 'N1, n1-highmem-16 (16 vCPU, 104GB RAM)', provider: 'Google Cloud', cpu: '16 vCPU', ram: '104 GB', cpuArchitecture: 'Intel Xeon (Skylake/Broadwell/Haswell)', cpuClockSpeed: 'Up to 3.1 GHz', isSapCertified: true, sapsRating: 39200 },
  { id: 'gcp-n1-highmem-32', familyGroup: 'N1', instanceName: 'n1-highmem-32 (32 vCPU, 208GB RAM)', fullDescription: 'N1, n1-highmem-32 (32 vCPU, 208GB RAM)', provider: 'Google Cloud', cpu: '32 vCPU', ram: '208 GB', cpuArchitecture: 'Intel Xeon (Skylake/Broadwell/Haswell)', cpuClockSpeed: 'Up to 3.1 GHz', isSapCertified: true, sapsRating: 78400 },
  { id: 'gcp-n1-highmem-64', familyGroup: 'N1', instanceName: 'n1-highmem-64 (64 vCPU, 416GB RAM)', fullDescription: 'N1, n1-highmem-64 (64 vCPU, 416GB RAM)', provider: 'Google Cloud', cpu: '64 vCPU', ram: '416 GB', cpuArchitecture: 'Intel Xeon (Skylake/Broadwell/Haswell)', cpuClockSpeed: 'Up to 3.1 GHz', isSapCertified: true, sapsRating: 156800 },
  { id: 'gcp-n1-highmem-96', familyGroup: 'N1', instanceName: 'n1-highmem-96 (96 vCPU, 624GB RAM)', fullDescription: 'N1, n1-highmem-96 (96 vCPU, 624GB RAM)', provider: 'Google Cloud', cpu: '96 vCPU', ram: '624 GB', cpuArchitecture: 'Intel Xeon (Skylake/Broadwell/Haswell)', cpuClockSpeed: 'Up to 3.1 GHz', isSapCertified: true, sapsRating: 235200 },
  { id: 'gcp-n1-highcpu-2', familyGroup: 'N1', instanceName: 'n1-highcpu-2 (2 vCPU, 1.8GB RAM)', fullDescription: 'N1, n1-highcpu-2 (2 vCPU, 1.8GB RAM)', provider: 'Google Cloud', cpu: '2 vCPU', ram: '1.8 GB', cpuArchitecture: 'Intel Xeon (Skylake/Broadwell/Haswell)', cpuClockSpeed: 'Up to 3.1 GHz' },
  { id: 'gcp-n1-highcpu-4', familyGroup: 'N1', instanceName: 'n1-highcpu-4 (4 vCPU, 3.6GB RAM)', fullDescription: 'N1, n1-highcpu-4 (4 vCPU, 3.6GB RAM)', provider: 'Google Cloud', cpu: '4 vCPU', ram: '3.6 GB', cpuArchitecture: 'Intel Xeon (Skylake/Broadwell/Haswell)', cpuClockSpeed: 'Up to 3.1 GHz' },
  { id: 'gcp-n1-highcpu-8', familyGroup: 'N1', instanceName: 'n1-highcpu-8 (8 vCPU, 7.2GB RAM)', fullDescription: 'N1, n1-highcpu-8 (8 vCPU, 7.2GB RAM)', provider: 'Google Cloud', cpu: '8 vCPU', ram: '7.2 GB', cpuArchitecture: 'Intel Xeon (Skylake/Broadwell/Haswell)', cpuClockSpeed: 'Up to 3.1 GHz' },
  { id: 'gcp-n1-highcpu-16', familyGroup: 'N1', instanceName: 'n1-highcpu-16 (16 vCPU, 14.4GB RAM)', fullDescription: 'N1, n1-highcpu-16 (16 vCPU, 14.4GB RAM)', provider: 'Google Cloud', cpu: '16 vCPU', ram: '14.4 GB', cpuArchitecture: 'Intel Xeon (Skylake/Broadwell/Haswell)', cpuClockSpeed: 'Up to 3.1 GHz' },
  { id: 'gcp-n1-highcpu-32', familyGroup: 'N1', instanceName: 'n1-highcpu-32 (32 vCPU, 28.8GB RAM)', fullDescription: 'N1, n1-highcpu-32 (32 vCPU, 28.8GB RAM)', provider: 'Google Cloud', cpu: '32 vCPU', ram: '28.8 GB', cpuArchitecture: 'Intel Xeon (Skylake/Broadwell/Haswell)', cpuClockSpeed: 'Up to 3.1 GHz' },
  { id: 'gcp-n1-highcpu-64', familyGroup: 'N1', instanceName: 'n1-highcpu-64 (64 vCPU, 57.6GB RAM)', fullDescription: 'N1, n1-highcpu-64 (64 vCPU, 57.6GB RAM)', provider: 'Google Cloud', cpu: '64 vCPU', ram: '57.6 GB', cpuArchitecture: 'Intel Xeon (Skylake/Broadwell/Haswell)', cpuClockSpeed: 'Up to 3.1 GHz' },
  { id: 'gcp-n1-highcpu-96', familyGroup: 'N1', instanceName: 'n1-highcpu-96 (96 vCPU, 86.4GB RAM)', fullDescription: 'N1, n1-highcpu-96 (96 vCPU, 86.4GB RAM)', provider: 'Google Cloud', cpu: '96 vCPU', ram: '86.4 GB', cpuArchitecture: 'Intel Xeon (Skylake/Broadwell/Haswell)', cpuClockSpeed: 'Up to 3.1 GHz' },

  // N2 General-Purpose (Cascade Lake)
  { id: 'gcp-n2-standard-2', familyGroup: 'N2', instanceName: 'n2-standard-2 (2 vCPU, 8GB RAM)', fullDescription: 'N2, n2-standard-2 (2 vCPU, 8GB RAM)', provider: 'Google Cloud', cpu: '2 vCPU', ram: '8 GB', cpuArchitecture: 'Intel Xeon (Cascade Lake)', cpuClockSpeed: 'Up to 3.4 GHz', isSapCertified: true, sapsRating: 5900 },
  { id: 'gcp-n2-standard-4', familyGroup: 'N2', instanceName: 'n2-standard-4 (4 vCPU, 16GB RAM)', fullDescription: 'N2, n2-standard-4 (4 vCPU, 16GB RAM)', provider: 'Google Cloud', cpu: '4 vCPU', ram: '16 GB', cpuArchitecture: 'Intel Xeon (Cascade Lake)', cpuClockSpeed: 'Up to 3.4 GHz', isSapCertified: true, sapsRating: 11800 },
  { id: 'gcp-n2-standard-8', familyGroup: 'N2', instanceName: 'n2-standard-8 (8 vCPU, 32GB RAM)', fullDescription: 'N2, n2-standard-8 (8 vCPU, 32GB RAM)', provider: 'Google Cloud', cpu: '8 vCPU', ram: '32 GB', cpuArchitecture: 'Intel Xeon (Cascade Lake)', cpuClockSpeed: 'Up to 3.4 GHz', isSapCertified: true, sapsRating: 23600 },
  { id: 'gcp-n2-standard-16', familyGroup: 'N2', instanceName: 'n2-standard-16 (16 vCPU, 64GB RAM)', fullDescription: 'N2, n2-standard-16 (16 vCPU, 64GB RAM)', provider: 'Google Cloud', cpu: '16 vCPU', ram: '64 GB', cpuArchitecture: 'Intel Xeon (Cascade Lake)', cpuClockSpeed: 'Up to 3.4 GHz', isSapCertified: true, sapsRating: 47200 },
  { id: 'gcp-n2-standard-32', familyGroup: 'N2', instanceName: 'n2-standard-32 (32 vCPU, 128GB RAM)', fullDescription: 'N2, n2-standard-32 (32 vCPU, 128GB RAM)', provider: 'Google Cloud', cpu: '32 vCPU', ram: '128 GB', cpuArchitecture: 'Intel Xeon (Cascade Lake)', cpuClockSpeed: 'Up to 3.4 GHz', isSapCertified: true, sapsRating: 94400 },
  { id: 'gcp-n2-standard-48', familyGroup: 'N2', instanceName: 'n2-standard-48 (48 vCPU, 192GB RAM)', fullDescription: 'N2, n2-standard-48 (48 vCPU, 192GB RAM)', provider: 'Google Cloud', cpu: '48 vCPU', ram: '192 GB', cpuArchitecture: 'Intel Xeon (Cascade Lake)', cpuClockSpeed: 'Up to 3.4 GHz', isSapCertified: true, sapsRating: 141600 },
  { id: 'gcp-n2-standard-64', familyGroup: 'N2', instanceName: 'n2-standard-64 (64 vCPU, 256GB RAM)', fullDescription: 'N2, n2-standard-64 (64 vCPU, 256GB RAM)', provider: 'Google Cloud', cpu: '64 vCPU', ram: '256 GB', cpuArchitecture: 'Intel Xeon (Cascade Lake)', cpuClockSpeed: 'Up to 3.4 GHz', isSapCertified: true, sapsRating: 188800 },
  { id: 'gcp-n2-standard-80', familyGroup: 'N2', instanceName: 'n2-standard-80 (80 vCPU, 320GB RAM)', fullDescription: 'N2, n2-standard-80 (80 vCPU, 320GB RAM)', provider: 'Google Cloud', cpu: '80 vCPU', ram: '320 GB', cpuArchitecture: 'Intel Xeon (Cascade Lake)', cpuClockSpeed: 'Up to 3.4 GHz', isSapCertified: true, sapsRating: 236000 },
  { id: 'gcp-n2-standard-128', familyGroup: 'N2', instanceName: 'n2-standard-128 (128 vCPU, 512GB RAM)', fullDescription: 'N2, n2-standard-128 (128 vCPU, 512GB RAM)', provider: 'Google Cloud', cpu: '128 vCPU', ram: '512GB', cpuArchitecture: 'Intel Xeon (Cascade Lake)', cpuClockSpeed: 'Up to 3.4 GHz', isSapCertified: true, sapsRating: 377600 },
  { id: 'gcp-n2-highmem-2', familyGroup: 'N2', instanceName: 'n2-highmem-2 (2 vCPU, 16GB RAM)', fullDescription: 'N2, n2-highmem-2 (2 vCPU, 16GB RAM)', provider: 'Google Cloud', cpu: '2 vCPU', ram: '16 GB', cpuArchitecture: 'Intel Xeon (Cascade Lake)', cpuClockSpeed: 'Up to 3.4 GHz', isSapCertified: true, sapsRating: 5900 },
  { id: 'gcp-n2-highmem-4', familyGroup: 'N2', instanceName: 'n2-highmem-4 (4 vCPU, 32GB RAM)', fullDescription: 'N2, n2-highmem-4 (4 vCPU, 32GB RAM)', provider: 'Google Cloud', cpu: '4 vCPU', ram: '32 GB', cpuArchitecture: 'Intel Xeon (Cascade Lake)', cpuClockSpeed: 'Up to 3.4 GHz', isSapCertified: true, sapsRating: 11800 },
  { id: 'gcp-n2-highmem-8', familyGroup: 'N2', instanceName: 'n2-highmem-8 (8 vCPU, 64GB RAM)', fullDescription: 'N2, n2-highmem-8 (8 vCPU, 64GB RAM)', provider: 'Google Cloud', cpu: '8 vCPU', ram: '64 GB', cpuArchitecture: 'Intel Xeon (Cascade Lake)', cpuClockSpeed: 'Up to 3.4 GHz', isSapCertified: true, sapsRating: 23600 },
  { id: 'gcp-n2-highmem-16', familyGroup: 'N2', instanceName: 'n2-highmem-16 (16 vCPU, 128GB RAM)', fullDescription: 'N2, n2-highmem-16 (16 vCPU, 128GB RAM)', provider: 'Google Cloud', cpu: '16 vCPU', ram: '128 GB', cpuArchitecture: 'Intel Xeon (Cascade Lake)', cpuClockSpeed: 'Up to 3.4 GHz', isSapCertified: true, sapsRating: 47200 },
  { id: 'gcp-n2-highmem-32', familyGroup: 'N2', instanceName: 'n2-highmem-32 (32 vCPU, 256GB RAM)', fullDescription: 'N2, n2-highmem-32 (32 vCPU, 256GB RAM)', provider: 'Google Cloud', cpu: '32 vCPU', ram: '256 GB', cpuArchitecture: 'Intel Xeon (Cascade Lake)', cpuClockSpeed: 'Up to 3.4 GHz', isSapCertified: true, sapsRating: 94400 },
  { id: 'gcp-n2-highmem-48', familyGroup: 'N2', instanceName: 'n2-highmem-48 (48 vCPU, 384GB RAM)', fullDescription: 'N2, n2-highmem-48 (48 vCPU, 384GB RAM)', provider: 'Google Cloud', cpu: '48 vCPU', ram: '384 GB', cpuArchitecture: 'Intel Xeon (Cascade Lake)', cpuClockSpeed: 'Up to 3.4 GHz', isSapCertified: true, sapsRating: 141600 },
  { id: 'gcp-n2-highmem-64', familyGroup: 'N2', instanceName: 'n2-highmem-64 (64 vCPU, 512GB RAM)', fullDescription: 'N2, n2-highmem-64 (64 vCPU, 512GB RAM)', provider: 'Google Cloud', cpu: '64 vCPU', ram: '512 GB', cpuArchitecture: 'Intel Xeon (Cascade Lake)', cpuClockSpeed: 'Up to 3.4 GHz', isSapCertified: true, sapsRating: 188800 },
  { id: 'gcp-n2-highmem-80', familyGroup: 'N2', instanceName: 'n2-highmem-80 (80 vCPU, 640GB RAM)', fullDescription: 'N2, n2-highmem-80 (80 vCPU, 640GB RAM)', provider: 'Google Cloud', cpu: '80 vCPU', ram: '640 GB', cpuArchitecture: 'Intel Xeon (Cascade Lake)', cpuClockSpeed: 'Up to 3.4 GHz', isSapCertified: true, sapsRating: 236000 },
  { id: 'gcp-n2-highmem-128', familyGroup: 'N2', instanceName: 'n2-highmem-128 (128 vCPU, 864GB RAM)', fullDescription: 'N2, n2-highmem-128 (128 vCPU, 864GB RAM)', provider: 'Google Cloud', cpu: '128 vCPU', ram: '864GB', cpuArchitecture: 'Intel Xeon (Cascade Lake)', cpuClockSpeed: 'Up to 3.4 GHz', isSapCertified: true, sapsRating: 377600 },
  { id: 'gcp-n2-highcpu-2', familyGroup: 'N2', instanceName: 'n2-highcpu-2 (2 vCPU, 2GB RAM)', fullDescription: 'N2, n2-highcpu-2 (2 vCPU, 2GB RAM)', provider: 'Google Cloud', cpu: '2 vCPU', ram: '2 GB', cpuArchitecture: 'Intel Xeon (Cascade Lake)', cpuClockSpeed: 'Up to 3.4 GHz' },
  { id: 'gcp-n2-highcpu-4', familyGroup: 'N2', instanceName: 'n2-highcpu-4 (4 vCPU, 4GB RAM)', fullDescription: 'N2, n2-highcpu-4 (4 vCPU, 4GB RAM)', provider: 'Google Cloud', cpu: '4 vCPU', ram: '4 GB', cpuArchitecture: 'Intel Xeon (Cascade Lake)', cpuClockSpeed: 'Up to 3.4 GHz' },
  { id: 'gcp-n2-highcpu-8', familyGroup: 'N2', instanceName: 'n2-highcpu-8 (8 vCPU, 8GB RAM)', fullDescription: 'N2, n2-highcpu-8 (8 vCPU, 8GB RAM)', provider: 'Google Cloud', cpu: '8 vCPU', ram: '8 GB', cpuArchitecture: 'Intel Xeon (Cascade Lake)', cpuClockSpeed: 'Up to 3.4 GHz' },
  { id: 'gcp-n2-highcpu-16', familyGroup: 'N2', instanceName: 'n2-highcpu-16 (16 vCPU, 16GB RAM)', fullDescription: 'N2, n2-highcpu-16 (16 vCPU, 16GB RAM)', provider: 'Google Cloud', cpu: '16 vCPU', ram: '16 GB', cpuArchitecture: 'Intel Xeon (Cascade Lake)', cpuClockSpeed: 'Up to 3.4 GHz' },
  { id: 'gcp-n2-highcpu-32', familyGroup: 'N2', instanceName: 'n2-highcpu-32 (32 vCPU, 32GB RAM)', fullDescription: 'N2, n2-highcpu-32 (32 vCPU, 32GB RAM)', provider: 'Google Cloud', cpu: '32 vCPU', ram: '32 GB', cpuArchitecture: 'Intel Xeon (Cascade Lake)', cpuClockSpeed: 'Up to 3.4 GHz' },
  { id: 'gcp-n2-highcpu-48', familyGroup: 'N2', instanceName: 'n2-highcpu-48 (48 vCPU, 48GB RAM)', fullDescription: 'N2, n2-highcpu-48 (48 vCPU, 48GB RAM)', provider: 'Google Cloud', cpu: '48 vCPU', ram: '48 GB', cpuArchitecture: 'Intel Xeon (Cascade Lake)', cpuClockSpeed: 'Up to 3.4 GHz' },
  { id: 'gcp-n2-highcpu-64', familyGroup: 'N2', instanceName: 'n2-highcpu-64 (64 vCPU, 64GB RAM)', fullDescription: 'N2, n2-highcpu-64 (64 vCPU, 64GB RAM)', provider: 'Google Cloud', cpu: '64 vCPU', ram: '64 GB', cpuArchitecture: 'Intel Xeon (Cascade Lake)', cpuClockSpeed: 'Up to 3.4 GHz' },
  { id: 'gcp-n2-highcpu-80', familyGroup: 'N2', instanceName: 'n2-highcpu-80 (80 vCPU, 80GB RAM)', fullDescription: 'N2, n2-highcpu-80 (80 vCPU, 80GB RAM)', provider: 'Google Cloud', cpu: '80 vCPU', ram: '80 GB', cpuArchitecture: 'Intel Xeon (Cascade Lake)', cpuClockSpeed: 'Up to 3.4 GHz' },

  // N2D General-Purpose (AMD EPYC Rome/Milan)
  { id: 'gcp-n2d-standard-2', familyGroup: 'N2D', instanceName: 'n2d-standard-2 (2 vCPU, 8GB RAM)', fullDescription: 'N2D, n2d-standard-2 (2 vCPU, 8GB RAM)', provider: 'Google Cloud', cpu: '2 vCPU', ram: '8 GB', cpuArchitecture: 'AMD EPYC (Rome/Milan)', cpuClockSpeed: 'Up to 3.3 GHz', isSapCertified: true, sapsRating: 5500 },
  { id: 'gcp-n2d-standard-4', familyGroup: 'N2D', instanceName: 'n2d-standard-4 (4 vCPU, 16GB RAM)', fullDescription: 'N2D, n2d-standard-4 (4 vCPU, 16GB RAM)', provider: 'Google Cloud', cpu: '4 vCPU', ram: '16 GB', cpuArchitecture: 'AMD EPYC (Rome/Milan)', cpuClockSpeed: 'Up to 3.3 GHz', isSapCertified: true, sapsRating: 11000 },
  { id: 'gcp-n2d-standard-8', familyGroup: 'N2D', instanceName: 'n2d-standard-8 (8 vCPU, 32GB RAM)', fullDescription: 'N2D, n2d-standard-8 (8 vCPU, 32GB RAM)', provider: 'Google Cloud', cpu: '8 vCPU', ram: '32 GB', cpuArchitecture: 'AMD EPYC (Rome/Milan)', cpuClockSpeed: 'Up to 3.3 GHz', isSapCertified: true, sapsRating: 22000 },
  { id: 'gcp-n2d-standard-16', familyGroup: 'N2D', instanceName: 'n2d-standard-16 (16 vCPU, 64GB RAM)', fullDescription: 'N2D, n2d-standard-16 (16 vCPU, 64GB RAM)', provider: 'Google Cloud', cpu: '16 vCPU', ram: '64 GB', cpuArchitecture: 'AMD EPYC (Rome/Milan)', cpuClockSpeed: 'Up to 3.3 GHz', isSapCertified: true, sapsRating: 44000 },
  { id: 'gcp-n2d-standard-32', familyGroup: 'N2D', instanceName: 'n2d-standard-32 (32 vCPU, 128GB RAM)', fullDescription: 'N2D, n2d-standard-32 (32 vCPU, 128GB RAM)', provider: 'Google Cloud', cpu: '32 vCPU', ram: '128 GB', cpuArchitecture: 'AMD EPYC (Rome/Milan)', cpuClockSpeed: 'Up to 3.3 GHz', isSapCertified: true, sapsRating: 88000 },
  { id: 'gcp-n2d-standard-48', familyGroup: 'N2D', instanceName: 'n2d-standard-48 (48 vCPU, 192GB RAM)', fullDescription: 'N2D, n2d-standard-48 (48 vCPU, 192GB RAM)', provider: 'Google Cloud', cpu: '48 vCPU', ram: '192 GB', cpuArchitecture: 'AMD EPYC (Rome/Milan)', cpuClockSpeed: 'Up to 3.3 GHz', isSapCertified: true, sapsRating: 132000 },
  { id: 'gcp-n2d-standard-64', familyGroup: 'N2D', instanceName: 'n2d-standard-64 (64 vCPU, 256GB RAM)', fullDescription: 'N2D, n2d-standard-64 (64 vCPU, 256GB RAM)', provider: 'Google Cloud', cpu: '64 vCPU', ram: '256 GB', cpuArchitecture: 'AMD EPYC (Rome/Milan)', cpuClockSpeed: 'Up to 3.3 GHz', isSapCertified: true, sapsRating: 176000 },
  { id: 'gcp-n2d-standard-80', familyGroup: 'N2D', instanceName: 'n2d-standard-80 (80 vCPU, 320GB RAM)', fullDescription: 'N2D, n2d-standard-80 (80 vCPU, 320GB RAM)', provider: 'Google Cloud', cpu: '80 vCPU', ram: '320 GB', cpuArchitecture: 'AMD EPYC (Rome/Milan)', cpuClockSpeed: 'Up to 3.3 GHz', isSapCertified: true, sapsRating: 220000 },
  { id: 'gcp-n2d-standard-96', familyGroup: 'N2D', instanceName: 'n2d-standard-96 (96 vCPU, 384GB RAM)', fullDescription: 'N2D, n2d-standard-96 (96 vCPU, 384GB RAM)', provider: 'Google Cloud', cpu: '96 vCPU', ram: '384 GB', cpuArchitecture: 'AMD EPYC (Rome/Milan)', cpuClockSpeed: 'Up to 3.3 GHz', isSapCertified: true, sapsRating: 264000 },
  { id: 'gcp-n2d-standard-128', familyGroup: 'N2D', instanceName: 'n2d-standard-128 (128 vCPU, 512GB RAM)', fullDescription: 'N2D, n2d-standard-128 (128 vCPU, 512GB RAM)', provider: 'Google Cloud', cpu: '128 vCPU', ram: '512GB', cpuArchitecture: 'AMD EPYC (Rome/Milan)', cpuClockSpeed: 'Up to 3.3 GHz', isSapCertified: true, sapsRating: 352000 },
  { id: 'gcp-n2d-standard-224', familyGroup: 'N2D', instanceName: 'n2d-standard-224 (224 vCPU, 896GB RAM)', fullDescription: 'N2D, n2d-standard-224 (224 vCPU, 896GB RAM)', provider: 'Google Cloud', cpu: '224 vCPU', ram: '896GB', cpuArchitecture: 'AMD EPYC (Milan)', cpuClockSpeed: 'Up to 3.5 GHz', isSapCertified: true, sapsRating: 616000 },
  { id: 'gcp-n2d-highmem-2', familyGroup: 'N2D', instanceName: 'n2d-highmem-2 (2 vCPU, 16GB RAM)', fullDescription: 'N2D, n2d-highmem-2 (2 vCPU, 16GB RAM)', provider: 'Google Cloud', cpu: '2 vCPU', ram: '16 GB', cpuArchitecture: 'AMD EPYC (Rome/Milan)', cpuClockSpeed: 'Up to 3.3 GHz', isSapCertified: true, sapsRating: 5500 },
  { id: 'gcp-n2d-highmem-4', familyGroup: 'N2D', instanceName: 'n2d-highmem-4 (4 vCPU, 32GB RAM)', fullDescription: 'N2D, n2d-highmem-4 (4 vCPU, 32GB RAM)', provider: 'Google Cloud', cpu: '4 vCPU', ram: '32 GB', cpuArchitecture: 'AMD EPYC (Rome/Milan)', cpuClockSpeed: 'Up to 3.3 GHz', isSapCertified: true, sapsRating: 11000 },
  { id: 'gcp-n2d-highmem-8', familyGroup: 'N2D', instanceName: 'n2d-highmem-8 (8 vCPU, 64GB RAM)', fullDescription: 'N2D, n2d-highmem-8 (8 vCPU, 64GB RAM)', provider: 'Google Cloud', cpu: '8 vCPU', ram: '64 GB', cpuArchitecture: 'AMD EPYC (Rome/Milan)', cpuClockSpeed: 'Up to 3.3 GHz', isSapCertified: true, sapsRating: 22000 },
  { id: 'gcp-n2d-highmem-16', familyGroup: 'N2D', instanceName: 'n2d-highmem-16 (16 vCPU, 128GB RAM)', fullDescription: 'N2D, n2d-highmem-16 (16 vCPU, 128GB RAM)', provider: 'Google Cloud', cpu: '16 vCPU', ram: '128 GB', cpuArchitecture: 'AMD EPYC (Rome/Milan)', cpuClockSpeed: 'Up to 3.3 GHz', isSapCertified: true, sapsRating: 44000 },
  { id: 'gcp-n2d-highmem-32', familyGroup: 'N2D', instanceName: 'n2d-highmem-32 (32 vCPU, 256GB RAM)', fullDescription: 'N2D, n2d-highmem-32 (32 vCPU, 256GB RAM)', provider: 'Google Cloud', cpu: '32 vCPU', ram: '256 GB', cpuArchitecture: 'AMD EPYC (Rome/Milan)', cpuClockSpeed: 'Up to 3.3 GHz', isSapCertified: true, sapsRating: 88000 },
  { id: 'gcp-n2d-highmem-48', familyGroup: 'N2D', instanceName: 'n2d-highmem-48 (48 vCPU, 384GB RAM)', fullDescription: 'N2D, n2d-highmem-48 (48 vCPU, 384GB RAM)', provider: 'Google Cloud', cpu: '48 vCPU', ram: '384 GB', cpuArchitecture: 'AMD EPYC (Rome/Milan)', cpuClockSpeed: 'Up to 3.3 GHz', isSapCertified: true, sapsRating: 132000 },
  { id: 'gcp-n2d-highmem-64', familyGroup: 'N2D', instanceName: 'n2d-highmem-64 (64 vCPU, 512GB RAM)', fullDescription: 'N2D, n2d-highmem-64 (64 vCPU, 512GB RAM)', provider: 'Google Cloud', cpu: '64 vCPU', ram: '512 GB', cpuArchitecture: 'AMD EPYC (Rome/Milan)', cpuClockSpeed: 'Up to 3.3 GHz', isSapCertified: true, sapsRating: 176000 },
  { id: 'gcp-n2d-highmem-80', familyGroup: 'N2D', instanceName: 'n2d-highmem-80 (80 vCPU, 640GB RAM)', fullDescription: 'N2D, n2d-highmem-80 (80 vCPU, 640GB RAM)', provider: 'Google Cloud', cpu: '80 vCPU', ram: '640 GB', cpuArchitecture: 'AMD EPYC (Rome/Milan)', cpuClockSpeed: 'Up to 3.3 GHz', isSapCertified: true, sapsRating: 220000 },
  { id: 'gcp-n2d-highmem-96', familyGroup: 'N2D', instanceName: 'n2d-highmem-96 (96 vCPU, 768GB RAM)', fullDescription: 'N2D, n2d-highmem-96 (96 vCPU, 768GB RAM)', provider: 'Google Cloud', cpu: '96 vCPU', ram: '768 GB', cpuArchitecture: 'AMD EPYC (Rome/Milan)', cpuClockSpeed: 'Up to 3.3 GHz', isSapCertified: true, sapsRating: 264000 },
  { id: 'gcp-n2d-highcpu-2', familyGroup: 'N2D', instanceName: 'n2d-highcpu-2 (2 vCPU, 2GB RAM)', fullDescription: 'N2D, n2d-highcpu-2 (2 vCPU, 2GB RAM)', provider: 'Google Cloud', cpu: '2 vCPU', ram: '2 GB', cpuArchitecture: 'AMD EPYC (Rome/Milan)', cpuClockSpeed: 'Up to 3.3 GHz' },
  { id: 'gcp-n2d-highcpu-4', familyGroup: 'N2D', instanceName: 'n2d-highcpu-4 (4 vCPU, 4GB RAM)', fullDescription: 'N2D, n2d-highcpu-4 (4 vCPU, 4GB RAM)', provider: 'Google Cloud', cpu: '4 vCPU', ram: '4 GB', cpuArchitecture: 'AMD EPYC (Rome/Milan)', cpuClockSpeed: 'Up to 3.3 GHz' },
  { id: 'gcp-n2d-highcpu-8', familyGroup: 'N2D', instanceName: 'n2d-highcpu-8 (8 vCPU, 8GB RAM)', fullDescription: 'N2D, n2d-highcpu-8 (8 vCPU, 8GB RAM)', provider: 'Google Cloud', cpu: '8 vCPU', ram: '8 GB', cpuArchitecture: 'AMD EPYC (Rome/Milan)', cpuClockSpeed: 'Up to 3.3 GHz' },
  { id: 'gcp-n2d-highcpu-16', familyGroup: 'N2D', instanceName: 'n2d-highcpu-16 (16 vCPU, 16GB RAM)', fullDescription: 'N2D, n2d-highcpu-16 (16 vCPU, 16GB RAM)', provider: 'Google Cloud', cpu: '16 vCPU', ram: '16 GB', cpuArchitecture: 'AMD EPYC (Rome/Milan)', cpuClockSpeed: 'Up to 3.3 GHz' },
  { id: 'gcp-n2d-highcpu-32', familyGroup: 'N2D', instanceName: 'n2d-highcpu-32 (32 vCPU, 32GB RAM)', fullDescription: 'N2D, n2d-highcpu-32 (32 vCPU, 32GB RAM)', provider: 'Google Cloud', cpu: '32 vCPU', ram: '32 GB', cpuArchitecture: 'AMD EPYC (Rome/Milan)', cpuClockSpeed: 'Up to 3.3 GHz' },
  { id: 'gcp-n2d-highcpu-48', familyGroup: 'N2D', instanceName: 'n2d-highcpu-48 (48 vCPU, 48GB RAM)', fullDescription: 'N2D, n2d-highcpu-48 (48 vCPU, 48GB RAM)', provider: 'Google Cloud', cpu: '48 vCPU', ram: '48 GB', cpuArchitecture: 'AMD EPYC (Rome/Milan)', cpuClockSpeed: 'Up to 3.3 GHz' },
  { id: 'gcp-n2d-highcpu-64', familyGroup: 'N2D', instanceName: 'n2d-highcpu-64 (64 vCPU, 64GB RAM)', fullDescription: 'N2D, n2d-highcpu-64 (64 vCPU, 64GB RAM)', provider: 'Google Cloud', cpu: '64 vCPU', ram: '64 GB', cpuArchitecture: 'AMD EPYC (Rome/Milan)', cpuClockSpeed: 'Up to 3.3 GHz' },
  { id: 'gcp-n2d-highcpu-80', familyGroup: 'N2D', instanceName: 'n2d-highcpu-80 (80 vCPU, 80GB RAM)', fullDescription: 'N2D, n2d-highcpu-80 (80 vCPU, 80GB RAM)', provider: 'Google Cloud', cpu: '80 vCPU', ram: '80 GB', cpuArchitecture: 'AMD EPYC (Rome/Milan)', cpuClockSpeed: 'Up to 3.3 GHz' },
  { id: 'gcp-n2d-highcpu-96', familyGroup: 'N2D', instanceName: 'n2d-highcpu-96 (96 vCPU, 96GB RAM)', fullDescription: 'N2D, n2d-highcpu-96 (96 vCPU, 96GB RAM)', provider: 'Google Cloud', cpu: '96 vCPU', ram: '96 GB', cpuArchitecture: 'AMD EPYC (Rome/Milan)', cpuClockSpeed: 'Up to 3.3 GHz' },
  { id: 'gcp-n2d-highcpu-128', familyGroup: 'N2D', instanceName: 'n2d-highcpu-128 (128 vCPU, 128GB RAM)', fullDescription: 'N2D, n2d-highcpu-128 (128 vCPU, 128GB RAM)', provider: 'Google Cloud', cpu: '128 vCPU', ram: '128 GB', cpuArchitecture: 'AMD EPYC (Rome/Milan)', cpuClockSpeed: 'Up to 3.3 GHz' },
  { id: 'gcp-n2d-highcpu-224', familyGroup: 'N2D', instanceName: 'n2d-highcpu-224 (224 vCPU, 224GB RAM)', fullDescription: 'N2D, n2d-highcpu-224 (224 vCPU, 224GB RAM)', provider: 'Google Cloud', cpu: '224 vCPU', ram: '224 GB', cpuArchitecture: 'AMD EPYC (Milan)', cpuClockSpeed: 'Up to 3.5 GHz' },

  // N4 General-Purpose (Intel Emerald Rapids)
  { id: 'gcp-n4-standard-2', familyGroup: 'N4', instanceName: 'n4-standard-2 (2 vCPU, 8GB RAM)', fullDescription: 'N4, n4-standard-2 (2 vCPU, 8GB RAM)', provider: 'Google Cloud', cpu: '2 vCPU', ram: '8GB', cpuArchitecture: 'Intel Xeon (Emerald Rapids)', cpuClockSpeed: 'Up to 3.5 GHz', isSapCertified: true, sapsRating: 6500 },
  { id: 'gcp-n4-standard-4', familyGroup: 'N4', instanceName: 'n4-standard-4 (4 vCPU, 16GB RAM)', fullDescription: 'N4, n4-standard-4 (4 vCPU, 16GB RAM)', provider: 'Google Cloud', cpu: '4 vCPU', ram: '16GB', cpuArchitecture: 'Intel Xeon (Emerald Rapids)', cpuClockSpeed: 'Up to 3.5 GHz', isSapCertified: true, sapsRating: 13000 },
  { id: 'gcp-n4-standard-8', familyGroup: 'N4', instanceName: 'n4-standard-8 (8 vCPU, 32GB RAM)', fullDescription: 'N4, n4-standard-8 (8 vCPU, 32GB RAM)', provider: 'Google Cloud', cpu: '8 vCPU', ram: '32GB', cpuArchitecture: 'Intel Xeon (Emerald Rapids)', cpuClockSpeed: 'Up to 3.5 GHz', isSapCertified: true, sapsRating: 26000 },
  { id: 'gcp-n4-standard-16', familyGroup: 'N4', instanceName: 'n4-standard-16 (16 vCPU, 64GB RAM)', fullDescription: 'N4, n4-standard-16 (16 vCPU, 64GB RAM)', provider: 'Google Cloud', cpu: '16 vCPU', ram: '64GB', cpuArchitecture: 'Intel Xeon (Emerald Rapids)', cpuClockSpeed: 'Up to 3.5 GHz', isSapCertified: true, sapsRating: 52000 },
  { id: 'gcp-n4-standard-32', familyGroup: 'N4', instanceName: 'n4-standard-32 (32 vCPU, 128GB RAM)', fullDescription: 'N4, n4-standard-32 (32 vCPU, 128GB RAM)', provider: 'Google Cloud', cpu: '32 vCPU', ram: '128GB', cpuArchitecture: 'Intel Xeon (Emerald Rapids)', cpuClockSpeed: 'Up to 3.5 GHz', isSapCertified: true, sapsRating: 104000 },
  { id: 'gcp-n4-standard-48', familyGroup: 'N4', instanceName: 'n4-standard-48 (48 vCPU, 192GB RAM)', fullDescription: 'N4, n4-standard-48 (48 vCPU, 192GB RAM)', provider: 'Google Cloud', cpu: '48 vCPU', ram: '192GB', cpuArchitecture: 'Intel Xeon (Emerald Rapids)', cpuClockSpeed: 'Up to 3.5 GHz', isSapCertified: true, sapsRating: 156000 },
  { id: 'gcp-n4-standard-64', familyGroup: 'N4', instanceName: 'n4-standard-64 (64 vCPU, 256GB RAM)', fullDescription: 'N4, n4-standard-64 (64 vCPU, 256GB RAM)', provider: 'Google Cloud', cpu: '64 vCPU', ram: '256GB', cpuArchitecture: 'Intel Xeon (Emerald Rapids)', cpuClockSpeed: 'Up to 3.5 GHz', isSapCertified: true, sapsRating: 208000 },
  { id: 'gcp-n4-standard-80', familyGroup: 'N4', instanceName: 'n4-standard-80 (80 vCPU, 320GB RAM)', fullDescription: 'N4, n4-standard-80 (80 vCPU, 320GB RAM)', provider: 'Google Cloud', cpu: '80 vCPU', ram: '320GB', cpuArchitecture: 'Intel Xeon (Emerald Rapids)', cpuClockSpeed: 'Up to 3.5 GHz', isSapCertified: true, sapsRating: 260000 },
  { id: 'gcp-n4-highmem-2', familyGroup: 'N4', instanceName: 'n4-highmem-2 (2 vCPU, 16GB RAM)', fullDescription: 'N4, n4-highmem-2 (2 vCPU, 16GB RAM)', provider: 'Google Cloud', cpu: '2 vCPU', ram: '16GB', cpuArchitecture: 'Intel Xeon (Emerald Rapids)', cpuClockSpeed: 'Up to 3.5 GHz', isSapCertified: true, sapsRating: 6500 },
  { id: 'gcp-n4-highmem-4', familyGroup: 'N4', instanceName: 'n4-highmem-4 (4 vCPU, 32GB RAM)', fullDescription: 'N4, n4-highmem-4 (4 vCPU, 32GB RAM)', provider: 'Google Cloud', cpu: '4 vCPU', ram: '32GB', cpuArchitecture: 'Intel Xeon (Emerald Rapids)', cpuClockSpeed: 'Up to 3.5 GHz', isSapCertified: true, sapsRating: 13000 },
  { id: 'gcp-n4-highmem-8', familyGroup: 'N4', instanceName: 'n4-highmem-8 (8 vCPU, 64GB RAM)', fullDescription: 'N4, n4-highmem-8 (8 vCPU, 64GB RAM)', provider: 'Google Cloud', cpu: '8 vCPU', ram: '64GB', cpuArchitecture: 'Intel Xeon (Emerald Rapids)', cpuClockSpeed: 'Up to 3.5 GHz', isSapCertified: true, sapsRating: 26000 },
  { id: 'gcp-n4-highcpu-2', familyGroup: 'N4', instanceName: 'n4-highcpu-2 (2 vCPU, 4GB RAM)', fullDescription: 'N4, n4-highcpu-2 (2 vCPU, 4GB RAM)', provider: 'Google Cloud', cpu: '2 vCPU', ram: '4GB', cpuArchitecture: 'Intel Xeon (Emerald Rapids)', cpuClockSpeed: 'Up to 3.5 GHz' },
  { id: 'gcp-n4-highcpu-4', familyGroup: 'N4', instanceName: 'n4-highcpu-4 (4 vCPU, 8GB RAM)', fullDescription: 'N4, n4-highcpu-4 (4 vCPU, 8GB RAM)', provider: 'Google Cloud', cpu: '4 vCPU', ram: '8GB', cpuArchitecture: 'Intel Xeon (Emerald Rapids)', cpuClockSpeed: 'Up to 3.5 GHz' },

  // T2D General-Purpose (AMD EPYC Milan) - Scale-out optimized
  { id: 'gcp-t2d-standard-1', familyGroup: 'T2D', instanceName: 't2d-standard-1 (1 vCPU, 4GB RAM)', fullDescription: 'T2D, t2d-standard-1 (1 vCPU, 4GB RAM)', provider: 'Google Cloud', cpu: '1 vCPU', ram: '4GB', cpuArchitecture: 'AMD EPYC (Milan)', cpuClockSpeed: 'Up to 3.5 GHz'},
  { id: 'gcp-t2d-standard-2', familyGroup: 'T2D', instanceName: 't2d-standard-2 (2 vCPU, 8GB RAM)', fullDescription: 'T2D, t2d-standard-2 (2 vCPU, 8GB RAM)', provider: 'Google Cloud', cpu: '2 vCPU', ram: '8GB', cpuArchitecture: 'AMD EPYC (Milan)', cpuClockSpeed: 'Up to 3.5 GHz'},
  { id: 'gcp-t2d-standard-4', familyGroup: 'T2D', instanceName: 't2d-standard-4 (4 vCPU, 16GB RAM)', fullDescription: 'T2D, t2d-standard-4 (4 vCPU, 16GB RAM)', provider: 'Google Cloud', cpu: '4 vCPU', ram: '16GB', cpuArchitecture: 'AMD EPYC (Milan)', cpuClockSpeed: 'Up to 3.5 GHz'},
  { id: 'gcp-t2d-standard-8', familyGroup: 'T2D', instanceName: 't2d-standard-8 (8 vCPU, 32GB RAM)', fullDescription: 'T2D, t2d-standard-8 (8 vCPU, 32GB RAM)', provider: 'Google Cloud', cpu: '8 vCPU', ram: '32GB', cpuArchitecture: 'AMD EPYC (Milan)', cpuClockSpeed: 'Up to 3.5 GHz'},
  { id: 'gcp-t2d-standard-16', familyGroup: 'T2D', instanceName: 't2d-standard-16 (16 vCPU, 64GB RAM)', fullDescription: 'T2D, t2d-standard-16 (16 vCPU, 64GB RAM)', provider: 'Google Cloud', cpu: '16 vCPU', ram: '64GB', cpuArchitecture: 'AMD EPYC (Milan)', cpuClockSpeed: 'Up to 3.5 GHz'},
  { id: 'gcp-t2d-standard-32', familyGroup: 'T2D', instanceName: 't2d-standard-32 (32 vCPU, 128GB RAM)', fullDescription: 'T2D, t2d-standard-32 (32 vCPU, 128GB RAM)', provider: 'Google Cloud', cpu: '32 vCPU', ram: '128GB', cpuArchitecture: 'AMD EPYC (Milan)', cpuClockSpeed: 'Up to 3.5 GHz'},
  { id: 'gcp-t2d-standard-48', familyGroup: 'T2D', instanceName: 't2d-standard-48 (48 vCPU, 192GB RAM)', fullDescription: 'T2D, t2d-standard-48 (48 vCPU, 192GB RAM)', provider: 'Google Cloud', cpu: '48 vCPU', ram: '192GB', cpuArchitecture: 'AMD EPYC (Milan)', cpuClockSpeed: 'Up to 3.5 GHz'},
  { id: 'gcp-t2d-standard-60', familyGroup: 'T2D', instanceName: 't2d-standard-60 (60 vCPU, 240GB RAM)', fullDescription: 'T2D, t2d-standard-60 (60 vCPU, 240GB RAM)', provider: 'Google Cloud', cpu: '60 vCPU', ram: '240GB', cpuArchitecture: 'AMD EPYC (Milan)', cpuClockSpeed: 'Up to 3.5 GHz'},

  // C2 Compute-Optimized (Cascade Lake)
  { id: 'gcp-c2-standard-4', familyGroup: 'C2', instanceName: 'c2-standard-4 (4 vCPU, 16GB RAM)', fullDescription: 'C2, c2-standard-4 (4 vCPU, 16GB RAM)', provider: 'Google Cloud', cpu: '4 vCPU', ram: '16GB', cpuArchitecture: 'Intel Xeon (Cascade Lake)', cpuClockSpeed: 'Up to 3.8 GHz', isSapCertified: true, sapsRating: 13000 },
  { id: 'gcp-c2-standard-8', familyGroup: 'C2', instanceName: 'c2-standard-8 (8 vCPU, 32GB RAM)', fullDescription: 'C2, c2-standard-8 (8 vCPU, 32GB RAM)', provider: 'Google Cloud', cpu: '8 vCPU', ram: '32GB', cpuArchitecture: 'Intel Xeon (Cascade Lake)', cpuClockSpeed: 'Up to 3.8 GHz', isSapCertified: true, sapsRating: 26000 },
  { id: 'gcp-c2-standard-16', familyGroup: 'C2', instanceName: 'c2-standard-16 (16 vCPU, 64GB RAM)', fullDescription: 'C2, c2-standard-16 (16 vCPU, 64GB RAM)', provider: 'Google Cloud', cpu: '16 vCPU', ram: '64GB', cpuArchitecture: 'Intel Xeon (Cascade Lake)', cpuClockSpeed: 'Up to 3.8 GHz', isSapCertified: true, sapsRating: 52000 },
  { id: 'gcp-c2-standard-30', familyGroup: 'C2', instanceName: 'c2-standard-30 (30 vCPU, 120GB RAM)', fullDescription: 'C2, c2-standard-30 (30 vCPU, 120GB RAM)', provider: 'Google Cloud', cpu: '30 vCPU', ram: '120GB', cpuArchitecture: 'Intel Xeon (Cascade Lake)', cpuClockSpeed: 'Up to 3.8 GHz', isSapCertified: true, sapsRating: 97500 },
  { id: 'gcp-c2-standard-60', familyGroup: 'C2', instanceName: 'c2-standard-60 (60 vCPU, 240GB RAM)', fullDescription: 'C2, c2-standard-60 (60 vCPU, 240GB RAM)', provider: 'Google Cloud', cpu: '60 vCPU', ram: '240GB', cpuArchitecture: 'Intel Xeon (Cascade Lake)', cpuClockSpeed: 'Up to 3.8 GHz', isSapCertified: true, sapsRating: 195000 },

  // C2D Compute-Optimized (AMD EPYC Milan)
  { id: 'gcp-c2d-standard-2', familyGroup: 'C2D', instanceName: 'c2d-standard-2 (2 vCPU, 8GB RAM)', fullDescription: 'C2D, c2d-standard-2 (2 vCPU, 8GB RAM)', provider: 'Google Cloud', cpu: '2 vCPU', ram: '8GB', cpuArchitecture: 'AMD EPYC (Milan)', cpuClockSpeed: 'Up to 3.5 GHz', isSapCertified: true, sapsRating: 6000 },
  { id: 'gcp-c2d-standard-4', familyGroup: 'C2D', instanceName: 'c2d-standard-4 (4 vCPU, 16GB RAM)', fullDescription: 'C2D, c2d-standard-4 (4 vCPU, 16GB RAM)', provider: 'Google Cloud', cpu: '4 vCPU', ram: '16GB', cpuArchitecture: 'AMD EPYC (Milan)', cpuClockSpeed: 'Up to 3.5 GHz', isSapCertified: true, sapsRating: 12000 },
  { id: 'gcp-c2d-standard-8', familyGroup: 'C2D', instanceName: 'c2d-standard-8 (8 vCPU, 32GB RAM)', fullDescription: 'C2D, c2d-standard-8 (8 vCPU, 32GB RAM)', provider: 'Google Cloud', cpu: '8 vCPU', ram: '32GB', cpuArchitecture: 'AMD EPYC (Milan)', cpuClockSpeed: 'Up to 3.5 GHz', isSapCertified: true, sapsRating: 24000 },
  { id: 'gcp-c2d-standard-16', familyGroup: 'C2D', instanceName: 'c2d-standard-16 (16 vCPU, 64GB RAM)', fullDescription: 'C2D, c2d-standard-16 (16 vCPU, 64GB RAM)', provider: 'Google Cloud', cpu: '16 vCPU', ram: '64GB', cpuArchitecture: 'AMD EPYC (Milan)', cpuClockSpeed: 'Up to 3.5 GHz', isSapCertified: true, sapsRating: 48000 },
  { id: 'gcp-c2d-standard-32', familyGroup: 'C2D', instanceName: 'c2d-standard-32 (32 vCPU, 128GB RAM)', fullDescription: 'C2D, c2d-standard-32 (32 vCPU, 128GB RAM)', provider: 'Google Cloud', cpu: '32 vCPU', ram: '128GB', cpuArchitecture: 'AMD EPYC (Milan)', cpuClockSpeed: 'Up to 3.5 GHz', isSapCertified: true, sapsRating: 96000 },
  { id: 'gcp-c2d-standard-56', familyGroup: 'C2D', instanceName: 'c2d-standard-56 (56 vCPU, 224GB RAM)', fullDescription: 'C2D, c2d-standard-56 (56 vCPU, 224GB RAM)', provider: 'Google Cloud', cpu: '56 vCPU', ram: '224GB', cpuArchitecture: 'AMD EPYC (Milan)', cpuClockSpeed: 'Up to 3.5 GHz', isSapCertified: true, sapsRating: 168000 },
  { id: 'gcp-c2d-standard-112', familyGroup: 'C2D', instanceName: 'c2d-standard-112 (112 vCPU, 448GB RAM)', fullDescription: 'C2D, c2d-standard-112 (112 vCPU, 448GB RAM)', provider: 'Google Cloud', cpu: '112 vCPU', ram: '448GB', cpuArchitecture: 'AMD EPYC (Milan)', cpuClockSpeed: 'Up to 3.5 GHz', isSapCertified: true, sapsRating: 336000 },
  { id: 'gcp-c2d-highcpu-2', familyGroup: 'C2D', instanceName: 'c2d-highcpu-2 (2 vCPU, 4GB RAM)', fullDescription: 'C2D, c2d-highcpu-2 (2 vCPU, 4GB RAM)', provider: 'Google Cloud', cpu: '2 vCPU', ram: '4GB', cpuArchitecture: 'AMD EPYC (Milan)', cpuClockSpeed: 'Up to 3.5 GHz'},
  { id: 'gcp-c2d-highcpu-4', familyGroup: 'C2D', instanceName: 'c2d-highcpu-4 (4 vCPU, 8GB RAM)', fullDescription: 'C2D, c2d-highcpu-4 (4 vCPU, 8GB RAM)', provider: 'Google Cloud', cpu: '4 vCPU', ram: '8GB', cpuArchitecture: 'AMD EPYC (Milan)', cpuClockSpeed: 'Up to 3.5 GHz'},
  { id: 'gcp-c2d-highcpu-8', familyGroup: 'C2D', instanceName: 'c2d-highcpu-8 (8 vCPU, 16GB RAM)', fullDescription: 'C2D, c2d-highcpu-8 (8 vCPU, 16GB RAM)', provider: 'Google Cloud', cpu: '8 vCPU', ram: '16GB', cpuArchitecture: 'AMD EPYC (Milan)', cpuClockSpeed: 'Up to 3.5 GHz'},
  { id: 'gcp-c2d-highcpu-16', familyGroup: 'C2D', instanceName: 'c2d-highcpu-16 (16 vCPU, 32GB RAM)', fullDescription: 'C2D, c2d-highcpu-16 (16 vCPU, 32GB RAM)', provider: 'Google Cloud', cpu: '16 vCPU', ram: '32GB', cpuArchitecture: 'AMD EPYC (Milan)', cpuClockSpeed: 'Up to 3.5 GHz'},
  { id: 'gcp-c2d-highcpu-32', familyGroup: 'C2D', instanceName: 'c2d-highcpu-32 (32 vCPU, 64GB RAM)', fullDescription: 'C2D, c2d-highcpu-32 (32 vCPU, 64GB RAM)', provider: 'Google Cloud', cpu: '32 vCPU', ram: '64GB', cpuArchitecture: 'AMD EPYC (Milan)', cpuClockSpeed: 'Up to 3.5 GHz'},
  { id: 'gcp-c2d-highcpu-56', familyGroup: 'C2D', instanceName: 'c2d-highcpu-56 (56 vCPU, 112GB RAM)', fullDescription: 'C2D, c2d-highcpu-56 (56 vCPU, 112GB RAM)', provider: 'Google Cloud', cpu: '56 vCPU', ram: '112GB', cpuArchitecture: 'AMD EPYC (Milan)', cpuClockSpeed: 'Up to 3.5 GHz'},
  { id: 'gcp-c2d-highcpu-112', familyGroup: 'C2D', instanceName: 'c2d-highcpu-112 (112 vCPU, 224GB RAM)', fullDescription: 'C2D, c2d-highcpu-112 (112 vCPU, 224GB RAM)', provider: 'Google Cloud', cpu: '112 vCPU', ram: '224GB', cpuArchitecture: 'AMD EPYC (Milan)', cpuClockSpeed: 'Up to 3.5 GHz'},
  { id: 'gcp-c2d-highmem-2', familyGroup: 'C2D', instanceName: 'c2d-highmem-2 (2 vCPU, 16GB RAM)', fullDescription: 'C2D, c2d-highmem-2 (2 vCPU, 16GB RAM)', provider: 'Google Cloud', cpu: '2 vCPU', ram: '16GB', cpuArchitecture: 'AMD EPYC (Milan)', cpuClockSpeed: 'Up to 3.5 GHz', isSapCertified: true, sapsRating: 6000 },
  { id: 'gcp-c2d-highmem-4', familyGroup: 'C2D', instanceName: 'c2d-highmem-4 (4 vCPU, 32GB RAM)', fullDescription: 'C2D, c2d-highmem-4 (4 vCPU, 32GB RAM)', provider: 'Google Cloud', cpu: '4 vCPU', ram: '32GB', cpuArchitecture: 'AMD EPYC (Milan)', cpuClockSpeed: 'Up to 3.5 GHz', isSapCertified: true, sapsRating: 12000 },
  { id: 'gcp-c2d-highmem-8', familyGroup: 'C2D', instanceName: 'c2d-highmem-8 (8 vCPU, 64GB RAM)', fullDescription: 'C2D, c2d-highmem-8 (8 vCPU, 64GB RAM)', provider: 'Google Cloud', cpu: '8 vCPU', ram: '64GB', cpuArchitecture: 'AMD EPYC (Milan)', cpuClockSpeed: 'Up to 3.5 GHz', isSapCertified: true, sapsRating: 24000 },
  { id: 'gcp-c2d-highmem-16', familyGroup: 'C2D', instanceName: 'c2d-highmem-16 (16 vCPU, 128GB RAM)', fullDescription: 'C2D, c2d-highmem-16 (16 vCPU, 128GB RAM)', provider: 'Google Cloud', cpu: '16 vCPU', ram: '128GB', cpuArchitecture: 'AMD EPYC (Milan)', cpuClockSpeed: 'Up to 3.5 GHz', isSapCertified: true, sapsRating: 48000 },
  { id: 'gcp-c2d-highmem-32', familyGroup: 'C2D', instanceName: 'c2d-highmem-32 (32 vCPU, 256GB RAM)', fullDescription: 'C2D, c2d-highmem-32 (32 vCPU, 256GB RAM)', provider: 'Google Cloud', cpu: '32 vCPU', ram: '256GB', cpuArchitecture: 'AMD EPYC (Milan)', cpuClockSpeed: 'Up to 3.5 GHz', isSapCertified: true, sapsRating: 96000 },
  { id: 'gcp-c2d-highmem-56', familyGroup: 'C2D', instanceName: 'c2d-highmem-56 (56 vCPU, 448GB RAM)', fullDescription: 'C2D, c2d-highmem-56 (56 vCPU, 448GB RAM)', provider: 'Google Cloud', cpu: '56 vCPU', ram: '448GB', cpuArchitecture: 'AMD EPYC (Milan)', cpuClockSpeed: 'Up to 3.5 GHz', isSapCertified: true, sapsRating: 168000 },
  { id: 'gcp-c2d-highmem-112', familyGroup: 'C2D', instanceName: 'c2d-highmem-112 (112 vCPU, 896GB RAM)', fullDescription: 'C2D, c2d-highmem-112 (112 vCPU, 896GB RAM)', provider: 'Google Cloud', cpu: '112 vCPU', ram: '896GB', cpuArchitecture: 'AMD EPYC (Milan)', cpuClockSpeed: 'Up to 3.5 GHz', isSapCertified: true, sapsRating: 336000 },

  // C3 Compute-Optimized (Intel Sapphire Rapids)
  { id: 'gcp-c3-standard-4', familyGroup: 'C3', instanceName: 'c3-standard-4 (4 vCPU, 16GB RAM)', fullDescription: 'C3, c3-standard-4 (4 vCPU, 16GB RAM)', provider: 'Google Cloud', cpu: '4 vCPU', ram: '16GB', cpuArchitecture: 'Intel Xeon (Sapphire Rapids)', cpuClockSpeed: 'Up to 3.9 GHz', isSapCertified: true, sapsRating: 15000 },
  { id: 'gcp-c3-standard-8', familyGroup: 'C3', instanceName: 'c3-standard-8 (8 vCPU, 32GB RAM)', fullDescription: 'C3, c3-standard-8 (8 vCPU, 32GB RAM)', provider: 'Google Cloud', cpu: '8 vCPU', ram: '32GB', cpuArchitecture: 'Intel Xeon (Sapphire Rapids)', cpuClockSpeed: 'Up to 3.9 GHz', isSapCertified: true, sapsRating: 30000 },
  { id: 'gcp-c3-standard-22', familyGroup: 'C3', instanceName: 'c3-standard-22 (22 vCPU, 88GB RAM)', fullDescription: 'C3, c3-standard-22 (22 vCPU, 88GB RAM)', provider: 'Google Cloud', cpu: '22 vCPU', ram: '88GB', cpuArchitecture: 'Intel Xeon (Sapphire Rapids)', cpuClockSpeed: 'Up to 3.9 GHz', isSapCertified: true, sapsRating: 82500 },
  { id: 'gcp-c3-standard-44', familyGroup: 'C3', instanceName: 'c3-standard-44 (44 vCPU, 176GB RAM)', fullDescription: 'C3, c3-standard-44 (44 vCPU, 176GB RAM)', provider: 'Google Cloud', cpu: '44 vCPU', ram: '176GB', cpuArchitecture: 'Intel Xeon (Sapphire Rapids)', cpuClockSpeed: 'Up to 3.9 GHz', isSapCertified: true, sapsRating: 165000 },
  { id: 'gcp-c3-standard-88', familyGroup: 'C3', instanceName: 'c3-standard-88 (88 vCPU, 352GB RAM)', fullDescription: 'C3, c3-standard-88 (88 vCPU, 352GB RAM)', provider: 'Google Cloud', cpu: '88 vCPU', ram: '352GB', cpuArchitecture: 'Intel Xeon (Sapphire Rapids)', cpuClockSpeed: 'Up to 3.9 GHz', isSapCertified: true, sapsRating: 330000 },
  { id: 'gcp-c3-standard-176', familyGroup: 'C3', instanceName: 'c3-standard-176 (176 vCPU, 704GB RAM)', fullDescription: 'C3, c3-standard-176 (176 vCPU, 704GB RAM)', provider: 'Google Cloud', cpu: '176 vCPU', ram: '704GB', cpuArchitecture: 'Intel Xeon (Sapphire Rapids)', cpuClockSpeed: 'Up to 3.9 GHz', isSapCertified: true, sapsRating: 660000 },
  { id: 'gcp-c3-highmem-4', familyGroup: 'C3', instanceName: 'c3-highmem-4 (4 vCPU, 32GB RAM)', fullDescription: 'C3, c3-highmem-4 (4 vCPU, 32GB RAM)', provider: 'Google Cloud', cpu: '4 vCPU', ram: '32GB', cpuArchitecture: 'Intel Xeon (Sapphire Rapids)', cpuClockSpeed: 'Up to 3.9 GHz', isSapCertified: true, sapsRating: 15000 },
  { id: 'gcp-c3-highmem-8', familyGroup: 'C3', instanceName: 'c3-highmem-8 (8 vCPU, 64GB RAM)', fullDescription: 'C3, c3-highmem-8 (8 vCPU, 64GB RAM)', provider: 'Google Cloud', cpu: '8 vCPU', ram: '64GB', cpuArchitecture: 'Intel Xeon (Sapphire Rapids)', cpuClockSpeed: 'Up to 3.9 GHz', isSapCertified: true, sapsRating: 30000 },
  { id: 'gcp-c3-highmem-22', familyGroup: 'C3', instanceName: 'c3-highmem-22 (22 vCPU, 176GB RAM)', fullDescription: 'C3, c3-highmem-22 (22 vCPU, 176GB RAM)', provider: 'Google Cloud', cpu: '22 vCPU', ram: '176GB', cpuArchitecture: 'Intel Xeon (Sapphire Rapids)', cpuClockSpeed: 'Up to 3.9 GHz', isSapCertified: true, sapsRating: 82500 },
  { id: 'gcp-c3-highmem-44', familyGroup: 'C3', instanceName: 'c3-highmem-44 (44 vCPU, 352GB RAM)', fullDescription: 'C3, c3-highmem-44 (44 vCPU, 352GB RAM)', provider: 'Google Cloud', cpu: '44 vCPU', ram: '352GB', cpuArchitecture: 'Intel Xeon (Sapphire Rapids)', cpuClockSpeed: 'Up to 3.9 GHz', isSapCertified: true, sapsRating: 165000 },
  { id: 'gcp-c3-highmem-88', familyGroup: 'C3', instanceName: 'c3-highmem-88 (88 vCPU, 704GB RAM)', fullDescription: 'C3, c3-highmem-88 (88 vCPU, 704GB RAM)', provider: 'Google Cloud', cpu: '88 vCPU', ram: '704GB', cpuArchitecture: 'Intel Xeon (Sapphire Rapids)', cpuClockSpeed: 'Up to 3.9 GHz', isSapCertified: true, sapsRating: 330000 },
  { id: 'gcp-c3-highcpu-4', familyGroup: 'C3', instanceName: 'c3-highcpu-4 (4 vCPU, 8GB RAM)', fullDescription: 'C3, c3-highcpu-4 (4 vCPU, 8GB RAM)', provider: 'Google Cloud', cpu: '4 vCPU', ram: '8GB', cpuArchitecture: 'Intel Xeon (Sapphire Rapids)', cpuClockSpeed: 'Up to 3.9 GHz' },
  { id: 'gcp-c3-highcpu-8', familyGroup: 'C3', instanceName: 'c3-highcpu-8 (8 vCPU, 16GB RAM)', fullDescription: 'C3, c3-highcpu-8 (8 vCPU, 16GB RAM)', provider: 'Google Cloud', cpu: '8 vCPU', ram: '16GB', cpuArchitecture: 'Intel Xeon (Sapphire Rapids)', cpuClockSpeed: 'Up to 3.9 GHz' },
  { id: 'gcp-c3-highcpu-22', familyGroup: 'C3', instanceName: 'c3-highcpu-22 (22 vCPU, 44GB RAM)', fullDescription: 'C3, c3-highcpu-22 (22 vCPU, 44GB RAM)', provider: 'Google Cloud', cpu: '22 vCPU', ram: '44GB', cpuArchitecture: 'Intel Xeon (Sapphire Rapids)', cpuClockSpeed: 'Up to 3.9 GHz' },

  // C3D Compute-Optimized (AMD EPYC Genoa)
  { id: 'gcp-c3d-standard-4', familyGroup: 'C3D', instanceName: 'c3d-standard-4 (4 vCPU, 16GB RAM)', fullDescription: 'C3D, c3d-standard-4 (4 vCPU, 16GB RAM)', provider: 'Google Cloud', cpu: '4 vCPU', ram: '16GB', cpuArchitecture: 'AMD EPYC (Genoa)', cpuClockSpeed: 'Up to 3.7 GHz', isSapCertified: true, sapsRating: 16000 },
  { id: 'gcp-c3d-standard-8', familyGroup: 'C3D', instanceName: 'c3d-standard-8 (8 vCPU, 32GB RAM)', fullDescription: 'C3D, c3d-standard-8 (8 vCPU, 32GB RAM)', provider: 'Google Cloud', cpu: '8 vCPU', ram: '32GB', cpuArchitecture: 'AMD EPYC (Genoa)', cpuClockSpeed: 'Up to 3.7 GHz', isSapCertified: true, sapsRating: 32000 },
  { id: 'gcp-c3d-standard-16', familyGroup: 'C3D', instanceName: 'c3d-standard-16 (16 vCPU, 64GB RAM)', fullDescription: 'C3D, c3d-standard-16 (16 vCPU, 64GB RAM)', provider: 'Google Cloud', cpu: '16 vCPU', ram: '64GB', cpuArchitecture: 'AMD EPYC (Genoa)', cpuClockSpeed: 'Up to 3.7 GHz', isSapCertified: true, sapsRating: 64000 },
  { id: 'gcp-c3d-standard-30', familyGroup: 'C3D', instanceName: 'c3d-standard-30 (30 vCPU, 120GB RAM)', fullDescription: 'C3D, c3d-standard-30 (30 vCPU, 120GB RAM)', provider: 'Google Cloud', cpu: '30 vCPU', ram: '120GB', cpuArchitecture: 'AMD EPYC (Genoa)', cpuClockSpeed: 'Up to 3.7 GHz', isSapCertified: true, sapsRating: 120000 },
  { id: 'gcp-c3d-standard-60', familyGroup: 'C3D', instanceName: 'c3d-standard-60 (60 vCPU, 240GB RAM)', fullDescription: 'C3D, c3d-standard-60 (60 vCPU, 240GB RAM)', provider: 'Google Cloud', cpu: '60 vCPU', ram: '240GB', cpuArchitecture: 'AMD EPYC (Genoa)', cpuClockSpeed: 'Up to 3.7 GHz', isSapCertified: true, sapsRating: 240000 },
  { id: 'gcp-c3d-standard-90', familyGroup: 'C3D', instanceName: 'c3d-standard-90 (90 vCPU, 360GB RAM)', fullDescription: 'C3D, c3d-standard-90 (90 vCPU, 360GB RAM)', provider: 'Google Cloud', cpu: '90 vCPU', ram: '360GB', cpuArchitecture: 'AMD EPYC (Genoa)', cpuClockSpeed: 'Up to 3.7 GHz', isSapCertified: true, sapsRating: 360000 },
  { id: 'gcp-c3d-standard-180', familyGroup: 'C3D', instanceName: 'c3d-standard-180 (180 vCPU, 720GB RAM)', fullDescription: 'C3D, c3d-standard-180 (180 vCPU, 720GB RAM)', provider: 'Google Cloud', cpu: '180 vCPU', ram: '720GB', cpuArchitecture: 'AMD EPYC (Genoa)', cpuClockSpeed: 'Up to 3.7 GHz', isSapCertified: true, sapsRating: 720000 },
  { id: 'gcp-c3d-highcpu-4', familyGroup: 'C3D', instanceName: 'c3d-highcpu-4 (4 vCPU, 8GB RAM)', fullDescription: 'C3D, c3d-highcpu-4 (4 vCPU, 8GB RAM)', provider: 'Google Cloud', cpu: '4 vCPU', ram: '8GB', cpuArchitecture: 'AMD EPYC (Genoa)', cpuClockSpeed: 'Up to 3.7 GHz'},
  { id: 'gcp-c3d-highcpu-8', familyGroup: 'C3D', instanceName: 'c3d-highcpu-8 (8 vCPU, 16GB RAM)', fullDescription: 'C3D, c3d-highcpu-8 (8 vCPU, 16GB RAM)', provider: 'Google Cloud', cpu: '8 vCPU', ram: '16GB', cpuArchitecture: 'AMD EPYC (Genoa)', cpuClockSpeed: 'Up to 3.7 GHz'},
  { id: 'gcp-c3d-highcpu-16', familyGroup: 'C3D', instanceName: 'c3d-highcpu-16 (16 vCPU, 32GB RAM)', fullDescription: 'C3D, c3d-highcpu-16 (16 vCPU, 32GB RAM)', provider: 'Google Cloud', cpu: '16 vCPU', ram: '32GB', cpuArchitecture: 'AMD EPYC (Genoa)', cpuClockSpeed: 'Up to 3.7 GHz'},
  { id: 'gcp-c3d-highcpu-30', familyGroup: 'C3D', instanceName: 'c3d-highcpu-30 (30 vCPU, 60GB RAM)', fullDescription: 'C3D, c3d-highcpu-30 (30 vCPU, 60GB RAM)', provider: 'Google Cloud', cpu: '30 vCPU', ram: '60GB', cpuArchitecture: 'AMD EPYC (Genoa)', cpuClockSpeed: 'Up to 3.7 GHz'},
  { id: 'gcp-c3d-highcpu-60', familyGroup: 'C3D', instanceName: 'c3d-highcpu-60 (60 vCPU, 120GB RAM)', fullDescription: 'C3D, c3d-highcpu-60 (60 vCPU, 120GB RAM)', provider: 'Google Cloud', cpu: '60 vCPU', ram: '120GB', cpuArchitecture: 'AMD EPYC (Genoa)', cpuClockSpeed: 'Up to 3.7 GHz'},
  { id: 'gcp-c3d-highcpu-90', familyGroup: 'C3D', instanceName: 'c3d-highcpu-90 (90 vCPU, 180GB RAM)', fullDescription: 'C3D, c3d-highcpu-90 (90 vCPU, 180GB RAM)', provider: 'Google Cloud', cpu: '90 vCPU', ram: '180GB', cpuArchitecture: 'AMD EPYC (Genoa)', cpuClockSpeed: 'Up to 3.7 GHz'},
  { id: 'gcp-c3d-highcpu-180', familyGroup: 'C3D', instanceName: 'c3d-highcpu-180 (180 vCPU, 360GB RAM)', fullDescription: 'C3D, c3d-highcpu-180 (180 vCPU, 360GB RAM)', provider: 'Google Cloud', cpu: '180 vCPU', ram: '360GB', cpuArchitecture: 'AMD EPYC (Genoa)', cpuClockSpeed: 'Up to 3.7 GHz'},
  { id: 'gcp-c3d-highmem-4', familyGroup: 'C3D', instanceName: 'c3d-highmem-4 (4 vCPU, 32GB RAM)', fullDescription: 'C3D, c3d-highmem-4 (4 vCPU, 32GB RAM)', provider: 'Google Cloud', cpu: '4 vCPU', ram: '32GB', cpuArchitecture: 'AMD EPYC (Genoa)', cpuClockSpeed: 'Up to 3.7 GHz', isSapCertified: true, sapsRating: 16000},
  { id: 'gcp-c3d-highmem-8', familyGroup: 'C3D', instanceName: 'c3d-highmem-8 (8 vCPU, 64GB RAM)', fullDescription: 'C3D, c3d-highmem-8 (8 vCPU, 64GB RAM)', provider: 'Google Cloud', cpu: '8 vCPU', ram: '64GB', cpuArchitecture: 'AMD EPYC (Genoa)', cpuClockSpeed: 'Up to 3.7 GHz', isSapCertified: true, sapsRating: 32000},
  { id: 'gcp-c3d-highmem-16', familyGroup: 'C3D', instanceName: 'c3d-highmem-16 (16 vCPU, 128GB RAM)', fullDescription: 'C3D, c3d-highmem-16 (16 vCPU, 128GB RAM)', provider: 'Google Cloud', cpu: '16 vCPU', ram: '128GB', cpuArchitecture: 'AMD EPYC (Genoa)', cpuClockSpeed: 'Up to 3.7 GHz', isSapCertified: true, sapsRating: 64000},
  { id: 'gcp-c3d-highmem-30', familyGroup: 'C3D', instanceName: 'c3d-highmem-30 (30 vCPU, 240GB RAM)', fullDescription: 'C3D, c3d-highmem-30 (30 vCPU, 240GB RAM)', provider: 'Google Cloud', cpu: '30 vCPU', ram: '240GB', cpuArchitecture: 'AMD EPYC (Genoa)', cpuClockSpeed: 'Up to 3.7 GHz', isSapCertified: true, sapsRating: 120000},
  { id: 'gcp-c3d-highmem-60', familyGroup: 'C3D', instanceName: 'c3d-highmem-60 (60 vCPU, 480GB RAM)', fullDescription: 'C3D, c3d-highmem-60 (60 vCPU, 480GB RAM)', provider: 'Google Cloud', cpu: '60 vCPU', ram: '480GB', cpuArchitecture: 'AMD EPYC (Genoa)', cpuClockSpeed: 'Up to 3.7 GHz', isSapCertified: true, sapsRating: 240000},
  { id: 'gcp-c3d-highmem-90', familyGroup: 'C3D', instanceName: 'c3d-highmem-90 (90 vCPU, 720GB RAM)', fullDescription: 'C3D, c3d-highmem-90 (90 vCPU, 720GB RAM)', provider: 'Google Cloud', cpu: '90 vCPU', ram: '720GB', cpuArchitecture: 'AMD EPYC (Genoa)', cpuClockSpeed: 'Up to 3.7 GHz', isSapCertified: true, sapsRating: 360000},
  { id: 'gcp-c3d-highmem-180', familyGroup: 'C3D', instanceName: 'c3d-highmem-180 (180 vCPU, 1.4TB RAM)', fullDescription: 'C3D, c3d-highmem-180 (180 vCPU, 1.4TB RAM)', provider: 'Google Cloud', cpu: '180 vCPU', ram: '1.4TB', cpuArchitecture: 'AMD EPYC (Genoa)', cpuClockSpeed: 'Up to 3.7 GHz', isSapCertified: true, sapsRating: 720000},

  // C4 Compute-Optimized (Intel Emerald Rapids)
  { id: 'gcp-c4-standard-2', familyGroup: 'C4', instanceName: 'c4-standard-2 (2 vCPU, 7.5GB RAM)', fullDescription: 'C4, c4-standard-2 (2 vCPU, 7.5GB RAM)', provider: 'Google Cloud', cpu: '2 vCPU', ram: '7.5GB', cpuArchitecture: 'Intel Xeon (Emerald Rapids)', cpuClockSpeed: 'Up to 3.8 GHz', isSapCertified: true, sapsRating: 7000 },
  { id: 'gcp-c4-standard-4', familyGroup: 'C4', instanceName: 'c4-standard-4 (4 vCPU, 15GB RAM)', fullDescription: 'C4, c4-standard-4 (4 vCPU, 15GB RAM)', provider: 'Google Cloud', cpu: '4 vCPU', ram: '15GB', cpuArchitecture: 'Intel Xeon (Emerald Rapids)', cpuClockSpeed: 'Up to 3.8 GHz', isSapCertified: true, sapsRating: 14000 },
  { id: 'gcp-c4-standard-8', familyGroup: 'C4', instanceName: 'c4-standard-8 (8 vCPU, 30GB RAM)', fullDescription: 'C4, c4-standard-8 (8 vCPU, 30GB RAM)', provider: 'Google Cloud', cpu: '8 vCPU', ram: '30GB', cpuArchitecture: 'Intel Xeon (Emerald Rapids)', cpuClockSpeed: 'Up to 3.8 GHz', isSapCertified: true, sapsRating: 28000 },
  { id: 'gcp-c4-standard-16', familyGroup: 'C4', instanceName: 'c4-standard-16 (16 vCPU, 60GB RAM)', fullDescription: 'C4, c4-standard-16 (16 vCPU, 60GB RAM)', provider: 'Google Cloud', cpu: '16 vCPU', ram: '60GB', cpuArchitecture: 'Intel Xeon (Emerald Rapids)', cpuClockSpeed: 'Up to 3.8 GHz', isSapCertified: true, sapsRating: 56000 },
  { id: 'gcp-c4-standard-32', familyGroup: 'C4', instanceName: 'c4-standard-32 (32 vCPU, 120GB RAM)', fullDescription: 'C4, c4-standard-32 (32 vCPU, 120GB RAM)', provider: 'Google Cloud', cpu: '32 vCPU', ram: '120GB', cpuArchitecture: 'Intel Xeon (Emerald Rapids)', cpuClockSpeed: 'Up to 3.8 GHz', isSapCertified: true, sapsRating: 112000 },
  { id: 'gcp-c4-standard-48', familyGroup: 'C4', instanceName: 'c4-standard-48 (48 vCPU, 180GB RAM)', fullDescription: 'C4, c4-standard-48 (48 vCPU, 180GB RAM)', provider: 'Google Cloud', cpu: '48 vCPU', ram: '180GB', cpuArchitecture: 'Intel Xeon (Emerald Rapids)', cpuClockSpeed: 'Up to 3.8 GHz', isSapCertified: true, sapsRating: 168000 },
  { id: 'gcp-c4-standard-60', familyGroup: 'C4', instanceName: 'c4-standard-60 (60 vCPU, 225GB RAM)', fullDescription: 'C4, c4-standard-60 (60 vCPU, 225GB RAM)', provider: 'Google Cloud', cpu: '60 vCPU', ram: '225GB', cpuArchitecture: 'Intel Xeon (Emerald Rapids)', cpuClockSpeed: 'Up to 3.8 GHz', isSapCertified: true, sapsRating: 210000 },
  { id: 'gcp-c4-standard-96', familyGroup: 'C4', instanceName: 'c4-standard-96 (96 vCPU, 360GB RAM)', fullDescription: 'C4, c4-standard-96 (96 vCPU, 360GB RAM)', provider: 'Google Cloud', cpu: '96 vCPU', ram: '360GB', cpuArchitecture: 'Intel Xeon (Emerald Rapids)', cpuClockSpeed: 'Up to 3.8 GHz', isSapCertified: true, sapsRating: 336000 },
  { id: 'gcp-c4-standard-192', familyGroup: 'C4', instanceName: 'c4-standard-192 (192 vCPU, 720GB RAM)', fullDescription: 'C4, c4-standard-192 (192 vCPU, 720GB RAM)', provider: 'Google Cloud', cpu: '192 vCPU', ram: '720GB', cpuArchitecture: 'Intel Xeon (Emerald Rapids)', cpuClockSpeed: 'Up to 3.8 GHz', isSapCertified: true, sapsRating: 672000 },
  { id: 'gcp-c4-highcpu-2', familyGroup: 'C4', instanceName: 'c4-highcpu-2 (2 vCPU, 3.75GB RAM)', fullDescription: 'C4, c4-highcpu-2 (2 vCPU, 3.75GB RAM)', provider: 'Google Cloud', cpu: '2 vCPU', ram: '3.75GB', cpuArchitecture: 'Intel Xeon (Emerald Rapids)', cpuClockSpeed: 'Up to 3.8 GHz' },
  { id: 'gcp-c4-highcpu-4', familyGroup: 'C4', instanceName: 'c4-highcpu-4 (4 vCPU, 7.5GB RAM)', fullDescription: 'C4, c4-highcpu-4 (4 vCPU, 7.5GB RAM)', provider: 'Google Cloud', cpu: '4 vCPU', ram: '7.5GB', cpuArchitecture: 'Intel Xeon (Emerald Rapids)', cpuClockSpeed: 'Up to 3.8 GHz' },
  { id: 'gcp-c4-highcpu-8', familyGroup: 'C4', instanceName: 'c4-highcpu-8 (8 vCPU, 15GB RAM)', fullDescription: 'C4, c4-highcpu-8 (8 vCPU, 15GB RAM)', provider: 'Google Cloud', cpu: '8 vCPU', ram: '15GB', cpuArchitecture: 'Intel Xeon (Emerald Rapids)', cpuClockSpeed: 'Up to 3.8 GHz' },
  { id: 'gcp-c4-highcpu-16', familyGroup: 'C4', instanceName: 'c4-highcpu-16 (16 vCPU, 30GB RAM)', fullDescription: 'C4, c4-highcpu-16 (16 vCPU, 30GB RAM)', provider: 'Google Cloud', cpu: '16 vCPU', ram: '30GB', cpuArchitecture: 'Intel Xeon (Emerald Rapids)', cpuClockSpeed: 'Up to 3.8 GHz' },

  // M1 Memory-Optimized (Skylake)
  { id: 'gcp-m1-ultramem-40', familyGroup: 'M1', instanceName: 'm1-ultramem-40 (40 vCPU, 961GB RAM)', fullDescription: 'M1, m1-ultramem-40 (40 vCPU, 961GB RAM)', provider: 'Google Cloud', cpu: '40 vCPU', ram: '961 GB', cpuArchitecture: 'Intel Xeon (Skylake)', cpuClockSpeed: 'Up to 2.7 GHz', isSapCertified: true, sapsRating: 100000 },
  { id: 'gcp-m1-ultramem-80', familyGroup: 'M1', instanceName: 'm1-ultramem-80 (80 vCPU, 1.9TB RAM)', fullDescription: 'M1, m1-ultramem-80 (80 vCPU, 1.9TB RAM)', provider: 'Google Cloud', cpu: '80 vCPU', ram: '1.9 TB', cpuArchitecture: 'Intel Xeon (Skylake)', cpuClockSpeed: 'Up to 2.7 GHz', isSapCertified: true, sapsRating: 200000 },
  { id: 'gcp-m1-ultramem-160', familyGroup: 'M1', instanceName: 'm1-ultramem-160 (160 vCPU, 3.8TB RAM)', fullDescription: 'M1, m1-ultramem-160 (160 vCPU, 3.8TB RAM)', provider: 'Google Cloud', cpu: '160 vCPU', ram: '3.8 TB', cpuArchitecture: 'Intel Xeon (Skylake)', cpuClockSpeed: 'Up to 2.7 GHz', isSapCertified: true, sapsRating: 400000 },
  { id: 'gcp-m1-megamem-96', familyGroup: 'M1', instanceName: 'm1-megamem-96 (96 vCPU, 1.4TB RAM)', fullDescription: 'M1, m1-megamem-96 (96 vCPU, 1.4TB RAM)', provider: 'Google Cloud', cpu: '96 vCPU', ram: '1.4 TB', cpuArchitecture: 'Intel Xeon (Skylake)', cpuClockSpeed: 'Up to 2.7 GHz', isSapCertified: true, sapsRating: 240000 },

  // M2 Memory-Optimized (Cascade Lake)
  { id: 'gcp-m2-ultramem-208', familyGroup: 'M2', instanceName: 'm2-ultramem-208 (208 vCPU, 5.8TB RAM)', fullDescription: 'M2, m2-ultramem-208 (208 vCPU, 5.8TB RAM)', provider: 'Google Cloud', cpu: '208 vCPU', ram: '5.8 TB', cpuArchitecture: 'Intel Xeon (Cascade Lake)', cpuClockSpeed: 'Up to 3.0 GHz', isSapCertified: true, sapsRating: 520000 },
  { id: 'gcp-m2-ultramem-416', familyGroup: 'M2', instanceName: 'm2-ultramem-416 (416 vCPU, 11.7TB RAM)', fullDescription: 'M2, m2-ultramem-416 (416 vCPU, 11.7TB RAM)', provider: 'Google Cloud', cpu: '416 vCPU', ram: '11.7 TB', cpuArchitecture: 'Intel Xeon (Cascade Lake)', cpuClockSpeed: 'Up to 3.0 GHz', isSapCertified: true, sapsRating: 1040000 },
  { id: 'gcp-m2-megamem-416', familyGroup: 'M2', instanceName: 'm2-megamem-416 (416 vCPU, 5.8TB RAM)', fullDescription: 'M2, m2-megamem-416 (416 vCPU, 5.8TB RAM)', provider: 'Google Cloud', cpu: '416 vCPU', ram: '5.8TB', cpuArchitecture: 'Intel Xeon (Cascade Lake)', cpuClockSpeed: 'Up to 3.0 GHz', isSapCertified: true, sapsRating: 1040000 },

  // M3 Memory-Optimized (Ice Lake)
  { id: 'gcp-m3-ultramem-32', familyGroup: 'M3', instanceName: 'm3-ultramem-32 (32 vCPU, 1TB RAM)', fullDescription: 'M3, m3-ultramem-32 (32 vCPU, 1TB RAM)', provider: 'Google Cloud', cpu: '32 vCPU', ram: '1 TB', cpuArchitecture: 'Intel Xeon (Ice Lake)', cpuClockSpeed: 'Up to 3.2 GHz', isSapCertified: true, sapsRating: 90000 },
  { id: 'gcp-m3-ultramem-64', familyGroup: 'M3', instanceName: 'm3-ultramem-64 (64 vCPU, 2TB RAM)', fullDescription: 'M3, m3-ultramem-64 (64 vCPU, 2TB RAM)', provider: 'Google Cloud', cpu: '64 vCPU', ram: '2 TB', cpuArchitecture: 'Intel Xeon (Ice Lake)', cpuClockSpeed: 'Up to 3.2 GHz', isSapCertified: true, sapsRating: 180000 },
  { id: 'gcp-m3-ultramem-128', familyGroup: 'M3', instanceName: 'm3-ultramem-128 (128 vCPU, 4TB RAM)', fullDescription: 'M3, m3-ultramem-128 (128 vCPU, 4TB RAM)', provider: 'Google Cloud', cpu: '128 vCPU', ram: '4 TB', cpuArchitecture: 'Intel Xeon (Ice Lake)', cpuClockSpeed: 'Up to 3.2 GHz', isSapCertified: true, sapsRating: 360000 },
  { id: 'gcp-m3-megamem-64', familyGroup: 'M3', instanceName: 'm3-megamem-64 (64 vCPU, 1TB RAM)', fullDescription: 'M3, m3-megamem-64 (64 vCPU, 1TB RAM)', provider: 'Google Cloud', cpu: '64 vCPU', ram: '1 TB', cpuArchitecture: 'Intel Xeon (Ice Lake)', cpuClockSpeed: 'Up to 3.2 GHz', isSapCertified: true, sapsRating: 180000 },
  { id: 'gcp-m3-megamem-128', familyGroup: 'M3', instanceName: 'm3-megamem-128 (128 vCPU, 2TB RAM)', fullDescription: 'M3, m3-megamem-128 (128 vCPU, 2TB RAM)', provider: 'Google Cloud', cpu: '128 vCPU', ram: '2 TB', cpuArchitecture: 'Intel Xeon (Ice Lake)', cpuClockSpeed: 'Up to 3.2 GHz', isSapCertified: true, sapsRating: 360000 },

  // M4 Memory-Optimized (Intel Emerald Rapids) - Note: Renamed for consistency. `eprc` suffix removed.
  { id: 'gcp-m4-megamem-32', familyGroup: 'M4', instanceName: 'm4-megamem-32 (32 vCPU, 0.5TB RAM)', fullDescription: 'M4, m4-megamem-32 (32 vCPU, 0.5TB RAM)', provider: 'Google Cloud', cpu: '32 vCPU', ram: '0.5 TB', cpuArchitecture: 'Intel Xeon (Emerald Rapids)', cpuClockSpeed: 'Up to 3.5 GHz', isSapCertified: true, sapsRating: 104000 },
  { id: 'gcp-m4-megamem-64', familyGroup: 'M4', instanceName: 'm4-megamem-64 (64 vCPU, 1TB RAM)', fullDescription: 'M4, m4-megamem-64 (64 vCPU, 1TB RAM)', provider: 'Google Cloud', cpu: '64 vCPU', ram: '1 TB', cpuArchitecture: 'Intel Xeon (Emerald Rapids)', cpuClockSpeed: 'Up to 3.5 GHz', isSapCertified: true, sapsRating: 208000 },
  { id: 'gcp-m4-megamem-96', familyGroup: 'M4', instanceName: 'm4-megamem-96 (96 vCPU, 1.5TB RAM)', fullDescription: 'M4, m4-megamem-96 (96 vCPU, 1.5TB RAM)', provider: 'Google Cloud', cpu: '96 vCPU', ram: '1.5 TB', cpuArchitecture: 'Intel Xeon (Emerald Rapids)', cpuClockSpeed: 'Up to 3.5 GHz', isSapCertified: true, sapsRating: 312000 },
  { id: 'gcp-m4-megamem-128', familyGroup: 'M4', instanceName: 'm4-megamem-128 (128 vCPU, 2TB RAM)', fullDescription: 'M4, m4-megamem-128 (128 vCPU, 2TB RAM)', provider: 'Google Cloud', cpu: '128 vCPU', ram: '2 TB', cpuArchitecture: 'Intel Xeon (Emerald Rapids)', cpuClockSpeed: 'Up to 3.5 GHz', isSapCertified: true, sapsRating: 416000 },
  { id: 'gcp-m4-megamem-160', familyGroup: 'M4', instanceName: 'm4-megamem-160 (160 vCPU, 2.5TB RAM)', fullDescription: 'M4, m4-megamem-160 (160 vCPU, 2.5TB RAM)', provider: 'Google Cloud', cpu: '160 vCPU', ram: '2.5 TB', cpuArchitecture: 'Intel Xeon (Emerald Rapids)', cpuClockSpeed: 'Up to 3.5 GHz', isSapCertified: true, sapsRating: 520000 },
  { id: 'gcp-m4-megamem-192', familyGroup: 'M4', instanceName: 'm4-megamem-192 (192 vCPU, 3TB RAM)', fullDescription: 'M4, m4-megamem-192 (192 vCPU, 3TB RAM)', provider: 'Google Cloud', cpu: '192 vCPU', ram: '3 TB', cpuArchitecture: 'Intel Xeon (Emerald Rapids)', cpuClockSpeed: 'Up to 3.5 GHz', isSapCertified: true, sapsRating: 624000 },


  // A2 Accelerator-Optimized (NVIDIA A100)
  { id: 'gcp-a2-highgpu-1g', familyGroup: 'A2', instanceName: 'a2-highgpu-1g (12 vCPU, 85GB RAM, 1x A100)', fullDescription: 'A2, a2-highgpu-1g (12 vCPU, 85GB RAM, 1x A100)', provider: 'Google Cloud', cpu: '12 vCPU', ram: '85GB', cpuArchitecture: 'Intel Xeon (Cascade Lake)', cpuClockSpeed: 'Up to 3.4GHz', gpu: '1x NVIDIA A100 40GB' },
  { id: 'gcp-a2-highgpu-2g', familyGroup: 'A2', instanceName: 'a2-highgpu-2g (24 vCPU, 170GB RAM, 2x A100)', fullDescription: 'A2, a2-highgpu-2g (24 vCPU, 170GB RAM, 2x A100)', provider: 'Google Cloud', cpu: '24 vCPU', ram: '170GB', cpuArchitecture: 'Intel Xeon (Cascade Lake)', cpuClockSpeed: 'Up to 3.4GHz', gpu: '2x NVIDIA A100 40GB' },
  { id: 'gcp-a2-highgpu-4g', familyGroup: 'A2', instanceName: 'a2-highgpu-4g (48 vCPU, 340GB RAM, 4x A100)', fullDescription: 'A2, a2-highgpu-4g (48 vCPU, 340GB RAM, 4x A100)', provider: 'Google Cloud', cpu: '48 vCPU', ram: '340GB', cpuArchitecture: 'Intel Xeon (Cascade Lake)', cpuClockSpeed: 'Up to 3.4GHz', gpu: '4x NVIDIA A100 40GB' },
  { id: 'gcp-a2-highgpu-8g', familyGroup: 'A2', instanceName: 'a2-highgpu-8g (96 vCPU, 680GB RAM, 8x A100)', fullDescription: 'A2, a2-highgpu-8g (96 vCPU, 680GB RAM, 8x A100)', provider: 'Google Cloud', cpu: '96 vCPU', ram: '680GB', cpuArchitecture: 'Intel Xeon (Cascade Lake)', cpuClockSpeed: 'Up to 3.4GHz', gpu: '8x NVIDIA A100 40GB' },
  { id: 'gcp-a2-megagpu-16g', familyGroup: 'A2', instanceName: 'a2-megagpu-16g (96 vCPU, 1.36TB RAM, 16x A100)', fullDescription: 'A2, a2-megagpu-16g (96 vCPU, 1.36TB RAM, 16x A100)', provider: 'Google Cloud', cpu: '96 vCPU', ram: '1.36TB', cpuArchitecture: 'Intel Xeon (Cascade Lake)', cpuClockSpeed: 'Up to 3.4GHz', gpu: '16x NVIDIA A100 40GB' },

  // A3 Accelerator-Optimized (NVIDIA H100)
  { id: 'gcp-a3-highgpu-8g', familyGroup: 'A3', instanceName: 'a3-highgpu-8g (208 vCPU, 1.8TB RAM, 8x H100)', fullDescription: 'A3, a3-highgpu-8g (208 vCPU, 1.8TB RAM, 8x H100)', provider: 'Google Cloud', cpu: '208 vCPU', ram: '1.8TB', cpuArchitecture: 'Intel Xeon (Sapphire Rapids)', cpuClockSpeed: 'Up to 3.2GHz', gpu: '8x NVIDIA H100 80GB' },

  // G2 Accelerator-Optimized (NVIDIA L4)
  { id: 'gcp-g2-standard-4', familyGroup: 'G2', instanceName: 'g2-standard-4 (4 vCPU, 16GB RAM, 1x L4)', fullDescription: 'G2, g2-standard-4 (4 vCPU, 16GB RAM, 1x L4)', provider: 'Google Cloud', cpu: '4 vCPU', ram: '16GB', cpuArchitecture: 'Intel Xeon (Cascade Lake)', cpuClockSpeed: 'Up to 3.4GHz', gpu: '1x NVIDIA L4' },
  { id: 'gcp-g2-standard-8', familyGroup: 'G2', instanceName: 'g2-standard-8 (8 vCPU, 32GB RAM, 1x L4)', fullDescription: 'G2, g2-standard-8 (8 vCPU, 32GB RAM, 1x L4)', provider: 'Google Cloud', cpu: '8 vCPU', ram: '32GB', cpuArchitecture: 'Intel Xeon (Cascade Lake)', cpuClockSpeed: 'Up to 3.4GHz', gpu: '1x NVIDIA L4' },
  { id: 'gcp-g2-standard-12', familyGroup: 'G2', instanceName: 'g2-standard-12 (12 vCPU, 48GB RAM, 1x L4)', fullDescription: 'G2, g2-standard-12 (12 vCPU, 48GB RAM, 1x L4)', provider: 'Google Cloud', cpu: '12 vCPU', ram: '48GB', cpuArchitecture: 'Intel Xeon (Cascade Lake)', cpuClockSpeed: 'Up to 3.4GHz', gpu: '1x NVIDIA L4' },
  { id: 'gcp-g2-standard-16', familyGroup: 'G2', instanceName: 'g2-standard-16 (16 vCPU, 64GB RAM, 1x L4)', fullDescription: 'G2, g2-standard-16 (16 vCPU, 64GB RAM, 1x L4)', provider: 'Google Cloud', cpu: '16 vCPU', ram: '64GB', cpuArchitecture: 'Intel Xeon (Cascade Lake)', cpuClockSpeed: 'Up to 3.4GHz', gpu: '1x NVIDIA L4' },
  { id: 'gcp-g2-standard-24', familyGroup: 'G2', instanceName: 'g2-standard-24 (24 vCPU, 96GB RAM, 2x L4)', fullDescription: 'G2, g2-standard-24 (24 vCPU, 96GB RAM, 2x L4)', provider: 'Google Cloud', cpu: '24 vCPU', ram: '96GB', cpuArchitecture: 'Intel Xeon (Cascade Lake)', cpuClockSpeed: 'Up to 3.4GHz', gpu: '2x NVIDIA L4' },
  { id: 'gcp-g2-standard-32', familyGroup: 'G2', instanceName: 'g2-standard-32 (32 vCPU, 128GB RAM, 1x L4)', fullDescription: 'G2, g2-standard-32 (32 vCPU, 128GB RAM, 1x L4)', provider: 'Google Cloud', cpu: '32 vCPU', ram: '128GB', cpuArchitecture: 'Intel Xeon (Cascade Lake)', cpuClockSpeed: 'Up to 3.4GHz', gpu: '1x NVIDIA L4' },
  { id: 'gcp-g2-standard-48', familyGroup: 'G2', instanceName: 'g2-standard-48 (48 vCPU, 192GB RAM, 4x L4)', fullDescription: 'G2, g2-standard-48 (48 vCPU, 192GB RAM, 4x L4)', provider: 'Google Cloud', cpu: '48 vCPU', ram: '192GB', cpuArchitecture: 'Intel Xeon (Cascade Lake)', cpuClockSpeed: 'Up to 3.4GHz', gpu: '4x NVIDIA L4' },
  { id: 'gcp-g2-standard-96', familyGroup: 'G2', instanceName: 'g2-standard-96 (96 vCPU, 384GB RAM, 8x L4)', fullDescription: 'G2, g2-standard-96 (96 vCPU, 384GB RAM, 8x L4)', provider: 'Google Cloud', cpu: '96 vCPU', ram: '384GB', cpuArchitecture: 'Intel Xeon (Cascade Lake)', cpuClockSpeed: 'Up to 3.4GHz', gpu: '8x NVIDIA L4' },

  // H3 High-Performance Computing (Intel Sapphire Rapids)
  { id: 'gcp-h3-standard-88', familyGroup: 'H3', instanceName: 'h3-standard-88 (88 vCPU, 352GB RAM)', fullDescription: 'H3, h3-standard-88 (88 vCPU, 352GB RAM)', provider: 'Google Cloud', cpu: '88 vCPU', ram: '352GB', cpuArchitecture: 'Intel Xeon (Sapphire Rapids)', cpuClockSpeed: 'Up to 3.0GHz'},

  // --- AWS ---
  // General Purpose - M series
  { id: 'aws-m5-large', familyGroup: 'M5', instanceName: 'm5.large (2 vCPU, 8GB RAM)', fullDescription: 'M5, m5.large (2 vCPU, 8GB RAM)', provider: 'AWS', cpu: '2 vCPU', ram: '8 GB', cpuArchitecture: 'Intel Xeon Scalable (Skylake/Cascade Lake)', cpuClockSpeed: 'Up to 3.1 GHz' },
  { id: 'aws-m5-xlarge', familyGroup: 'M5', instanceName: 'm5.xlarge (4 vCPU, 16GB RAM)', fullDescription: 'M5, m5.xlarge (4 vCPU, 16GB RAM)', provider: 'AWS', cpu: '4 vCPU', ram: '16 GB', cpuArchitecture: 'Intel Xeon Scalable (Skylake/Cascade Lake)', cpuClockSpeed: 'Up to 3.1 GHz' },
  { id: 'aws-m5-2xlarge', familyGroup: 'M5', instanceName: 'm5.2xlarge (8 vCPU, 32GB RAM)', fullDescription: 'M5, m5.2xlarge (8 vCPU, 32GB RAM)', provider: 'AWS', cpu: '8 vCPU', ram: '32 GB', cpuArchitecture: 'Intel Xeon Scalable (Skylake/Cascade Lake)', cpuClockSpeed: 'Up to 3.1 GHz', isSapCertified: true, sapsRating: 22678 },
  { id: 'aws-m5-4xlarge', familyGroup: 'M5', instanceName: 'm5.4xlarge (16 vCPU, 64GB RAM)', fullDescription: 'M5, m5.4xlarge (16 vCPU, 64GB RAM)', provider: 'AWS', cpu: '16 vCPU', ram: '64 GB', cpuArchitecture: 'Intel Xeon Scalable (Skylake/Cascade Lake)', cpuClockSpeed: 'Up to 3.1 GHz', isSapCertified: true, sapsRating: 45356 },
  { id: 'aws-m5-8xlarge', familyGroup: 'M5', instanceName: 'm5.8xlarge (32 vCPU, 128GB RAM)', fullDescription: 'M5, m5.8xlarge (32 vCPU, 128GB RAM)', provider: 'AWS', cpu: '32 vCPU', ram: '128 GB', cpuArchitecture: 'Intel Xeon Scalable (Skylake/Cascade Lake)', cpuClockSpeed: 'Up to 3.1 GHz', isSapCertified: true, sapsRating: 90712 },
  { id: 'aws-m5-12xlarge', familyGroup: 'M5', instanceName: 'm5.12xlarge (48 vCPU, 192GB RAM)', fullDescription: 'M5, m5.12xlarge (48 vCPU, 192GB RAM)', provider: 'AWS', cpu: '48 vCPU', ram: '192 GB', cpuArchitecture: 'Intel Xeon Scalable (Skylake/Cascade Lake)', cpuClockSpeed: 'Up to 3.1 GHz', isSapCertified: true, sapsRating: 136068 },
  { id: 'aws-m5-16xlarge', familyGroup: 'M5', instanceName: 'm5.16xlarge (64 vCPU, 256GB RAM)', fullDescription: 'M5, m5.16xlarge (64 vCPU, 256GB RAM)', provider: 'AWS', cpu: '64 vCPU', ram: '256 GB', cpuArchitecture: 'Intel Xeon Scalable (Skylake/Cascade Lake)', cpuClockSpeed: 'Up to 3.1 GHz', isSapCertified: true, sapsRating: 181424 },
  { id: 'aws-m5-24xlarge', familyGroup: 'M5', instanceName: 'm5.24xlarge (96 vCPU, 384GB RAM)', fullDescription: 'M5, m5.24xlarge (96 vCPU, 384GB RAM)', provider: 'AWS', cpu: '96 vCPU', ram: '384 GB', cpuArchitecture: 'Intel Xeon Scalable (Skylake/Cascade Lake)', cpuClockSpeed: 'Up to 3.1 GHz', isSapCertified: true, sapsRating: 249600 },
  { id: 'aws-m5-metal', familyGroup: 'M5', instanceName: 'm5.metal (96 vCPU, 384GB RAM, Bare Metal)', fullDescription: 'M5, m5.metal (96 vCPU, 384GB RAM, Bare Metal)', provider: 'AWS', cpu: '96 vCPU', ram: '384 GB', cpuArchitecture: 'Intel Xeon Scalable (Skylake/Cascade Lake)', cpuClockSpeed: 'Up to 3.1 GHz', isSapCertified: true, sapsRating: 249600 },
  { id: 'aws-m5a-large', familyGroup: 'M5a', instanceName: 'm5a.large (2 vCPU, 8GB RAM)', fullDescription: 'M5a, m5a.large (2 vCPU, 8GB RAM)', provider: 'AWS', cpu: '2 vCPU', ram: '8GB', cpuArchitecture: 'AMD EPYC (Naples)', cpuClockSpeed: '2.5 GHz'},
  { id: 'aws-m5ad-large', familyGroup: 'M5ad', instanceName: 'm5ad.large (2 vCPU, 8GB RAM, NVMe)', fullDescription: 'M5ad, m5ad.large (2 vCPU, 8GB RAM, NVMe)', provider: 'AWS', cpu: '2 vCPU', ram: '8GB', cpuArchitecture: 'AMD EPYC (Naples)', cpuClockSpeed: '2.5 GHz'},
  { id: 'aws-m5n-large', familyGroup: 'M5n', instanceName: 'm5n.large (2 vCPU, 8GB RAM, 25Gbps)', fullDescription: 'M5n, m5n.large (2 vCPU, 8GB RAM, 25Gbps)', provider: 'AWS', cpu: '2 vCPU', ram: '8GB', cpuArchitecture: 'Intel Xeon Scalable (Skylake/Cascade Lake)', cpuClockSpeed: 'Up to 3.1 GHz', isSapCertified: true, sapsRating: 5670},
  { id: 'aws-m5n-xlarge', familyGroup: 'M5n', instanceName: 'm5n.xlarge (4 vCPU, 16GB RAM, 25Gbps)', fullDescription: 'M5n, m5n.xlarge (4 vCPU, 16GB RAM, 25Gbps)', provider: 'AWS', cpu: '4 vCPU', ram: '16GB', cpuArchitecture: 'Intel Xeon Scalable (Skylake/Cascade Lake)', cpuClockSpeed: 'Up to 3.1 GHz', isSapCertified: true, sapsRating: 11339},
  { id: 'aws-m5n-2xlarge', familyGroup: 'M5n', instanceName: 'm5n.2xlarge (8 vCPU, 32GB RAM, 25Gbps)', fullDescription: 'M5n, m5n.2xlarge (8 vCPU, 32GB RAM, 25Gbps)', provider: 'AWS', cpu: '8 vCPU', ram: '32GB', cpuArchitecture: 'Intel Xeon Scalable (Skylake/Cascade Lake)', cpuClockSpeed: 'Up to 3.1 GHz', isSapCertified: true, sapsRating: 22678},
  { id: 'aws-m5dn-large', familyGroup: 'M5dn', instanceName: 'm5dn.large (2 vCPU, 8GB RAM, NVMe, 25Gbps)', fullDescription: 'M5dn, m5dn.large (2 vCPU, 8GB RAM, NVMe, 25Gbps)', provider: 'AWS', cpu: '2 vCPU', ram: '8GB', cpuArchitecture: 'Intel Xeon Scalable (Skylake/Cascade Lake)', cpuClockSpeed: 'Up to 3.1 GHz', isSapCertified: true, sapsRating: 5670},
  { id: 'aws-m5dn-xlarge', familyGroup: 'M5dn', instanceName: 'm5dn.xlarge (4 vCPU, 16GB RAM, NVMe, 25Gbps)', fullDescription: 'M5dn, m5dn.xlarge (4 vCPU, 16GB RAM, NVMe, 25Gbps)', provider: 'AWS', cpu: '4 vCPU', ram: '16GB', cpuArchitecture: 'Intel Xeon Scalable (Skylake/Cascade Lake)', cpuClockSpeed: 'Up to 3.1 GHz', isSapCertified: true, sapsRating: 11339},
  { id: 'aws-m5zn-large', familyGroup: 'M5zn', instanceName: 'm5zn.large (2 vCPU, 8GB RAM, 4.5GHz)', fullDescription: 'M5zn, m5zn.large (2 vCPU, 8GB RAM, 4.5GHz)', provider: 'AWS', cpu: '2 vCPU', ram: '8GB', cpuArchitecture: 'Intel Xeon Scalable (Cascade Lake)', cpuClockSpeed: 'Up to 4.5 GHz'},

  { id: 'aws-m6i-large', familyGroup: 'M6i', instanceName: 'm6i.large (2 vCPU, 8GB RAM)', fullDescription: 'M6i, m6i.large (2 vCPU, 8GB RAM)', provider: 'AWS', cpu: '2 vCPU', ram: '8 GB', cpuArchitecture: 'Intel Xeon Scalable (Ice Lake)', cpuClockSpeed: 'Up to 3.5 GHz', isSapCertified: true, sapsRating: 7500 },
  { id: 'aws-m6i-xlarge', familyGroup: 'M6i', instanceName: 'm6i.xlarge (4 vCPU, 16GB RAM)', fullDescription: 'M6i, m6i.xlarge (4 vCPU, 16GB RAM)', provider: 'AWS', cpu: '4 vCPU', ram: '16 GB', cpuArchitecture: 'Intel Xeon Scalable (Ice Lake)', cpuClockSpeed: 'Up to 3.5 GHz', isSapCertified: true, sapsRating: 15000 },
  { id: 'aws-m6i-2xlarge', familyGroup: 'M6i', instanceName: 'm6i.2xlarge (8 vCPU, 32GB RAM)', fullDescription: 'M6i, m6i.2xlarge (8 vCPU, 32GB RAM)', provider: 'AWS', cpu: '8 vCPU', ram: '32 GB', cpuArchitecture: 'Intel Xeon Scalable (Ice Lake)', cpuClockSpeed: 'Up to 3.5 GHz', isSapCertified: true, sapsRating: 30000 },
  { id: 'aws-m6i-4xlarge', familyGroup: 'M6i', instanceName: 'm6i.4xlarge (16 vCPU, 64GB RAM)', fullDescription: 'M6i, m6i.4xlarge (16 vCPU, 64GB RAM)', provider: 'AWS', cpu: '16 vCPU', ram: '64 GB', cpuArchitecture: 'Intel Xeon Scalable (Ice Lake)', cpuClockSpeed: 'Up to 3.5 GHz', isSapCertified: true, sapsRating: 60000 },
  { id: 'aws-m6i-8xlarge', familyGroup: 'M6i', instanceName: 'm6i.8xlarge (32 vCPU, 128GB RAM)', fullDescription: 'M6i, m6i.8xlarge (32 vCPU, 128GB RAM)', provider: 'AWS', cpu: '32 vCPU', ram: '128GB', cpuArchitecture: 'Intel Xeon Scalable (Ice Lake)', cpuClockSpeed: 'Up to 3.5 GHz', isSapCertified: true, sapsRating: 120000 },
  { id: 'aws-m6i-12xlarge', familyGroup: 'M6i', instanceName: 'm6i.12xlarge (48 vCPU, 192GB RAM)', fullDescription: 'M6i, m6i.12xlarge (48 vCPU, 192GB RAM)', provider: 'AWS', cpu: '48 vCPU', ram: '192GB', cpuArchitecture: 'Intel Xeon Scalable (Ice Lake)', cpuClockSpeed: 'Up to 3.5 GHz', isSapCertified: true, sapsRating: 180000 },
  { id: 'aws-m6i-16xlarge', familyGroup: 'M6i', instanceName: 'm6i.16xlarge (64 vCPU, 256GB RAM)', fullDescription: 'M6i, m6i.16xlarge (64 vCPU, 256GB RAM)', provider: 'AWS', cpu: '64 vCPU', ram: '256GB', cpuArchitecture: 'Intel Xeon Scalable (Ice Lake)', cpuClockSpeed: 'Up to 3.5 GHz', isSapCertified: true, sapsRating: 240000 },
  { id: 'aws-m6i-24xlarge', familyGroup: 'M6i', instanceName: 'm6i.24xlarge (96 vCPU, 384GB RAM)', fullDescription: 'M6i, m6i.24xlarge (96 vCPU, 384GB RAM)', provider: 'AWS', cpu: '96 vCPU', ram: '384GB', cpuArchitecture: 'Intel Xeon Scalable (Ice Lake)', cpuClockSpeed: 'Up to 3.5 GHz', isSapCertified: true, sapsRating: 360000 },
  { id: 'aws-m6i-32xlarge', familyGroup: 'M6i', instanceName: 'm6i.32xlarge (128 vCPU, 512GB RAM)', fullDescription: 'M6i, m6i.32xlarge (128 vCPU, 512GB RAM)', provider: 'AWS', cpu: '128 vCPU', ram: '512GB', cpuArchitecture: 'Intel Xeon Scalable (Ice Lake)', cpuClockSpeed: 'Up to 3.5 GHz', isSapCertified: true, sapsRating: 480000 },
  { id: 'aws-m6i-metal', familyGroup: 'M6i', instanceName: 'm6i.metal (128 vCPU, 512GB RAM, Bare Metal)', fullDescription: 'M6i, m6i.metal (128 vCPU, 512GB RAM, Bare Metal)', provider: 'AWS', cpu: '128 vCPU', ram: '512GB', cpuArchitecture: 'Intel Xeon Scalable (Ice Lake)', cpuClockSpeed: 'Up to 3.5 GHz', isSapCertified: true, sapsRating: 480000 },
  { id: 'aws-m6id-large', familyGroup: 'M6id', instanceName: 'm6id.large (2 vCPU, 8GB RAM, NVMe)', fullDescription: 'M6id, m6id.large (2 vCPU, 8GB RAM, NVMe)', provider: 'AWS', cpu: '2 vCPU', ram: '8GB', cpuArchitecture: 'Intel Xeon Scalable (Ice Lake)', cpuClockSpeed: 'Up to 3.5 GHz', isSapCertified: true, sapsRating: 7500},
  { id: 'aws-m6id-xlarge', familyGroup: 'M6id', instanceName: 'm6id.xlarge (4 vCPU, 16GB RAM, NVMe)', fullDescription: 'M6id, m6id.xlarge (4 vCPU, 16GB RAM, NVMe)', provider: 'AWS', cpu: '4 vCPU', ram: '16GB', cpuArchitecture: 'Intel Xeon Scalable (Ice Lake)', cpuClockSpeed: 'Up to 3.5 GHz', isSapCertified: true, sapsRating: 15000},
  { id: 'aws-m6id-2xlarge', familyGroup: 'M6id', instanceName: 'm6id.2xlarge (8 vCPU, 32GB RAM, NVMe)', fullDescription: 'M6id, m6id.2xlarge (8 vCPU, 32GB RAM, NVMe)', provider: 'AWS', cpu: '8 vCPU', ram: '32GB', cpuArchitecture: 'Intel Xeon Scalable (Ice Lake)', cpuClockSpeed: 'Up to 3.5 GHz', isSapCertified: true, sapsRating: 30000},
  { id: 'aws-m6a-large', familyGroup: 'M6a', instanceName: 'm6a.large (2 vCPU, 8GB RAM)', fullDescription: 'M6a, m6a.large (2 vCPU, 8GB RAM)', provider: 'AWS', cpu: '2 vCPU', ram: '8GB', cpuArchitecture: 'AMD EPYC (Milan)', cpuClockSpeed: 'Up to 3.6 GHz', isSapCertified: true, sapsRating: 7000},
  { id: 'aws-m6a-xlarge', familyGroup: 'M6a', instanceName: 'm6a.xlarge (4 vCPU, 16GB RAM)', fullDescription: 'M6a, m6a.xlarge (4 vCPU, 16GB RAM)', provider: 'AWS', cpu: '4 vCPU', ram: '16GB', cpuArchitecture: 'AMD EPYC (Milan)', cpuClockSpeed: 'Up to 3.6 GHz', isSapCertified: true, sapsRating: 14000},
  { id: 'aws-m6a-2xlarge', familyGroup: 'M6a', instanceName: 'm6a.2xlarge (8 vCPU, 32GB RAM)', fullDescription: 'M6a, m6a.2xlarge (8 vCPU, 32GB RAM)', provider: 'AWS', cpu: '8 vCPU', ram: '32GB', cpuArchitecture: 'AMD EPYC (Milan)', cpuClockSpeed: 'Up to 3.6 GHz', isSapCertified: true, sapsRating: 28000},
  { id: 'aws-m6g-medium', familyGroup: 'M6g', instanceName: 'm6g.medium (1 vCPU, 4GB RAM)', fullDescription: 'M6g, m6g.medium (1 vCPU, 4GB RAM)', provider: 'AWS', cpu: '1 vCPU', ram: '4GB', cpuArchitecture: 'AWS Graviton2', cpuClockSpeed: '2.5 GHz', isSapCertified: true, sapsRating: 3500},
  { id: 'aws-m6gd-medium', familyGroup: 'M6gd', instanceName: 'm6gd.medium (1 vCPU, 4GB RAM, NVMe)', fullDescription: 'M6gd, m6gd.medium (1 vCPU, 4GB RAM, NVMe)', provider: 'AWS', cpu: '1 vCPU', ram: '4GB', cpuArchitecture: 'AWS Graviton2', cpuClockSpeed: '2.5 GHz'},

  { id: 'aws-m7i-large', familyGroup: 'M7i (Intel)', instanceName: 'm7i.large (2 vCPU, 8GB RAM)', fullDescription: 'M7i (Intel), m7i.large (2 vCPU, 8GB RAM)', provider: 'AWS', cpu: '2 vCPU', ram: '8GB', cpuArchitecture: 'Intel Xeon Scalable (Sapphire Rapids)', cpuClockSpeed: 'Up to 3.2 GHz', isSapCertified: true, sapsRating: 8000},
  { id: 'aws-m7i-xlarge', familyGroup: 'M7i (Intel)', instanceName: 'm7i.xlarge (4 vCPU, 16GB RAM)', fullDescription: 'M7i (Intel), m7i.xlarge (4 vCPU, 16GB RAM)', provider: 'AWS', cpu: '4 vCPU', ram: '16GB', cpuArchitecture: 'Intel Xeon Scalable (Sapphire Rapids)', cpuClockSpeed: 'Up to 3.2 GHz', isSapCertified: true, sapsRating: 16000},
  { id: 'aws-m7i-2xlarge', familyGroup: 'M7i (Intel)', instanceName: 'm7i.2xlarge (8 vCPU, 32GB RAM)', fullDescription: 'M7i (Intel), m7i.2xlarge (8 vCPU, 32GB RAM)', provider: 'AWS', cpu: '8 vCPU', ram: '32GB', cpuArchitecture: 'Intel Xeon Scalable (Sapphire Rapids)', cpuClockSpeed: 'Up to 3.2 GHz', isSapCertified: true, sapsRating: 32000},
  { id: 'aws-m7i-4xlarge', familyGroup: 'M7i (Intel)', instanceName: 'm7i.4xlarge (16 vCPU, 64GB RAM)', fullDescription: 'M7i (Intel), m7i.4xlarge (16 vCPU, 64GB RAM)', provider: 'AWS', cpu: '16 vCPU', ram: '64GB', cpuArchitecture: 'Intel Xeon Scalable (Sapphire Rapids)', cpuClockSpeed: 'Up to 3.2 GHz', isSapCertified: true, sapsRating: 64000},
  { id: 'aws-m7i-8xlarge', familyGroup: 'M7i (Intel)', instanceName: 'm7i.8xlarge (32 vCPU, 128GB RAM)', fullDescription: 'M7i (Intel), m7i.8xlarge (32 vCPU, 128GB RAM)', provider: 'AWS', cpu: '32 vCPU', ram: '128GB', cpuArchitecture: 'Intel Xeon Scalable (Sapphire Rapids)', cpuClockSpeed: 'Up to 3.2 GHz', isSapCertified: true, sapsRating: 128000},
  { id: 'aws-m7i-12xlarge', familyGroup: 'M7i (Intel)', instanceName: 'm7i.12xlarge (48 vCPU, 192GB RAM)', fullDescription: 'M7i (Intel), m7i.12xlarge (48 vCPU, 192GB RAM)', provider: 'AWS', cpu: '48 vCPU', ram: '192GB', cpuArchitecture: 'Intel Xeon Scalable (Sapphire Rapids)', cpuClockSpeed: 'Up to 3.2 GHz', isSapCertified: true, sapsRating: 192000},
  { id: 'aws-m7i-16xlarge', familyGroup: 'M7i (Intel)', instanceName: 'm7i.16xlarge (64 vCPU, 256GB RAM)', fullDescription: 'M7i (Intel), m7i.16xlarge (64 vCPU, 256GB RAM)', provider: 'AWS', cpu: '64 vCPU', ram: '256GB', cpuArchitecture: 'Intel Xeon Scalable (Sapphire Rapids)', cpuClockSpeed: 'Up to 3.2 GHz', isSapCertified: true, sapsRating: 256000},
  { id: 'aws-m7i-24xlarge', familyGroup: 'M7i (Intel)', instanceName: 'm7i.24xlarge (96 vCPU, 384GB RAM)', fullDescription: 'M7i (Intel), m7i.24xlarge (96 vCPU, 384GB RAM)', provider: 'AWS', cpu: '96 vCPU', ram: '384GB', cpuArchitecture: 'Intel Xeon Scalable (Sapphire Rapids)', cpuClockSpeed: 'Up to 3.2 GHz', isSapCertified: true, sapsRating: 384000},
  { id: 'aws-m7i-48xlarge', familyGroup: 'M7i (Intel)', instanceName: 'm7i.48xlarge (192 vCPU, 768GB RAM)', fullDescription: 'M7i (Intel), m7i.48xlarge (192 vCPU, 768GB RAM)', provider: 'AWS', cpu: '192 vCPU', ram: '768GB', cpuArchitecture: 'Intel Xeon Scalable (Sapphire Rapids)', cpuClockSpeed: 'Up to 3.2 GHz', isSapCertified: true, sapsRating: 768000},
  { id: 'aws-m7i-metal-24xl', familyGroup: 'M7i (Intel)', instanceName: 'm7i-metal.24xl (96 vCPU, 384GB RAM, Bare Metal)', fullDescription: 'M7i (Intel), m7i-metal.24xl (96 vCPU, 384GB RAM, Bare Metal)', provider: 'AWS', cpu: '96 vCPU', ram: '384GB', cpuArchitecture: 'Intel Xeon Scalable (Sapphire Rapids)', cpuClockSpeed: 'Up to 3.2 GHz', isSapCertified: true, sapsRating: 384000},
  { id: 'aws-m7i-metal-48xl', familyGroup: 'M7i (Intel)', instanceName: 'm7i-metal.48xl (192 vCPU, 768GB RAM, Bare Metal)', fullDescription: 'M7i (Intel), m7i-metal.48xl (192 vCPU, 768GB RAM, Bare Metal)', provider: 'AWS', cpu: '192 vCPU', ram: '768GB', cpuArchitecture: 'Intel Xeon Scalable (Sapphire Rapids)', cpuClockSpeed: 'Up to 3.2 GHz', isSapCertified: true, sapsRating: 768000},
  { id: 'aws-m7i-flex-large', familyGroup: 'M7i-Flex (Intel)', instanceName: 'm7i-flex.large (2 vCPU, 8-32GB RAM)', fullDescription: 'M7i-Flex (Intel), m7i-flex.large (2 vCPU, 8-32GB RAM)', provider: 'AWS', cpu: '2 vCPU', ram: '8-32 GB', cpuArchitecture: 'Intel Xeon Scalable (Sapphire Rapids)', cpuClockSpeed: 'Up to 3.2 GHz', isSapCertified: true, sapsRating: 8000 },
  { id: 'aws-m7i-flex-xlarge', familyGroup: 'M7i-Flex (Intel)', instanceName: 'm7i-flex.xlarge (4 vCPU, 16-64GB RAM)', fullDescription: 'M7i-Flex (Intel), m7i-flex.xlarge (4 vCPU, 16-64GB RAM)', provider: 'AWS', cpu: '4 vCPU', ram: '16-64 GB', cpuArchitecture: 'Intel Xeon Scalable (Sapphire Rapids)', cpuClockSpeed: 'Up to 3.2 GHz', isSapCertified: true, sapsRating: 16000 },
  { id: 'aws-m7i-flex-2xlarge', familyGroup: 'M7i-Flex (Intel)', instanceName: 'm7i-flex.2xlarge (8 vCPU, 32-128GB RAM)', fullDescription: 'M7i-Flex (Intel), m7i-flex.2xlarge (8 vCPU, 32-128GB RAM)', provider: 'AWS', cpu: '8 vCPU', ram: '32-128 GB', cpuArchitecture: 'Intel Xeon Scalable (Sapphire Rapids)', cpuClockSpeed: 'Up to 3.2 GHz', isSapCertified: true, sapsRating: 32000 },
  { id: 'aws-m7i-flex-4xlarge', familyGroup: 'M7i-Flex (Intel)', instanceName: 'm7i-flex.4xlarge (16 vCPU, 64-256GB RAM)', fullDescription: 'M7i-Flex (Intel), m7i-flex.4xlarge (16 vCPU, 64-256GB RAM)', provider: 'AWS', cpu: '16 vCPU', ram: '64-256 GB', cpuArchitecture: 'Intel Xeon Scalable (Sapphire Rapids)', cpuClockSpeed: 'Up to 3.2 GHz', isSapCertified: true, sapsRating: 64000 },
  { id: 'aws-m7i-flex-8xlarge', familyGroup: 'M7i-Flex (Intel)', instanceName: 'm7i-flex.8xlarge (32 vCPU, 128-512GB RAM)', fullDescription: 'M7i-Flex (Intel), m7i-flex.8xlarge (32 vCPU, 128-512GB RAM)', provider: 'AWS', cpu: '32 vCPU', ram: '128-512 GB', cpuArchitecture: 'Intel Xeon Scalable (Sapphire Rapids)', cpuClockSpeed: 'Up to 3.2 GHz', isSapCertified: true, sapsRating: 128000 },
  { id: 'aws-m7a-medium', familyGroup: 'M7a (AMD)', instanceName: 'm7a.medium (1 vCPU, 4GB RAM)', fullDescription: 'M7a (AMD), m7a.medium (1 vCPU, 4GB RAM)', provider: 'AWS', cpu: '1 vCPU', ram: '4GB', cpuArchitecture: 'AMD EPYC (Genoa)', cpuClockSpeed: 'Up to 3.7GHz'},

  { id: 'aws-m7g-medium', familyGroup: 'M7g (Graviton3)', instanceName: 'm7g.medium (1 vCPU, 4GB RAM)', fullDescription: 'M7g (Graviton3), m7g.medium (1 vCPU, 4GB RAM)', provider: 'AWS', cpu: '1 vCPU', ram: '4GB', cpuArchitecture: 'AWS Graviton3', cpuClockSpeed: '2.6 GHz', isSapCertified: true, sapsRating: 4000},
  { id: 'aws-m7g-large', familyGroup: 'M7g (Graviton3)', instanceName: 'm7g.large (2 vCPU, 8GB RAM)', fullDescription: 'M7g (Graviton3), m7g.large (2 vCPU, 8GB RAM)', provider: 'AWS', cpu: '2 vCPU', ram: '8GB', cpuArchitecture: 'AWS Graviton3', cpuClockSpeed: '2.6 GHz', isSapCertified: true, sapsRating: 8000},
  { id: 'aws-m7g-xlarge', familyGroup: 'M7g (Graviton3)', instanceName: 'm7g.xlarge (4 vCPU, 16GB RAM)', fullDescription: 'M7g (Graviton3), m7g.xlarge (4 vCPU, 16GB RAM)', provider: 'AWS', cpu: '4 vCPU', ram: '16GB', cpuArchitecture: 'AWS Graviton3', cpuClockSpeed: '2.6 GHz', isSapCertified: true, sapsRating: 16000},
  { id: 'aws-m7g-2xlarge', familyGroup: 'M7g (Graviton3)', instanceName: 'm7g.2xlarge (8 vCPU, 32GB RAM)', fullDescription: 'M7g (Graviton3), m7g.2xlarge (8 vCPU, 32GB RAM)', provider: 'AWS', cpu: '8 vCPU', ram: '32GB', cpuArchitecture: 'AWS Graviton3', cpuClockSpeed: '2.6 GHz', isSapCertified: true, sapsRating: 32000},
  { id: 'aws-m7g-4xlarge', familyGroup: 'M7g (Graviton3)', instanceName: 'm7g.4xlarge (16 vCPU, 64GB RAM)', fullDescription: 'M7g (Graviton3), m7g.4xlarge (16 vCPU, 64GB RAM)', provider: 'AWS', cpu: '16 vCPU', ram: '64GB', cpuArchitecture: 'AWS Graviton3', cpuClockSpeed: '2.6 GHz', isSapCertified: true, sapsRating: 64000},
  { id: 'aws-m7g-8xlarge', familyGroup: 'M7g (Graviton3)', instanceName: 'm7g.8xlarge (32 vCPU, 128GB RAM)', fullDescription: 'M7g (Graviton3), m7g.8xlarge (32 vCPU, 128GB RAM)', provider: 'AWS', cpu: '32 vCPU', ram: '128GB', cpuArchitecture: 'AWS Graviton3', cpuClockSpeed: '2.6 GHz', isSapCertified: true, sapsRating: 128000},
  { id: 'aws-m7g-12xlarge', familyGroup: 'M7g (Graviton3)', instanceName: 'm7g.12xlarge (48 vCPU, 192GB RAM)', fullDescription: 'M7g (Graviton3), m7g.12xlarge (48 vCPU, 192GB RAM)', provider: 'AWS', cpu: '48 vCPU', ram: '192GB', cpuArchitecture: 'AWS Graviton3', cpuClockSpeed: '2.6 GHz', isSapCertified: true, sapsRating: 192000},
  { id: 'aws-m7g-16xlarge', familyGroup: 'M7g (Graviton3)', instanceName: 'm7g.16xlarge (64 vCPU, 256GB RAM)', fullDescription: 'M7g (Graviton3), m7g.16xlarge (64 vCPU, 256GB RAM)', provider: 'AWS', cpu: '64 vCPU', ram: '256GB', cpuArchitecture: 'AWS Graviton3', cpuClockSpeed: '2.6 GHz', isSapCertified: true, sapsRating: 256000},
  { id: 'aws-m7g-metal', familyGroup: 'M7g (Graviton3)', instanceName: 'm7g.metal (64 vCPU, 256GB RAM, Bare Metal)', fullDescription: 'M7g (Graviton3), m7g.metal (64 vCPU, 256GB RAM, Bare Metal)', provider: 'AWS', cpu: '64 vCPU', ram: '256GB', cpuArchitecture: 'AWS Graviton3', cpuClockSpeed: '2.6 GHz', isSapCertified: true, sapsRating: 256000},
  { id: 'aws-m7gd-medium', familyGroup: 'M7gd (Graviton3)', instanceName: 'm7gd.medium (1 vCPU, 4GB RAM, NVMe)', fullDescription: 'M7gd (Graviton3), m7gd.medium (1 vCPU, 4GB RAM, NVMe)', provider: 'AWS', cpu: '1 vCPU', ram: '4GB', cpuArchitecture: 'AWS Graviton3', cpuClockSpeed: '2.6 GHz'},

  // General Purpose - T series (Burstable)
  { id: 'aws-t2-nano', familyGroup: 'T2', instanceName: 't2.nano (1 vCPU, 0.5GB RAM)', fullDescription: 'T2, t2.nano (1 vCPU, 0.5GB RAM)', provider: 'AWS', cpu: '1 vCPU', ram: '0.5GB', cpuArchitecture: 'Intel Xeon (Broadwell/Haswell)', cpuClockSpeed: 'Up to 2.4GHz' },
  { id: 'aws-t2-micro', familyGroup: 'T2', instanceName: 't2.micro (1 vCPU, 1GB RAM)', fullDescription: 'T2, t2.micro (1 vCPU, 1GB RAM)', provider: 'AWS', cpu: '1 vCPU', ram: '1GB', cpuArchitecture: 'Intel Xeon (Broadwell/Haswell)', cpuClockSpeed: 'Up to 2.4GHz' },
  { id: 'aws-t2-small', familyGroup: 'T2', instanceName: 't2.small (1 vCPU, 2GB RAM)', fullDescription: 'T2, t2.small (1 vCPU, 2GB RAM)', provider: 'AWS', cpu: '1 vCPU', ram: '2GB', cpuArchitecture: 'Intel Xeon (Broadwell/Haswell)', cpuClockSpeed: 'Up to 2.4GHz' },
  { id: 'aws-t2-medium', familyGroup: 'T2', instanceName: 't2.medium (2 vCPU, 4GB RAM)', fullDescription: 'T2, t2.medium (2 vCPU, 4GB RAM)', provider: 'AWS', cpu: '2 vCPU', ram: '4GB', cpuArchitecture: 'Intel Xeon (Broadwell/Haswell)', cpuClockSpeed: 'Up to 2.4GHz' },
  { id: 'aws-t2-large', familyGroup: 'T2', instanceName: 't2.large (2 vCPU, 8GB RAM)', fullDescription: 'T2, t2.large (2 vCPU, 8GB RAM)', provider: 'AWS', cpu: '2 vCPU', ram: '8GB', cpuArchitecture: 'Intel Xeon (Broadwell/Haswell)', cpuClockSpeed: 'Up to 2.4GHz' },
  { id: 'aws-t3-nano', familyGroup: 'T3', instanceName: 't3.nano (2 vCPU, 0.5GB RAM)', fullDescription: 'T3, t3.nano (2 vCPU, 0.5GB RAM)', provider: 'AWS', cpu: '2 vCPU', ram: '0.5GB', cpuArchitecture: 'Intel Xeon Scalable (Skylake/Cascade Lake)', cpuClockSpeed: 'Up to 3.1GHz' },
  { id: 'aws-t3-micro', familyGroup: 'T3', instanceName: 't3.micro (2 vCPU, 1GB RAM)', fullDescription: 'T3, t3.micro (2 vCPU, 1GB RAM)', provider: 'AWS', cpu: '2 vCPU', ram: '1GB', cpuArchitecture: 'Intel Xeon Scalable (Skylake/Cascade Lake)', cpuClockSpeed: 'Up to 3.1GHz' },
  { id: 'aws-t3-small', familyGroup: 'T3', instanceName: 't3.small (2 vCPU, 2GB RAM)', fullDescription: 'T3, t3.small (2 vCPU, 2GB RAM)', provider: 'AWS', cpu: '2 vCPU', ram: '2GB', cpuArchitecture: 'Intel Xeon Scalable (Skylake/Cascade Lake)', cpuClockSpeed: 'Up to 3.1GHz' },
  { id: 'aws-t3-medium', familyGroup: 'T3', instanceName: 't3.medium (2 vCPU, 4GB RAM)', fullDescription: 'T3, t3.medium (2 vCPU, 4GB RAM)', provider: 'AWS', cpu: '2 vCPU', ram: '4GB', cpuArchitecture: 'Intel Xeon Scalable (Skylake/Cascade Lake)', cpuClockSpeed: 'Up to 3.1GHz' },
  { id: 'aws-t3-large', familyGroup: 'T3', instanceName: 't3.large (2 vCPU, 8GB RAM)', fullDescription: 'T3, t3.large (2 vCPU, 8GB RAM)', provider: 'AWS', cpu: '2 vCPU', ram: '8GB', cpuArchitecture: 'Intel Xeon Scalable (Skylake/Cascade Lake)', cpuClockSpeed: 'Up to 3.1GHz' },
  { id: 'aws-t3a-nano', familyGroup: 'T3a', instanceName: 't3a.nano (2 vCPU, 0.5GB RAM)', fullDescription: 'T3a, t3a.nano (2 vCPU, 0.5GB RAM)', provider: 'AWS', cpu: '2 vCPU', ram: '0.5GB', cpuArchitecture: 'AMD EPYC (Naples)', cpuClockSpeed: '2.5GHz' },
  { id: 'aws-t3a-micro', familyGroup: 'T3a', instanceName: 't3a.micro (2 vCPU, 1GB RAM)', fullDescription: 'T3a, t3a.micro (2 vCPU, 1GB RAM)', provider: 'AWS', cpu: '2 vCPU', ram: '1GB', cpuArchitecture: 'AMD EPYC (Naples)', cpuClockSpeed: '2.5GHz' },
  { id: 'aws-t3a-small', familyGroup: 'T3a', instanceName: 't3a.small (2 vCPU, 2GB RAM)', fullDescription: 'T3a, t3a.small (2 vCPU, 2GB RAM)', provider: 'AWS', cpu: '2 vCPU', ram: '2GB', cpuArchitecture: 'AMD EPYC (Naples)', cpuClockSpeed: '2.5GHz' },
  { id: 'aws-t3a-medium', familyGroup: 'T3a', instanceName: 't3a.medium (2 vCPU, 4GB RAM)', fullDescription: 'T3a, t3a.medium (2 vCPU, 4GB RAM)', provider: 'AWS', cpu: '2 vCPU', ram: '4GB', cpuArchitecture: 'AMD EPYC (Naples)', cpuClockSpeed: '2.5GHz' },
  { id: 'aws-t3a-large', familyGroup: 'T3a', instanceName: 't3a.large (2 vCPU, 8GB RAM)', fullDescription: 'T3a, t3a.large (2 vCPU, 8GB RAM)', provider: 'AWS', cpu: '2 vCPU', ram: '8GB', cpuArchitecture: 'AMD EPYC (Naples)', cpuClockSpeed: '2.5GHz' },
  { id: 'aws-t4g-nano', familyGroup: 'T4g', instanceName: 't4g.nano (2 vCPU, 0.5GB RAM)', fullDescription: 'T4g, t4g.nano (2 vCPU, 0.5GB RAM)', provider: 'AWS', cpu: '2 vCPU', ram: '0.5GB', cpuArchitecture: 'AWS Graviton2', cpuClockSpeed: '2.5GHz' },
  { id: 'aws-t4g-micro', familyGroup: 'T4g', instanceName: 't4g.micro (2 vCPU, 1GB RAM)', fullDescription: 'T4g, t4g.micro (2 vCPU, 1GB RAM)', provider: 'AWS', cpu: '2 vCPU', ram: '1GB', cpuArchitecture: 'AWS Graviton2', cpuClockSpeed: '2.5GHz' },
  { id: 'aws-t4g-small', familyGroup: 'T4g', instanceName: 't4g.small (2 vCPU, 2GB RAM)', fullDescription: 'T4g, t4g.small (2 vCPU, 2GB RAM)', provider: 'AWS', cpu: '2 vCPU', ram: '2GB', cpuArchitecture: 'AWS Graviton2', cpuClockSpeed: '2.5GHz' },
  { id: 'aws-t4g-medium', familyGroup: 'T4g', instanceName: 't4g.medium (2 vCPU, 4GB RAM)', fullDescription: 'T4g, t4g.medium (2 vCPU, 4GB RAM)', provider: 'AWS', cpu: '2 vCPU', ram: '4GB', cpuArchitecture: 'AWS Graviton2', cpuClockSpeed: '2.5GHz' },
  { id: 'aws-t4g-large', familyGroup: 'T4g', instanceName: 't4g.large (2 vCPU, 8GB RAM)', fullDescription: 'T4g, t4g.large (2 vCPU, 8GB RAM)', provider: 'AWS', cpu: '2 vCPU', ram: '8GB', cpuArchitecture: 'AWS Graviton2', cpuClockSpeed: '2.5GHz' },

  // Compute Optimized - C series
  { id: 'aws-c5-large', familyGroup: 'C5', instanceName: 'c5.large (2 vCPU, 4GB RAM)', fullDescription: 'C5, c5.large (2 vCPU, 4GB RAM)', provider: 'AWS', cpu: '2 vCPU', ram: '4GB', cpuArchitecture: 'Intel Xeon Scalable (Skylake/Cascade Lake)', cpuClockSpeed: 'Up to 3.6GHz'},
  { id: 'aws-c5-xlarge', familyGroup: 'C5', instanceName: 'c5.xlarge (4 vCPU, 8GB RAM)', fullDescription: 'C5, c5.xlarge (4 vCPU, 8GB RAM)', provider: 'AWS', cpu: '4 vCPU', ram: '8GB', cpuArchitecture: 'Intel Xeon Scalable (Skylake/Cascade Lake)', cpuClockSpeed: 'Up to 3.6GHz', isSapCertified: true, sapsRating: 10400},
  { id: 'aws-c5-2xlarge', familyGroup: 'C5', instanceName: 'c5.2xlarge (8 vCPU, 16GB RAM)', fullDescription: 'C5, c5.2xlarge (8 vCPU, 16GB RAM)', provider: 'AWS', cpu: '8 vCPU', ram: '16GB', cpuArchitecture: 'Intel Xeon Scalable (Skylake/Cascade Lake)', cpuClockSpeed: 'Up to 3.6GHz', isSapCertified: true, sapsRating: 20800},
  { id: 'aws-c5-4xlarge', familyGroup: 'C5', instanceName: 'c5.4xlarge (16 vCPU, 32GB RAM)', fullDescription: 'C5, c5.4xlarge (16 vCPU, 32GB RAM)', provider: 'AWS', cpu: '16 vCPU', ram: '32GB', cpuArchitecture: 'Intel Xeon Scalable (Skylake/Cascade Lake)', cpuClockSpeed: 'Up to 3.6GHz', isSapCertified: true, sapsRating: 41600},
  { id: 'aws-c5-9xlarge', familyGroup: 'C5', instanceName: 'c5.9xlarge (36 vCPU, 72GB RAM)', fullDescription: 'C5, c5.9xlarge (36 vCPU, 72GB RAM)', provider: 'AWS', cpu: '36 vCPU', ram: '72GB', cpuArchitecture: 'Intel Xeon Scalable (Skylake/Cascade Lake)', cpuClockSpeed: 'Up to 3.6GHz', isSapCertified: true, sapsRating: 93600},
  { id: 'aws-c5-12xlarge', familyGroup: 'C5', instanceName: 'c5.12xlarge (48 vCPU, 96GB RAM)', fullDescription: 'C5, c5.12xlarge (48 vCPU, 96GB RAM)', provider: 'AWS', cpu: '48 vCPU', ram: '96GB', cpuArchitecture: 'Intel Xeon Scalable (Skylake/Cascade Lake)', cpuClockSpeed: 'Up to 3.6GHz', isSapCertified: true, sapsRating: 124800},
  { id: 'aws-c5-18xlarge', familyGroup: 'C5', instanceName: 'c5.18xlarge (72 vCPU, 144GB RAM)', fullDescription: 'C5, c5.18xlarge (72 vCPU, 144GB RAM)', provider: 'AWS', cpu: '72 vCPU', ram: '144GB', cpuArchitecture: 'Intel Xeon Scalable (Skylake/Cascade Lake)', cpuClockSpeed: 'Up to 3.6GHz', isSapCertified: true, sapsRating: 187200},
  { id: 'aws-c5-24xlarge', familyGroup: 'C5', instanceName: 'c5.24xlarge (96 vCPU, 192GB RAM)', fullDescription: 'C5, c5.24xlarge (96 vCPU, 192GB RAM)', provider: 'AWS', cpu: '96 vCPU', ram: '192GB', cpuArchitecture: 'Intel Xeon Scalable (Skylake/Cascade Lake)', cpuClockSpeed: 'Up to 3.6GHz', isSapCertified: true, sapsRating: 249600},
  { id: 'aws-c5d-large', familyGroup: 'C5d', instanceName: 'c5d.large (2 vCPU, 4GB RAM, NVMe)', fullDescription: 'C5d, c5d.large (2 vCPU, 4GB RAM, NVMe)', provider: 'AWS', cpu: '2 vCPU', ram: '4GB', cpuArchitecture: 'Intel Xeon Scalable (Skylake/Cascade Lake)', cpuClockSpeed: 'Up to 3.6GHz'},
  { id: 'aws-c5a-large', familyGroup: 'C5a', instanceName: 'c5a.large (2 vCPU, 4GB RAM)', fullDescription: 'C5a, c5a.large (2 vCPU, 4GB RAM)', provider: 'AWS', cpu: '2 vCPU', ram: '4GB', cpuArchitecture: 'AMD EPYC (Rome)', cpuClockSpeed: 'Up to 3.3GHz'},
  { id: 'aws-c5n-large', familyGroup: 'C5n', instanceName: 'c5n.large (2 vCPU, 5.25GB RAM, 25Gbps)', fullDescription: 'C5n, c5n.large (2 vCPU, 5.25GB RAM, 25Gbps)', provider: 'AWS', cpu: '2 vCPU', ram: '5.25GB', cpuArchitecture: 'Intel Xeon Scalable (Skylake/Cascade Lake)', cpuClockSpeed: 'Up to 3.4GHz'},
  { id: 'aws-c6i-large', familyGroup: 'C6i', instanceName: 'c6i.large (2 vCPU, 4GB RAM)', fullDescription: 'C6i, c6i.large (2 vCPU, 4GB RAM)', provider: 'AWS', cpu: '2 vCPU', ram: '4GB', cpuArchitecture: 'Intel Xeon Scalable (Ice Lake)', cpuClockSpeed: 'Up to 3.5GHz', isSapCertified: true, sapsRating: 7500},
  { id: 'aws-c6id-large', familyGroup: 'C6id', instanceName: 'c6id.large (2 vCPU, 4GB RAM, NVMe)', fullDescription: 'C6id, c6id.large (2 vCPU, 4GB RAM, NVMe)', provider: 'AWS', cpu: '2 vCPU', ram: '4GB', cpuArchitecture: 'Intel Xeon Scalable (Ice Lake)', cpuClockSpeed: 'Up to 3.5GHz'},
  { id: 'aws-c6a-large', familyGroup: 'C6a', instanceName: 'c6a.large (2 vCPU, 4GB RAM)', fullDescription: 'C6a, c6a.large (2 vCPU, 4GB RAM)', provider: 'AWS', cpu: '2 vCPU', ram: '4GB', cpuArchitecture: 'AMD EPYC (Milan)', cpuClockSpeed: 'Up to 3.6GHz'},
  { id: 'aws-c6g-medium', familyGroup: 'C6g', instanceName: 'c6g.medium (1 vCPU, 2GB RAM)', fullDescription: 'C6g, c6g.medium (1 vCPU, 2GB RAM)', provider: 'AWS', cpu: '1 vCPU', ram: '2GB', cpuArchitecture: 'AWS Graviton2', cpuClockSpeed: '2.5GHz'},
  { id: 'aws-c6gn-medium', familyGroup: 'C6gn', instanceName: 'c6gn.medium (1 vCPU, 2GB RAM, 100Gbps)', fullDescription: 'C6gn, c6gn.medium (1 vCPU, 2GB RAM, 100Gbps)', provider: 'AWS', cpu: '1 vCPU', ram: '2GB', cpuArchitecture: 'AWS Graviton2', cpuClockSpeed: '2.5GHz'},
  { id: 'aws-c7i-large', familyGroup: 'C7i (Intel)', instanceName: 'c7i.large (2 vCPU, 4GB RAM)', fullDescription: 'C7i (Intel), c7i.large (2 vCPU, 4GB RAM)', provider: 'AWS', cpu: '2 vCPU', ram: '4GB', cpuArchitecture: 'Intel Xeon Scalable (Sapphire Rapids)', cpuClockSpeed: 'Up to 3.2GHz'},
  { id: 'aws-c7a-medium', familyGroup: 'C7a (AMD)', instanceName: 'c7a.medium (1 vCPU, 2GB RAM)', fullDescription: 'C7a (AMD), c7a.medium (1 vCPU, 2GB RAM)', provider: 'AWS', cpu: '1 vCPU', ram: '2GB', cpuArchitecture: 'AMD EPYC (Genoa)', cpuClockSpeed: 'Up to 3.7GHz'},
  { id: 'aws-c7g-medium', familyGroup: 'C7g (Graviton3)', instanceName: 'c7g.medium (1 vCPU, 2GB RAM)', fullDescription: 'C7g (Graviton3), c7g.medium (1 vCPU, 2GB RAM)', provider: 'AWS', cpu: '1 vCPU', ram: '2GB', cpuArchitecture: 'AWS Graviton3', cpuClockSpeed: '2.6GHz'},
  { id: 'aws-c7gn-medium', familyGroup: 'C7gn (Graviton3E)', instanceName: 'c7gn.medium (1 vCPU, 2GB RAM, 200Gbps)', fullDescription: 'C7gn (Graviton3E), c7gn.medium (1 vCPU, 2GB RAM, 200Gbps)', provider: 'AWS', cpu: '1 vCPU', ram: '2GB', cpuArchitecture: 'AWS Graviton3E', cpuClockSpeed: 'Varies'},

  // Memory Optimized - R, X, Z, U series
  { id: 'aws-r3-large', familyGroup: 'R3', instanceName: 'r3.large (2 vCPU, 15.25GB RAM)', fullDescription: 'R3, r3.large (2 vCPU, 15.25GB RAM)', provider: 'AWS', cpu: '2 vCPU', ram: '15.25 GB', cpuArchitecture: 'Intel Xeon (Ivy Bridge/Haswell)', cpuClockSpeed: 'Varies', isSapCertified: true, sapsRating: 4980 },
  { id: 'aws-r3-xlarge', familyGroup: 'R3', instanceName: 'r3.xlarge (4 vCPU, 30.5GB RAM)', fullDescription: 'R3, r3.xlarge (4 vCPU, 30.5GB RAM)', provider: 'AWS', cpu: '4 vCPU', ram: '30.5 GB', cpuArchitecture: 'Intel Xeon (Ivy Bridge/Haswell)', cpuClockSpeed: 'Varies', isSapCertified: true, sapsRating: 9960 },
  { id: 'aws-r3-2xlarge', familyGroup: 'R3', instanceName: 'r3.2xlarge (8 vCPU, 61GB RAM)', fullDescription: 'R3, r3.2xlarge (8 vCPU, 61GB RAM)', provider: 'AWS', cpu: '8 vCPU', ram: '61 GB', cpuArchitecture: 'Intel Xeon (Ivy Bridge/Haswell)', cpuClockSpeed: 'Varies', isSapCertified: true, sapsRating: 19920 },
  { id: 'aws-r3-4xlarge', familyGroup: 'R3', instanceName: 'r3.4xlarge (16 vCPU, 122GB RAM)', fullDescription: 'R3, r3.4xlarge (16 vCPU, 122GB RAM)', provider: 'AWS', cpu: '16 vCPU', ram: '122 GB', cpuArchitecture: 'Intel Xeon (Ivy Bridge/Haswell)', cpuClockSpeed: 'Varies', isSapCertified: true, sapsRating: 39840 },
  { id: 'aws-r3-8xlarge', familyGroup: 'R3', instanceName: 'r3.8xlarge (32 vCPU, 244GB RAM)', fullDescription: 'R3, r3.8xlarge (32 vCPU, 244GB RAM)', provider: 'AWS', cpu: '32 vCPU', ram: '244 GB', cpuArchitecture: 'Intel Xeon (Ivy Bridge/Haswell)', cpuClockSpeed: 'Varies', isSapCertified: true, sapsRating: 79680 },
  { id: 'aws-r4-large', familyGroup: 'R4', instanceName: 'r4.large (2 vCPU, 15.25GB RAM)', fullDescription: 'R4, r4.large (2 vCPU, 15.25GB RAM)', provider: 'AWS', cpu: '2 vCPU', ram: '15.25 GB', cpuArchitecture: 'Intel Xeon (Broadwell)', cpuClockSpeed: '2.3 GHz', isSapCertified: true, sapsRating: 5750 },
  { id: 'aws-r4-xlarge', familyGroup: 'R4', instanceName: 'r4.xlarge (4 vCPU, 30.5GB RAM)', fullDescription: 'R4, r4.xlarge (4 vCPU, 30.5GB RAM)', provider: 'AWS', cpu: '4 vCPU', ram: '30.5 GB', cpuArchitecture: 'Intel Xeon (Broadwell)', cpuClockSpeed: '2.3 GHz', isSapCertified: true, sapsRating: 11500 },
  { id: 'aws-r4-2xlarge', familyGroup: 'R4', instanceName: 'r4.2xlarge (8 vCPU, 61GB RAM)', fullDescription: 'R4, r4.2xlarge (8 vCPU, 61GB RAM)', provider: 'AWS', cpu: '8 vCPU', ram: '61 GB', cpuArchitecture: 'Intel Xeon (Broadwell)', cpuClockSpeed: '2.3 GHz', isSapCertified: true, sapsRating: 23000 },
  { id: 'aws-r4-4xlarge', familyGroup: 'R4', instanceName: 'r4.4xlarge (16 vCPU, 122GB RAM)', fullDescription: 'R4, r4.4xlarge (16 vCPU, 122GB RAM)', provider: 'AWS', cpu: '16 vCPU', ram: '122 GB', cpuArchitecture: 'Intel Xeon (Broadwell)', cpuClockSpeed: '2.3 GHz', isSapCertified: true, sapsRating: 46000 },
  { id: 'aws-r4-8xlarge', familyGroup: 'R4', instanceName: 'r4.8xlarge (32 vCPU, 244GB RAM)', fullDescription: 'R4, r4.8xlarge (32 vCPU, 244GB RAM)', provider: 'AWS', cpu: '32 vCPU', ram: '244 GB', cpuArchitecture: 'Intel Xeon (Broadwell)', cpuClockSpeed: '2.3 GHz', isSapCertified: true, sapsRating: 92000 },
  { id: 'aws-r4-16xlarge', familyGroup: 'R4', instanceName: 'r4.16xlarge (64 vCPU, 488GB RAM)', fullDescription: 'R4, r4.16xlarge (64 vCPU, 488GB RAM)', provider: 'AWS', cpu: '64 vCPU', ram: '488 GB', cpuArchitecture: 'Intel Xeon (Broadwell)', cpuClockSpeed: '2.3 GHz', isSapCertified: true, sapsRating: 184000 },
  { id: 'aws-r5-large', familyGroup: 'R5', instanceName: 'r5.large (2 vCPU, 16GB RAM)', fullDescription: 'R5, r5.large (2 vCPU, 16GB RAM)', provider: 'AWS', cpu: '2 vCPU', ram: '16GB', cpuArchitecture: 'Intel Xeon Scalable (Skylake/Cascade Lake)', cpuClockSpeed: 'Up to 3.1GHz', isSapCertified: true, sapsRating: 5670 },
  { id: 'aws-r5-xlarge', familyGroup: 'R5', instanceName: 'r5.xlarge (4 vCPU, 32GB RAM)', fullDescription: 'R5, r5.xlarge (4 vCPU, 32GB RAM)', provider: 'AWS', cpu: '4 vCPU', ram: '32GB', cpuArchitecture: 'Intel Xeon Scalable (Skylake/Cascade Lake)', cpuClockSpeed: 'Up to 3.1GHz', isSapCertified: true, sapsRating: 11339 },
  { id: 'aws-r5-2xlarge', familyGroup: 'R5', instanceName: 'r5.2xlarge (8 vCPU, 64GB RAM)', fullDescription: 'R5, r5.2xlarge (8 vCPU, 64GB RAM)', provider: 'AWS', cpu: '8 vCPU', ram: '64GB', cpuArchitecture: 'Intel Xeon Scalable (Skylake/Cascade Lake)', cpuClockSpeed: 'Up to 3.1GHz', isSapCertified: true, sapsRating: 22678 },
  { id: 'aws-r5-4xlarge', familyGroup: 'R5', instanceName: 'r5.4xlarge (16 vCPU, 128GB RAM)', fullDescription: 'R5, r5.4xlarge (16 vCPU, 128GB RAM)', provider: 'AWS', cpu: '16 vCPU', ram: '128GB', cpuArchitecture: 'Intel Xeon Scalable (Skylake/Cascade Lake)', cpuClockSpeed: 'Up to 3.1GHz', isSapCertified: true, sapsRating: 45356 },
  { id: 'aws-r5-8xlarge', familyGroup: 'R5', instanceName: 'r5.8xlarge (32 vCPU, 256GB RAM)', fullDescription: 'R5, r5.8xlarge (32 vCPU, 256GB RAM)', provider: 'AWS', cpu: '32 vCPU', ram: '256GB', cpuArchitecture: 'Intel Xeon Scalable (Skylake/Cascade Lake)', cpuClockSpeed: 'Up to 3.1GHz', isSapCertified: true, sapsRating: 90712 },
  { id: 'aws-r5-12xlarge', familyGroup: 'R5', instanceName: 'r5.12xlarge (48 vCPU, 384GB RAM)', fullDescription: 'R5, r5.12xlarge (48 vCPU, 384GB RAM)', provider: 'AWS', cpu: '48 vCPU', ram: '384GB', cpuArchitecture: 'Intel Xeon Scalable (Skylake/Cascade Lake)', cpuClockSpeed: 'Up to 3.1GHz', isSapCertified: true, sapsRating: 136068 },
  { id: 'aws-r5-16xlarge', familyGroup: 'R5', instanceName: 'r5.16xlarge (64 vCPU, 512GB RAM)', fullDescription: 'R5, r5.16xlarge (64 vCPU, 512GB RAM)', provider: 'AWS', cpu: '64 vCPU', ram: '512GB', cpuArchitecture: 'Intel Xeon Scalable (Skylake/Cascade Lake)', cpuClockSpeed: 'Up to 3.1GHz', isSapCertified: true, sapsRating: 181424 },
  { id: 'aws-r5-24xlarge', familyGroup: 'R5', instanceName: 'r5.24xlarge (96 vCPU, 768GB RAM)', fullDescription: 'R5, r5.24xlarge (96 vCPU, 768GB RAM)', provider: 'AWS', cpu: '96 vCPU', ram: '768GB', cpuArchitecture: 'Intel Xeon Scalable (Skylake/Cascade Lake)', cpuClockSpeed: 'Up to 3.1GHz', isSapCertified: true, sapsRating: 272136 },
  { id: 'aws-r5-metal', familyGroup: 'R5', instanceName: 'r5.metal (96 vCPU, 768GB RAM, Bare Metal)', fullDescription: 'R5, r5.metal (96 vCPU, 768GB RAM, Bare Metal)', provider: 'AWS', cpu: '96 vCPU', ram: '768GB', cpuArchitecture: 'Intel Xeon Scalable (Skylake/Cascade Lake)', cpuClockSpeed: 'Up to 3.1GHz', isSapCertified: true, sapsRating: 272136 },
  { id: 'aws-r5b-large', familyGroup: 'R5b', instanceName: 'r5b.large (2 vCPU, 16GB RAM, EBS-Opt)', fullDescription: 'R5b, r5b.large (2 vCPU, 16GB RAM, EBS-Opt)', provider: 'AWS', cpu: '2 vCPU', ram: '16GB', cpuArchitecture: 'Intel Xeon Scalable (Cascade Lake)', cpuClockSpeed: 'Up to 3.1GHz', isSapCertified: true, sapsRating: 5670 },
  { id: 'aws-r5n-large', familyGroup: 'R5n', instanceName: 'r5n.large (2 vCPU, 16GB RAM, 25Gbps)', fullDescription: 'R5n, r5n.large (2 vCPU, 16GB RAM, 25Gbps)', provider: 'AWS', cpu: '2 vCPU', ram: '16GB', cpuArchitecture: 'Intel Xeon Scalable (Cascade Lake)', cpuClockSpeed: 'Up to 3.1GHz', isSapCertified: true, sapsRating: 5670 },
  { id: 'aws-r5dn-large', familyGroup: 'R5dn', instanceName: 'r5dn.large (2 vCPU, 16GB RAM, NVMe, 25Gbps)', fullDescription: 'R5dn, r5dn.large (2 vCPU, 16GB RAM, NVMe, 25Gbps)', provider: 'AWS', cpu: '2 vCPU', ram: '16GB', cpuArchitecture: 'Intel Xeon Scalable (Cascade Lake)', cpuClockSpeed: 'Up to 3.1GHz', isSapCertified: true, sapsRating: 5670 },
  { id: 'aws-r6i-large', familyGroup: 'R6i', instanceName: 'r6i.large (2 vCPU, 16GB RAM)', fullDescription: 'R6i, r6i.large (2 vCPU, 16GB RAM)', provider: 'AWS', cpu: '2 vCPU', ram: '16GB', cpuArchitecture: 'Intel Xeon Scalable (Ice Lake)', cpuClockSpeed: 'Up to 3.5GHz', isSapCertified: true, sapsRating: 7500 },
  { id: 'aws-r6i-xlarge', familyGroup: 'R6i', instanceName: 'r6i.xlarge (4 vCPU, 32GB RAM)', fullDescription: 'R6i, r6i.xlarge (4 vCPU, 32GB RAM)', provider: 'AWS', cpu: '4 vCPU', ram: '32GB', cpuArchitecture: 'Intel Xeon Scalable (Ice Lake)', cpuClockSpeed: 'Up to 3.5GHz', isSapCertified: true, sapsRating: 15000 },
  { id: 'aws-r6i-2xlarge', familyGroup: 'R6i', instanceName: 'r6i.2xlarge (8 vCPU, 64GB RAM)', fullDescription: 'R6i, r6i.2xlarge (8 vCPU, 64GB RAM)', provider: 'AWS', cpu: '8 vCPU', ram: '64GB', cpuArchitecture: 'Intel Xeon Scalable (Ice Lake)', cpuClockSpeed: 'Up to 3.5GHz', isSapCertified: true, sapsRating: 30000 },
  { id: 'aws-r6i-4xlarge', familyGroup: 'R6i', instanceName: 'r6i.4xlarge (16 vCPU, 128GB RAM)', fullDescription: 'R6i, r6i.4xlarge (16 vCPU, 128GB RAM)', provider: 'AWS', cpu: '16 vCPU', ram: '128GB', cpuArchitecture: 'Intel Xeon Scalable (Ice Lake)', cpuClockSpeed: 'Up to 3.5GHz', isSapCertified: true, sapsRating: 60000 },
  { id: 'aws-r6i-8xlarge', familyGroup: 'R6i', instanceName: 'r6i.8xlarge (32 vCPU, 256GB RAM)', fullDescription: 'R6i, r6i.8xlarge (32 vCPU, 256GB RAM)', provider: 'AWS', cpu: '32 vCPU', ram: '256GB', cpuArchitecture: 'Intel Xeon Scalable (Ice Lake)', cpuClockSpeed: 'Up to 3.5GHz', isSapCertified: true, sapsRating: 120000 },
  { id: 'aws-r6i-12xlarge', familyGroup: 'R6i', instanceName: 'r6i.12xlarge (48 vCPU, 384GB RAM)', fullDescription: 'R6i, r6i.12xlarge (48 vCPU, 384GB RAM)', provider: 'AWS', cpu: '48 vCPU', ram: '384GB', cpuArchitecture: 'Intel Xeon Scalable (Ice Lake)', cpuClockSpeed: 'Up to 3.5GHz', isSapCertified: true, sapsRating: 180000 },
  { id: 'aws-r6i-16xlarge', familyGroup: 'R6i', instanceName: 'r6i.16xlarge (64 vCPU, 512GB RAM)', fullDescription: 'R6i, r6i.16xlarge (64 vCPU, 512GB RAM)', provider: 'AWS', cpu: '64 vCPU', ram: '512GB', cpuArchitecture: 'Intel Xeon Scalable (Ice Lake)', cpuClockSpeed: 'Up to 3.5GHz', isSapCertified: true, sapsRating: 240000 },
  { id: 'aws-r6i-24xlarge', familyGroup: 'R6i', instanceName: 'r6i.24xlarge (96 vCPU, 768GB RAM)', fullDescription: 'R6i, r6i.24xlarge (96 vCPU, 768GB RAM)', provider: 'AWS', cpu: '96 vCPU', ram: '768GB', cpuArchitecture: 'Intel Xeon Scalable (Ice Lake)', cpuClockSpeed: 'Up to 3.5GHz', isSapCertified: true, sapsRating: 360000 },
  { id: 'aws-r6i-32xlarge', familyGroup: 'R6i', instanceName: 'r6i.32xlarge (128 vCPU, 1024GB RAM)', fullDescription: 'R6i, r6i.32xlarge (128 vCPU, 1024GB RAM)', provider: 'AWS', cpu: '128 vCPU', ram: '1024GB', cpuArchitecture: 'Intel Xeon Scalable (Ice Lake)', cpuClockSpeed: 'Up to 3.5GHz', isSapCertified: true, sapsRating: 480000 },
  { id: 'aws-r6id-large', familyGroup: 'R6id', instanceName: 'r6id.large (2 vCPU, 16GB RAM, NVMe)', fullDescription: 'R6id, r6id.large (2 vCPU, 16GB RAM, NVMe)', provider: 'AWS', cpu: '2 vCPU', ram: '16GB', cpuArchitecture: 'Intel Xeon Scalable (Ice Lake)', cpuClockSpeed: 'Up to 3.5GHz', isSapCertified: true, sapsRating: 7500},
  { id: 'aws-r6a-large', familyGroup: 'R6a', instanceName: 'r6a.large (2 vCPU, 16GB RAM)', fullDescription: 'R6a, r6a.large (2 vCPU, 16GB RAM)', provider: 'AWS', cpu: '2 vCPU', ram: '16GB', cpuArchitecture: 'AMD EPYC (Milan)', cpuClockSpeed: 'Up to 3.6GHz', isSapCertified: true, sapsRating: 7000},
  { id: 'aws-r6g-medium', familyGroup: 'R6g', instanceName: 'r6g.medium (1 vCPU, 8GB RAM)', fullDescription: 'R6g, r6g.medium (1 vCPU, 8GB RAM)', provider: 'AWS', cpu: '1 vCPU', ram: '8GB', cpuArchitecture: 'AWS Graviton2', cpuClockSpeed: '2.5GHz'},
  { id: 'aws-r7i-large', familyGroup: 'R7i (Intel)', instanceName: 'r7i.large (2 vCPU, 16GB RAM)', fullDescription: 'R7i (Intel), r7i.large (2 vCPU, 16GB RAM)', provider: 'AWS', cpu: '2 vCPU', ram: '16GB', cpuArchitecture: 'Intel Xeon Scalable (Sapphire Rapids)', cpuClockSpeed: 'Up to 3.2GHz', isSapCertified: true, sapsRating: 8000},
  { id: 'aws-r7i-xlarge', familyGroup: 'R7i (Intel)', instanceName: 'r7i.xlarge (4 vCPU, 32GB RAM)', fullDescription: 'R7i (Intel), r7i.xlarge (4 vCPU, 32GB RAM)', provider: 'AWS', cpu: '4 vCPU', ram: '32GB', cpuArchitecture: 'Intel Xeon Scalable (Sapphire Rapids)', cpuClockSpeed: 'Up to 3.2GHz', isSapCertified: true, sapsRating: 16000},
  { id: 'aws-r7i-2xlarge', familyGroup: 'R7i (Intel)', instanceName: 'r7i.2xlarge (8 vCPU, 64GB RAM)', fullDescription: 'R7i (Intel), r7i.2xlarge (8 vCPU, 64GB RAM)', provider: 'AWS', cpu: '8 vCPU', ram: '64GB', cpuArchitecture: 'Intel Xeon Scalable (Sapphire Rapids)', cpuClockSpeed: 'Up to 3.2GHz', isSapCertified: true, sapsRating: 32000},
  { id: 'aws-r7i-4xlarge', familyGroup: 'R7i (Intel)', instanceName: 'r7i.4xlarge (16 vCPU, 128GB RAM)', fullDescription: 'R7i (Intel), r7i.4xlarge (16 vCPU, 128GB RAM)', provider: 'AWS', cpu: '16 vCPU', ram: '128GB', cpuArchitecture: 'Intel Xeon Scalable (Sapphire Rapids)', cpuClockSpeed: 'Up to 3.2GHz', isSapCertified: true, sapsRating: 64000},
  { id: 'aws-r7i-8xlarge', familyGroup: 'R7i (Intel)', instanceName: 'r7i.8xlarge (32 vCPU, 256GB RAM)', fullDescription: 'R7i (Intel), r7i.8xlarge (32 vCPU, 256GB RAM)', provider: 'AWS', cpu: '32 vCPU', ram: '256GB', cpuArchitecture: 'Intel Xeon Scalable (Sapphire Rapids)', cpuClockSpeed: 'Up to 3.2GHz', isSapCertified: true, sapsRating: 128000},
  { id: 'aws-r7i-12xlarge', familyGroup: 'R7i (Intel)', instanceName: 'r7i.12xlarge (48 vCPU, 384GB RAM)', fullDescription: 'R7i (Intel), r7i.12xlarge (48 vCPU, 384GB RAM)', provider: 'AWS', cpu: '48 vCPU', ram: '384GB', cpuArchitecture: 'Intel Xeon Scalable (Sapphire Rapids)', cpuClockSpeed: 'Up to 3.2GHz', isSapCertified: true, sapsRating: 192000},
  { id: 'aws-r7i-16xlarge', familyGroup: 'R7i (Intel)', instanceName: 'r7i.16xlarge (64 vCPU, 512GB RAM)', fullDescription: 'R7i (Intel), r7i.16xlarge (64 vCPU, 512GB RAM)', provider: 'AWS', cpu: '64 vCPU', ram: '512GB', cpuArchitecture: 'Intel Xeon Scalable (Sapphire Rapids)', cpuClockSpeed: 'Up to 3.2GHz', isSapCertified: true, sapsRating: 256000},
  { id: 'aws-r7i-24xlarge', familyGroup: 'R7i (Intel)', instanceName: 'r7i.24xlarge (96 vCPU, 768GB RAM)', fullDescription: 'R7i (Intel), r7i.24xlarge (96 vCPU, 768GB RAM)', provider: 'AWS', cpu: '96 vCPU', ram: '768GB', cpuArchitecture: 'Intel Xeon Scalable (Sapphire Rapids)', cpuClockSpeed: 'Up to 3.2GHz', isSapCertified: true, sapsRating: 384000},
  { id: 'aws-r7i-48xlarge', familyGroup: 'R7i (Intel)', instanceName: 'r7i.48xlarge (192 vCPU, 1536GB RAM)', fullDescription: 'R7i (Intel), r7i.48xlarge (192 vCPU, 1536GB RAM)', provider: 'AWS', cpu: '192 vCPU', ram: '1536GB', cpuArchitecture: 'Intel Xeon Scalable (Sapphire Rapids)', cpuClockSpeed: 'Up to 3.2GHz', isSapCertified: true, sapsRating: 768000},
  { id: 'aws-r7iz-large', familyGroup: 'R7iz (Intel)', instanceName: 'r7iz.large (2 vCPU, 16GB RAM, 3.9GHz)', fullDescription: 'R7iz (Intel), r7iz.large (2 vCPU, 16GB RAM, 3.9GHz)', provider: 'AWS', cpu: '2 vCPU', ram: '16GB', cpuArchitecture: 'Intel Xeon Scalable (Sapphire Rapids)', cpuClockSpeed: 'Up to 3.9GHz', isSapCertified: true, sapsRating: 9500},
  { id: 'aws-r7iz-xlarge', familyGroup: 'R7iz (Intel)', instanceName: 'r7iz.xlarge (4 vCPU, 32GB RAM, 3.9GHz)', fullDescription: 'R7iz (Intel), r7iz.xlarge (4 vCPU, 32GB RAM, 3.9GHz)', provider: 'AWS', cpu: '4 vCPU', ram: '32GB', cpuArchitecture: 'Intel Xeon Scalable (Sapphire Rapids)', cpuClockSpeed: 'Up to 3.9GHz', isSapCertified: true, sapsRating: 19000},
  { id: 'aws-r7iz-2xlarge', familyGroup: 'R7iz (Intel)', instanceName: 'r7iz.2xlarge (8 vCPU, 64GB RAM, 3.9GHz)', fullDescription: 'R7iz (Intel), r7iz.2xlarge (8 vCPU, 64GB RAM, 3.9GHz)', provider: 'AWS', cpu: '8 vCPU', ram: '64GB', cpuArchitecture: 'Intel Xeon Scalable (Sapphire Rapids)', cpuClockSpeed: 'Up to 3.9GHz', isSapCertified: true, sapsRating: 38000},
  { id: 'aws-r7iz-4xlarge', familyGroup: 'R7iz (Intel)', instanceName: 'r7iz.4xlarge (16 vCPU, 128GB RAM, 3.9GHz)', fullDescription: 'R7iz (Intel), r7iz.4xlarge (16 vCPU, 128GB RAM, 3.9GHz)', provider: 'AWS', cpu: '16 vCPU', ram: '128GB', cpuArchitecture: 'Intel Xeon Scalable (Sapphire Rapids)', cpuClockSpeed: 'Up to 3.9GHz', isSapCertified: true, sapsRating: 76000},
  { id: 'aws-r7iz-8xlarge', familyGroup: 'R7iz (Intel)', instanceName: 'r7iz.8xlarge (32 vCPU, 256GB RAM, 3.9GHz)', fullDescription: 'R7iz (Intel), r7iz.8xlarge (32 vCPU, 256GB RAM, 3.9GHz)', provider: 'AWS', cpu: '32 vCPU', ram: '256GB', cpuArchitecture: 'Intel Xeon Scalable (Sapphire Rapids)', cpuClockSpeed: 'Up to 3.9GHz', isSapCertified: true, sapsRating: 152000},
  { id: 'aws-r7iz-12xlarge', familyGroup: 'R7iz (Intel)', instanceName: 'r7iz.12xlarge (48 vCPU, 384GB RAM, 3.9GHz)', fullDescription: 'R7iz (Intel), r7iz.12xlarge (48 vCPU, 384GB RAM, 3.9GHz)', provider: 'AWS', cpu: '48 vCPU', ram: '384GB', cpuArchitecture: 'Intel Xeon Scalable (Sapphire Rapids)', cpuClockSpeed: 'Up to 3.9GHz', isSapCertified: true, sapsRating: 228000},
  { id: 'aws-r7iz-16xlarge', familyGroup: 'R7iz (Intel)', instanceName: 'r7iz.16xlarge (64 vCPU, 512GB RAM, 3.9GHz)', fullDescription: 'R7iz (Intel), r7iz.16xlarge (64 vCPU, 512GB RAM, 3.9GHz)', provider: 'AWS', cpu: '64 vCPU', ram: '512GB', cpuArchitecture: 'Intel Xeon Scalable (Sapphire Rapids)', cpuClockSpeed: 'Up to 3.9GHz', isSapCertified: true, sapsRating: 304000},
  { id: 'aws-r7iz-32xlarge', familyGroup: 'R7iz (Intel)', instanceName: 'r7iz.32xlarge (128 vCPU, 1024GB RAM, 3.9GHz)', fullDescription: 'R7iz (Intel), r7iz.32xlarge (128 vCPU, 1024GB RAM, 3.9GHz)', provider: 'AWS', cpu: '128 vCPU', ram: '1024GB', cpuArchitecture: 'Intel Xeon Scalable (Sapphire Rapids)', cpuClockSpeed: 'Up to 3.9GHz', isSapCertified: true, sapsRating: 608000},
  { id: 'aws-r7a-medium', familyGroup: 'R7a (AMD)', instanceName: 'r7a.medium (1 vCPU, 8GB RAM)', fullDescription: 'R7a (AMD), r7a.medium (1 vCPU, 8GB RAM)', provider: 'AWS', cpu: '1 vCPU', ram: '8GB', cpuArchitecture: 'AMD EPYC (Genoa)', cpuClockSpeed: 'Up to 3.7GHz'},
  { id: 'aws-r7g-medium', familyGroup: 'R7g (Graviton3)', instanceName: 'r7g.medium (1 vCPU, 8GB RAM)', fullDescription: 'R7g (Graviton3), r7g.medium (1 vCPU, 8GB RAM)', provider: 'AWS', cpu: '1 vCPU', ram: '8GB', cpuArchitecture: 'AWS Graviton3', cpuClockSpeed: '2.6GHz'},
  { id: 'aws-x1-16xlarge', familyGroup: 'X1', instanceName: 'x1.16xlarge (64 vCPU, 976GB RAM)', fullDescription: 'X1, x1.16xlarge (64 vCPU, 976GB RAM)', provider: 'AWS', cpu: '64 vCPU', ram: '976GB', cpuArchitecture: 'Intel Xeon (Broadwell)', cpuClockSpeed: '2.3GHz', isSapCertified: true, sapsRating: 177750},
  { id: 'aws-x1-32xlarge', familyGroup: 'X1', instanceName: 'x1.32xlarge (128 vCPU, 1952GB RAM)', fullDescription: 'X1, x1.32xlarge (128 vCPU, 1952GB RAM)', provider: 'AWS', cpu: '128 vCPU', ram: '1952GB', cpuArchitecture: 'Intel Xeon (Broadwell)', cpuClockSpeed: '2.3GHz', isSapCertified: true, sapsRating: 355500},
  { id: 'aws-x1e-xlarge', familyGroup: 'X1e', instanceName: 'x1e.xlarge (4 vCPU, 122GB RAM)', fullDescription: 'X1e, x1e.xlarge (4 vCPU, 122GB RAM)', provider: 'AWS', cpu: '4 vCPU', ram: '122GB', cpuArchitecture: 'Intel Xeon (Broadwell)', cpuClockSpeed: '2.3GHz', isSapCertified: true, sapsRating: 11109},
  { id: 'aws-x1e-2xlarge', familyGroup: 'X1e', instanceName: 'x1e.2xlarge (8 vCPU, 244GB RAM)', fullDescription: 'X1e, x1e.2xlarge (8 vCPU, 244GB RAM)', provider: 'AWS', cpu: '8 vCPU', ram: '244GB', cpuArchitecture: 'Intel Xeon (Broadwell)', cpuClockSpeed: '2.3GHz', isSapCertified: true, sapsRating: 22219},
  { id: 'aws-x1e-4xlarge', familyGroup: 'X1e', instanceName: 'x1e.4xlarge (16 vCPU, 488GB RAM)', fullDescription: 'X1e, x1e.4xlarge (16 vCPU, 488GB RAM)', provider: 'AWS', cpu: '16 vCPU', ram: '488GB', cpuArchitecture: 'Intel Xeon (Broadwell)', cpuClockSpeed: '2.3GHz', isSapCertified: true, sapsRating: 44438},
  { id: 'aws-x1e-8xlarge', familyGroup: 'X1e', instanceName: 'x1e.8xlarge (32 vCPU, 976GB RAM)', fullDescription: 'X1e, x1e.8xlarge (32 vCPU, 976GB RAM)', provider: 'AWS', cpu: '32 vCPU', ram: '976GB', cpuArchitecture: 'Intel Xeon (Broadwell)', cpuClockSpeed: '2.3GHz', isSapCertified: true, sapsRating: 88875},
  { id: 'aws-x1e-16xlarge', familyGroup: 'X1e', instanceName: 'x1e.16xlarge (64 vCPU, 1952GB RAM)', fullDescription: 'X1e, x1e.16xlarge (64 vCPU, 1952GB RAM)', provider: 'AWS', cpu: '64 vCPU', ram: '1952GB', cpuArchitecture: 'Intel Xeon (Broadwell)', cpuClockSpeed: '2.3GHz', isSapCertified: true, sapsRating: 177750},
  { id: 'aws-x1e-32xlarge', familyGroup: 'X1e', instanceName: 'x1e.32xlarge (128 vCPU, 3904GB RAM)', fullDescription: 'X1e, x1e.32xlarge (128 vCPU, 3904GB RAM)', provider: 'AWS', cpu: '128 vCPU', ram: '3904GB', cpuArchitecture: 'Intel Xeon (Broadwell)', cpuClockSpeed: '2.3GHz', isSapCertified: true, sapsRating: 355500},
  { id: 'aws-x2idn-16xlarge', familyGroup: 'X2idn', instanceName: 'x2idn.16xlarge (64 vCPU, 1024GB RAM, NVMe)', fullDescription: 'X2idn, x2idn.16xlarge (64 vCPU, 1024GB RAM, NVMe)', provider: 'AWS', cpu: '64 vCPU', ram: '1024GB', cpuArchitecture: 'Intel Xeon Scalable (Cascade Lake)', cpuClockSpeed: 'Up to 3.5GHz', isSapCertified: true, sapsRating: 200000},
  { id: 'aws-x2idn-24xlarge', familyGroup: 'X2idn', instanceName: 'x2idn.24xlarge (96 vCPU, 1536GB RAM, NVMe)', fullDescription: 'X2idn, x2idn.24xlarge (96 vCPU, 1536GB RAM, NVMe)', provider: 'AWS', cpu: '96 vCPU', ram: '1536GB', cpuArchitecture: 'Intel Xeon Scalable (Cascade Lake)', cpuClockSpeed: 'Up to 3.5GHz', isSapCertified: true, sapsRating: 300000},
  { id: 'aws-x2idn-32xlarge', familyGroup: 'X2idn', instanceName: 'x2idn.32xlarge (128 vCPU, 2048GB RAM, NVMe)', fullDescription: 'X2idn, x2idn.32xlarge (128 vCPU, 2048GB RAM, NVMe)', provider: 'AWS', cpu: '128 vCPU', ram: '2048GB', cpuArchitecture: 'Intel Xeon Scalable (Cascade Lake)', cpuClockSpeed: 'Up to 3.5GHz', isSapCertified: true, sapsRating: 400000},
  { id: 'aws-x2iedn-xlarge', familyGroup: 'X2iedn', instanceName: 'x2iedn.xlarge (4 vCPU, 128GB RAM, NVMe)', fullDescription: 'X2iedn, x2iedn.xlarge (4 vCPU, 128GB RAM, NVMe)', provider: 'AWS', cpu: '4 vCPU', ram: '128GB', cpuArchitecture: 'Intel Xeon Scalable (Ice Lake)', cpuClockSpeed: 'Up to 3.5GHz', isSapCertified: true, sapsRating: 15000},
  { id: 'aws-x2iedn-2xlarge', familyGroup: 'X2iedn', instanceName: 'x2iedn.2xlarge (8 vCPU, 256GB RAM, NVMe)', fullDescription: 'X2iedn, x2iedn.2xlarge (8 vCPU, 256GB RAM, NVMe)', provider: 'AWS', cpu: '8 vCPU', ram: '256GB', cpuArchitecture: 'Intel Xeon Scalable (Ice Lake)', cpuClockSpeed: 'Up to 3.5GHz', isSapCertified: true, sapsRating: 30000},
  { id: 'aws-x2iedn-4xlarge', familyGroup: 'X2iedn', instanceName: 'x2iedn.4xlarge (16 vCPU, 512GB RAM, NVMe)', fullDescription: 'X2iedn, x2iedn.4xlarge (16 vCPU, 512GB RAM, NVMe)', provider: 'AWS', cpu: '16 vCPU', ram: '512GB', cpuArchitecture: 'Intel Xeon Scalable (Ice Lake)', cpuClockSpeed: 'Up to 3.5GHz', isSapCertified: true, sapsRating: 60000},
  { id: 'aws-x2iedn-8xlarge', familyGroup: 'X2iedn', instanceName: 'x2iedn.8xlarge (32 vCPU, 1024GB RAM, NVMe)', fullDescription: 'X2iedn, x2iedn.8xlarge (32 vCPU, 1024GB RAM, NVMe)', provider: 'AWS', cpu: '32 vCPU', ram: '1024GB', cpuArchitecture: 'Intel Xeon Scalable (Ice Lake)', cpuClockSpeed: 'Up to 3.5GHz', isSapCertified: true, sapsRating: 120000},
  { id: 'aws-x2iedn-16xlarge', familyGroup: 'X2iedn', instanceName: 'x2iedn.16xlarge (64 vCPU, 2048GB RAM, NVMe)', fullDescription: 'X2iedn, x2iedn.16xlarge (64 vCPU, 2048GB RAM, NVMe)', provider: 'AWS', cpu: '64 vCPU', ram: '2048GB', cpuArchitecture: 'Intel Xeon Scalable (Ice Lake)', cpuClockSpeed: 'Up to 3.5GHz', isSapCertified: true, sapsRating: 240000},
  { id: 'aws-x2iedn-32xlarge', familyGroup: 'X2iedn', instanceName: 'x2iedn.32xlarge (128 vCPU, 4096GB RAM, NVMe)', fullDescription: 'X2iedn, x2iedn.32xlarge (128 vCPU, 4096GB RAM, NVMe)', provider: 'AWS', cpu: '128 vCPU', ram: '4096GB', cpuArchitecture: 'Intel Xeon Scalable (Ice Lake)', cpuClockSpeed: 'Up to 3.5GHz', isSapCertified: true, sapsRating: 480000},
  { id: 'aws-x2iezn-2xlarge', familyGroup: 'X2iezn', instanceName: 'x2iezn.2xlarge (8 vCPU, 32GB RAM, 4.5GHz)', fullDescription: 'X2iezn, x2iezn.2xlarge (8 vCPU, 32GB RAM, 4.5GHz)', provider: 'AWS', cpu: '8 vCPU', ram: '32GB', cpuArchitecture: 'Intel Xeon Scalable (Cascade Lake)', cpuClockSpeed: 'Up to 4.5GHz', isSapCertified: true, sapsRating: 37000},
  { id: 'aws-x2iezn-4xlarge', familyGroup: 'X2iezn', instanceName: 'x2iezn.4xlarge (16 vCPU, 64GB RAM, 4.5GHz)', fullDescription: 'X2iezn, x2iezn.4xlarge (16 vCPU, 64GB RAM, 4.5GHz)', provider: 'AWS', cpu: '16 vCPU', ram: '64GB', cpuArchitecture: 'Intel Xeon Scalable (Cascade Lake)', cpuClockSpeed: 'Up to 4.5GHz', isSapCertified: true, sapsRating: 74000},
  { id: 'aws-x2iezn-6xlarge', familyGroup: 'X2iezn', instanceName: 'x2iezn.6xlarge (24 vCPU, 96GB RAM, 4.5GHz)', fullDescription: 'X2iezn, x2iezn.6xlarge (24 vCPU, 96GB RAM, 4.5GHz)', provider: 'AWS', cpu: '24 vCPU', ram: '96GB', cpuArchitecture: 'Intel Xeon Scalable (Cascade Lake)', cpuClockSpeed: 'Up to 4.5GHz', isSapCertified: true, sapsRating: 111000},
  { id: 'aws-x2iezn-8xlarge', familyGroup: 'X2iezn', instanceName: 'x2iezn.8xlarge (32 vCPU, 128GB RAM, 4.5GHz)', fullDescription: 'X2iezn, x2iezn.8xlarge (32 vCPU, 128GB RAM, 4.5GHz)', provider: 'AWS', cpu: '32 vCPU', ram: '128GB', cpuArchitecture: 'Intel Xeon Scalable (Cascade Lake)', cpuClockSpeed: 'Up to 4.5GHz', isSapCertified: true, sapsRating: 148000},
  { id: 'aws-x2iezn-12xlarge', familyGroup: 'X2iezn', instanceName: 'x2iezn.12xlarge (48 vCPU, 192GB RAM, 4.5GHz)', fullDescription: 'X2iezn, x2iezn.12xlarge (48 vCPU, 192GB RAM, 4.5GHz)', provider: 'AWS', cpu: '48 vCPU', ram: '192GB', cpuArchitecture: 'Intel Xeon Scalable (Cascade Lake)', cpuClockSpeed: 'Up to 4.5GHz', isSapCertified: true, sapsRating: 222000},
  { id: 'aws-u-3tb1-metal', familyGroup: 'U (High Memory Intel)', instanceName: 'u-3tb1.metal (112 vCPU, 3TB RAM)', fullDescription: 'U (High Memory Intel), u-3tb1.metal (112 vCPU, 3TB RAM)', provider: 'AWS', cpu: '112 vCPU', ram: '3TB', cpuArchitecture: 'Intel Xeon Scalable (Skylake)', cpuClockSpeed: 'Varies', isSapCertified: true, sapsRating: 236250 },
  { id: 'aws-u-6tb1-metal', familyGroup: 'U (High Memory Intel)', instanceName: 'u-6tb1.metal (224 vCPU, 6TB RAM)', fullDescription: 'U (High Memory Intel), u-6tb1.metal (224 vCPU, 6TB RAM)', provider: 'AWS', cpu: '224 vCPU', ram: '6TB', cpuArchitecture: 'Intel Xeon Scalable (Skylake)', cpuClockSpeed: 'Varies', isSapCertified: true, sapsRating: 472500 },
  { id: 'aws-u-9tb1-metal', familyGroup: 'U (High Memory Intel)', instanceName: 'u-9tb1.metal (224 vCPU, 9TB RAM)', fullDescription: 'U (High Memory Intel), u-9tb1.metal (224 vCPU, 9TB RAM)', provider: 'AWS', cpu: '224 vCPU', ram: '9TB', cpuArchitecture: 'Intel Xeon Scalable (Skylake)', cpuClockSpeed: 'Varies', isSapCertified: true, sapsRating: 472500 },
  { id: 'aws-u-12tb1-metal', familyGroup: 'U (High Memory Intel)', instanceName: 'u-12tb1.metal (224 vCPU, 12TB RAM)', fullDescription: 'U (High Memory Intel), u-12tb1.metal (224 vCPU, 12TB RAM)', provider: 'AWS', cpu: '224 vCPU', ram: '12TB', cpuArchitecture: 'Intel Xeon Scalable (Skylake)', cpuClockSpeed: 'Varies', isSapCertified: true, sapsRating: 472500 },
  { id: 'aws-u-18tb1-metal', familyGroup: 'U (High Memory Intel)', instanceName: 'u-18tb1.metal (448 vCPU, 18TB RAM)', fullDescription: 'U (High Memory Intel), u-18tb1.metal (448 vCPU, 18TB RAM)', provider: 'AWS', cpu: '448 vCPU', ram: '18TB', cpuArchitecture: 'Intel Xeon Scalable (Cascade Lake)', cpuClockSpeed: 'Varies', isSapCertified: true, sapsRating: 768350 },
  { id: 'aws-u-24tb1-metal', familyGroup: 'U (High Memory Intel)', instanceName: 'u-24tb1.metal (448 vCPU, 24TB RAM)', fullDescription: 'U (High Memory Intel), u-24tb1.metal (448 vCPU, 24TB RAM)', provider: 'AWS', cpu: '448 vCPU', ram: '24TB', cpuArchitecture: 'Intel Xeon Scalable (Cascade Lake)', cpuClockSpeed: 'Varies', isSapCertified: true, sapsRating: 768350 },
  { id: 'aws-u7i-12tb-224xlarge', familyGroup: 'U7i (High Memory Intel)', instanceName: 'u7i-12tb.224xlarge (224 vCPU, 12TB RAM)', fullDescription: 'U7i (High Memory Intel), u7i-12tb.224xlarge (224 vCPU, 12TB RAM)', provider: 'AWS', cpu: '224 vCPU', ram: '12TB', cpuArchitecture: 'Intel Xeon Scalable (Sapphire Rapids)', cpuClockSpeed: 'Up to 3.2GHz', isSapCertified: true, sapsRating: 712000 },
  { id: 'aws-u7i-16tb-224xlarge', familyGroup: 'U7i (High Memory Intel)', instanceName: 'u7i-16tb.224xlarge (224 vCPU, 16TB RAM)', fullDescription: 'U7i (High Memory Intel), u7i-16tb.224xlarge (224 vCPU, 16TB RAM)', provider: 'AWS', cpu: '224 vCPU', ram: '16TB', cpuArchitecture: 'Intel Xeon Scalable (Sapphire Rapids)', cpuClockSpeed: 'Up to 3.2GHz', isSapCertified: true, sapsRating: 712000 },
  { id: 'aws-u7i-24tb-224xlarge', familyGroup: 'U7i (High Memory Intel)', instanceName: 'u7i-24tb.224xlarge (224 vCPU, 24TB RAM)', fullDescription: 'U7i (High Memory Intel), u7i-24tb.224xlarge (224 vCPU, 24TB RAM)', provider: 'AWS', cpu: '224 vCPU', ram: '24TB', cpuArchitecture: 'Intel Xeon Scalable (Sapphire Rapids)', cpuClockSpeed: 'Up to 3.2GHz', isSapCertified: true, sapsRating: 712000 },
  { id: 'aws-u7i-32tb-224xlarge', familyGroup: 'U7i (High Memory Intel)', instanceName: 'u7i-32tb.224xlarge (224 vCPU, 32TB RAM)', fullDescription: 'U7i (High Memory Intel), u7i-32tb.224xlarge (224 vCPU, 32TB RAM)', provider: 'AWS', cpu: '224 vCPU', ram: '32TB', cpuArchitecture: 'Intel Xeon Scalable (Sapphire Rapids)', cpuClockSpeed: 'Up to 3.2GHz', isSapCertified: true, sapsRating: 712000 },
  { id: 'aws-u7i-12tb-metal-224xl', familyGroup: 'U7i (High Memory Intel)', instanceName: 'u7i-12tb.metal-224xl (224 vCPU, 12TB RAM, Bare Metal)', fullDescription: 'U7i (High Memory Intel), u7i-12tb.metal-224xl (224 vCPU, 12TB RAM, Bare Metal)', provider: 'AWS', cpu: '224 vCPU', ram: '12TB', cpuArchitecture: 'Intel Xeon Scalable (Sapphire Rapids)', cpuClockSpeed: 'Up to 3.2GHz', isSapCertified: true, sapsRating: 712000 },
  { id: 'aws-u7i-16tb-metal-224xl', familyGroup: 'U7i (High Memory Intel)', instanceName: 'u7i-16tb.metal-224xl (224 vCPU, 16TB RAM, Bare Metal)', fullDescription: 'U7i (High Memory Intel), u7i-16tb.metal-224xl (224 vCPU, 16TB RAM, Bare Metal)', provider: 'AWS', cpu: '224 vCPU', ram: '16TB', cpuArchitecture: 'Intel Xeon Scalable (Sapphire Rapids)', cpuClockSpeed: 'Up to 3.2GHz', isSapCertified: true, sapsRating: 712000 },
  { id: 'aws-u7i-24tb-metal-224xl', familyGroup: 'U7i (High Memory Intel)', instanceName: 'u7i-24tb.metal-224xl (224 vCPU, 24TB RAM, Bare Metal)', fullDescription: 'U7i (High Memory Intel), u7i-24tb.metal-224xl (224 vCPU, 24TB RAM, Bare Metal)', provider: 'AWS', cpu: '224 vCPU', ram: '24TB', cpuArchitecture: 'Intel Xeon Scalable (Sapphire Rapids)', cpuClockSpeed: 'Up to 3.2GHz', isSapCertified: true, sapsRating: 712000 },
  { id: 'aws-u7i-32tb-metal-224xl', familyGroup: 'U7i (High Memory Intel)', instanceName: 'u7i-32tb.metal-224xl (224 vCPU, 32TB RAM, Bare Metal)', fullDescription: 'U7i (High Memory Intel), u7i-32tb.metal-224xl (224 vCPU, 32TB RAM, Bare Metal)', provider: 'AWS', cpu: '224 vCPU', ram: '32TB', cpuArchitecture: 'Intel Xeon Scalable (Sapphire Rapids)', cpuClockSpeed: 'Up to 3.2GHz', isSapCertified: true, sapsRating: 712000 },
  { id: 'aws-z1d-large', familyGroup: 'Z1d', instanceName: 'z1d.large (2 vCPU, 16GB RAM, 4.0GHz)', fullDescription: 'Z1d, z1d.large (2 vCPU, 16GB RAM, 4.0GHz)', provider: 'AWS', cpu: '2 vCPU', ram: '16GB', cpuArchitecture: 'Intel Xeon Scalable (Cascade Lake)', cpuClockSpeed: 'Up to 4.0GHz'},

  // Storage Optimized - I, D, H series
  { id: 'aws-i3-large', familyGroup: 'I3', instanceName: 'i3.large (2 vCPU, 15.25GB RAM, NVMe)', fullDescription: 'I3, i3.large (2 vCPU, 15.25GB RAM, NVMe)', provider: 'AWS', cpu: '2 vCPU', ram: '15.25GB', cpuArchitecture: 'Intel Xeon (Broadwell)', cpuClockSpeed: '2.3GHz'},
  { id: 'aws-i3en-large', familyGroup: 'I3en', instanceName: 'i3en.large (2 vCPU, 16GB RAM, NVMe)', fullDescription: 'I3en, i3en.large (2 vCPU, 16GB RAM, NVMe)', provider: 'AWS', cpu: '2 vCPU', ram: '16GB', cpuArchitecture: 'Intel Xeon Scalable (Skylake)', cpuClockSpeed: 'Up to 3.1GHz'},
  { id: 'aws-i4i-large', familyGroup: 'I4i', instanceName: 'i4i.large (2 vCPU, 16GB RAM, NVMe)', fullDescription: 'I4i, i4i.large (2 vCPU, 16GB RAM, NVMe)', provider: 'AWS', cpu: '2 vCPU', ram: '16GB', cpuArchitecture: 'Intel Xeon Scalable (Ice Lake)', cpuClockSpeed: 'Up to 3.5GHz'},
  { id: 'aws-i4g-large', familyGroup: 'I4g', instanceName: 'i4g.large (2 vCPU, 16GB RAM, NVMe)', fullDescription: 'I4g, i4g.large (2 vCPU, 16GB RAM, NVMe)', provider: 'AWS', cpu: '2 vCPU', ram: '16GB', cpuArchitecture: 'AWS Graviton2', cpuClockSpeed: '2.5GHz'},
  { id: 'aws-d2-xlarge', familyGroup: 'D2', instanceName: 'd2.xlarge (4 vCPU, 30.5GB RAM, HDD)', fullDescription: 'D2, d2.xlarge (4 vCPU, 30.5GB RAM, HDD)', provider: 'AWS', cpu: '4 vCPU', ram: '30.5GB', cpuArchitecture: 'Intel Xeon (Haswell)', cpuClockSpeed: '2.4GHz'},
  { id: 'aws-d3-xlarge', familyGroup: 'D3', instanceName: 'd3.xlarge (4 vCPU, 30.5GB RAM, HDD)', fullDescription: 'D3, d3.xlarge (4 vCPU, 30.5GB RAM, HDD)', provider: 'AWS', cpu: '4 vCPU', ram: '30.5GB', cpuArchitecture: 'Intel Xeon Scalable (Cascade Lake)', cpuClockSpeed: 'Up to 3.1GHz'},
  { id: 'aws-d3en-xlarge', familyGroup: 'D3en', instanceName: 'd3en.xlarge (4 vCPU, 16GB RAM, HDD)', fullDescription: 'D3en, d3en.xlarge (4 vCPU, 16GB RAM, HDD)', provider: 'AWS', cpu: '4 vCPU', ram: '16GB', cpuArchitecture: 'Intel Xeon Scalable (Cascade Lake)', cpuClockSpeed: 'Up to 3.1GHz'},
  { id: 'aws-h1-2xlarge', familyGroup: 'H1', instanceName: 'h1.2xlarge (8 vCPU, 32GB RAM, HDD)', fullDescription: 'H1, h1.2xlarge (8 vCPU, 32GB RAM, HDD)', provider: 'AWS', cpu: '8 vCPU', ram: '32GB', cpuArchitecture: 'Intel Xeon (Broadwell)', cpuClockSpeed: '2.3GHz'},

  // Accelerated Computing - P, G, Inf, Trn series
  { id: 'aws-p3-2xlarge', familyGroup: 'P3', instanceName: 'p3.2xlarge (8 vCPU, 61GB RAM, 1x V100)', fullDescription: 'P3, p3.2xlarge (8 vCPU, 61GB RAM, 1x V100)', provider: 'AWS', cpu: '8 vCPU', ram: '61GB', cpuArchitecture: 'Intel Xeon (Broadwell)', cpuClockSpeed: '2.3GHz', gpu: '1x NVIDIA Tesla V100'},
  { id: 'aws-p4d-24xlarge', familyGroup: 'P4d', instanceName: 'p4d.24xlarge (96 vCPU, 1.1TB RAM, 8x A100 40GB)', fullDescription: 'P4d, p4d.24xlarge (96 vCPU, 1.1TB RAM, 8x A100 40GB)', provider: 'AWS', cpu: '96 vCPU', ram: '1.1TB', cpuArchitecture: 'Intel Xeon Scalable (Cascade Lake)', cpuClockSpeed: 'Up to 3.1GHz', gpu: '8x NVIDIA A100 40GB'},
  { id: 'aws-p5-48xlarge', familyGroup: 'P5', instanceName: 'p5.48xlarge (192 vCPU, 2TB RAM, 8x H100)', fullDescription: 'P5, p5.48xlarge (192 vCPU, 2TB RAM, 8x H100)', provider: 'AWS', cpu: '192 vCPU', ram: '2TB', cpuArchitecture: 'Intel Xeon Scalable (Sapphire Rapids)', cpuClockSpeed: 'Up to 3.2GHz', gpu: '8x NVIDIA H100 80GB'},
  { id: 'aws-g4dn-xlarge', familyGroup: 'G4dn', instanceName: 'g4dn.xlarge (4 vCPU, 16GB RAM, 1x T4)', fullDescription: 'G4dn, g4dn.xlarge (4 vCPU, 16GB RAM, 1x T4)', provider: 'AWS', cpu: '4 vCPU', ram: '16GB', cpuArchitecture: 'Intel Xeon Scalable (Cascade Lake)', cpuClockSpeed: 'Up to 3.1GHz', gpu: '1x NVIDIA T4'},
  { id: 'aws-g4ad-xlarge', familyGroup: 'G4ad', instanceName: 'g4ad.xlarge (4 vCPU, 16GB RAM, 1x Radeon Pro V520)', fullDescription: 'G4ad, g4ad.xlarge (4 vCPU, 16GB RAM, 1x Radeon Pro V520)', provider: 'AWS', cpu: '4 vCPU', ram: '16GB', cpuArchitecture: 'AMD EPYC (Rome)', cpuClockSpeed: '2.8GHz', gpu: '1x AMD Radeon Pro V520'},
  { id: 'aws-g5-xlarge', familyGroup: 'G5', instanceName: 'g5.xlarge (4 vCPU, 16GB RAM, 1x A10G)', fullDescription: 'G5, g5.xlarge (4 vCPU, 16GB RAM, 1x A10G)', provider: 'AWS', cpu: '4 vCPU', ram: '16GB', cpuArchitecture: 'AMD EPYC (Milan)', cpuClockSpeed: '2.5GHz', gpu: '1x NVIDIA A10G'},
  { id: 'aws-g5g-xlarge', familyGroup: 'G5g', instanceName: 'g5g.xlarge (8 vCPU, 16GB RAM, 1x T4G)', fullDescription: 'G5g, g5g.xlarge (8 vCPU, 16GB RAM, 1x T4G)', provider: 'AWS', cpu: '8 vCPU', ram: '16GB', cpuArchitecture: 'AWS Graviton2', cpuClockSpeed: '2.5GHz', gpu: '1x NVIDIA T4G'},
  { id: 'aws-g6-xlarge', familyGroup: 'G6', instanceName: 'g6.xlarge (4 vCPU, 16GB RAM, 1x L4)', fullDescription: 'G6, g6.xlarge (4 vCPU, 16GB RAM, 1x L4)', provider: 'AWS', cpu: '4 vCPU', ram: '16GB', cpuArchitecture: 'Intel Xeon Scalable (Sapphire Rapids)', cpuClockSpeed: 'Up to 3.2GHz', gpu: '1x NVIDIA L4'},
  { id: 'aws-inf1-xlarge', familyGroup: 'Inf1', instanceName: 'inf1.xlarge (4 vCPU, 8GB RAM, 1x Inferentia)', fullDescription: 'Inf1, inf1.xlarge (4 vCPU, 8GB RAM, 1x Inferentia)', provider: 'AWS', cpu: '4 vCPU', ram: '8GB', cpuArchitecture: 'Intel Xeon Scalable (Skylake)', cpuClockSpeed: 'Up to 3.1GHz', accelerator: '1x AWS Inferentia'},
  { id: 'aws-inf2-xlarge', familyGroup: 'Inf2', instanceName: 'inf2.xlarge (4 vCPU, 16GB RAM, 1x Inferentia2)', fullDescription: 'Inf2, inf2.xlarge (4 vCPU, 16GB RAM, 1x Inferentia2)', provider: 'AWS', cpu: '4 vCPU', ram: '16GB', cpuArchitecture: 'Intel Xeon Scalable (Ice Lake)', cpuClockSpeed: 'Up to 3.5GHz', accelerator: '1x AWS Inferentia2'},
  { id: 'aws-trn1-2xlarge', familyGroup: 'Trn1', instanceName: 'trn1.2xlarge (8 vCPU, 32GB RAM, 1x Trainium)', fullDescription: 'Trn1, trn1.2xlarge (8 vCPU, 32GB RAM, 1x Trainium)', provider: 'AWS', cpu: '8 vCPU', ram: '32GB', cpuArchitecture: 'Intel Xeon Scalable (Ice Lake)', cpuClockSpeed: 'Up to 3.5GHz', accelerator: '1x AWS Trainium'},
  { id: 'aws-dl1-24xlarge', familyGroup: 'DL1', instanceName: 'dl1.24xlarge (96 vCPU, 768GB RAM, 8x Gaudi)', fullDescription: 'DL1, dl1.24xlarge (96 vCPU, 768GB RAM, 8x Gaudi)', provider: 'AWS', cpu: '96 vCPU', ram: '768GB', cpuArchitecture: 'Intel Xeon Scalable (Cascade Lake)', cpuClockSpeed: 'Up to 3.1GHz', accelerator: '8x Habana Gaudi'},
  { id: 'aws-dl2q-24xlarge', familyGroup: 'DL2q', instanceName: 'dl2q.24xlarge (96 vCPU, 768GB RAM, 8x Qualcomm AI 100)', fullDescription: 'DL2q, dl2q.24xlarge (96 vCPU, 768GB RAM, 8x Qualcomm AI 100)', provider: 'AWS', cpu: '96 vCPU', ram: '768GB', cpuArchitecture: 'Intel Xeon Scalable (Cascade Lake)', cpuClockSpeed: 'Up to 3.1GHz', accelerator: '8x Qualcomm AI 100'},

  // HPC - Hpc series
  { id: 'aws-hpc6a-48xlarge', familyGroup: 'Hpc6a', instanceName: 'hpc6a.48xlarge (96 vCPU, 384GB RAM)', fullDescription: 'Hpc6a, hpc6a.48xlarge (96 vCPU, 384GB RAM)', provider: 'AWS', cpu: '96 vCPU', ram: '384GB', cpuArchitecture: 'AMD EPYC (Milan)', cpuClockSpeed: 'Up to 3.6GHz'},
  { id: 'aws-hpc6id-32xlarge', familyGroup: 'Hpc6id', instanceName: 'hpc6id.32xlarge (64 vCPU, 1024GB RAM, NVMe)', fullDescription: 'Hpc6id, hpc6id.32xlarge (64 vCPU, 1024GB RAM, NVMe)', provider: 'AWS', cpu: '64 vCPU', ram: '1024GB', cpuArchitecture: 'Intel Xeon Scalable (Ice Lake)', cpuClockSpeed: 'Up to 3.5GHz'},
  { id: 'aws-hpc7g-4xlarge', familyGroup: 'Hpc7g (Graviton3E)', instanceName: 'hpc7g.4xlarge (16 vCPU, 64GB RAM)', fullDescription: 'Hpc7g (Graviton3E), hpc7g.4xlarge (16 vCPU, 64GB RAM)', provider: 'AWS', cpu: '16 vCPU', ram: '64GB', cpuArchitecture: 'AWS Graviton3E', cpuClockSpeed: 'Varies'},

  // --- Azure ---
  // General Purpose - Av2 Series (Basic, older Intel)
  { id: 'azure-standard_a1_v2', familyGroup: 'Av2-Series', instanceName: 'Standard_A1_v2 (1 vCPU, 2GB RAM)', fullDescription: 'Av2-Series, Standard_A1_v2 (1 vCPU, 2GB RAM)', provider: 'Azure', cpu: '1 vCPU', ram: '2GB', cpuArchitecture: 'Intel Xeon', cpuClockSpeed: 'Varies'},
  { id: 'azure-standard_a2_v2', familyGroup: 'Av2-Series', instanceName: 'Standard_A2_v2 (2 vCPU, 4GB RAM)', fullDescription: 'Av2-Series, Standard_A2_v2 (2 vCPU, 4GB RAM)', provider: 'Azure', cpu: '2 vCPU', ram: '4GB', cpuArchitecture: 'Intel Xeon', cpuClockSpeed: 'Varies'},
  { id: 'azure-standard_a4_v2', familyGroup: 'Av2-Series', instanceName: 'Standard_A4_v2 (4 vCPU, 8GB RAM)', fullDescription: 'Av2-Series, Standard_A4_v2 (4 vCPU, 8GB RAM)', provider: 'Azure', cpu: '4 vCPU', ram: '8GB', cpuArchitecture: 'Intel Xeon', cpuClockSpeed: 'Varies'},
  { id: 'azure-standard_a8_v2', familyGroup: 'Av2-Series', instanceName: 'Standard_A8_v2 (8 vCPU, 16GB RAM)', fullDescription: 'Av2-Series, Standard_A8_v2 (8 vCPU, 16GB RAM)', provider: 'Azure', cpu: '8 vCPU', ram: '16GB', cpuArchitecture: 'Intel Xeon', cpuClockSpeed: 'Varies'},
  { id: 'azure-standard_a2m_v2', familyGroup: 'Av2-Series', instanceName: 'Standard_A2m_v2 (2 vCPU, 16GB RAM)', fullDescription: 'Av2-Series, Standard_A2m_v2 (2 vCPU, 16GB RAM)', provider: 'Azure', cpu: '2 vCPU', ram: '16GB', cpuArchitecture: 'Intel Xeon', cpuClockSpeed: 'Varies'},
  { id: 'azure-standard_a4m_v2', familyGroup: 'Av2-Series', instanceName: 'Standard_A4m_v2 (4 vCPU, 32GB RAM)', fullDescription: 'Av2-Series, Standard_A4m_v2 (4 vCPU, 32GB RAM)', provider: 'Azure', cpu: '4 vCPU', ram: '32GB', cpuArchitecture: 'Intel Xeon', cpuClockSpeed: 'Varies'},
  { id: 'azure-standard_a8m_v2', familyGroup: 'Av2-Series', instanceName: 'Standard_A8m_v2 (8 vCPU, 64GB RAM)', fullDescription: 'Av2-Series, Standard_A8m_v2 (8 vCPU, 64GB RAM)', provider: 'Azure', cpu: '8 vCPU', ram: '64GB', cpuArchitecture: 'Intel Xeon', cpuClockSpeed: 'Varies'},

  // General Purpose - B-Series (Burstable)
  { id: 'azure-standard_b1s', familyGroup: 'B-Series', instanceName: 'Standard_B1s (1 vCPU, 1GB RAM)', fullDescription: 'B-Series, Standard_B1s (1 vCPU, 1GB RAM)', provider: 'Azure', cpu: '1 vCPU', ram: '1GB', cpuArchitecture: 'Intel/AMD', cpuClockSpeed: 'Burstable'},
  { id: 'azure-standard_b1ls', familyGroup: 'B-Series', instanceName: 'Standard_B1ls (1 vCPU, 0.5GB RAM)', fullDescription: 'B-Series, Standard_B1ls (1 vCPU, 0.5GB RAM)', provider: 'Azure', cpu: '1 vCPU', ram: '0.5GB', cpuArchitecture: 'Intel/AMD', cpuClockSpeed: 'Burstable'},
  { id: 'azure-standard_b1ms', familyGroup: 'B-Series', instanceName: 'Standard_B1ms (1 vCPU, 2GB RAM)', fullDescription: 'B-Series, Standard_B1ms (1 vCPU, 2GB RAM)', provider: 'Azure', cpu: '1 vCPU', ram: '2GB', cpuArchitecture: 'Intel/AMD', cpuClockSpeed: 'Burstable'},
  { id: 'azure-standard_b2s', familyGroup: 'B-Series', instanceName: 'Standard_B2s (2 vCPU, 4GB RAM)', fullDescription: 'B-Series, Standard_B2s (2 vCPU, 4GB RAM)', provider: 'Azure', cpu: '2 vCPU', ram: '4GB', cpuArchitecture: 'Intel/AMD', cpuClockSpeed: 'Burstable'},
  { id: 'azure-standard_b2ms', familyGroup: 'B-Series', instanceName: 'Standard_B2ms (2 vCPU, 8GB RAM)', fullDescription: 'B-Series, Standard_B2ms (2 vCPU, 8GB RAM)', provider: 'Azure', cpu: '2 vCPU', ram: '8GB', cpuArchitecture: 'Intel/AMD', cpuClockSpeed: 'Burstable'},
  { id: 'azure-standard_b4ms', familyGroup: 'B-Series', instanceName: 'Standard_B4ms (4 vCPU, 16GB RAM)', fullDescription: 'B-Series, Standard_B4ms (4 vCPU, 16GB RAM)', provider: 'Azure', cpu: '4 vCPU', ram: '16GB', cpuArchitecture: 'Intel/AMD', cpuClockSpeed: 'Burstable'},
  { id: 'azure-standard_b8ms', familyGroup: 'B-Series', instanceName: 'Standard_B8ms (8 vCPU, 32GB RAM)', fullDescription: 'B-Series, Standard_B8ms (8 vCPU, 32GB RAM)', provider: 'Azure', cpu: '8 vCPU', ram: '32GB', cpuArchitecture: 'Intel/AMD', cpuClockSpeed: 'Burstable'},
  { id: 'azure-standard_b12ms', familyGroup: 'B-Series', instanceName: 'Standard_B12ms (12 vCPU, 48GB RAM)', fullDescription: 'B-Series, Standard_B12ms (12 vCPU, 48GB RAM)', provider: 'Azure', cpu: '12 vCPU', ram: '48GB', cpuArchitecture: 'Intel/AMD', cpuClockSpeed: 'Burstable'},
  { id: 'azure-standard_b16ms', familyGroup: 'B-Series', instanceName: 'Standard_B16ms (16 vCPU, 64GB RAM)', fullDescription: 'B-Series, Standard_B16ms (16 vCPU, 64GB RAM)', provider: 'Azure', cpu: '16 vCPU', ram: '64GB', cpuArchitecture: 'Intel/AMD', cpuClockSpeed: 'Burstable'},
  { id: 'azure-standard_b20ms', familyGroup: 'B-Series', instanceName: 'Standard_B20ms (20 vCPU, 80GB RAM)', fullDescription: 'B-Series, Standard_B20ms (20 vCPU, 80GB RAM)', provider: 'Azure', cpu: '20 vCPU', ram: '80GB', cpuArchitecture: 'Intel/AMD', cpuClockSpeed: 'Burstable'},

  // General Purpose - D-Series (Various generations and processor types)
  // Dv3/Dsv3 (Intel Broadwell/Skylake/Cascade Lake)
  { id: 'azure-standard_d2s_v3', familyGroup: 'Dsv3-Series', instanceName: 'Standard_D2s_v3 (2 vCPU, 8GB RAM)', fullDescription: 'Dsv3-Series, Standard_D2s_v3 (2 vCPU, 8GB RAM)', provider: 'Azure', cpu: '2 vCPU', ram: '8GB', cpuArchitecture: 'Intel Xeon (Broadwell/Skylake/Cascade Lake)', cpuClockSpeed: 'Varies', isSapCertified: true, sapsRating: 6000},
  { id: 'azure-standard_d4s_v3', familyGroup: 'Dsv3-Series', instanceName: 'Standard_D4s_v3 (4 vCPU, 16GB RAM)', fullDescription: 'Dsv3-Series, Standard_D4s_v3 (4 vCPU, 16GB RAM)', provider: 'Azure', cpu: '4 vCPU', ram: '16GB', cpuArchitecture: 'Intel Xeon (Broadwell/Skylake/Cascade Lake)', cpuClockSpeed: 'Varies', isSapCertified: true, sapsRating: 12000},
  { id: 'azure-standard_d8s_v3', familyGroup: 'Dsv3-Series', instanceName: 'Standard_D8s_v3 (8 vCPU, 32GB RAM)', fullDescription: 'Dsv3-Series, Standard_D8s_v3 (8 vCPU, 32GB RAM)', provider: 'Azure', cpu: '8 vCPU', ram: '32GB', cpuArchitecture: 'Intel Xeon (Broadwell/Skylake/Cascade Lake)', cpuClockSpeed: 'Varies', isSapCertified: true, sapsRating: 24000},
  { id: 'azure-standard_d16s_v3', familyGroup: 'Dsv3-Series', instanceName: 'Standard_D16s_v3 (16 vCPU, 64GB RAM)', fullDescription: 'Dsv3-Series, Standard_D16s_v3 (16 vCPU, 64GB RAM)', provider: 'Azure', cpu: '16 vCPU', ram: '64GB', cpuArchitecture: 'Intel Xeon (Broadwell/Skylake/Cascade Lake)', cpuClockSpeed: 'Varies', isSapCertified: true, sapsRating: 48000},
  { id: 'azure-standard_d32s_v3', familyGroup: 'Dsv3-Series', instanceName: 'Standard_D32s_v3 (32 vCPU, 128GB RAM)', fullDescription: 'Dsv3-Series, Standard_D32s_v3 (32 vCPU, 128GB RAM)', provider: 'Azure', cpu: '32 vCPU', ram: '128GB', cpuArchitecture: 'Intel Xeon (Broadwell/Skylake/Cascade Lake)', cpuClockSpeed: 'Varies', isSapCertified: true, sapsRating: 96000},
  { id: 'azure-standard_d48s_v3', familyGroup: 'Dsv3-Series', instanceName: 'Standard_D48s_v3 (48 vCPU, 192GB RAM)', fullDescription: 'Dsv3-Series, Standard_D48s_v3 (48 vCPU, 192GB RAM)', provider: 'Azure', cpu: '48 vCPU', ram: '192GB', cpuArchitecture: 'Intel Xeon (Broadwell/Skylake/Cascade Lake)', cpuClockSpeed: 'Varies', isSapCertified: true, sapsRating: 144000},
  { id: 'azure-standard_d64s_v3', familyGroup: 'Dsv3-Series', instanceName: 'Standard_D64s_v3 (64 vCPU, 256GB RAM)', fullDescription: 'Dsv3-Series, Standard_D64s_v3 (64 vCPU, 256GB RAM)', provider: 'Azure', cpu: '64 vCPU', ram: '256GB', cpuArchitecture: 'Intel Xeon (Broadwell/Skylake/Cascade Lake)', cpuClockSpeed: 'Varies', isSapCertified: true, sapsRating: 192000},
  // Dav4/Dasv4 (AMD EPYC Rome)
  { id: 'azure-standard_d2as_v4', familyGroup: 'Dasv4-Series', instanceName: 'Standard_D2as_v4 (2 vCPU, 8GB RAM)', fullDescription: 'Dasv4-Series, Standard_D2as_v4 (2 vCPU, 8GB RAM)', provider: 'Azure', cpu: '2 vCPU', ram: '8GB', cpuArchitecture: 'AMD EPYC (Rome)', cpuClockSpeed: 'Up to 3.3GHz'},
  { id: 'azure-standard_d4as_v4', familyGroup: 'Dasv4-Series', instanceName: 'Standard_D4as_v4 (4 vCPU, 16GB RAM)', fullDescription: 'Dasv4-Series, Standard_D4as_v4 (4 vCPU, 16GB RAM)', provider: 'Azure', cpu: '4 vCPU', ram: '16GB', cpuArchitecture: 'AMD EPYC (Rome)', cpuClockSpeed: 'Up to 3.3GHz'},
  { id: 'azure-standard_d8as_v4', familyGroup: 'Dasv4-Series', instanceName: 'Standard_D8as_v4 (8 vCPU, 32GB RAM)', fullDescription: 'Dasv4-Series, Standard_D8as_v4 (8 vCPU, 32GB RAM)', provider: 'Azure', cpu: '8 vCPU', ram: '32GB', cpuArchitecture: 'AMD EPYC (Rome)', cpuClockSpeed: 'Up to 3.3GHz'},
  { id: 'azure-standard_d16as_v4', familyGroup: 'Dasv4-Series', instanceName: 'Standard_D16as_v4 (16 vCPU, 64GB RAM)', fullDescription: 'Dasv4-Series, Standard_D16as_v4 (16 vCPU, 64GB RAM)', provider: 'Azure', cpu: '16 vCPU', ram: '64GB', cpuArchitecture: 'AMD EPYC (Rome)', cpuClockSpeed: 'Up to 3.3GHz'},
  // Dv5/Dsv5/Ddv5/Ddsv5 (Intel Ice Lake/Sapphire Rapids)
  { id: 'azure-standard_d2s_v5', familyGroup: 'Dsv5-Series', instanceName: 'Standard_D2s_v5 (2 vCPU, 8GB RAM)', fullDescription: 'Dsv5-Series, Standard_D2s_v5 (2 vCPU, 8GB RAM)', provider: 'Azure', cpu: '2 vCPU', ram: '8GB', cpuArchitecture: 'Intel Xeon Platinum (Ice Lake/Sapphire Rapids)', cpuClockSpeed: 'Varies', isSapCertified: true, sapsRating: 7200},
  { id: 'azure-standard_d4s_v5', familyGroup: 'Dsv5-Series', instanceName: 'Standard_D4s_v5 (4 vCPU, 16GB RAM)', fullDescription: 'Dsv5-Series, Standard_D4s_v5 (4 vCPU, 16GB RAM)', provider: 'Azure', cpu: '4 vCPU', ram: '16GB', cpuArchitecture: 'Intel Xeon Platinum (Ice Lake/Sapphire Rapids)', cpuClockSpeed: 'Varies', isSapCertified: true, sapsRating: 14400},
  { id: 'azure-standard_d8s_v5', familyGroup: 'Dsv5-Series', instanceName: 'Standard_D8s_v5 (8 vCPU, 32GB RAM)', fullDescription: 'Dsv5-Series, Standard_D8s_v5 (8 vCPU, 32GB RAM)', provider: 'Azure', cpu: '8 vCPU', ram: '32GB', cpuArchitecture: 'Intel Xeon Platinum (Ice Lake/Sapphire Rapids)', cpuClockSpeed: 'Varies', isSapCertified: true, sapsRating: 28800},
  { id: 'azure-standard_d16s_v5', familyGroup: 'Dsv5-Series', instanceName: 'Standard_D16s_v5 (16 vCPU, 64GB RAM)', fullDescription: 'Dsv5-Series, Standard_D16s_v5 (16 vCPU, 64GB RAM)', provider: 'Azure', cpu: '16 vCPU', ram: '64GB', cpuArchitecture: 'Intel Xeon Platinum (Ice Lake/Sapphire Rapids)', cpuClockSpeed: 'Varies', isSapCertified: true, sapsRating: 57600},
  { id: 'azure-standard_d32s_v5', familyGroup: 'Dsv5-Series', instanceName: 'Standard_D32s_v5 (32 vCPU, 128GB RAM)', fullDescription: 'Dsv5-Series, Standard_D32s_v5 (32 vCPU, 128GB RAM)', provider: 'Azure', cpu: '32 vCPU', ram: '128GB', cpuArchitecture: 'Intel Xeon Platinum (Ice Lake/Sapphire Rapids)', cpuClockSpeed: 'Varies', isSapCertified: true, sapsRating: 115200},
  { id: 'azure-standard_d48s_v5', familyGroup: 'Dsv5-Series', instanceName: 'Standard_D48s_v5 (48 vCPU, 192GB RAM)', fullDescription: 'Dsv5-Series, Standard_D48s_v5 (48 vCPU, 192GB RAM)', provider: 'Azure', cpu: '48 vCPU', ram: '192GB', cpuArchitecture: 'Intel Xeon Platinum (Ice Lake/Sapphire Rapids)', cpuClockSpeed: 'Varies', isSapCertified: true, sapsRating: 172800},
  { id: 'azure-standard_d64s_v5', familyGroup: 'Dsv5-Series', instanceName: 'Standard_D64s_v5 (64 vCPU, 256GB RAM)', fullDescription: 'Dsv5-Series, Standard_D64s_v5 (64 vCPU, 256GB RAM)', provider: 'Azure', cpu: '64 vCPU', ram: '256GB', cpuArchitecture: 'Intel Xeon Platinum (Ice Lake/Sapphire Rapids)', cpuClockSpeed: 'Varies', isSapCertified: true, sapsRating: 230400},
  { id: 'azure-standard_d96s_v5', familyGroup: 'Dsv5-Series', instanceName: 'Standard_D96s_v5 (96 vCPU, 384GB RAM)', fullDescription: 'Dsv5-Series, Standard_D96s_v5 (96 vCPU, 384GB RAM)', provider: 'Azure', cpu: '96 vCPU', ram: '384GB', cpuArchitecture: 'Intel Xeon Platinum (Ice Lake/Sapphire Rapids)', cpuClockSpeed: 'Varies', isSapCertified: true, sapsRating: 345600},
  { id: 'azure-standard_d2ds_v5', familyGroup: 'Ddv5-Series', instanceName: 'Standard_D2ds_v5 (2 vCPU, 8GB RAM, Temp Storage)', fullDescription: 'Ddv5-Series, Standard_D2ds_v5 (2 vCPU, 8GB RAM, Temp Storage)', provider: 'Azure', cpu: '2 vCPU', ram: '8GB', cpuArchitecture: 'Intel Xeon Platinum (Ice Lake)', cpuClockSpeed: 'Up to 3.5GHz'},
  { id: 'azure-standard_d4ds_v5', familyGroup: 'Ddv5-Series', instanceName: 'Standard_D4ds_v5 (4 vCPU, 16GB RAM, Temp Storage)', fullDescription: 'Ddv5-Series, Standard_D4ds_v5 (4 vCPU, 16GB RAM, Temp Storage)', provider: 'Azure', cpu: '4 vCPU', ram: '16GB', cpuArchitecture: 'Intel Xeon Platinum (Ice Lake)', cpuClockSpeed: 'Up to 3.5GHz'},
  // Dasv5/Dadsv5 (AMD EPYC Milan)
  { id: 'azure-standard_d2as_v5', familyGroup: 'Dasv5-Series', instanceName: 'Standard_D2as_v5 (2 vCPU, 8GB RAM)', fullDescription: 'Dasv5-Series, Standard_D2as_v5 (2 vCPU, 8GB RAM)', provider: 'Azure', cpu: '2 vCPU', ram: '8 GB', cpuArchitecture: 'AMD EPYC (Milan)', cpuClockSpeed: 'Up to 3.7 GHz', isSapCertified: true, sapsRating: 6800 },
  { id: 'azure-standard_d4as_v5', familyGroup: 'Dasv5-Series', instanceName: 'Standard_D4as_v5 (4 vCPU, 16GB RAM)', fullDescription: 'Dasv5-Series, Standard_D4as_v5 (4 vCPU, 16GB RAM)', provider: 'Azure', cpu: '4 vCPU', ram: '16 GB', cpuArchitecture: 'AMD EPYC (Milan)', cpuClockSpeed: 'Up to 3.7 GHz', isSapCertified: true, sapsRating: 13600 },
  { id: 'azure-standard_d8as_v5', familyGroup: 'Dasv5-Series', instanceName: 'Standard_D8as_v5 (8 vCPU, 32GB RAM)', fullDescription: 'Dasv5-Series, Standard_D8as_v5 (8 vCPU, 32GB RAM)', provider: 'Azure', cpu: '8 vCPU', ram: '32 GB', cpuArchitecture: 'AMD EPYC (Milan)', cpuClockSpeed: 'Up to 3.7 GHz', isSapCertified: true, sapsRating: 27200 },
  { id: 'azure-standard_d16as_v5', familyGroup: 'Dasv5-Series', instanceName: 'Standard_D16as_v5 (16 vCPU, 64GB RAM)', fullDescription: 'Dasv5-Series, Standard_D16as_v5 (16 vCPU, 64GB RAM)', provider: 'Azure', cpu: '16 vCPU', ram: '64 GB', cpuArchitecture: 'AMD EPYC (Milan)', cpuClockSpeed: 'Up to 3.7 GHz', isSapCertified: true, sapsRating: 54400 },
  { id: 'azure-standard_d32as_v5', familyGroup: 'Dasv5-Series', instanceName: 'Standard_D32as_v5 (32 vCPU, 128GB RAM)', fullDescription: 'Dasv5-Series, Standard_D32as_v5 (32 vCPU, 128GB RAM)', provider: 'Azure', cpu: '32 vCPU', ram: '128GB', cpuArchitecture: 'AMD EPYC (Milan)', cpuClockSpeed: 'Up to 3.7 GHz', isSapCertified: true, sapsRating: 108800 },
  { id: 'azure-standard_d48as_v5', familyGroup: 'Dasv5-Series', instanceName: 'Standard_D48as_v5 (48 vCPU, 192GB RAM)', fullDescription: 'Dasv5-Series, Standard_D48as_v5 (48 vCPU, 192GB RAM)', provider: 'Azure', cpu: '48 vCPU', ram: '192GB', cpuArchitecture: 'AMD EPYC (Milan)', cpuClockSpeed: 'Up to 3.7 GHz', isSapCertified: true, sapsRating: 163200 },
  { id: 'azure-standard_d64as_v5', familyGroup: 'Dasv5-Series', instanceName: 'Standard_D64as_v5 (64 vCPU, 256GB RAM)', fullDescription: 'Dasv5-Series, Standard_D64as_v5 (64 vCPU, 256GB RAM)', provider: 'Azure', cpu: '64 vCPU', ram: '256GB', cpuArchitecture: 'AMD EPYC (Milan)', cpuClockSpeed: 'Up to 3.7 GHz', isSapCertified: true, sapsRating: 217600 },
  { id: 'azure-standard_d96as_v5', familyGroup: 'Dasv5-Series', instanceName: 'Standard_D96as_v5 (96 vCPU, 384GB RAM)', fullDescription: 'Dasv5-Series, Standard_D96as_v5 (96 vCPU, 384GB RAM)', provider: 'Azure', cpu: '96 vCPU', ram: '384GB', cpuArchitecture: 'AMD EPYC (Milan)', cpuClockSpeed: 'Up to 3.7 GHz', isSapCertified: true, sapsRating: 326400 },
  // General Purpose - Low CPU/Memory variants
  { id: 'azure-standard_d2pls_v5', familyGroup: 'Dplsv5-Series', instanceName: 'Standard_D2pls_v5 (2 vCPU, 4GB RAM, Premium SSD)', fullDescription: 'Dplsv5-Series, Standard_D2pls_v5 (2 vCPU, 4GB RAM, Premium SSD)', provider: 'Azure', cpu: '2 vCPU', ram: '4GB', cpuArchitecture: 'Intel Xeon Platinum (Ice Lake/Sapphire Rapids)', cpuClockSpeed: 'Varies'},
  { id: 'azure-standard_d2ps_v5', familyGroup: 'Dpsv5-Series', instanceName: 'Standard_D2ps_v5 (2 vCPU, 8GB RAM, Premium SSD)', fullDescription: 'Dpsv5-Series, Standard_D2ps_v5 (2 vCPU, 8GB RAM, Premium SSD)', provider: 'Azure', cpu: '2 vCPU', ram: '8GB', cpuArchitecture: 'Intel Xeon Platinum (Ice Lake/Sapphire Rapids)', cpuClockSpeed: 'Varies'},

  // Compute Optimized - F-Series
  { id: 'azure-standard_f1s', familyGroup: 'Fs-Series', instanceName: 'Standard_F1s (1 vCPU, 2GB RAM)', fullDescription: 'Fs-Series, Standard_F1s (1 vCPU, 2GB RAM)', provider: 'Azure', cpu: '1 vCPU', ram: '2GB', cpuArchitecture: 'Intel Xeon', cpuClockSpeed: 'Varies'},
  { id: 'azure-standard_f2s', familyGroup: 'Fs-Series', instanceName: 'Standard_F2s (2 vCPU, 4GB RAM)', fullDescription: 'Fs-Series, Standard_F2s (2 vCPU, 4GB RAM)', provider: 'Azure', cpu: '2 vCPU', ram: '4GB', cpuArchitecture: 'Intel Xeon', cpuClockSpeed: 'Varies'},
  { id: 'azure-standard_f4s', familyGroup: 'Fs-Series', instanceName: 'Standard_F4s (4 vCPU, 8GB RAM)', fullDescription: 'Fs-Series, Standard_F4s (4 vCPU, 8GB RAM)', provider: 'Azure', cpu: '4 vCPU', ram: '8GB', cpuArchitecture: 'Intel Xeon', cpuClockSpeed: 'Varies'},
  { id: 'azure-standard_f8s', familyGroup: 'Fs-Series', instanceName: 'Standard_F8s (8 vCPU, 16GB RAM)', fullDescription: 'Fs-Series, Standard_F8s (8 vCPU, 16GB RAM)', provider: 'Azure', cpu: '8 vCPU', ram: '16GB', cpuArchitecture: 'Intel Xeon', cpuClockSpeed: 'Varies'},
  { id: 'azure-standard_f16s', familyGroup: 'Fs-Series', instanceName: 'Standard_F16s (16 vCPU, 32GB RAM)', fullDescription: 'Fs-Series, Standard_F16s (16 vCPU, 32GB RAM)', provider: 'Azure', cpu: '16 vCPU', ram: '32GB', cpuArchitecture: 'Intel Xeon', cpuClockSpeed: 'Varies'},
  { id: 'azure-standard_f2s_v2', familyGroup: 'Fsv2-Series', instanceName: 'Standard_F2s_v2 (2 vCPU, 4GB RAM)', fullDescription: 'Fsv2-Series, Standard_F2s_v2 (2 vCPU, 4GB RAM)', provider: 'Azure', cpu: '2 vCPU', ram: '4GB', cpuArchitecture: 'Intel Xeon Scalable', cpuClockSpeed: 'Up to 3.7GHz'},
  { id: 'azure-standard_f4s_v2', familyGroup: 'Fsv2-Series', instanceName: 'Standard_F4s_v2 (4 vCPU, 8GB RAM)', fullDescription: 'Fsv2-Series, Standard_F4s_v2 (4 vCPU, 8GB RAM)', provider: 'Azure', cpu: '4 vCPU', ram: '8GB', cpuArchitecture: 'Intel Xeon Scalable', cpuClockSpeed: 'Up to 3.7GHz'},
  { id: 'azure-standard_f8s_v2', familyGroup: 'Fsv2-Series', instanceName: 'Standard_F8s_v2 (8 vCPU, 16GB RAM)', fullDescription: 'Fsv2-Series, Standard_F8s_v2 (8 vCPU, 16GB RAM)', provider: 'Azure', cpu: '8 vCPU', ram: '16GB', cpuArchitecture: 'Intel Xeon Scalable', cpuClockSpeed: 'Up to 3.7GHz'},
  { id: 'azure-standard_f16s_v2', familyGroup: 'Fsv2-Series', instanceName: 'Standard_F16s_v2 (16 vCPU, 32GB RAM)', fullDescription: 'Fsv2-Series, Standard_F16s_v2 (16 vCPU, 32GB RAM)', provider: 'Azure', cpu: '16 vCPU', ram: '32GB', cpuArchitecture: 'Intel Xeon Scalable', cpuClockSpeed: 'Up to 3.7GHz'},
  { id: 'azure-standard_f32s_v2', familyGroup: 'Fsv2-Series', instanceName: 'Standard_F32s_v2 (32 vCPU, 64GB RAM)', fullDescription: 'Fsv2-Series, Standard_F32s_v2 (32 vCPU, 64GB RAM)', provider: 'Azure', cpu: '32 vCPU', ram: '64GB', cpuArchitecture: 'Intel Xeon Scalable', cpuClockSpeed: 'Up to 3.7GHz'},
  { id: 'azure-standard_f48s_v2', familyGroup: 'Fsv2-Series', instanceName: 'Standard_F48s_v2 (48 vCPU, 96GB RAM)', fullDescription: 'Fsv2-Series, Standard_F48s_v2 (48 vCPU, 96GB RAM)', provider: 'Azure', cpu: '48 vCPU', ram: '96GB', cpuArchitecture: 'Intel Xeon Scalable', cpuClockSpeed: 'Up to 3.7GHz'},
  { id: 'azure-standard_f64s_v2', familyGroup: 'Fsv2-Series', instanceName: 'Standard_F64s_v2 (64 vCPU, 128GB RAM)', fullDescription: 'Fsv2-Series, Standard_F64s_v2 (64 vCPU, 128GB RAM)', provider: 'Azure', cpu: '64 vCPU', ram: '128GB', cpuArchitecture: 'Intel Xeon Scalable', cpuClockSpeed: 'Up to 3.7GHz'},
  { id: 'azure-standard_f72s_v2', familyGroup: 'Fsv2-Series', instanceName: 'Standard_F72s_v2 (72 vCPU, 144GB RAM)', fullDescription: 'Fsv2-Series, Standard_F72s_v2 (72 vCPU, 144GB RAM)', provider: 'Azure', cpu: '72 vCPU', ram: '144GB', cpuArchitecture: 'Intel Xeon Scalable', cpuClockSpeed: 'Up to 3.7GHz'},

  // Memory Optimized - E-Series
  // Ev3/Esv3 (Intel Broadwell/Skylake/Cascade Lake)
  { id: 'azure-standard_e2s_v3', familyGroup: 'Esv3-Series', instanceName: 'Standard_E2s_v3 (2 vCPU, 16GB RAM)', fullDescription: 'Esv3-Series, Standard_E2s_v3 (2 vCPU, 16GB RAM)', provider: 'Azure', cpu: '2 vCPU', ram: '16GB', cpuArchitecture: 'Intel Xeon (Broadwell/Skylake/Cascade Lake)', cpuClockSpeed: 'Varies', isSapCertified: true, sapsRating: 6000},
  { id: 'azure-standard_e4s_v3', familyGroup: 'Esv3-Series', instanceName: 'Standard_E4s_v3 (4 vCPU, 32GB RAM)', fullDescription: 'Esv3-Series, Standard_E4s_v3 (4 vCPU, 32GB RAM)', provider: 'Azure', cpu: '4 vCPU', ram: '32GB', cpuArchitecture: 'Intel Xeon (Broadwell/Skylake/Cascade Lake)', cpuClockSpeed: 'Varies', isSapCertified: true, sapsRating: 12000},
  { id: 'azure-standard_e8s_v3', familyGroup: 'Esv3-Series', instanceName: 'Standard_E8s_v3 (8 vCPU, 64GB RAM)', fullDescription: 'Esv3-Series, Standard_E8s_v3 (8 vCPU, 64GB RAM)', provider: 'Azure', cpu: '8 vCPU', ram: '64GB', cpuArchitecture: 'Intel Xeon (Broadwell/Skylake/Cascade Lake)', cpuClockSpeed: 'Varies', isSapCertified: true, sapsRating: 24000},
  { id: 'azure-standard_e16s_v3', familyGroup: 'Esv3-Series', instanceName: 'Standard_E16s_v3 (16 vCPU, 128GB RAM)', fullDescription: 'Esv3-Series, Standard_E16s_v3 (16 vCPU, 128GB RAM)', provider: 'Azure', cpu: '16 vCPU', ram: '128GB', cpuArchitecture: 'Intel Xeon (Broadwell/Skylake/Cascade Lake)', cpuClockSpeed: 'Varies', isSapCertified: true, sapsRating: 48000},
  { id: 'azure-standard_e20s_v3', familyGroup: 'Esv3-Series', instanceName: 'Standard_E20s_v3 (20 vCPU, 160GB RAM)', fullDescription: 'Esv3-Series, Standard_E20s_v3 (20 vCPU, 160GB RAM)', provider: 'Azure', cpu: '20 vCPU', ram: '160GB', cpuArchitecture: 'Intel Xeon (Broadwell/Skylake/Cascade Lake)', cpuClockSpeed: 'Varies', isSapCertified: true, sapsRating: 60000},
  { id: 'azure-standard_e32s_v3', familyGroup: 'Esv3-Series', instanceName: 'Standard_E32s_v3 (32 vCPU, 256GB RAM)', fullDescription: 'Esv3-Series, Standard_E32s_v3 (32 vCPU, 256GB RAM)', provider: 'Azure', cpu: '32 vCPU', ram: '256GB', cpuArchitecture: 'Intel Xeon (Broadwell/Skylake/Cascade Lake)', cpuClockSpeed: 'Varies', isSapCertified: true, sapsRating: 96000},
  { id: 'azure-standard_e48s_v3', familyGroup: 'Esv3-Series', instanceName: 'Standard_E48s_v3 (48 vCPU, 384GB RAM)', fullDescription: 'Esv3-Series, Standard_E48s_v3 (48 vCPU, 384GB RAM)', provider: 'Azure', cpu: '48 vCPU', ram: '384GB', cpuArchitecture: 'Intel Xeon (Broadwell/Skylake/Cascade Lake)', cpuClockSpeed: 'Varies', isSapCertified: true, sapsRating: 144000},
  { id: 'azure-standard_e64s_v3', familyGroup: 'Esv3-Series', instanceName: 'Standard_E64s_v3 (64 vCPU, 432GB RAM)', fullDescription: 'Esv3-Series, Standard_E64s_v3 (64 vCPU, 432GB RAM)', provider: 'Azure', cpu: '64 vCPU', ram: '432GB', cpuArchitecture: 'Intel Xeon (Broadwell/Skylake/Cascade Lake)', cpuClockSpeed: 'Varies', isSapCertified: true, sapsRating: 192000},
  // Easv4/Eadsv4 (AMD EPYC Rome)
  { id: 'azure-standard_e2as_v4', familyGroup: 'Easv4-Series', instanceName: 'Standard_E2as_v4 (2 vCPU, 16GB RAM)', fullDescription: 'Easv4-Series, Standard_E2as_v4 (2 vCPU, 16GB RAM)', provider: 'Azure', cpu: '2 vCPU', ram: '16GB', cpuArchitecture: 'AMD EPYC (Rome)', cpuClockSpeed: 'Up to 3.3GHz'},
  { id: 'azure-standard_e4as_v4', familyGroup: 'Easv4-Series', instanceName: 'Standard_E4as_v4 (4 vCPU, 32GB RAM)', fullDescription: 'Easv4-Series, Standard_E4as_v4 (4 vCPU, 32GB RAM)', provider: 'Azure', cpu: '4 vCPU', ram: '32GB', cpuArchitecture: 'AMD EPYC (Rome)', cpuClockSpeed: 'Up to 3.3GHz'},
  // Ev5/Esv5/Edv5/Edsv5/Ebsv5 (Intel Ice Lake/Sapphire Rapids)
  { id: 'azure-standard_e2s_v5', familyGroup: 'Esv5-Series', instanceName: 'Standard_E2s_v5 (2 vCPU, 16GB RAM)', fullDescription: 'Esv5-Series, Standard_E2s_v5 (2 vCPU, 16GB RAM)', provider: 'Azure', cpu: '2 vCPU', ram: '16GB', cpuArchitecture: 'Intel Xeon Platinum (Ice Lake/Sapphire Rapids)', cpuClockSpeed: 'Varies', isSapCertified: true, sapsRating: 7200},
  { id: 'azure-standard_e4s_v5', familyGroup: 'Esv5-Series', instanceName: 'Standard_E4s_v5 (4 vCPU, 32GB RAM)', fullDescription: 'Esv5-Series, Standard_E4s_v5 (4 vCPU, 32GB RAM)', provider: 'Azure', cpu: '4 vCPU', ram: '32GB', cpuArchitecture: 'Intel Xeon Platinum (Ice Lake/Sapphire Rapids)', cpuClockSpeed: 'Varies', isSapCertified: true, sapsRating: 14400},
  { id: 'azure-standard_e8s_v5', familyGroup: 'Esv5-Series', instanceName: 'Standard_E8s_v5 (8 vCPU, 64GB RAM)', fullDescription: 'Esv5-Series, Standard_E8s_v5 (8 vCPU, 64GB RAM)', provider: 'Azure', cpu: '8 vCPU', ram: '64GB', cpuArchitecture: 'Intel Xeon Platinum (Ice Lake/Sapphire Rapids)', cpuClockSpeed: 'Varies', isSapCertified: true, sapsRating: 28800},
  { id: 'azure-standard_e16s_v5', familyGroup: 'Esv5-Series', instanceName: 'Standard_E16s_v5 (16 vCPU, 128GB RAM)', fullDescription: 'Esv5-Series, Standard_E16s_v5 (16 vCPU, 128GB RAM)', provider: 'Azure', cpu: '16 vCPU', ram: '128GB', cpuArchitecture: 'Intel Xeon Platinum (Ice Lake/Sapphire Rapids)', cpuClockSpeed: 'Varies', isSapCertified: true, sapsRating: 57600},
  { id: 'azure-standard_e20s_v5', familyGroup: 'Esv5-Series', instanceName: 'Standard_E20s_v5 (20 vCPU, 160GB RAM)', fullDescription: 'Esv5-Series, Standard_E20s_v5 (20 vCPU, 160GB RAM)', provider: 'Azure', cpu: '20 vCPU', ram: '160GB', cpuArchitecture: 'Intel Xeon Platinum (Ice Lake/Sapphire Rapids)', cpuClockSpeed: 'Varies', isSapCertified: true, sapsRating: 72000},
  { id: 'azure-standard_e32s_v5', familyGroup: 'Esv5-Series', instanceName: 'Standard_E32s_v5 (32 vCPU, 256GB RAM)', fullDescription: 'Esv5-Series, Standard_E32s_v5 (32 vCPU, 256GB RAM)', provider: 'Azure', cpu: '32 vCPU', ram: '256GB', cpuArchitecture: 'Intel Xeon Platinum (Ice Lake/Sapphire Rapids)', cpuClockSpeed: 'Varies', isSapCertified: true, sapsRating: 115200},
  { id: 'azure-standard_e48s_v5', familyGroup: 'Esv5-Series', instanceName: 'Standard_E48s_v5 (48 vCPU, 384GB RAM)', fullDescription: 'Esv5-Series, Standard_E48s_v5 (48 vCPU, 384GB RAM)', provider: 'Azure', cpu: '48 vCPU', ram: '384GB', cpuArchitecture: 'Intel Xeon Platinum (Ice Lake/Sapphire Rapids)', cpuClockSpeed: 'Varies', isSapCertified: true, sapsRating: 172800},
  { id: 'azure-standard_e64s_v5', familyGroup: 'Esv5-Series', instanceName: 'Standard_E64s_v5 (64 vCPU, 512GB RAM)', fullDescription: 'Esv5-Series, Standard_E64s_v5 (64 vCPU, 512GB RAM)', provider: 'Azure', cpu: '64 vCPU', ram: '512GB', cpuArchitecture: 'Intel Xeon Platinum (Ice Lake/Sapphire Rapids)', cpuClockSpeed: 'Varies', isSapCertified: true, sapsRating: 230400},
  { id: 'azure-standard_e96s_v5', familyGroup: 'Esv5-Series', instanceName: 'Standard_E96s_v5 (96 vCPU, 672GB RAM)', fullDescription: 'Esv5-Series, Standard_E96s_v5 (96 vCPU, 672GB RAM)', provider: 'Azure', cpu: '96 vCPU', ram: '672GB', cpuArchitecture: 'Intel Xeon Platinum (Ice Lake/Sapphire Rapids)', cpuClockSpeed: 'Varies', isSapCertified: true, sapsRating: 345600},
  { id: 'azure-standard_e104is_v5', familyGroup: 'Eisv5-Series', instanceName: 'Standard_E104is_v5 (104 vCPU, 672GB RAM)', fullDescription: 'Eisv5-Series, Standard_E104is_v5 (104 vCPU, 672GB RAM)', provider: 'Azure', cpu: '104 vCPU', ram: '672GB', cpuArchitecture: 'Intel Xeon Platinum (Ice Lake)', cpuClockSpeed: 'Up to 3.5 GHz', isSapCertified: true, sapsRating: 374400},
  { id: 'azure-standard_e2bs_v5', familyGroup: 'Ebsv5-Series', instanceName: 'Standard_E2bs_v5 (2 vCPU, 16GB RAM, High IOPS)', fullDescription: 'Ebsv5-Series, Standard_E2bs_v5 (2 vCPU, 16GB RAM, High IOPS)', provider: 'Azure', cpu: '2 vCPU', ram: '16GB', cpuArchitecture: 'Intel Xeon Platinum (Ice Lake)', cpuClockSpeed: 'Up to 3.5GHz'},
  { id: 'azure-standard_e4bs_v5', familyGroup: 'Ebsv5-Series', instanceName: 'Standard_E4bs_v5 (4 vCPU, 32GB RAM, High IOPS)', fullDescription: 'Ebsv5-Series, Standard_E4bs_v5 (4 vCPU, 32GB RAM, High IOPS)', provider: 'Azure', cpu: '4 vCPU', ram: '32GB', cpuArchitecture: 'Intel Xeon Platinum (Ice Lake)', cpuClockSpeed: 'Up to 3.5GHz'},
  { id: 'azure-standard_e2ds_v5', familyGroup: 'Edsv5-Series', instanceName: 'Standard_E2ds_v5 (2 vCPU, 16GB RAM, Temp Storage)', fullDescription: 'Edsv5-Series, Standard_E2ds_v5 (2 vCPU, 16GB RAM, Temp Storage)', provider: 'Azure', cpu: '2 vCPU', ram: '16GB', cpuArchitecture: 'Intel Xeon Platinum (Ice Lake)', cpuClockSpeed: 'Up to 3.5GHz'},
  { id: 'azure-standard_e4ds_v5', familyGroup: 'Edsv5-Series', instanceName: 'Standard_E4ds_v5 (4 vCPU, 32GB RAM, Temp Storage)', fullDescription: 'Edsv5-Series, Standard_E4ds_v5 (4 vCPU, 32GB RAM, Temp Storage)', provider: 'Azure', cpu: '4 vCPU', ram: '32GB', cpuArchitecture: 'Intel Xeon Platinum (Ice Lake)', cpuClockSpeed: 'Up to 3.5GHz'},
  // Easv5/Eadsv5 (AMD EPYC Milan)
  { id: 'azure-standard_e2as_v5', familyGroup: 'Easv5-Series', instanceName: 'Standard_E2as_v5 (2 vCPU, 16GB RAM)', fullDescription: 'Easv5-Series, Standard_E2as_v5 (2 vCPU, 16GB RAM)', provider: 'Azure', cpu: '2 vCPU', ram: '16GB', cpuArchitecture: 'AMD EPYC (Milan)', cpuClockSpeed: 'Up to 3.7GHz'},
  { id: 'azure-standard_e4as_v5', familyGroup: 'Easv5-Series', instanceName: 'Standard_E4as_v5 (4 vCPU, 32GB RAM)', fullDescription: 'Easv5-Series, Standard_E4as_v5 (4 vCPU, 32GB RAM)', provider: 'Azure', cpu: '4 vCPU', ram: '32GB', cpuArchitecture: 'AMD EPYC (Milan)', cpuClockSpeed: 'Up to 3.7GHz'},
  { id: 'azure-standard_e8as_v5', familyGroup: 'Easv5-Series', instanceName: 'Standard_E8as_v5 (8 vCPU, 64GB RAM)', fullDescription: 'Easv5-Series, Standard_E8as_v5 (8 vCPU, 64GB RAM)', provider: 'Azure', cpu: '8 vCPU', ram: '64GB', cpuArchitecture: 'AMD EPYC (Milan)', cpuClockSpeed: 'Up to 3.7GHz'},
  { id: 'azure-standard_e16as_v5', familyGroup: 'Easv5-Series', instanceName: 'Standard_E16as_v5 (16 vCPU, 128GB RAM)', fullDescription: 'Easv5-Series, Standard_E16as_v5 (16 vCPU, 128GB RAM)', provider: 'Azure', cpu: '16 vCPU', ram: '128GB', cpuArchitecture: 'AMD EPYC (Milan)', cpuClockSpeed: 'Up to 3.7GHz'},

  // Memory Optimized - M-Series
  { id: 'azure-standard_m8ms', familyGroup: 'M-Series', instanceName: 'Standard_M8ms (8 vCPU, 208GB RAM)', fullDescription: 'M-Series, Standard_M8ms (8 vCPU, 208GB RAM)', provider: 'Azure', cpu: '8 vCPU', ram: '208GB', cpuArchitecture: 'Intel Xeon (Skylake/Cascade Lake)', cpuClockSpeed: 'Varies', isSapCertified: true, sapsRating: 25000},
  { id: 'azure-standard_m16ms', familyGroup: 'M-Series', instanceName: 'Standard_M16ms (16 vCPU, 432GB RAM)', fullDescription: 'M-Series, Standard_M16ms (16 vCPU, 432GB RAM)', provider: 'Azure', cpu: '16 vCPU', ram: '432GB', cpuArchitecture: 'Intel Xeon (Skylake/Cascade Lake)', cpuClockSpeed: 'Varies', isSapCertified: true, sapsRating: 50000},
  { id: 'azure-standard_m32ts', familyGroup: 'M-Series', instanceName: 'Standard_M32ts (32 vCPU, 192GB RAM)', fullDescription: 'M-Series, Standard_M32ts (32 vCPU, 192GB RAM)', provider: 'Azure', cpu: '32 vCPU', ram: '192GB', cpuArchitecture: 'Intel Xeon (Skylake/Cascade Lake)', cpuClockSpeed: 'Varies', isSapCertified: true, sapsRating: 80000},
  { id: 'azure-standard_m32ls', familyGroup: 'M-Series', instanceName: 'Standard_M32ls (32 vCPU, 256GB RAM)', fullDescription: 'M-Series, Standard_M32ls (32 vCPU, 256GB RAM)', provider: 'Azure', cpu: '32 vCPU', ram: '256GB', cpuArchitecture: 'Intel Xeon (Skylake/Cascade Lake)', cpuClockSpeed: 'Varies', isSapCertified: true, sapsRating: 80000},
  { id: 'azure-standard_m32ms', familyGroup: 'M-Series', instanceName: 'Standard_M32ms (32 vCPU, 875GB RAM)', fullDescription: 'M-Series, Standard_M32ms (32 vCPU, 875GB RAM)', provider: 'Azure', cpu: '32 vCPU', ram: '875GB', cpuArchitecture: 'Intel Xeon (Skylake/Cascade Lake)', cpuClockSpeed: 'Varies', isSapCertified: true, sapsRating: 100000},
  { id: 'azure-standard_m64s', familyGroup: 'M-Series', instanceName: 'Standard_M64s (64 vCPU, 1TB RAM)', fullDescription: 'M-Series, Standard_M64s (64 vCPU, 1TB RAM)', provider: 'Azure', cpu: '64 vCPU', ram: '1TB', cpuArchitecture: 'Intel Xeon (Broadwell/Skylake/Cascade Lake)', cpuClockSpeed: 'Varies', isSapCertified: true, sapsRating: 160000},
  { id: 'azure-standard_m64ls', familyGroup: 'M-Series', instanceName: 'Standard_M64ls (64 vCPU, 512GB RAM)', fullDescription: 'M-Series, Standard_M64ls (64 vCPU, 512GB RAM)', provider: 'Azure', cpu: '64 vCPU', ram: '512GB', cpuArchitecture: 'Intel Xeon (Skylake/Cascade Lake)', cpuClockSpeed: 'Varies', isSapCertified: true, sapsRating: 160000},
  { id: 'azure-standard_m64ms', familyGroup: 'M-Series', instanceName: 'Standard_M64ms (64 vCPU, 1.75TB RAM)', fullDescription: 'M-Series, Standard_M64ms (64 vCPU, 1.75TB RAM)', provider: 'Azure', cpu: '64 vCPU', ram: '1.75TB', cpuArchitecture: 'Intel Xeon (Skylake/Cascade Lake)', cpuClockSpeed: 'Varies', isSapCertified: true, sapsRating: 200000},
  { id: 'azure-standard_m128s', familyGroup: 'M-Series', instanceName: 'Standard_M128s (128 vCPU, 2TB RAM)', fullDescription: 'M-Series, Standard_M128s (128 vCPU, 2TB RAM)', provider: 'Azure', cpu: '128 vCPU', ram: '2TB', cpuArchitecture: 'Intel Xeon (Broadwell/Skylake/Cascade Lake)', cpuClockSpeed: 'Varies', isSapCertified: true, sapsRating: 320000},
  { id: 'azure-standard_m128ms', familyGroup: 'M-Series', instanceName: 'Standard_M128ms (128 vCPU, 3.8TB RAM)', fullDescription: 'M-Series, Standard_M128ms (128 vCPU, 3.8TB RAM)', provider: 'Azure', cpu: '128 vCPU', ram: '3.8TB', cpuArchitecture: 'Intel Xeon (Skylake/Cascade Lake)', cpuClockSpeed: 'Varies', isSapCertified: true, sapsRating: 400000},
  // Mv2 Series (Intel Skylake) - Large Memory
  { id: 'azure-standard_m208ms_v2', familyGroup: 'Mv2-Series', instanceName: 'Standard_M208ms_v2 (208 vCPU, 5.7TB RAM)', fullDescription: 'Mv2-Series, Standard_M208ms_v2 (208 vCPU, 5.7TB RAM)', provider: 'Azure', cpu: '208 vCPU', ram: '5.7TB', cpuArchitecture: 'Intel Xeon (Skylake)', cpuClockSpeed: 'Varies', isSapCertified: true, sapsRating: 520000},
  { id: 'azure-standard_m416ms_v2', familyGroup: 'Mv2-Series', instanceName: 'Standard_M416ms_v2 (416 vCPU, 11.4TB RAM)', fullDescription: 'Mv2-Series, Standard_M416ms_v2 (416 vCPU, 11.4TB RAM)', provider: 'Azure', cpu: '416 vCPU', ram: '11.4TB', cpuArchitecture: 'Intel Xeon (Skylake)', cpuClockSpeed: 'Varies', isSapCertified: true, sapsRating: 1040000},

  // Storage Optimized - L-Series (High throughput, low latency NVMe)
  { id: 'azure-standard_l8s_v2', familyGroup: 'Lsv2-Series', instanceName: 'Standard_L8s_v2 (8 vCPU, 64GB RAM, NVMe)', fullDescription: 'Lsv2-Series, Standard_L8s_v2 (8 vCPU, 64GB RAM, NVMe)', provider: 'Azure', cpu: '8 vCPU', ram: '64GB', cpuArchitecture: 'AMD EPYC (Naples)', cpuClockSpeed: 'Varies'},
  { id: 'azure-standard_l16s_v2', familyGroup: 'Lsv2-Series', instanceName: 'Standard_L16s_v2 (16 vCPU, 128GB RAM, NVMe)', fullDescription: 'Lsv2-Series, Standard_L16s_v2 (16 vCPU, 128GB RAM, NVMe)', provider: 'Azure', cpu: '16 vCPU', ram: '128GB', cpuArchitecture: 'AMD EPYC (Naples)', cpuClockSpeed: 'Varies'},
  { id: 'azure-standard_l8s_v3', familyGroup: 'Lsv3-Series', instanceName: 'Standard_L8s_v3 (8 vCPU, 64GB RAM, NVMe)', fullDescription: 'Lsv3-Series, Standard_L8s_v3 (8 vCPU, 64GB RAM, NVMe)', provider: 'Azure', cpu: '8 vCPU', ram: '64GB', cpuArchitecture: 'AMD EPYC (Milan)', cpuClockSpeed: 'Up to 3.6GHz'},
  { id: 'azure-standard_l16s_v3', familyGroup: 'Lsv3-Series', instanceName: 'Standard_L16s_v3 (16 vCPU, 128GB RAM, NVMe)', fullDescription: 'Lsv3-Series, Standard_L16s_v3 (16 vCPU, 128GB RAM, NVMe)', provider: 'Azure', cpu: '16 vCPU', ram: '128GB', cpuArchitecture: 'AMD EPYC (Milan)', cpuClockSpeed: 'Up to 3.6GHz'},

  // GPU Optimized - N-Series
  // NC-Series (Tesla K80, P100, V100)
  { id: 'azure-standard_nc6', familyGroup: 'NC-Series', instanceName: 'Standard_NC6 (6 vCPU, 56GB RAM, 1x K80)', fullDescription: 'NC-Series, Standard_NC6 (6 vCPU, 56GB RAM, 1x K80)', provider: 'Azure', cpu: '6 vCPU', ram: '56GB', cpuArchitecture: 'Intel Xeon (Haswell)', cpuClockSpeed: 'Varies', gpu: '1x NVIDIA Tesla K80'},
  { id: 'azure-standard_nc6s_v2', familyGroup: 'NCSv2-Series', instanceName: 'Standard_NC6s_v2 (6 vCPU, 112GB RAM, 1x P100)', fullDescription: 'NCSv2-Series, Standard_NC6s_v2 (6 vCPU, 112GB RAM, 1x P100)', provider: 'Azure', cpu: '6 vCPU', ram: '112GB', cpuArchitecture: 'Intel Xeon (Broadwell)', cpuClockSpeed: 'Varies', gpu: '1x NVIDIA Tesla P100'},
  { id: 'azure-standard_nc6s_v3', familyGroup: 'NCSv3-Series', instanceName: 'Standard_NC6s_v3 (6 vCPU, 112GB RAM, 1x V100)', fullDescription: 'NCSv3-Series, Standard_NC6s_v3 (6 vCPU, 112GB RAM, 1x V100)', provider: 'Azure', cpu: '6 vCPU', ram: '112GB', cpuArchitecture: 'Intel Xeon (Broadwell)', cpuClockSpeed: 'Varies', gpu: '1x NVIDIA Tesla V100'},
  // ND-Series (Tesla P40, V100, A100) - Deep learning focused
  { id: 'azure-standard_nd6s', familyGroup: 'ND-Series', instanceName: 'Standard_ND6s (6 vCPU, 112GB RAM, 1x P40)', fullDescription: 'ND-Series, Standard_ND6s (6 vCPU, 112GB RAM, 1x P40)', provider: 'Azure', cpu: '6 vCPU', ram: '112GB', cpuArchitecture: 'Intel Xeon (Broadwell)', cpuClockSpeed: 'Varies', gpu: '1x NVIDIA Tesla P40'},
  { id: 'azure-standard_nd40rs_v2', familyGroup: 'NDSv2-Series', instanceName: 'Standard_ND40rs_v2 (40 vCPU, 672GB RAM, 8x V100)', fullDescription: 'NDSv2-Series, Standard_ND40rs_v2 (40 vCPU, 672GB RAM, 8x V100)', provider: 'Azure', cpu: '40 vCPU', ram: '672GB', cpuArchitecture: 'Intel Xeon (Skylake)', cpuClockSpeed: 'Varies', gpu: '8x NVIDIA Tesla V100'},
  { id: 'azure-standard_nd96asr_v4', familyGroup: 'NDASv4_A100-Series', instanceName: 'Standard_ND96asr_v4 (96 vCPU, 900GB RAM, 8x A100 40GB)', fullDescription: 'NDASv4_A100-Series, Standard_ND96asr_v4 (96 vCPU, 900GB RAM, 8x A100 40GB)', provider: 'Azure', cpu: '96 vCPU', ram: '900GB', cpuArchitecture: 'AMD EPYC (Rome)', cpuClockSpeed: 'Varies', gpu: '8x NVIDIA A100 40GB'},
  // NCas_T4_v3 (NVIDIA T4)
  { id: 'azure-standard_nc4as_t4_v3', familyGroup: 'NCasT4_v3-Series', instanceName: 'Standard_NC4as_T4_v3 (4 vCPU, 28GB RAM, 1x T4)', fullDescription: 'NCasT4_v3-Series, Standard_NC4as_T4_v3 (4 vCPU, 28GB RAM, 1x T4)', provider: 'Azure', cpu: '4 vCPU', ram: '28GB', cpuArchitecture: 'AMD EPYC (Rome)', cpuClockSpeed: 'Varies', gpu: '1x NVIDIA T4'},
  { id: 'azure-standard_nc8as_t4_v3', familyGroup: 'NCasT4_v3-Series', instanceName: 'Standard_NC8as_T4_v3 (8 vCPU, 56GB RAM, 1x T4)', fullDescription: 'NCasT4_v3-Series, Standard_NC8as_T4_v3 (8 vCPU, 56GB RAM, 1x T4)', provider: 'Azure', cpu: '8 vCPU', ram: '56GB', cpuArchitecture: 'AMD EPYC (Rome)', cpuClockSpeed: 'Varies', gpu: '1x NVIDIA T4'},
  // NV-Series (NVIDIA M60, AMD Radeon Instinct MI25) - Visualization
  { id: 'azure-standard_nv6', familyGroup: 'NV-Series', instanceName: 'Standard_NV6 (6 vCPU, 56GB RAM, 1x M60)', fullDescription: 'NV-Series, Standard_NV6 (6 vCPU, 56GB RAM, 1x M60)', provider: 'Azure', cpu: '6 vCPU', ram: '56GB', cpuArchitecture: 'Intel Xeon (Broadwell)', cpuClockSpeed: 'Varies', gpu: '1x NVIDIA Tesla M60'},
  { id: 'azure-standard_nv12s_v3', familyGroup: 'NVSv3-Series', instanceName: 'Standard_NV12s_v3 (12 vCPU, 112GB RAM, 1x M60)', fullDescription: 'NVSv3-Series, Standard_NV12s_v3 (12 vCPU, 112GB RAM, 1x M60)', provider: 'Azure', cpu: '12 vCPU', ram: '112GB', cpuArchitecture: 'Intel Xeon (Broadwell)', cpuClockSpeed: 'Varies', gpu: '1x NVIDIA Tesla M60'},
  { id: 'azure-standard_nv4as_v4', familyGroup: 'NVASv4-Series', instanceName: 'Standard_NV4as_v4 (4 vCPU, 14GB RAM, 1/8 MI25)', fullDescription: 'NVASv4-Series, Standard_NV4as_v4 (4 vCPU, 14GB RAM, 1/8 MI25)', provider: 'Azure', cpu: '4 vCPU', ram: '14GB', cpuArchitecture: 'AMD EPYC (Rome)', cpuClockSpeed: 'Varies', gpu: '1/8 AMD Radeon Instinct MI25'},

  // HPC Optimized - H-Series
  { id: 'azure-standard_h8', familyGroup: 'H-Series', instanceName: 'Standard_H8 (8 vCPU, 56GB RAM)', fullDescription: 'H-Series, Standard_H8 (8 vCPU, 56GB RAM)', provider: 'Azure', cpu: '8 vCPU', ram: '56GB', cpuArchitecture: 'Intel Xeon (Haswell)', cpuClockSpeed: 'Varies'},
  { id: 'azure-standard_h16', familyGroup: 'H-Series', instanceName: 'Standard_H16 (16 vCPU, 112GB RAM)', fullDescription: 'H-Series, Standard_H16 (16 vCPU, 112GB RAM)', provider: 'Azure', cpu: '16 vCPU', ram: '112GB', cpuArchitecture: 'Intel Xeon (Haswell)', cpuClockSpeed: 'Varies'},
  { id: 'azure-standard_hb60rs', familyGroup: 'HB-Series', instanceName: 'Standard_HB60rs (60 vCPU, 228GB RAM)', fullDescription: 'HB-Series, Standard_HB60rs (60 vCPU, 228GB RAM)', provider: 'Azure', cpu: '60 vCPU', ram: '228GB', cpuArchitecture: 'AMD EPYC (Naples)', cpuClockSpeed: 'Varies'},
  { id: 'azure-standard_hb120rs_v2', familyGroup: 'HBv2-Series', instanceName: 'Standard_HB120rs_v2 (120 vCPU, 456GB RAM)', fullDescription: 'HBv2-Series, Standard_HB120rs_v2 (120 vCPU, 456GB RAM)', provider: 'Azure', cpu: '120 vCPU', ram: '456GB', cpuArchitecture: 'AMD EPYC (Rome)', cpuClockSpeed: 'Varies'},
  { id: 'azure-standard_hc44rs', familyGroup: 'HC-Series', instanceName: 'Standard_HC44rs (44 vCPU, 352GB RAM)', fullDescription: 'HC-Series, Standard_HC44rs (44 vCPU, 352GB RAM)', provider: 'Azure', cpu: '44 vCPU', ram: '352GB', cpuArchitecture: 'Intel Xeon (Skylake)', cpuClockSpeed: 'Varies'},

].map(mf => ({
  ...mf,
  cpuArchitecture: mf.cpuArchitecture || 'N/A',
  cpuClockSpeed: mf.cpuClockSpeed || 'N/A',
  isSapCertified: mf.isSapCertified || false,
  sapsRating: mf.sapsRating || null,
}));


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


export function getBasePriceForFamily(familyId: string): number {
  // --- Google Cloud Specific Base Prices (Hourly On-Demand Approximations) ---
  // E2
  if (familyId.startsWith('gcp-e2-micro')) return 0.008;
  if (familyId.startsWith('gcp-e2-small')) return 0.016;
  if (familyId.startsWith('gcp-e2-medium')) return 0.032;
  if (familyId.startsWith('gcp-e2-standard-2')) return 0.067;
  if (familyId.startsWith('gcp-e2-standard-4')) return 0.134;
  if (familyId.startsWith('gcp-e2-standard-8')) return 0.268;
  if (familyId.startsWith('gcp-e2-standard-16')) return 0.536;
  if (familyId.startsWith('gcp-e2-standard-32')) return 1.072;
  if (familyId.startsWith('gcp-e2-highmem')) return familyId.includes('16') ? 0.6 : (familyId.includes('8') ? 0.3 : (familyId.includes('4') ? 0.15 : 0.075));
  if (familyId.startsWith('gcp-e2-highcpu')) return familyId.includes('32') ? 0.65 : (familyId.includes('16') ? 0.32 : (familyId.includes('8') ? 0.16 : (familyId.includes('4') ? 0.08 : 0.04)));

  // N1
  if (familyId.startsWith('gcp-n1-standard-1')) return 0.0475;
  if (familyId.startsWith('gcp-n1-standard-2')) return 0.0950;
  if (familyId.startsWith('gcp-n1-standard-4')) return 0.1900;
  if (familyId.startsWith('gcp-n1-standard-8')) return 0.3800;
  if (familyId.startsWith('gcp-n1-standard-16')) return 0.196078 * 4;
  if (familyId.startsWith('gcp-n1-standard-32')) return 1.5200;
  if (familyId.startsWith('gcp-n1-standard-64')) return 3.0400;
  if (familyId.startsWith('gcp-n1-standard-96')) return 4.5600;
  if (familyId.startsWith('gcp-n1-highmem')) return familyId.includes('96') ? 5.0 : (familyId.includes('64') ? 3.3 : (familyId.includes('32') ? 1.65 : (familyId.includes('16') ? 0.82 : (familyId.includes('8') ? 0.41 : (familyId.includes('4') ? 0.205 : 0.102)))));
  if (familyId.startsWith('gcp-n1-highcpu')) return familyId.includes('96') ? 3.0 : (familyId.includes('64') ? 2.0 : (familyId.includes('32') ? 1.0 : (familyId.includes('16') ? 0.5 : (familyId.includes('8') ? 0.25 : (familyId.includes('4') ? 0.125 : 0.062)))));

  // N2
  if (familyId.includes('gcp-n2-standard-') && familyId.split('-')[3]) return parseFloat(familyId.split('-')[3]) * 0.0353;
  if (familyId.includes('gcp-n2-highmem-') && familyId.split('-')[3]) return parseFloat(familyId.split('-')[3]) * 0.042;
  if (familyId.includes('gcp-n2-highcpu-') && familyId.split('-')[3]) return parseFloat(familyId.split('-')[3]) * 0.025;

  // N2D
  if (familyId.includes('gcp-n2d-standard-') && familyId.split('-')[3]) return parseFloat(familyId.split('-')[3]) * 0.029;
  if (familyId.includes('gcp-n2d-highmem-') && familyId.split('-')[3]) return parseFloat(familyId.split('-')[3]) * 0.035;
  if (familyId.includes('gcp-n2d-highcpu-') && familyId.split('-')[3]) return parseFloat(familyId.split('-')[3]) * 0.021;

  // N4
  if (familyId.includes('gcp-n4-standard-') && familyId.split('-')[3]) return parseFloat(familyId.split('-')[3]) * 0.039;
  if (familyId.includes('gcp-n4-highmem-') && familyId.split('-')[3]) return parseFloat(familyId.split('-')[3]) * 0.047;
  if (familyId.includes('gcp-n4-highcpu-') && familyId.split('-')[3]) return parseFloat(familyId.split('-')[3]) * 0.028;

  // T2D
  if (familyId.includes('gcp-t2d-standard-') && familyId.split('-')[3]) return parseFloat(familyId.split('-')[3]) * 0.026;

  // C2
  if (familyId.includes('gcp-c2-standard-') && familyId.split('-')[3]) return parseFloat(familyId.split('-')[3]) * 0.042;
  // C2D
  if (familyId.includes('gcp-c2d-standard-') && familyId.split('-')[3]) return parseFloat(familyId.split('-')[3]) * 0.033;
  if (familyId.includes('gcp-c2d-highcpu-') && familyId.split('-')[3]) return parseFloat(familyId.split('-')[3]) * 0.023;
  if (familyId.includes('gcp-c2d-highmem-') && familyId.split('-')[3]) return parseFloat(familyId.split('-')[3]) * 0.039;

  // C3
  if (familyId.includes('gcp-c3-standard-') && familyId.split('-')[3]) return parseFloat(familyId.split('-')[3]) * 0.04625;
  if (familyId.includes('gcp-c3-highmem-') && familyId.split('-')[3]) return parseFloat(familyId.split('-')[3]) * 0.055;
  if (familyId.includes('gcp-c3-highcpu-') && familyId.split('-')[3]) return parseFloat(familyId.split('-')[3]) * 0.033;
  // C3D
  if (familyId.includes('gcp-c3d-standard-') && familyId.split('-')[3]) return parseFloat(familyId.split('-')[3]) * 0.039;
  if (familyId.includes('gcp-c3d-highmem-') && familyId.split('-')[3]) return parseFloat(familyId.split('-')[3]) * 0.046;
  if (familyId.includes('gcp-c3d-highcpu-') && familyId.split('-')[3]) return parseFloat(familyId.split('-')[3]) * 0.028;

  // C4
  if (familyId.includes('gcp-c4-standard-') && familyId.split('-')[3]) return parseFloat(familyId.split('-')[3]) * 0.0425;
  if (familyId.includes('gcp-c4-highcpu-') && familyId.split('-')[3]) return parseFloat(familyId.split('-')[3]) * 0.030;

  // M1
  if (familyId.startsWith('gcp-m1-ultramem-40')) return 2.85;
  if (familyId.startsWith('gcp-m1-ultramem-80')) return 5.70;
  if (familyId.startsWith('gcp-m1-ultramem-160')) return 11.40;
  if (familyId.startsWith('gcp-m1-megamem-96')) return 6.84;
  // M2
  if (familyId.startsWith('gcp-m2-ultramem-208')) return 13.50;
  if (familyId.startsWith('gcp-m2-ultramem-416')) return 27.00;
  if (familyId.startsWith('gcp-m2-megamem-416')) return 27.00;
  // M3
  if (familyId.startsWith('gcp-m3-ultramem-32')) return 2.55;
  if (familyId.startsWith('gcp-m3-ultramem-64')) return 5.10;
  if (familyId.startsWith('gcp-m3-ultramem-128')) return 10.20;
  if (familyId.startsWith('gcp-m3-megamem-64')) return 5.10;
  if (familyId.startsWith('gcp-m3-megamem-128')) return 10.20;
  // M4
  if (familyId.startsWith('gcp-m4-megamem-32')) return 2.65;
  if (familyId.startsWith('gcp-m4-megamem-64')) return 5.30;
  if (familyId.startsWith('gcp-m4-megamem-96')) return 7.95;
  if (familyId.startsWith('gcp-m4-megamem-128')) return 10.60;
  if (familyId.startsWith('gcp-m4-megamem-160')) return 13.25;
  if (familyId.startsWith('gcp-m4-megamem-192')) return 15.90;

  // A2, A3 (GPU - very rough estimate, GPU cost dominates)
  if (familyId.startsWith('gcp-a2-highgpu-1g')) return 2.0;
  if (familyId.startsWith('gcp-a2-highgpu-2g')) return 3.5;
  if (familyId.startsWith('gcp-a2-highgpu-4g')) return 6.0;
  if (familyId.startsWith('gcp-a2-highgpu-8g')) return 11.0;
  if (familyId.startsWith('gcp-a2-megagpu-16g')) return 20.0;
  if (familyId.startsWith('gcp-a3-highgpu-8g')) return 12.0;
  // G2 (GPU - L4 are cheaper)
  if (familyId.startsWith('gcp-g2-standard-4')) return 0.5;
  if (familyId.startsWith('gcp-g2-standard-8')) return 0.55;
  if (familyId.startsWith('gcp-g2-standard-12')) return 0.6;
  if (familyId.startsWith('gcp-g2-standard-16')) return 0.65;
  if (familyId.startsWith('gcp-g2-standard-24')) return 1.0;
  if (familyId.startsWith('gcp-g2-standard-32')) return 0.7;
  if (familyId.startsWith('gcp-g2-standard-48')) return 1.5;
  if (familyId.startsWith('gcp-g2-standard-96')) return 2.5;
  // H3 (HPC)
  if (familyId.startsWith('gcp-h3-standard-88')) return 3.0;


  // --- AWS Specific Base Prices ---
  const awsInstance = machineFamilies.find(mf => mf.id === familyId && mf.provider === 'AWS');
  if (awsInstance) {
    const specs = parseMachineSpecs(awsInstance);
    const vcpus = specs.cpuCount || 0;

    if (familyId === 'aws-u7i-12tb-224xlarge' || familyId === 'aws-u7i-12tb-metal-224xl') return 33.072;
    if (familyId === 'aws-u7i-16tb-224xlarge' || familyId === 'aws-u7i-16tb-metal-224xl') return (16/12) * 33.072; // Scaled from 12TB
    if (familyId === 'aws-u7i-24tb-224xlarge' || familyId === 'aws-u7i-24tb-metal-224xl') return (24/12) * 33.072; // Scaled from 12TB
    if (familyId === 'aws-u7i-32tb-224xlarge' || familyId === 'aws-u7i-32tb-metal-224xl') return (32/12) * 33.072; // Scaled from 12TB


    if (awsInstance.familyGroup.startsWith('M5')) {
      if (vcpus <= 2) return 0.096; if (vcpus <= 4) return 0.192; if (vcpus <= 8) return 0.384;
      return 0.196078 * (vcpus / 4); // Generic scaling for larger M5
    }
    if (awsInstance.familyGroup.startsWith('M6')) {
        return vcpus * 0.047;
    }
    if (awsInstance.familyGroup.startsWith('M7i-Flex')) {
      return vcpus * 0.042; // M7i-Flex are generally cheaper
    }
    if (awsInstance.familyGroup.startsWith('M7')) {
        return vcpus * 0.045;
    }
    if (awsInstance.familyGroup.startsWith('T2') || awsInstance.familyGroup.startsWith('T3') || awsInstance.familyGroup.startsWith('T4g')) return vcpus * 0.015;

    if (awsInstance.familyGroup.startsWith('C5')) return vcpus * 0.0425;
    if (awsInstance.familyGroup.startsWith('C6')) return vcpus * 0.040;
    if (awsInstance.familyGroup.startsWith('C7')) return vcpus * 0.038;

    if (awsInstance.familyGroup.startsWith('R3')) return vcpus * 0.078;
    if (awsInstance.familyGroup.startsWith('R4')) return vcpus * 0.070;
    if (awsInstance.familyGroup.startsWith('R5')) return vcpus * 0.063;
    if (awsInstance.familyGroup.startsWith('R6')) return vcpus * 0.060;
    if (awsInstance.familyGroup.startsWith('R7iz')) return vcpus * 0.07; // Higher clock speed
    if (awsInstance.familyGroup.startsWith('R7')) return vcpus * 0.058;
    if (awsInstance.familyGroup.startsWith('X1e')) return vcpus * 0.22; // X1e base
    if (awsInstance.familyGroup.startsWith('X1')) return vcpus * 0.20;
    if (awsInstance.familyGroup.startsWith('X2idn')) return vcpus * 0.19;
    if (awsInstance.familyGroup.startsWith('X2iedn')) return vcpus * 0.18;
    if (awsInstance.familyGroup.startsWith('X2iezn')) return vcpus * 0.20; // Higher clock for X2iezn
    if (awsInstance.familyGroup.includes('(High Memory Intel)') && familyId.includes('metal')) { // Adjusted to match familyGroup
        const ramTB = specs.ramInGB ? specs.ramInGB / 1024 : 0;
        if (ramTB <=3 ) return 25.0;
        if (ramTB <=6 ) return 30.0;
        if (ramTB <=9 ) return 35.0;
        if (ramTB <=12) return 40.0;
        if (ramTB <=18) return 50.0;
        if (ramTB <=24) return 60.0;
        return 50.0;
    }
    // U7i handled above by specific ID match
    if (awsInstance.familyGroup.startsWith('Z1d')) return vcpus * 0.09;

    if (awsInstance.familyGroup.startsWith('I3')) return vcpus * 0.08;
    if (awsInstance.familyGroup.startsWith('I4')) return vcpus * 0.075;
    if (awsInstance.familyGroup.startsWith('D2')) return vcpus * 0.085;
    if (awsInstance.familyGroup.startsWith('D3')) return vcpus * 0.080;
    if (awsInstance.familyGroup.startsWith('H1')) return vcpus * 0.09;

    if (awsInstance.familyGroup.startsWith('P3')) return 3.00 + (vcpus * 0.05);
    if (awsInstance.familyGroup.startsWith('P4')) return 10.00 + (vcpus * 0.05);
    if (awsInstance.familyGroup.startsWith('P5')) return 15.00 + (vcpus * 0.05);
    if (awsInstance.familyGroup.startsWith('G4')) return 0.50 + (vcpus * 0.04);
    if (awsInstance.familyGroup.startsWith('G5')) return 0.70 + (vcpus * 0.04);
    if (awsInstance.familyGroup.startsWith('G6')) return 0.60 + (vcpus * 0.04);
    if (awsInstance.familyGroup.startsWith('Inf')) return 0.30 + (vcpus * 0.03);
    if (awsInstance.familyGroup.startsWith('Trn')) return 1.00 + (vcpus * 0.04);
    if (awsInstance.familyGroup.startsWith('DL')) return 5.00 + (vcpus * 0.05);

    if (awsInstance.familyGroup.startsWith('Hpc')) return vcpus * 0.07;
  }


  // --- Azure Specific Base Prices ---
  const azureInstance = machineFamilies.find(mf => mf.id === familyId && mf.provider === 'Azure');
  if (azureInstance) {
    const specs = parseMachineSpecs(azureInstance);
    const vcpus = specs.cpuCount || 0;
    const ram = specs.ramInGB || 0;

    // Base price per vCPU and per GB RAM (these are illustrative guesses)
    let pricePerVCpu = 0.020;
    let pricePerRamGB = 0.005;

    if (azureInstance.familyGroup.includes('Av2')) { pricePerVCpu = 0.020; pricePerRamGB = 0.003; }
    if (azureInstance.familyGroup.includes('B-Series')) { pricePerVCpu = 0.012; pricePerRamGB = 0.002; } // Burstable, cheaper

    if (azureInstance.familyGroup.includes('D') && azureInstance.familyGroup.includes('v3')) { pricePerVCpu = 0.048; pricePerRamGB = 0.006; }
    else if (azureInstance.familyGroup.includes('D') && azureInstance.familyGroup.includes('v4')) { pricePerVCpu = 0.046; pricePerRamGB = 0.0055; }
    else if (azureInstance.familyGroup.includes('D') && azureInstance.familyGroup.includes('v5')) { pricePerVCpu = 0.045; pricePerRamGB = 0.005; }
    else if (azureInstance.familyGroup.startsWith('Das') || azureInstance.familyGroup.startsWith('Dadsv')) { pricePerVCpu = 0.043; pricePerRamGB = 0.0045; } // AMD Das

    if (azureInstance.familyGroup.includes('F')) { pricePerVCpu = 0.040; pricePerRamGB = 0.004; } // Compute optimized

    if (azureInstance.familyGroup.includes('E') && azureInstance.familyGroup.includes('v3')) { pricePerVCpu = 0.063; pricePerRamGB = 0.008; }
    else if (azureInstance.familyGroup.includes('E') && azureInstance.familyGroup.includes('v4')) { pricePerVCpu = 0.061; pricePerRamGB = 0.0075; }
    else if (azureInstance.familyGroup.includes('E') && azureInstance.familyGroup.includes('v5')) { pricePerVCpu = 0.060; pricePerRamGB = 0.007; }
    else if (azureInstance.familyGroup.startsWith('Eas') || azureInstance.familyGroup.startsWith('Eadsv')) { pricePerVCpu = 0.058; pricePerRamGB = 0.0065; } // AMD Eas
    if (azureInstance.familyGroup.includes('M-Series') || azureInstance.familyGroup.includes('Mv2')) { pricePerVCpu = 0.070; pricePerRamGB = 0.025; } // Large memory

    if (azureInstance.familyGroup.includes('Lsv2') || azureInstance.familyGroup.includes('Lsv3')) { pricePerVCpu = 0.050; pricePerRamGB = 0.005; } // Storage optimized

    if (azureInstance.familyGroup.includes('NC') || azureInstance.familyGroup.includes('ND') || azureInstance.familyGroup.includes('NV')) { // GPU
        pricePerVCpu = 0.050; pricePerRamGB = 0.008;
        let gpuBase = 0.30; // Base for any GPU
        if (azureInstance.instanceName.includes('K80')) gpuBase += 0.10;
        if (azureInstance.instanceName.includes('P100') || azureInstance.instanceName.includes('P40')) gpuBase += 0.50;
        if (azureInstance.instanceName.includes('V100')) gpuBase += 1.50;
        if (azureInstance.instanceName.includes('A100')) gpuBase += 2.50;
        if (azureInstance.instanceName.includes('T4')) gpuBase += 0.20;
        if (azureInstance.instanceName.includes('M60')) gpuBase += 0.15;
        // Count GPUs if specified, e.g. "8x V100"
        const gpuMatch = azureInstance.instanceName.match(/(\d+)x\s*([A-Z0-9]+)/i);
        if (gpuMatch && gpuMatch[1]) {
            return (vcpus * pricePerVCpu) + (ram * pricePerRamGB) + (parseInt(gpuMatch[1]) * gpuBase);
        }
        return (vcpus * pricePerVCpu) + (ram * pricePerRamGB) + gpuBase;
    }

    if (azureInstance.familyGroup.includes('H')) { pricePerVCpu = 0.075; pricePerRamGB = 0.006; } // HPC

    return (vcpus * pricePerVCpu) + (ram * pricePerRamGB);
  }

  // General Fallbacks - if no specific match
  if (familyId.match(/micro|nano|small|shared/i)) return 0.012;
  if (familyId.match(/medium/i)) return 0.025;
  if (familyId.match(/large/i) && !familyId.includes('xlarge')) return 0.09;
  if (familyId.match(/xlarge/i) && !familyId.match(/(2|4|8|12|16|24)xlarge/i)) return 0.18;
  if (familyId.match(/2xlarge/i)) return 0.36;
  if (familyId.match(/4xlarge/i)) return 0.72;
  if (familyId.match(/8xlarge/i)) return 1.44;
  if (familyId.match(/12xlarge/i)) return 2.16;
  if (familyId.match(/16xlarge/i)) return 2.88;
  if (familyId.match(/24xlarge|32xlarge|metal|ultramem|megamem/i)) return 4.32;

  console.warn(`Using generic fallback base price for familyId: ${familyId}`);
  return 0.07;
};

const getInstanceFullDescription = (instanceId: string): string => {
  const instance = machineFamilies.find(mf => mf.id === instanceId);
  return instance?.fullDescription || instanceId;
};

export const getRegionNameById = (provider: CloudProvider, regionId: string): string => {
  let regions: Region[] = [];
  if (provider === 'Google Cloud') regions = googleCloudRegions;
  else if (provider === 'Azure') regions = azureRegions;
  else if (provider === 'AWS') regions = awsRegions;
  const region = regions.find(r => r.id === regionId);
  return region?.name || regionId;
}

export const getPricingModelDetails = (modelValue: string): PricingModel | undefined => {
  return pricingModelOptions.find(m => m.value === modelValue);
};

export const getPrice = (provider: CloudProvider, familyId: string, regionId: string, pricingModelValue: string): PriceData => {
  let basePrice = getBasePriceForFamily(familyId);
  if (basePrice === null) {
    console.warn(`Base price not found for ${familyId}. Using default fallback.`);
    basePrice = 0.07;
  }
  const regionFactorLookup: { [key: string]: number } = {
    // Google Cloud
    'us-east1': 1.0, 'us-east4': 1.01, 'us-east5': 1.0, 'us-south1': 0.99, 'us-central1': 0.98,
    'us-west1': 1.02, 'us-west2': 1.03, 'us-west3': 1.03, 'us-west4': 1.04,
    'northamerica-northeast1': 1.04, 'northamerica-northeast2': 1.05,
    'southamerica-east1': 1.15, 'southamerica-west1': 1.16,
    'europe-west1': 1.05, 'europe-west2': 1.06, 'europe-west3': 1.07, 'europe-west4': 1.04, 'europe-west6': 1.08, 'europe-west8': 1.09, 'europe-west9': 1.08, 'europe-west10': 1.07, 'europe-west12': 1.09,
    'europe-central2': 1.07, 'europe-north1': 1.06, 'europe-southwest1': 1.09,
    'asia-east1': 1.10, 'asia-east2': 1.11,
    'asia-northeast1': 1.10, 'asia-northeast2': 1.11, 'asia-northeast3': 1.12,
    'asia-south1': 1.12, 'asia-south2': 1.13,
    'asia-southeast1': 1.09, 'asia-southeast2': 1.10,
    'australia-southeast1': 1.12, 'australia-southeast2': 1.13,
    'me-west1': 1.14, 'me-central1': 1.15, 'me-central2': 1.15,
    'africa-south1': 1.18,

    // Azure (using GCP as base, slightly adjusted)
    'eastus': 1.0, 'eastus2': 1.01, 'eastus3': 1.0, 'southcentralus': 0.99,
    'westus': 1.02, 'westus2': 1.02, 'westus3': 1.03,
    'northcentralus': 0.99, 'centralus': 0.98, 'westcentralus': 1.0,
    'canadacentral': 1.04, 'canadaeast': 1.05,
    'brazilsouth': 1.15, 'brazilsoutheast': 1.15, 'chilecentral': 1.17,
    'northeurope': 1.06, 'westeurope': 1.05, 'uksouth': 1.07, 'ukwest': 1.08,
    'francecentral': 1.07, 'francesouth': 1.08,
    'germanywestcentral': 1.07, 'germanynorth': 1.08,
    'switzerlandnorth': 1.09, 'switzerlandwest': 1.10,
    'italynorth': 1.09, 'spaincentral': 1.09,
    'norwayeast': 1.08, 'norwaywest': 1.09, 'swedencentral': 1.07, 'polandcentral': 1.07,
    'qatarcentral': 1.16, 'uaenorth': 1.14, 'uaecentral': 1.15, 'israelcentral': 1.15,
    'southafricanorth': 1.18, 'southafricawest': 1.19,
    'eastasia': 1.11, 'southeastasia': 1.09,
    'japaneast': 1.11, 'japanwest': 1.12,
    'koreacentral': 1.12, 'koreasouth': 1.13,
    'centralindia': 1.12, 'southindia': 1.13, 'westindia': 1.12, 'jioindiacentral': 1.11, 'jioindiawest': 1.11,
    'taiwannorth': 1.11, 'taiwannorthwest': 1.11, 'malaysiacentral':1.10,
    'australiaeast': 1.12, 'australiasoutheast': 1.13, 'australiacentral': 1.14, 'australiacentral2': 1.14,

    // AWS (using GCP as base, slightly adjusted)
    'us-east-1': 1.0, 'us-east-2': 1.01, 'us-west-1': 1.03, 'us-west-2': 1.02,
    'af-south-1': 1.19,
    'ap-east-1': 1.12, 'ap-south-1': 1.13, 'ap-south-2': 1.14,
    'ap-southeast-1': 1.10, 'ap-southeast-2': 1.11, 'ap-southeast-3': 1.11, 'ap-southeast-4': 1.12,
    'ap-northeast-1': 1.11, 'ap-northeast-2': 1.12, 'ap-northeast-3': 1.12,
    'ca-central-1': 1.04, 'ca-west-1': 1.05,
    'eu-central-1': 1.07, 'eu-central-2': 1.08,
    'eu-west-1': 1.05, 'eu-west-2': 1.06, 'eu-west-3': 1.07,
    'eu-south-1': 1.08, 'eu-south-2': 1.09, 'eu-north-1': 1.06,
    'il-central-1': 1.16, 'me-south-1': 1.15, 'me-central-1': 1.16,
    'sa-east-1': 1.15,
  };

  const regionFactor = regionFactorLookup[regionId] || 1.08;
  let providerFactor = 1.0;
  if (provider === 'Azure') providerFactor = 0.98;
  if (provider === 'AWS') providerFactor = 1.02;

  const randomFluctuation = (Math.random() - 0.5) * 0.01 * basePrice;
  const modelDetails = getPricingModelDetails(pricingModelValue) || pricingModelOptions.find(m => m.value === 'on-demand')!;
  const discountFactor = modelDetails.discountFactor;

  const calculatedPrice = basePrice * regionFactor * providerFactor * discountFactor + randomFluctuation;

  return {
    provider: provider,
    machineFamilyId: familyId,
    machineFamilyName: getInstanceFullDescription(familyId),
    price: parseFloat(Math.max(0.000001, calculatedPrice).toFixed(6)),
    regionId: regionId,
    regionName: getRegionNameById(provider, regionId),
    pricingModelLabel: modelDetails.label,
    pricingModelValue: modelDetails.value,
  };
};


export const fetchPricingData = async (
  provider: CloudProvider,
  regionId: string,
  machineFamilyId: string,
  pricingModelValue: string
): Promise<PriceData> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 400));

  if (provider === 'AWS') {
    const response = await fetch(`/api/pricing/aws?regionId=${regionId}&instanceId=${machineFamilyId}&pricingModel=${pricingModelValue}`);
    if (!response.ok) {
      console.error(`Error fetching AWS price from API for ${machineFamilyId} in ${regionId} (model: ${pricingModelValue}): ${response.status}`);
      return getPrice(provider, machineFamilyId, regionId, pricingModelValue); // Fallback to client-side calc for AWS if API fails
    }
    const data: PriceData = await response.json();
    return data;
  } else {
    // For GCP and Azure, continue using the client-side calculation
    return getPrice(provider, machineFamilyId, regionId, pricingModelValue);
  }
};
