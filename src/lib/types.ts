
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
  cpu: string; // e.g., "2 vCPU", "Shared"
  cpuArchitecture: string;
  cpuClockSpeed?: string;
  ram: string; // e.g., "8 GB", "16GB"
  isSapCertified?: boolean;
  sapsRating?: number;
  gpu?: string;
  accelerator?: string;
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
  price: number | null;          // Total hourly price for the instance
  vcpuHourlyPrice?: number;      // Total hourly vCPU component cost for the instance (primarily for GCE)
  ramHourlyPrice?: number;       // Total hourly RAM component cost for the instance (primarily for GCE)
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

// Utility function to parse CPU and RAM from MachineFamily strings
export const parseMachineSpecs = (machine: MachineFamily): { cpuCount: number | null, ramInGB: number | null } => {
  let cpuCount: number | null = null;
  if (machine.cpu) {
    if (machine.cpu.toLowerCase().includes('shared')) {
      cpuCount = 0.5; // Or some other representation for shared CPU
    } else {
      const cpuMatch = machine.cpu.match(/(\d+(\.\d+)?)/); // Match integers or decimals
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
      if (unit === 'TB') {
        ramInGB = value * 1024;
      } else { // Assume GB
        ramInGB = value;
      }
    }
  }
  return { cpuCount, ramInGB };
};
