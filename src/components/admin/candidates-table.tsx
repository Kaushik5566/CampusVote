
'use client';

import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAuth } from '../auth-provider';
import { CandidateActions } from './candidate-actions';
import { Button } from '../ui/button';
import { CandidateForm } from './candidate-form';
import { PlusCircle } from 'lucide-react';

export function CandidatesTable() {
  const { candidates } = useAuth();

  if (candidates.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold">No Candidates Found</h3>
        <p className="text-muted-foreground mt-2 mb-4">
            Get started by adding the first candidate to the election.
        </p>
        <CandidateForm>
            <Button>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Candidate
            </Button>
        </CandidateForm>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="hidden w-[100px] sm:table-cell">
            <span className="sr-only">Image</span>
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Position</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {candidates.map((candidate) => (
          <TableRow key={candidate.id}>
            <TableCell className="hidden sm:table-cell">
              <Image
                alt={`Photo of ${candidate.name}`}
                className="aspect-square rounded-md object-cover"
                height="64"
                src={candidate.imageUrl}
                width="64"
                data-ai-hint="person portrait"
              />
            </TableCell>
            <TableCell className="font-medium">{candidate.name}</TableCell>
            <TableCell>{candidate.position}</TableCell>
            <TableCell>
              <div className="flex justify-end">
                <CandidateActions candidate={candidate} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
