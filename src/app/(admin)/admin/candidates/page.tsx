import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PlusCircle } from 'lucide-react';
import { CandidateForm } from '@/components/admin/candidate-form';
import { CandidatesTable } from '@/components/admin/candidates-table';

export default function AdminCandidatesPage() {
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Candidates</h1>
        <div className="ml-auto flex items-center gap-2">
          <CandidateForm>
            <Button size="sm" className="h-8 gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Candidate
              </span>
            </Button>
          </CandidateForm>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Manage Candidates</CardTitle>
          <CardDescription>
            Add, edit, or delete candidates for the election.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CandidatesTable />
        </CardContent>
      </Card>
    </>
  );
}
