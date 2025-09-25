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

export function CandidatesTable() {
  const { candidates } = useAuth();
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
