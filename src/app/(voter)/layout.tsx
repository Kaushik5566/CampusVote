
'use client';

import { useEffect, useState } from 'react';
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
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && (!user || user.type !== 'student')) {
      router.push('/login');
    }
  }, [user, router, isClient]);

  if (!isClient || !user || user.type !== 'student') {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950">
      <VoterHeader />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
