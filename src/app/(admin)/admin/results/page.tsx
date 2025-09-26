'use client';

import { useAuth } from '@/components/auth-provider';
import { ResultsAnalysis } from '@/components/admin/results-analysis';
import { ResultsChart } from '@/components/results/results-chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { VotingPeriodSettings } from '@/components/admin/voting-period-settings';

export default function AdminResultsPage() {
  const { candidates } = useAuth();
  const sortedCandidates = [...candidates].sort((a, b) => b.votes - a.votes);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="lg:col-span-4 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Live Vote Count</CardTitle>
                    <CardDescription>Current vote tallies for all candidates.</CardDescription>
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
                                <TableRow key={candidate.id}>
                                    <TableCell>{candidate.name}</TableCell>
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
