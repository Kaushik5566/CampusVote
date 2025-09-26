
'use client';
import { useAuth } from '@/components/auth-provider';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import { UserSearch } from 'lucide-react';

export default function PublicCandidatesPage() {
  const { candidates } = useAuth();

  return (
    <>
    <div className="relative h-64 w-full bg-gradient-to-r from-primary to-fuchsia-500">
        <Image
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxncm91cCUyMG9mJTIwc3R1ZGVudHN8ZW58MHx8fHwxNzU5MjM4NjQ3fDA&ixlib=rb-4.1.0&q=80&w=1920"
          alt="Group of students"
          fill
          className="object-cover opacity-20"
          data-ai-hint="group students"
        />
        <div className="relative flex h-full flex-col items-center justify-center text-center text-white p-4">
          <h1 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tight">
            Meet the Candidates
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-primary-foreground/90">
            Get to know the students running in this year's election.
          </p>
        </div>
      </div>
      <div className="container mx-auto max-w-6xl py-12 px-4">
        {candidates.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {candidates.map((candidate) => (
                <Card key={candidate.id} className="overflow-hidden shadow-lg transition-shadow hover:shadow-xl">
                <div className="relative h-56 w-full">
                    <Image
                    src={candidate.imageUrl}
                    alt={`Photo of ${candidate.name}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    data-ai-hint="person portrait"
                    />
                </div>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl text-primary">
                    {candidate.name}
                    </CardTitle>
                    <CardDescription className="font-medium">{candidate.position}</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-4">
                        {candidate.manifesto}
                    </p>
                </CardContent>
                </Card>
            ))}
            </div>
        ) : (
            <Card className="w-full max-w-2xl mx-auto my-12 text-center">
                <CardHeader>
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                        <UserSearch className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <CardTitle className="mt-4 text-2xl font-bold">No Candidates Yet</CardTitle>
                    <CardDescription>Candidates for the upcoming election have not been announced. Please check back soon!</CardDescription>
                </CardHeader>
            </Card>
        )}
      </div>
    </>
  );
}
