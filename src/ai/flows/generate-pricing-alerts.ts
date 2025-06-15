// src/ai/flows/generate-pricing-alerts.ts
'use server';

/**
 * @fileOverview A flow to generate pricing alerts based on user-defined thresholds for cloud services.
 *
 * - generatePricingAlerts - A function that generates pricing alerts.
 * - GeneratePricingAlertsInput - The input type for the generatePricingAlerts function.
 * - GeneratePricingAlertsOutput - The return type for the generatePricingAlerts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePricingAlertsInputSchema = z.object({
  service: z.string().describe('The specific cloud service (e.g., EC2, Azure VMs, Compute Engine).'),
  region: z.string().describe('The region where the service is located (e.g., us-east-1, westus2, europe-west1).'),
  threshold: z
    .number()
    .describe('The price threshold below which an alert should be triggered.'),
  currentPrice: z.number().describe('The current price of the service in the specified region.'),
});
export type GeneratePricingAlertsInput = z.infer<typeof GeneratePricingAlertsInputSchema>;

const GeneratePricingAlertsOutputSchema = z.object({
  alertMessage: z.string().describe('A message indicating whether an alert should be triggered.'),
  reasoning: z.string().describe('The AI reasoning behind the alert message.'),
});
export type GeneratePricingAlertsOutput = z.infer<typeof GeneratePricingAlertsOutputSchema>;

export async function generatePricingAlerts(
  input: GeneratePricingAlertsInput
): Promise<GeneratePricingAlertsOutput> {
  return generatePricingAlertsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePricingAlertsPrompt',
  input: {schema: GeneratePricingAlertsInputSchema},
  output: {schema: GeneratePricingAlertsOutputSchema},
  prompt: `You are an AI assistant that helps users set up pricing alerts for cloud services.

  Service: {{{service}}}
  Region: {{{region}}}
  Threshold: {{{threshold}}}
  Current Price: {{{currentPrice}}}

  Determine whether an alert should be triggered based on the current price and the user-defined threshold.
  If the current price is below the threshold, generate an alert message indicating that the price has dropped below the threshold.
  Explain the reasoning behind the alert message.
  `,
});

const generatePricingAlertsFlow = ai.defineFlow(
  {
    name: 'generatePricingAlertsFlow',
    inputSchema: GeneratePricingAlertsInputSchema,
    outputSchema: GeneratePricingAlertsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
