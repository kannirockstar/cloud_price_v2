
'use server';
/**
 * @fileOverview Detects price discrepancies between cloud providers using AI.
 *
 * - detectPriceDiscrepancies - A function that handles the price discrepancy detection process.
 * - DetectPriceDiscrepanciesInput - The input type for the detectPriceDiscrepancies function.
 * - DetectPriceDiscrepanciesOutput - The return type for the detectPriceDiscrepancies function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectPriceDiscrepanciesInputSchema = z.object({
  googlePrice: z.number().describe('The price from Google Cloud Compute Engine.'),
  azurePrice: z.number().describe('The price from Azure Virtual Machines.'),
  awsPrice: z.number().describe('The price from AWS EC2.'),
  region: z.string().describe('The primary Google Cloud region name for the price comparison (e.g., "N. Virginia (us-east1)"). Azure and AWS prices are for their respective user-selected regions.'),
  googleMachineFamily: z.string().describe('The Google machine family name and configuration details.'),
  azureMachineFamily: z.string().describe('The Azure machine family name and configuration details.'),
  awsMachineFamily: z.string().describe('The AWS machine family name and configuration details.'),
  googlePricingModelName: z.string().describe('The selected pricing model for Google Cloud (e.g., "On-Demand", "3-Year CUD").'),
  azurePricingModelName: z.string().describe('The selected pricing model for Azure (e.g., "On-Demand", "3-Year RI (All Upfront)").'),
  awsPricingModelName: z.string().describe('The selected pricing model for AWS (e.g., "On-Demand", "3-Year RI (No Upfront)").'),
});
export type DetectPriceDiscrepanciesInput = z.infer<typeof DetectPriceDiscrepanciesInputSchema>;

const DetectPriceDiscrepanciesOutputSchema = z.object({
  hasDiscrepancy: z.boolean().describe('Whether a price discrepancy is detected.'),
  discrepancyExplanation: z
    .string()
    .describe('Explanation of the price discrepancy, if any. Consider the selected pricing models in the explanation.'),
});
export type DetectPriceDiscrepanciesOutput = z.infer<typeof DetectPriceDiscrepanciesOutputSchema>;

export async function detectPriceDiscrepancies(input: DetectPriceDiscrepanciesInput): Promise<DetectPriceDiscrepanciesOutput> {
  return detectPriceDiscrepanciesFlow(input);
}

const detectPriceDiscrepanciesPrompt = ai.definePrompt({
  name: 'detectPriceDiscrepanciesPrompt',
  input: {schema: DetectPriceDiscrepanciesInputSchema},
  output: {schema: DetectPriceDiscrepanciesOutputSchema},
  prompt: `You are an AI assistant that analyzes cloud provider pricing data and detects discrepancies.

  You are given the prices for Google Compute Engine, Azure Virtual Machines, and AWS EC2.
  Google's price is for the region: {{{region}}}. Azure and AWS prices are for their respective regions as selected by the user.
  Your task is to determine if there is a significant price discrepancy between the providers, considering the provided machine types, their prices, and the selected pricing models.

  Consider factors such as:
  - Regional pricing variations.
  - The impact of the selected pricing models (e.g., On-Demand vs. 3-Year Commitment) on the final price. Note if a commitment significantly alters the comparison.
  - Potential errors in the data.

  If a discrepancy is detected, explain the potential reasons for it, explicitly mentioning how the chosen pricing models might contribute to the observed differences.

  Here is the pricing data:
  - Google Cloud ({{{googleMachineFamily}}}) in {{{region}}} with pricing model "{{{googlePricingModelName}}}": \${{{googlePrice}}}
  - Azure Virtual Machines ({{{azureMachineFamily}}}) with pricing model "{{{azurePricingModelName}}}": \${{{azurePrice}}}
  - AWS EC2 ({{{awsMachineFamily}}}) with pricing model "{{{awsPricingModelName}}}": \${{{awsPrice}}}

  Based on this information, determine if there's a price discrepancy and provide an explanation.

  Output:
  { 
   "hasDiscrepancy": true or false,
   "discrepancyExplanation": "Explanation of the price discrepancy, if any, including considerations for the selected pricing models."
  }
`,
});

const detectPriceDiscrepanciesFlow = ai.defineFlow(
  {
    name: 'detectPriceDiscrepanciesFlow',
    inputSchema: DetectPriceDiscrepanciesInputSchema,
    outputSchema: DetectPriceDiscrepanciesOutputSchema,
  },
  async input => {
    const {output} = await detectPriceDiscrepanciesPrompt(input);
    return output!;
  }
);
