
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Mail, Phone } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="container mx-auto max-w-2xl py-12 px-4">
      <Card className="w-full shadow-2xl mt-8">
        <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>You can reach out to me directly.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <a href="mailto:your-email@example.com" className="text-primary hover:underline">
                    your-email@example.com
                </a>
            </div>
            <div className="flex items-center gap-4">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <a href="tel:+911234567890" className="text-primary hover:underline">
                    +91 12345 67890
                </a>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
