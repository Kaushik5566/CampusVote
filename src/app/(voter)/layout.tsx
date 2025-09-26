
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth-provider';
import { Footer } from '@/components/footer';
import { VoterHeader } from '@/components/voter/voter-header';

export default function VoterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user || user.type !== 'student') {
      router.push('/login');
    }
  }, [user, router]);

  if (!user || user.type !== 'student') {
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <p>Redirecting to login...</p>
        </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950">
      <VoterHeader />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
