'use client';

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
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAuth } from '../auth-provider';
import type { Candidate, CandidatePosition } from '@/lib/types';
import { positions } from '@/lib/data';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Wand2, Loader2 } from 'lucide-react';
import { generateCandidateManifesto } from '@/ai/flows/generate-candidate-manifesto';

const formSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters.'),
  position: z.enum(positions, { required_error: 'Position is required.' }),
  manifesto: z.string().min(10, 'Manifesto must be at least 10 characters.'),
});

type CandidateFormProps = {
  candidate?: Candidate;
  children: React.ReactNode;
};

export function CandidateForm({ candidate, children }: CandidateFormProps) {
  const { addCandidate, updateCandidate } = useAuth();
  const [open, setOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: candidate?.name || '',
      position: candidate?.position,
      manifesto: candidate?.manifesto || '',
    },
  });

  const handleGenerateManifesto = async () => {
    setIsGenerating(true);
    const candidateDescription = `A candidate named ${form.getValues('name')} running for ${form.getValues('position')}.`;
    try {
        const result = await generateCandidateManifesto({ candidateDescription });
        if(result.manifesto){
            form.setValue('manifesto', result.manifesto);
            toast({
                title: "Manifesto Generated",
                description: "The manifesto has been populated with AI-generated content."
            });
        }
    } catch (error) {
        toast({
            title: "Generation Failed",
            description: "Could not generate manifesto at this time.",
            variant: "destructive"
        });
    }
    setIsGenerating(false);
  };


  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (candidate) {
      updateCandidate({ ...candidate, ...values });
      toast({ title: 'Candidate Updated', description: `${values.name} has been updated.`});
    } else {
      addCandidate(values);
      toast({ title: 'Candidate Added', description: `${values.name} has been added.`});
    }
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{candidate ? 'Edit Candidate' : 'Add New Candidate'}</DialogTitle>
          <DialogDescription>
            {candidate ? 'Update the details for this candidate.' : 'Fill in the details for the new candidate.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a position" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {positions.map((pos) => (
                        <SelectItem key={pos} value={pos}>
                          {pos}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="manifesto"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between items-center">
                    <FormLabel>Manifesto</FormLabel>
                    <Button type="button" variant="ghost" size="sm" onClick={handleGenerateManifesto} disabled={isGenerating}>
                        {isGenerating ? <Loader2 className="h-4 w-4 animate-spin"/> : <Wand2 className="h-4 w-4" />}
                        <span className="ml-2">Generate</span>
                    </Button>
                  </div>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the candidate's vision and goals..."
                      className="resize-none"
                      rows={5}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">{candidate ? 'Save Changes' : 'Add Candidate'}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
