import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';

export default function HomePage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMHdhbGtpbmclMjBvbiUyMGNhbXB1c3xlbnwwfHx8fDE3NTg3ODA0NTV8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Students walking on campus"
          fill
          className="object-cover"
          data-ai-hint="college campus"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      <main className="z-10 flex flex-col items-center justify-center p-8 text-center text-white">
        <div className="mb-6 rounded-full bg-primary/20 p-4 shadow-lg">
          <Logo className="h-24 w-24 text-primary" />
        </div>
        <h1 className="font-headline text-5xl font-bold md:text-6xl drop-shadow-lg">
          CampusVote
        </h1>
        <p className="mt-4 max-w-lg text-lg text-slate-100 drop-shadow-md">
          The simple, secure, and modern way to cast your vote in college elections.
        </p>
        <div className="mt-12 flex flex-col gap-4 sm:flex-row">
          <Button asChild size="lg" className="w-48 shadow-lg">
            <Link href="/login">Student Portal</Link>
          </Button>
          <Button asChild variant="secondary" size="lg" className="w-48 shadow-lg">
            <Link href="/admin/login">Admin Portal</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
