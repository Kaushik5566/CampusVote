
'use client';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from '@/components/ui/alert-dialog';
import { Button } from '../ui/button';
import { useAuth } from '../auth-provider';
import { Archive } from 'lucide-react';
  
export function ArchiveElection() {
    const { archiveCurrentElection } = useAuth();
  
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
            <Button variant="outline">
                <Archive className="mr-2 h-4 w-4" />
                Archive Current Election
            </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to archive this election?</AlertDialogTitle>
            <AlertDialogDescription>
              This will save the current vote counts to the election history and reset all votes to 0 for the next election. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={archiveCurrentElection}>
              Yes, Archive Election
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
}
