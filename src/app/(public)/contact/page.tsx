
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Mail, Phone } from 'lucide-react';
import { useState } from 'react';
import { useFirebase } from '@/firebase';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { collection, serverTimestamp } from 'firebase/firestore';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

export default function ContactPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { firestore } = useFirebase();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    if (!firestore) return;

    const messagesCollection = collection(firestore, 'contact_messages');
    addDocumentNonBlocking(messagesCollection, { ...values, timestamp: serverTimestamp() });
    
    toast({
        title: 'Message Sent!',
        description: 'Thank you for contacting us. We will get back to you shortly.',
    });
    form.reset();
    setIsLoading(false);
  }

  return (
    <div className="container mx-auto max-w-2xl py-12 px-4">
       <Card className="w-full shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-3xl">Contact Us</CardTitle>
          <CardDescription>Have a question or feedback? Drop us a line!</CardDescription>
           <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 pt-4 text-muted-foreground">
            <a href="tel:9555512182" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Phone className="h-5 w-5" />
              <span>9555512182</span>
            </a>
            <a href="mailto:kaushikmaurya8355@gmail.com" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Mail className="h-5 w-5" />
              <span>kaushikmaurya8355@gmail.com</span>
            </a>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Your message here..."
                        className="resize-none"
                        rows={6}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                 {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Send Message
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
