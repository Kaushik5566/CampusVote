
'use client';

import { useAuth } from '@/components/auth-provider';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
  
export default function AdminHistoryPage() {
  const { electionHistory } = useAuth();
  
  if (electionHistory.length === 0) {
    return (
        <div className="space-y-6">
            <h1 className="text-lg font-semibold md:text-2xl">Election History</h1>
            <Card>
                <CardHeader>
                    <CardTitle>No Archived Elections</CardTitle>
                    <CardDescription>
                        There are no past elections saved in the history yet.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">When a live election is finished, you can archive it from the "Results" page. Once archived, it will appear here.</p>
                </CardContent>
            </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-lg font-semibold md:text-2xl">Election History</h1>
      <Card>
        <CardHeader>
          <CardTitle>Archived Elections</CardTitle>
          <CardDescription>
            A log of all previously concluded and archived elections.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {electionHistory.map((election) => (
                <AccordionItem value={election.id} key={election.id}>
                    <AccordionTrigger>
                        <div className="flex justify-between items-center w-full pr-4">
                            <span className="font-semibold">{election.name}</span>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span>
                                    {format(new Date(election.startDate), 'MMM d, yyyy')} - {format(new Date(election.endDate), 'MMM d, yyyy')}
                                </span>
                                <Badge variant="outline">{election.totalVotes} votes</Badge>
                            </div>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Candidate</TableHead>
                                    <TableHead>Position</TableHead>
                                    <TableHead className="text-right">Final Votes</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {election.results.sort((a,b) => b.votes - a.votes).map(candidate => (
                                    <TableRow key={candidate.id}>
                                        <TableCell>{candidate.name}</TableCell>
                                        <TableCell>{candidate.position}</TableCell>
                                        <TableCell className="text-right font-bold">{candidate.votes}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
