
'use client';

import { useAuth } from '@/components/auth-provider';
import { ResultsAnalysis } from '@/components/admin/results-analysis';
import { ResultsChart } from '@/components/results/results-chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { VotingPeriodSettings } from '@/components/admin/voting-period-settings';
import { ArchiveElection } from '@/components/admin/archive-election';
import { Badge } from '@/components/ui/badge';
import { Trophy, UserSearch } from 'lucide-react';
import { WinnersDisplay } from '@/components/results/winners-display';

export default function AdminResultsPage() {
  const { candidates, positions } = useAuth();

  if (candidates.length === 0) {
    return (
        <div className="lg:col-span-7">
            <Card className="w-full text-center">
                <CardHeader>
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                        <UserSearch className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <CardTitle className="mt-4 text-2xl font-bold">No Candidates Found</CardTitle>
                    <CardDescription>Results cannot be displayed because there are no candidates in the election.</CardDescription>
                </CardHeader>
            </Card>
        </div>
    );
  }

  const sortedCandidates = [...candidates].sort((a, b) => {
    if (a.position < b.position) return -1;
    if (a.position > b.position) return 1;
    return b.votes - a.votes;
  });

  const winners = positions.reduce((acc, position) => {
    const positionCandidates = candidates.filter(c => c.position === position);
    if (positionCandidates.length > 0) {
      const winner = positionCandidates.reduce((prev, current) => (prev.votes > current.votes) ? prev : current);
      if(winner.votes > 0) {
        acc[position] = winner;
      }
    }
    return acc;
  }, {} as Record<string, any>);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="lg:col-span-7 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Winners</CardTitle>
                    <CardDescription>The candidate with the most votes for each position.</CardDescription>
                </CardHeader>
                <CardContent>
                    <WinnersDisplay winners={Object.values(winners)} />
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-4 space-y-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Live Vote Count</CardTitle>
                        <CardDescription>Current vote tallies for all candidates.</CardDescription>
                    </div>
                    <ArchiveElection />
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Position</TableHead>
                                <TableHead className="text-right">Votes</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sortedCandidates.map((candidate) => (
                                <TableRow key={candidate.id} className={winners[candidate.position]?.id === candidate.id ? 'bg-green-50 dark:bg-green-900/30' : ''}>
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
            <div className="block lg:hidden space-y-6">
              <VotingPeriodSettings />
              <ResultsAnalysis />
            </div>
            <ResultsChart data={sortedCandidates}/>
        </div>
        <div className="lg:col-span-3 hidden lg:block space-y-6">
            <VotingPeriodSettings />
            <ResultsAnalysis />
        </div>
    </div>
  );
}
