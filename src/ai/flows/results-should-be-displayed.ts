'use server';

/**
 * @fileOverview Determines whether voting results should be displayed based on a prompt.
 *
 * - shouldDisplayResults - Determines if voting results should be displayed.
 * - ResultsDisplayInput - The input type for the shouldDisplayResults function.
 * - ResultsDisplayOutput - The return type for the shouldDisplayResults function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ResultsDisplayInputSchema = z.object({
  context: z
    .string()
    .describe(
      'The context of the voting event, including any relevant news or circumstances.'
    ),
});
export type ResultsDisplayInput = z.infer<typeof ResultsDisplayInputSchema>;

const ResultsDisplayOutputSchema = z.object({
  shouldDisplay: z
    .boolean()
    .describe(
      'A boolean value indicating whether the voting results should be displayed.'
    ),
  reason: z
    .string()
    .describe(
      'The reasoning behind the decision to display or not display the results.'
    ),
});
export type ResultsDisplayOutput = z.infer<typeof ResultsDisplayOutputSchema>;

export async function shouldDisplayResults(
  input: ResultsDisplayInput
): Promise<ResultsDisplayOutput> {
  return shouldDisplayResultsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'resultsDisplayPrompt',
  input: {schema: ResultsDisplayInputSchema},
  output: {schema: ResultsDisplayOutputSchema},
  prompt: `Given the following context of a voting event, determine whether the results should be displayed to the public.\n\nContext: {{{context}}}\n\nConsider factors such as potential controversy, fairness, and the overall stability of the situation.\n\nProvide a boolean value for 'shouldDisplay' and a clear explanation for your decision in 'reason'.`,
});

const shouldDisplayResultsFlow = ai.defineFlow(
  {
    name: 'shouldDisplayResultsFlow',
    inputSchema: ResultsDisplayInputSchema,
    outputSchema: ResultsDisplayOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
