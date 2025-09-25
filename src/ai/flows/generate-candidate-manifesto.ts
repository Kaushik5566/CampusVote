// src/ai/flows/generate-candidate-manifesto.ts
'use server';

/**
 * @fileOverview Generates a candidate manifesto based on a candidate description.
 *
 * - generateCandidateManifesto - A function that generates the candidate manifesto.
 * - GenerateCandidateManifestoInput - The input type for the generateCandidateManifesto function.
 * - GenerateCandidateManifestoOutput - The return type for the generateCandidateManifesto function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCandidateManifestoInputSchema = z.object({
  candidateDescription: z
    .string()
    .describe('A detailed description of the candidate, including their background, experience, and key policy positions.'),
});
export type GenerateCandidateManifestoInput = z.infer<
  typeof GenerateCandidateManifestoInputSchema
>;

const GenerateCandidateManifestoOutputSchema = z.object({
  manifesto: z
    .string()
    .describe('The generated candidate manifesto based on the provided description.'),
});
export type GenerateCandidateManifestoOutput = z.infer<
  typeof GenerateCandidateManifestoOutputSchema
>;

export async function generateCandidateManifesto(
  input: GenerateCandidateManifestoInput
): Promise<GenerateCandidateManifestoOutput> {
  return generateCandidateManifestoFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCandidateManifestoPrompt',
  input: {schema: GenerateCandidateManifestoInputSchema},
  output: {schema: GenerateCandidateManifestoOutputSchema},
  prompt: `You are a professional speech writer helping a candidate generate their manifesto. The manifesto should be inspiring and clearly articulate the candidate's vision and policy positions.  It should be no more than 200 words.

Candidate Description: {{{candidateDescription}}}`,
});

const generateCandidateManifestoFlow = ai.defineFlow(
  {
    name: 'generateCandidateManifestoFlow',
    inputSchema: GenerateCandidateManifestoInputSchema,
    outputSchema: GenerateCandidateManifestoOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
