
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/components/auth-provider';
import { Logo } from '@/components/logo';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { ForgotPasswordDialog } from '@/components/voter/forgot-password-dialog';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

export default function StudentLoginPage() {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setLoginError(false);
    setTimeout(() => {
      const success = login(values.email, values.password, 'student');
      if (!success) {
        setIsLoading(false);
        setLoginError(true);
      }
    }, 1000);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 bg-gradient-to-br from-background to-accent/50">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <Logo className="h-16 w-16 text-primary" />
          </div>
          <CardTitle className="font-headline text-3xl">Student Portal</CardTitle>
          <CardDescription>Sign in to cast your vote</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>College Email</FormLabel>
                    <FormControl>
                      <Input placeholder="student@college.edu" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center">
                        <FormLabel>Password</FormLabel>
                        {loginError && (
                           <ForgotPasswordDialog>
                             <button type="button" className="text-sm font-medium text-primary hover:underline">
                               Forgot Password?
                             </button>
                           </ForgotPasswordDialog>
                        )}
                    </div>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          {...field}
                          className="pr-10"
                        />
                      </FormControl>
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign In
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Don't have an account?{' '}
            <Link href="/register" className="underline text-primary">
              Register
            </Link>
          </div>
          <div className="mt-2 text-center text-sm">
            Are you an admin?{' '}
            <Link href="/admin/login" className="underline text-primary">
              Admin Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
