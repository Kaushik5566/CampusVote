'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { RadioGroup } from '@/components/ui/radio-group';
import { useAuth } from '@/components/auth-provider';
import { CandidateCard } from './candidate-card';
import { positions } from '@/lib/data';
import type { Candidate } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export function VotingForm() {
  const { candidates, submitVote, user } = useAuth();

  const schemaObject = positions.reduce((acc, position) => {
    acc[position] = z.string({ required_error: `You must select a candidate for ${position}.` });
    return acc;
  }, {} as Record<string, z.ZodString>);
  
  const formSchema = z.object(schemaObject);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    submitVote(data);
  };
  
  if (user?.type === 'student' && user.hasVoted) {
    return (
      <Card className="w-full max-w-2xl mx-auto my-12 text-center">
        <CardHeader>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="mt-4 text-2xl font-bold">You have already voted!</CardTitle>
            <CardDescription>Thank you for your participation in this election.</CardDescription>
        </CardHeader>
        <CardContent>
            <Button asChild>
                <Link href="/results">View Live Results</Link>
            </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
        {positions.map((position) => {
          const positionCandidates = candidates.filter(c => c.position === position);
          return (
            <div key={position}>
              <h2 className="font-headline text-3xl font-bold mb-6 border-b-2 border-primary pb-2">
                {position}
              </h2>
              <FormField
                control={form.control}
                name={position}
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                      {positionCandidates.map((candidate: Candidate) => (
                        <FormItem key={candidate.id} className="flex items-center space-x-3 space-y-0">
                          <label htmlFor={candidate.id} className="w-full cursor-pointer">
                            <CandidateCard candidate={candidate} />
                          </label>
                        </FormItem>
                      ))}
                    </RadioGroup>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          );
        })}
        <div className="flex justify-center pt-8">
          <Button type="submit" size="lg" className="w-full max-w-xs text-lg">
            Submit Vote
          </Button>
        </div>
      </form>
    </Form>
  );
}
