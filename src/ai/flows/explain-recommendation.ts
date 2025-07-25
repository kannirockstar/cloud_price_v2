// This is an autogenerated file from Firebase Studio.
'use server';

/**
 * @fileOverview Explains the rationale behind a configuration recommendation.
 *
 * - explainRecommendation - A function that explains the configuration recommendation and the tradeoffs considered.
 * - ExplainRecommendationInput - The input type for the explainRecommendation function.
 * - ExplainRecommendationOutput - The return type for the explainRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainRecommendationInputSchema = z.object({
  recommendation: z.string().describe('The configuration recommendation to explain.'),
  context: z.string().describe('Additional context or user preferences.'),
});
export type ExplainRecommendationInput = z.infer<typeof ExplainRecommendationInputSchema>;

const ExplainRecommendationOutputSchema = z.object({
  explanation: z.string().describe('The detailed explanation of the recommendation and tradeoffs.'),
});
export type ExplainRecommendationOutput = z.infer<typeof ExplainRecommendationOutputSchema>;

export async function explainRecommendation(input: ExplainRecommendationInput): Promise<ExplainRecommendationOutput> {
  return explainRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainRecommendationPrompt',
  input: {schema: ExplainRecommendationInputSchema},
  output: {schema: ExplainRecommendationOutputSchema},
  prompt: `You are an AI assistant that explains configuration recommendations.

  Recommendation: {{{recommendation}}}
  Context: {{{context}}}

  Explain the recommendation and the tradeoffs considered in detail. Focus on the cost and performance implications.
  What are the reasons why it picked the recommendation?
  What are the key factors that influenced the recommendation?
  What are the alternative recommendations, and why were they not picked?
  What are the benefits of the recommendation?
  What are the drawbacks of the recommendation?
  What kind of user would benefit most from this recommendation?
  What kind of user would benefit least from this recommendation?
  Give a well reasoned explanation that a user can use to make an informed decision.
  `,
});

const explainRecommendationFlow = ai.defineFlow(
  {
    name: 'explainRecommendationFlow',
    inputSchema: ExplainRecommendationInputSchema,
    outputSchema: ExplainRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
