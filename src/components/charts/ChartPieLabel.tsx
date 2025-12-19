'use client';

import { TrendingUp } from 'lucide-react';
import { Pie, PieChart } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';

export const description = 'A pie chart with a label';

const chartConfig = {
  value: {
    label: 'Contagem',
  },
} satisfies ChartConfig;

type PiePoint = { name: string; value: number };

interface ChartPieLabelProps {
  data: PiePoint[];
  title?: string;
  description?: string;
  className?: string;
  colors?: Record<string, string>;
}
export function ChartPieLabel({
  data,
  title,
  description,
  className,
  colors,
}: ChartPieLabelProps) {
  const defaultColors = [
    'var(--chart-1)',
    'var(--chart-2)',
    'var(--chart-3)',
    'var(--chart-4)',
    'var(--chart-5)',
  ];
  const pieData = data.map((d, i) => ({
    ...d,
    fill: (colors && colors[d.name]) || defaultColors[i % defaultColors.length],
  }));
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title ?? 'Gráfico de Pizza'}</CardTitle>
        <CardDescription>{description ?? 'Distribuição'}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className={className}>
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent hideLabel nameKey="name" />}
            />
            <Pie data={pieData} dataKey="value" label nameKey="name" />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
