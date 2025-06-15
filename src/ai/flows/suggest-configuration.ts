// src/ai/flows/suggest-configuration.ts
'use server';
/**
 * @fileOverview A flow to suggest optimal cloud configurations based on user requirements, balancing cost and performance.
 *
 * - suggestConfiguration - A function that suggests cloud configurations.
 * - SuggestConfigurationInput - The input type for the suggestConfiguration function.
 * - SuggestConfigurationOutput - The return type for the suggestConfiguration function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestConfigurationInputSchema = z.object({
  requirements: z
    .string()
    .describe(
      'High-level requirements for the cloud configuration (e.g., run a web server, store 1TB of data).'
    ),
});
export type SuggestConfigurationInput = z.infer<typeof SuggestConfigurationInputSchema>;

const SuggestConfigurationOutputSchema = z.object({
  optimalConfigurations: z
    .array(
      z.object({
        provider: z.string().describe('The cloud provider (e.g., AWS, Azure, GCP).'),
        service: z.string().describe('The specific cloud service (e.g., EC2, Azure VMs, Compute Engine).'),
        configuration: z.string().describe('The recommended configuration details.'),
        costEstimate: z.string().describe('Estimated cost for the configuration.'),
        performanceNotes: z.string().describe('Notes on the expected performance.'),
      })
    )
    .describe('An array of optimal cloud configurations across different providers.'),
  reasoning: z.string().describe('The AI reasoning behind the suggested configurations.'),
});
export type SuggestConfigurationOutput = z.infer<typeof SuggestConfigurationOutputSchema>;

export async function suggestConfiguration(input: SuggestConfigurationInput): Promise<SuggestConfigurationOutput> {
  return suggestConfigurationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestConfigurationPrompt',
  input: {schema: SuggestConfigurationInputSchema},
  output: {schema: SuggestConfigurationOutputSchema},
  prompt: `You are an expert cloud solutions architect. Given the following user requirements, suggest optimal configurations across different cloud providers, considering both performance and cost.  Explain your reasoning for the suggested configurations.

Requirements: {{{requirements}}}

Output the response in JSON format. Do not include any surrounding text. Here is the output schema in JSON format:
${JSON.stringify(SuggestConfigurationOutputSchema.shape, null, 2)}`,
});

const suggestConfigurationFlow = ai.defineFlow(
  {
    name: 'suggestConfigurationFlow',
    inputSchema: SuggestConfigurationInputSchema,
    outputSchema: SuggestConfigurationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
