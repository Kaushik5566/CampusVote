import Image from 'next/image';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { RadioGroupItem } from '@/components/ui/radio-group';
import type { Candidate } from '@/lib/types';

interface CandidateCardProps {
  candidate: Candidate;
}

export function CandidateCard({ candidate }: CandidateCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1 has-[:checked]:ring-2 has-[:checked]:ring-primary has-[:checked]:shadow-2xl">
      <CardHeader className="flex flex-row items-center gap-4 p-4">
        <RadioGroupItem value={candidate.id} id={candidate.id} className="h-6 w-6" />
        <div className="relative h-20 w-20 flex-shrink-0">
          <Image
            src={candidate.imageUrl}
            alt={`Photo of ${candidate.name}`}
            fill
            className="rounded-full object-cover"
            sizes="80px"
            data-ai-hint="person portrait"
          />
        </div>
        <div className="flex-grow">
          <h3 className="font-headline text-xl font-semibold text-primary">
            {candidate.name}
          </h3>
          <p className="text-sm text-muted-foreground">{candidate.position}</p>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <Accordion type="single" collapsible>
          <AccordionItem value="manifesto">
            <AccordionTrigger className="text-sm">View Manifesto</AccordionTrigger>
            <AccordionContent className="text-sm text-foreground/80">
              {candidate.manifesto}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
