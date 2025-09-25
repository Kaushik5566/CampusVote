import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';

export default function HomePage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background">
      <main className="flex flex-col items-center justify-center p-8 text-center">
        <Logo className="mb-6 h-24 w-24 text-primary" />
        <h1 className="font-headline text-5xl font-bold text-primary md:text-6xl">
          CampusVote
        </h1>
        <p className="mt-4 max-w-md text-lg text-muted-foreground">
          The simple, secure, and modern way to cast your vote in college elections.
        </p>
        <div className="mt-12 flex flex-col gap-4 sm:flex-row">
          <Button asChild size="lg" className="w-48">
            <Link href="/login">Student Portal</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-48">
            <Link href="/admin/login">Admin Portal</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
