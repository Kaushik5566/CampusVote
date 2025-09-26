
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from './logo';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Menu } from 'lucide-react';
import { useState } from 'react';

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/candidates', label: 'Candidates' },
    { href: '/faq', label: 'FAQ' },
    { href: '/contact', label: 'Contact' },
];

export function PublicHeader() {
  const pathname = usePathname();
  const [isSheetOpen, setSheetOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center gap-2 font-bold">
          <Logo className="h-6 w-6 text-primary" />
          <span className="hidden sm:inline-block">CampusVote</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'transition-colors hover:text-foreground/80',
                pathname === link.href ? 'text-foreground' : 'text-foreground/60'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end gap-2">
           <Button asChild className="hidden sm:flex">
                <Link href="/login">Student Login</Link>
           </Button>
            <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="md:hidden">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle Navigation</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <div className="flex flex-col gap-6 pt-10">
                        <Link href="/" className="flex items-center gap-2 font-bold text-lg" onClick={() => setSheetOpen(false)}>
                            <Logo className="h-7 w-7 text-primary" />
                            <span>CampusVote</span>
                        </Link>
                        <nav className="grid gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setSheetOpen(false)}
                                    className={cn(
                                        'flex items-center py-2 text-lg font-medium transition-colors hover:text-foreground/80',
                                        pathname === link.href ? 'text-foreground' : 'text-foreground/60'
                                    )}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                         <Button asChild>
                            <Link href="/login" onClick={() => setSheetOpen(false)}>Student Login</Link>
                        </Button>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
      </div>
    </header>
  );
}
