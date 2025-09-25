'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '../auth-provider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { useToast } from '@/hooks/use-toast';
import { shouldDisplayResults } from '@/ai/flows/results-should-be-displayed';
import type { ResultsDisplayOutput } from '@/ai/flows/results-should-be-displayed';
import { Loader2, Lightbulb, ShieldAlert, Check, X } from 'lucide-react';
import { Badge } from '../ui/badge';

export function ResultsAnalysis() {
  const { resultsPublished, setResultsPublished } = useAuth();
  const [context, setContext] = useState('');
  const [analysis, setAnalysis] = useState<ResultsDisplayOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAnalysis = async () => {
    if (!context.trim()) {
      toast({
        title: 'Context Required',
        description: 'Please provide some context about the election circumstances.',
        variant: 'destructive',
      });
      return;
    }
    setIsLoading(true);
    setAnalysis(null);
    try {
      const result = await shouldDisplayResults({ context });
      setAnalysis(result);
    } catch (error) {
      toast({
        title: 'Analysis Failed',
        description: 'Could not perform analysis at this time.',
        variant: 'destructive',
      });
    }
    setIsLoading(false);
  };

  const togglePublish = () => {
    setResultsPublished(!resultsPublished);
    toast({
        title: `Results ${!resultsPublished ? 'Published' : 'Unpublished'}`,
        description: `Voters can ${!resultsPublished ? 'now' : 'no longer'} see the results.`,
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Publish Results</CardTitle>
        <CardDescription>
          Use AI to analyze the current situation and get a recommendation on publishing the results.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label htmlFor="context" className="mb-2 block text-sm font-medium">
            Election Context
          </label>
          <Textarea
            id="context"
            placeholder="e.g., The election was smooth with high turnout. No major issues reported."
            value={context}
            onChange={(e) => setContext(e.target.value)}
            rows={3}
          />
        </div>
        <Button onClick={handleAnalysis} disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Analyze with AI
        </Button>
        {analysis && (
            <Card className="bg-muted/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        {analysis.shouldDisplay ? <Lightbulb className="text-yellow-500" /> : <ShieldAlert className="text-red-500" />}
                        AI Recommendation
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                        <span className="font-semibold">Publish Results?</span>
                        <Badge variant={analysis.shouldDisplay ? "default" : "destructive"} className="bg-green-600 dark:bg-green-700 text-white dark:text-white">
                            {analysis.shouldDisplay ? <Check className="mr-2 h-4 w-4" /> : <X className="mr-2 h-4 w-4" />}
                            {analysis.shouldDisplay ? "Recommended" : "Not Recommended"}
                        </Badge>
                    </div>
                    <div>
                        <p className="font-semibold mb-1">Reasoning:</p>
                        <p className="text-sm text-muted-foreground">{analysis.reason}</p>
                    </div>
                </CardContent>
            </Card>
        )}
        <div className="border-t pt-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="font-semibold">Current Status</h3>
                    <p className="text-sm text-muted-foreground">
                        Results are currently {resultsPublished ? 'published' : 'not published'}.
                    </p>
                </div>
                 <Button onClick={togglePublish} variant={resultsPublished ? "destructive" : "default"}>
                    {resultsPublished ? 'Un-publish Results' : 'Publish Results'}
                </Button>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
