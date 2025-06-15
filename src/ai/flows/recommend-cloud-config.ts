// src/ai/flows/recommend-cloud-config.ts
'use server';
/**
 * @fileOverview A flow to recommend the most cost-effective cloud configuration based on user-specified application requirements.
 *
 * - recommendCloudConfig - A function that recommends a cloud configuration.
 * - RecommendCloudConfigInput - The input type for the recommendCloudConfig function.
 * - RecommendCloudConfigOutput - The return type for the recommendCloudConfig function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendCloudConfigInputSchema = z.object({
  cpu: z.number().describe('The number of CPU cores required.'),
  memory: z.number().describe('The amount of memory (in GB) required.'),
  storage: z.number().describe('The amount of storage (in GB) required.'),
  region: z.string().describe('The preferred cloud region (e.g., us-central1).'),
});
export type RecommendCloudConfigInput = z.infer<typeof RecommendCloudConfigInputSchema>;

const RecommendCloudConfigOutputSchema = z.object({
  recommendation: z.object({
    provider: z.string().describe('The cloud provider (e.g., AWS, Azure, GCP).'),
    instanceType: z.string().describe('The recommended instance type.'),
    estimatedCost: z.number().describe('The estimated monthly cost (in USD).'),
    reasoning: z.string().describe('The AI reasoning behind the recommendation.'),
  }).describe('The optimal cloud configuration recommendation.'),
});
export type RecommendCloudConfigOutput = z.infer<typeof RecommendCloudConfigOutputSchema>;

export async function recommendCloudConfig(input: RecommendCloudConfigInput): Promise<RecommendCloudConfigOutput> {
  return recommendCloudConfigFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendCloudConfigPrompt',
  input: {schema: RecommendCloudConfigInputSchema},
  output: {schema: RecommendCloudConfigOutputSchema},
  prompt: `You are an expert cloud cost optimization consultant. Given the following application requirements and preferred region, recommend the most cost-effective cloud configuration across AWS, Azure, and GCP.

Requirements:
- CPU: {{{cpu}}} cores
- Memory: {{{memory}}} GB
- Storage: {{{storage}}} GB
- Region: {{{region}}}

Consider the prices of compute, memory, and storage in the specified region.

Present a single recommendation that balances cost and performance. Provide clear reasoning for your choice.

Output the response in JSON format. Do not include any surrounding text. Here is the output schema in JSON format:
${JSON.stringify(RecommendCloudConfigOutputSchema.shape, null, 2)}`,
});

const recommendCloudConfigFlow = ai.defineFlow(
  {
    name: 'recommendCloudConfigFlow',
    inputSchema: RecommendCloudConfigInputSchema,
    outputSchema: RecommendCloudConfigOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
