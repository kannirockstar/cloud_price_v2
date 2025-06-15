
export interface SelectOption {
  value: string;
  label: string;
}

export type CloudProvider = 'Google Cloud' | 'Azure' | 'AWS';

export interface PricingModel {
  value: string;
  label: string;
  providers: CloudProvider[];
  discountFactor: number;
}

export interface MachineFamily {
  id: string;
  familyGroup: string;
  instanceName: string;
  fullDescription: string;
  provider: CloudProvider;
  cpu: string;
  cpuArchitecture: string;
  cpuClockSpeed?: string;
  ram: string;
  isSapCertified?: boolean;
  sapsRating?: number;
}

export interface Region {
  id: string;
  name: string;
  geo: string;
}

export interface PriceData {
  provider: CloudProvider;
  machineFamilyId: string;
  machineFamilyName: string;
  price: number | null;
  regionId: string;
  regionName: string;
  pricingModelLabel: string;
  pricingModelValue: string;
  error?: string; // Added to carry error messages
}

// ComparisonRequest is no longer needed for dynamic individual fetching
// export interface ComparisonRequest {
//   googleRegionId: string;
//   azureRegionId: string;
//   awsRegionId: string;
//   googleMachineFamilyId: string;
//   azureMachineFamilyId: string;
//   awsMachineFamilyId: string;
//   googlePricingModel: string;
//   azurePricingModel: string;
//   awsPricingModel: string;
// }

export interface HistoricalPricePoint {
  date: string;
  price: number;
}

export interface ProviderHistoricalData {
  provider: CloudProvider;
  data: HistoricalPricePoint[];
}

export interface CpuDetails {
  architecture: string;
  clockSpeed?: string;
}

