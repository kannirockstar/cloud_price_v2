import type { PricingEntry } from '@/types';

export const CLOUD_SERVICE_CATEGORIES = ['Compute', 'Storage', 'Database', 'Networking', 'AI/ML'];
export const CLOUD_REGIONS = [
  'us-east-1', 'us-west-1', 'us-west-2', 
  'eu-west-1', 'eu-central-1', 'eu-north-1',
  'ap-southeast-1', 'ap-southeast-2', 'ap-northeast-1',
  'sa-east-1'
];

export const MOCK_PRICING_DATA: PricingEntry[] = [
  {
    id: '1',
    provider: 'AWS',
    serviceCategory: 'Compute',
    serviceName: 'EC2 General Purpose',
    instanceType: 'm5.large',
    region: 'us-east-1',
    price: 0.096,
    priceUnit: 'per Hour',
    features: ['2 vCPU', '8 GiB RAM', 'General Purpose SSD'],
    dataTimestamp: new Date(Date.now() - 86400000 * 0.5).toISOString(), // 0.5 days ago
  },
  {
    id: '2',
    provider: 'Azure',
    serviceCategory: 'Compute',
    serviceName: 'Virtual Machines',
    instanceType: 'Standard_D2s_v3',
    region: 'us-east-1',
    price: 0.102,
    priceUnit: 'per Hour',
    features: ['2 vCPU', '8 GiB RAM', 'Premium SSD'],
    dataTimestamp: new Date(Date.now() - 86400000 * 1.2).toISOString(), // 1.2 days ago
  },
  {
    id: '3',
    provider: 'GCP',
    serviceCategory: 'Compute',
    serviceName: 'Compute Engine',
    instanceType: 'n1-standard-2',
    region: 'us-east-1',
    price: 0.090,
    priceUnit: 'per Hour',
    features: ['2 vCPU', '7.5 GiB RAM', 'Persistent Disk'],
    dataTimestamp: new Date().toISOString(),
  },
  {
    id: '4',
    provider: 'AWS',
    serviceCategory: 'Storage',
    serviceName: 'S3 Standard',
    region: 'us-east-1',
    price: 0.023,
    priceUnit: 'per GB/Month',
    features: ['High Durability', 'Scalable Storage'],
    dataTimestamp: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
  },
  {
    id: '5',
    provider: 'Azure',
    serviceCategory: 'Storage',
    serviceName: 'Blob Storage Hot',
    region: 'us-east-1',
    price: 0.021,
    priceUnit: 'per GB/Month',
    features: ['Optimized for frequently accessed data'],
    dataTimestamp: new Date().toISOString(),
  },
  {
    id: '6',
    provider: 'GCP',
    serviceCategory: 'Storage',
    serviceName: 'Cloud Storage Standard',
    region: 'us-east-1',
    price: 0.020,
    priceUnit: 'per GB/Month',
    features: ['Worldwide Edge Caching', 'Object Lifecycle Management'],
    dataTimestamp: new Date(Date.now() - 86400000 * 0.2).toISOString(), // 0.2 days ago
  },
   {
    id: '7',
    provider: 'AWS',
    serviceCategory: 'Database',
    serviceName: 'RDS PostgreSQL',
    instanceType: 'db.m5.large',
    region: 'us-east-1',
    price: 0.176,
    priceUnit: 'per Hour',
    features: ['2 vCPU', '8 GiB RAM', 'Managed Relational Database'],
    dataTimestamp: new Date().toISOString(),
  },
  {
    id: '8',
    provider: 'Azure',
    serviceCategory: 'Database',
    serviceName: 'Azure SQL Database',
    instanceType: 'GP_Gen5_2',
    region: 'us-east-1',
    price: 0.19,
    priceUnit: 'per Hour',
    features: ['2 vCores', '10.2 GB RAM', 'Intelligent Performance'],
    dataTimestamp: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 days ago
  },
  {
    id: '9',
    provider: 'GCP',
    serviceCategory: 'Database',
    serviceName: 'Cloud SQL for PostgreSQL',
    instanceType: 'db-n1-standard-2',
    region: 'us-east-1',
    price: 0.165,
    priceUnit: 'per Hour',
    features: ['2 vCPU', '7.5 GiB RAM', 'Fully Managed'],
    dataTimestamp: new Date().toISOString(),
  }
];
