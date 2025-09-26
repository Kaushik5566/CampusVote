
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
                <a href="mailto:kaushikmaurya8355@gmail.com" className="text-primary hover:underline">
                    kaushikmaurya8355@gmail.com
                </a>
            </div>
            <div className="flex items-center gap-4">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <a href="tel:9555512182" className="text-primary hover:underline">
                    9555512182
                </a>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
