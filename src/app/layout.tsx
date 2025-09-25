import type { Metadata } from 'next';
import { Poppins, Open_Sans } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/components/auth-provider';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

const fontHeadline = Poppins({ 
  subsets: ['latin'], 
  weight: ['600', '700', '800'],
  variable: '--font-headline' 
});

const fontBody = Open_Sans({ 
  subsets: ['latin'], 
  variable: '--font-body' 
});


export const metadata: Metadata = {
  title: 'CampusVote',
  description: 'A modern, secure, and user-friendly e-voting system for colleges.',
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('font-body antialiased', fontHeadline.variable, fontBody.variable)}>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
