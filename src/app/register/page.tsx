
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/components/auth-provider';
import { Logo } from '@/components/logo';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { courses, years } from '@/lib/data';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  dob_day: z.coerce.number().min(1, 'Day is required').max(31, 'Invalid day'),
  dob_month: z.coerce.number().min(1, 'Month is required').max(12, 'Invalid month'),
  dob_year: z.coerce.number().min(1900, 'Invalid year').max(new Date().getFullYear(), 'Invalid year'),
  collegeName: z.string().min(2, { message: 'College name must be at least 2 characters.' }),
  course: z.string({ required_error: 'Please select a course.' }),
  year: z.string().optional(),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
}).refine(data => {
    try {
        const date = new Date(data.dob_year, data.dob_month - 1, data.dob_day);
        return date.getFullYear() === data.dob_year && date.getMonth() === data.dob_month - 1 && date.getDate() === data.dob_day;
    } catch {
        return false;
    }
}, {
    message: 'Invalid date. Please check day, month, and year.',
    path: ['dob_day'], 
});

const coursesRequiringYear = ['BSC-IT', 'BSC-DS', 'BBI', 'BAF', 'BCOM', 'BMS'];

export default function StudentRegisterPage() {
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      collegeName: '',
      email: '',
      password: '',
    },
  });

  const watchedCourse = form.watch('course');
  const showYearField = coursesRequiringYear.includes(watchedCourse);

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const dob = new Date(values.dob_year, values.dob_month - 1, values.dob_day);

    const success = register({
        id: values.email, 
        name: values.name, 
        dob: dob,
        collegeName: values.collegeName,
        course: values.course,
        year: values.year as 'FY' | 'SY' | 'TY' | undefined,
    }, 'student');
    if (!success) {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 bg-gradient-to-br from-background to-accent/50">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <Logo className="h-16 w-16 text-primary" />
          </div>
          <CardTitle className="font-headline text-3xl">Student Registration</CardTitle>
          <CardDescription>Create your account to vote</CardDescription>
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
               <FormItem>
                    <FormLabel>Date of birth</FormLabel>
                    <div className="grid grid-cols-3 gap-3">
                         <FormField
                            control={form.control}
                            name="dob_day"
                            render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                <Input placeholder="Day" type="number" {...field} />
                                </FormControl>
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="dob_month"
                            render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                <Input placeholder="Month" type="number" {...field} />
                                </FormControl>
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="dob_year"
                            render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                <Input placeholder="Year" type="number" {...field} />
                                </FormControl>
                            </FormItem>
                            )}
                        />
                    </div>
                    <FormMessage>{form.formState.errors.dob_day?.message}</FormMessage>
                </FormItem>
              <FormField
                control={form.control}
                name="collegeName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>College Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your College University" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                  control={form.control}
                  name="course"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select course" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {courses.map((course) => (
                            <SelectItem key={course} value={course}>
                              {course}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {showYearField && (
                    <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Year</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select year" />
                            </Trigger>
                            </FormControl>
                            <SelectContent>
                            {years.map((year) => (
                                <SelectItem key={year} value={year}>
                                {year}
                                </SelectItem>
                            ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                )}
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
                    <FormLabel>Password</FormLabel>
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
                Register
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link href="/login" className="underline text-primary">
              Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
