import { config } from 'dotenv';
config();

import '@/ai/flows/explain-recommendation.ts';
import '@/ai/flows/suggest-configuration.ts';
import '@/ai/flows/recommend-cloud-config.ts';
import '@/ai/flows/generate-pricing-alerts.ts';