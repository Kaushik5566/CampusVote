'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import type { Candidate } from '@/lib/types';

interface ResultsChartProps {
  data: Candidate[];
}

export function ResultsChart({ data }: ResultsChartProps) {
  const chartConfig = {
    votes: {
      label: 'Votes',
    },
    ...data.reduce((acc, candidate) => {
        acc[candidate.name] = {
            label: candidate.name,
            color: `hsl(var(--chart-${(parseInt(candidate.id, 10) % 5) + 1}))`,
        }
        return acc;
    }, {} as any)
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vote Distribution</CardTitle>
        <CardDescription>A visual breakdown of votes per candidate.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ left: 10, right: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" />
              <YAxis
                dataKey="name"
                type="category"
                tickLine={false}
                axisLine={false}
                width={120}
                tick={{ fill: 'hsl(var(--foreground))' }}
              />
              <ChartTooltip
                cursor={{ fill: 'hsl(var(--accent) / 0.1)' }}
                content={<ChartTooltipContent />}
              />
              <Bar dataKey="votes" radius={5} fill="var(--color-votes)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
