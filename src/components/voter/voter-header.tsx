
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '../logo';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { LogOut, Menu, User, Vote } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../auth-provider';

const navLinks = [
    { href: '/dashboard', label: 'Vote', icon: Vote },
    { href: '/results', label: 'Results', icon: 'BarChart2' },
    { href: '/profile', label: 'My Profile', icon: User },
];

export function VoterHeader() {
  const pathname = usePathname();
  const [isSheetOpen, setSheetOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/dashboard" className="mr-6 flex items-center gap-2 font-bold">
          <Logo className="h-6 w-6 text-primary" />
          <span className="hidden sm:inline-block">CampusVote</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link
              href="/dashboard"
              className={cn(
                'transition-colors hover:text-foreground/80',
                pathname === '/dashboard' ? 'text-foreground' : 'text-foreground/60'
              )}
            >
              Vote
            </Link>
             <Link
              href="/results"
              className={cn(
                'transition-colors hover:text-foreground/80',
                pathname === '/results' ? 'text-foreground' : 'text-foreground/60'
              )}
            >
              Results
            </Link>
        </nav>
        <div className="flex flex-1 items-center justify-end gap-2">
            <div className="hidden sm:flex items-center gap-4">
                <Button variant="ghost" asChild>
                    <Link href="/profile">
                        <User className="mr-2 h-4 w-4" />
                        My Profile
                    </Link>
                </Button>
                <Button variant="outline" onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                </Button>
            </div>
            <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="md:hidden">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle Navigation</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <div className="flex flex-col gap-6 pt-10">
                        <Link href="/dashboard" className="flex items-center gap-2 font-bold text-lg" onClick={() => setSheetOpen(false)}>
                            <Logo className="h-7 w-7 text-primary" />
                            <span>CampusVote</span>
                        </Link>
                        <nav className="grid gap-4">
                            <Link href="/dashboard" onClick={() => setSheetOpen(false)} className={cn('flex items-center py-2 text-lg font-medium transition-colors hover:text-foreground/80', pathname === '/dashboard' ? 'text-foreground' : 'text-foreground/60')}>Vote</Link>
                            <Link href="/results" onClick={() => setSheetOpen(false)} className={cn('flex items-center py-2 text-lg font-medium transition-colors hover:text-foreground/80', pathname === '/results' ? 'text-foreground' : 'text-foreground/60')}>Results</Link>
                            <Link href="/profile" onClick={() => setSheetOpen(false)} className={cn('flex items-center py-2 text-lg font-medium transition-colors hover:text-foreground/80', pathname === '/profile' ? 'text-foreground' : 'text-foreground/60')}>My Profile</Link>
                        </nav>
                         <Button onClick={() => { logout(); setSheetOpen(false); }} variant="outline" className="w-full">
                            <LogOut className="mr-2 h-4 w-4" />
                            Logout
                         </Button>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
      </div>
    </header>
  );
}
