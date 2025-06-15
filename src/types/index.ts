
export type CloudProvider = 'AWS' | 'Azure' | 'GCP';

export interface PricingEntry {
  id: string;
  provider: CloudProvider;
  serviceCategory: string; 
  serviceName: string; 
  instanceType?: string; 
  region: string;
  price: number;
  priceUnit: string; 
  features: string[];
  dataTimestamp: string; 
}

export interface OptimalConfiguration {
  provider: string;
  service: string;
  configuration: string;
  costEstimate: string;
  performanceNotes: string;
}
