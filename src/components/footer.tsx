
import Link from 'next/link';
import React from 'react';

export function Footer() {
  return (
    <footer className="py-4 px-6 text-center text-sm text-muted-foreground border-t">
        <div className="flex justify-center items-center gap-4">
            <span>© 2025 Tech Titans. All Rights Reserved</span>
            <span className="text-muted-foreground/50">|</span>
            <Link href="/contact" className="hover:text-primary transition-colors">
                Contact Us
            </Link>
        </div>
    </footer>
  );
}
