
import { Footer } from '@/components/footer';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-background to-accent/50">
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
