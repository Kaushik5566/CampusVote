'use client';

import { useState } from 'react';
import { useAuth } from '../auth-provider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar } from '../ui/calendar';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export function VotingPeriodSettings() {
  const { votingStartDate, setVotingStartDate, votingEndDate, setVotingEndDate } = useAuth();
  const [startDate, setStartDate] = useState<Date | undefined>(votingStartDate);
  const [endDate, setEndDate] = useState<Date | undefined>(votingEndDate);
  const { toast } = useToast();

  const handleSave = () => {
    if (startDate && endDate) {
      if (startDate > endDate) {
        toast({
          title: 'Invalid Date Range',
          description: 'Start date must be before the end date.',
          variant: 'destructive',
        });
        return;
      }
      setVotingStartDate(startDate);
      setVotingEndDate(endDate);
      toast({
        title: 'Voting Period Updated',
        description: 'The new voting start and end dates have been saved.',
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Voting Period Settings</CardTitle>
        <CardDescription>Define the start and end dates for the election.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
            <label className="text-sm font-medium">Start Date</label>
            <Popover>
                <PopoverTrigger asChild>
                <Button
                    variant={'outline'}
                    className={cn(
                    'w-full justify-start text-left font-normal',
                    !startDate && 'text-muted-foreground'
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, 'PPP') : <span>Pick a date</span>}
                </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                />
                </PopoverContent>
            </Popover>
        </div>
         <div className="space-y-2">
            <label className="text-sm font-medium">End Date</label>
            <Popover>
                <PopoverTrigger asChild>
                <Button
                    variant={'outline'}
                    className={cn(
                    'w-full justify-start text-left font-normal',
                    !endDate && 'text-muted-foreground'
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, 'PPP') : <span>Pick a date</span>}
                </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                />
                </PopoverContent>
            </Popover>
        </div>
        <Button onClick={handleSave} className="w-full">Save Changes</Button>
      </CardContent>
    </Card>
  );
}
