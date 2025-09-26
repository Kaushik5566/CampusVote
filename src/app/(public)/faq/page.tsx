
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';
import Image from 'next/image';

const faqItems = [
    {
        id: "faq-1",
        question: "How do I cast my vote?",
        answer: "Once you log in to the student portal during an active election period, you will see a ballot with a list of candidates for each position. Simply select one candidate per position and click the 'Submit Vote' button at the bottom of the page."
    },
    {
        id: "faq-2",
        question: "Can I change my vote after submitting it?",
        answer: "No, once a vote is submitted, it is final and cannot be changed. Please review your selections carefully before you submit your ballot."
    },
    {
        id: "faq-3",
        question: "Is my vote anonymous?",
        answer: "Yes, your vote is completely anonymous. The system is designed to separate your identity from your vote to ensure privacy and security. While we track that you have voted, we do not link your identity to your specific choices."
    },
    {
        id: "faq-4",
        question: "When will the election results be announced?",
        answer: "The election results will be published on the 'Results' page after the voting period has officially ended and the election administrators have verified the counts. You will be able to see the live results once they are published by the admin."
    },
    {
        id: "faq-5",
        question: "Who is eligible to vote?",
        answer: "All currently registered students of the college are eligible to vote. You must register for an account on this portal using your official college email address to participate."
    }
];

export default function FAQPage() {
  return (
    <>
      <div className="relative h-64 w-full bg-gradient-to-r from-primary to-fuchsia-500">
        <Image
          src="https://images.unsplash.com/photo-1557804506-669a67965ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxxdWVzdGlvbnxlbnwwfHx8fDE3NTkyNDI1NjF8MA&ixlib=rb-4.1.0&q=80&w=1920"
          alt="People asking questions"
          fill
          className="object-cover opacity-20"
          data-ai-hint="questions help"
        />
        <div className="relative flex h-full flex-col items-center justify-center text-center text-white p-4">
          <h1 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-primary-foreground/90">
            Find answers to common questions about the CampusVote platform.
          </p>
        </div>
      </div>
      <div className="container mx-auto max-w-3xl py-12 px-4">
        <Card className="w-full shadow-2xl">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <HelpCircle className="h-8 w-8" />
            </div>
            <div>
                <CardTitle>Common Questions</CardTitle>
                <CardDescription>Everything you need to know about the voting process.</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item) => (
                    <AccordionItem value={item.id} key={item.id}>
                        <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline">
                            {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-base text-muted-foreground">
                            {item.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
