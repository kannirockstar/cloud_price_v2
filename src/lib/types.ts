
export interface SelectOption {
  value: string;
  label: string;
}

export type CloudProvider = 'Google Cloud' | 'Azure' | 'AWS';

export interface PricingModel {
  value: string;
  label: string;
  providers: CloudProvider[];
  discountFactor: number; // Retained for potential client-side estimations if GCF fails, but GCF is primary
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
  gpu?: string; // Optional field for GPU details
  accelerator?: string; // Optional field for other accelerators
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
  price: number | null; // This is the total hourly price
  vcpuHourlyPrice?: number; // Optional: component cost from GCF (primarily for GCE)
  ramHourlyPrice?: number;  // Optional: component cost from GCF (primarily for GCE)
  regionId: string;
  regionName: string;
  pricingModelLabel: string;
  pricingModelValue: string;
  error?: string;
}

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
