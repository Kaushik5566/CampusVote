
'use client';

import { useAuth } from '@/components/auth-provider';
import { ResultsChart } from '@/components/results/results-chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Lock, Trophy } from 'lucide-react';
import { positions } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { WinnersDisplay } from '@/components/results/winners-display';
import type { Candidate } from '@/lib/types';


export default function ResultsPage() {
  const { candidates, resultsPublished } = useAuth();
  
  if (!resultsPublished) {
    return (
      <div className="container mx-auto max-w-5xl py-12 px-4">
        <Card className="w-full max-w-2xl mx-auto my-12 text-center">
            <CardHeader>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                    <Lock className="h-10 w-10 text-muted-foreground" />
                </div>
                <CardTitle className="mt-4 text-2xl font-bold">Results Not Yet Published</CardTitle>
                <CardDescription>The election results are being finalized. Please check back later.</CardDescription>
            </CardHeader>
        </Card>
      </div>
    );
  }
  
  const sortedCandidates = [...candidates].sort((a, b) => b.votes - a.votes);

  const winners = positions.reduce((acc, position) => {
    const positionCandidates = candidates.filter(c => c.position === position);
    if (positionCandidates.length > 0) {
      const winner = positionCandidates.reduce((prev, current) => (prev.votes > current.votes) ? prev : current);
      if(winner.votes > 0) {
        acc[position] = winner;
      }
    }
    return acc;
  }, {} as Record<string, Candidate>);


  return (
    <div className="container mx-auto max-w-5xl py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tight text-primary">
          Election Results
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
          Official vote counts and winners for all positions.
        </p>
      </div>
      <div className="space-y-8">
        <Card>
            <CardHeader>
                <CardTitle>Election Winners</CardTitle>
                <CardDescription>The candidate with the most votes for each position.</CardDescription>
            </CardHeader>
            <CardContent>
                <WinnersDisplay winners={Object.values(winners)} />
            </CardContent>
        </Card>
        <ResultsChart data={sortedCandidates} />
        <Card>
          <CardHeader>
            <CardTitle>Detailed Vote Counts</CardTitle>
            <CardDescription>A full list of candidates and their received votes.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Rank</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead className="text-right">Votes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedCandidates.map((candidate, index) => (
                  <TableRow key={candidate.id} className={winners[candidate.position]?.id === candidate.id ? 'bg-green-50 dark:bg-green-900/30' : ''}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell className="font-medium flex items-center gap-2">
                      {candidate.name}
                      {winners[candidate.position]?.id === candidate.id && (
                          <Badge variant="default" className="bg-yellow-500 hover:bg-yellow-600 text-white">
                              <Trophy className="h-3 w-3 mr-1" />
                              Winner
                          </Badge>
                      )}
                    </TableCell>
                    <TableCell>{candidate.position}</TableCell>
                    <TableCell className="text-right font-bold">{candidate.votes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
