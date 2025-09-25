import { VotingForm } from '@/components/voter/voting-form';

export default function DashboardPage() {
  return (
    <div className="container mx-auto max-w-5xl py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tight text-primary">
          Student Election Ballot
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
          Select one candidate for each position and submit your vote.
        </p>
      </div>
      <VotingForm />
    </div>
  );
}
