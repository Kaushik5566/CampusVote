
'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuth } from '../auth-provider';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import type { User } from '@/lib/types';

type Step = 'email' | 'question' | 'reset';

const emailSchema = z.object({
  email: z.string().email('Please enter a valid email.'),
});

const answerSchema = z.object({
    answer: z.string().min(1, 'Security answer is required.'),
});

const passwordSchema = z.object({
    newPassword: z.string().min(6, 'Password must be at least 6 characters.'),
    confirmPassword: z.string(),
}).refine(data => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ['confirmPassword'],
});


export function ForgotPasswordDialog({ children }: { children: React.ReactNode }) {
  const { findStudentByEmail, verifySecurityAnswer, resetStudentPassword } = useAuth();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>('email');
  const [isLoading, setIsLoading] = useState(false);
  const [student, setStudent] = useState<User | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const emailForm = useForm<z.infer<typeof emailSchema>>({ resolver: zodResolver(emailSchema), defaultValues: { email: '' } });
  const answerForm = useForm<z.infer<typeof answerSchema>>({ resolver: zodResolver(answerSchema), defaultValues: { answer: '' } });
  const passwordForm = useForm<z.infer<typeof passwordSchema>>({ resolver: zodResolver(passwordSchema), defaultValues: { newPassword: '', confirmPassword: '' } });

  const handleEmailSubmit = (values: z.infer<typeof emailSchema>) => {
    const foundStudent = findStudentByEmail(values.email);
    if (foundStudent) {
        setStudent(foundStudent);
        setStep('question');
    } else {
        toast({
            title: 'Error',
            description: 'No student found with that email address.',
            variant: 'destructive',
        });
    }
  };

  const handleAnswerSubmit = (values: z.infer<typeof answerSchema>) => {
    if (!student) return;
    const isCorrect = verifySecurityAnswer(student.id, values.answer);
    if (isCorrect) {
      setStep('reset');
    } else {
      toast({
        title: 'Incorrect Answer',
        description: 'The security answer did not match.',
        variant: 'destructive',
      });
    }
  };

  const handlePasswordSubmit = (values: z.infer<typeof passwordSchema>) => {
    if (!student) return;
    const success = resetStudentPassword(student.id, values.newPassword);
    if (success) {
      toast({
        title: 'Password Reset Successful',
        description: 'You can now log in with your new password.',
      });
      setOpen(false);
      // Reset state on close
      setTimeout(() => {
        setStep('email');
        setStudent(null);
        emailForm.reset();
        answerForm.reset();
        passwordForm.reset();
      }, 500);
    } else {
        toast({
            title: 'Error',
            description: 'Could not reset password. Please try again.',
            variant: 'destructive',
        });
    }
  };

  const getStepContent = () => {
    switch (step) {
      case 'email':
        return (
          <>
            <DialogHeader>
              <DialogTitle>Forgot Password</DialogTitle>
              <DialogDescription>Enter your email address to find your account.</DialogDescription>
            </DialogHeader>
            <Form {...emailForm}>
              <form onSubmit={emailForm.handleSubmit(handleEmailSubmit)} className="space-y-4 py-4">
                <FormField
                  control={emailForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="student@college.edu" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Find Account
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </>
        );
      case 'question':
        return (
          <>
            <DialogHeader>
              <DialogTitle>Security Question</DialogTitle>
              <DialogDescription>Answer your security question to verify your identity.</DialogDescription>
            </DialogHeader>
            <Form {...answerForm}>
              <form onSubmit={answerForm.handleSubmit(handleAnswerSubmit)} className="space-y-4 py-4">
                <p className="text-sm font-medium">{student?.securityQuestion}</p>
                <FormField
                  control={answerForm.control}
                  name="answer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Answer</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your answer" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Verify Answer
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </>
        );
      case 'reset':
        return (
          <>
            <DialogHeader>
              <DialogTitle>Reset Password</DialogTitle>
              <DialogDescription>Enter a new password for your account.</DialogDescription>
            </DialogHeader>
            <Form {...passwordForm}>
              <form onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)} className="space-y-4 py-4">
                <FormField
                  control={passwordForm.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            {...field}
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
                <FormField
                  control={passwordForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm New Password</FormLabel>
                      <FormControl>
                        <Input type={showPassword ? 'text' : 'password'} placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Set New Password
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {getStepContent()}
      </DialogContent>
    </Dialog>
  );
}
