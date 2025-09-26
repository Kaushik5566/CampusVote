
import { Footer } from '@/components/footer';
import { PublicHeader } from '@/components/public-header';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950">
      <PublicHeader />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
