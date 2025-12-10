import { TrendingUp } from 'lucide-react';
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { cn } from '@/lib/utils';

export const description = 'A radar chart with dots';

const chartConfig = {
  count: {
    label: 'Objetos',
    // color: 'var(--chart-2)',
    color: '#2B7FFF',
  },
} satisfies ChartConfig;

type RadarPoint = { name: string; count: number };

interface ChartRadarDotsProps {
  data: RadarPoint[];
  className?: string;
}

export function ChartRadarDots({ data, className }: ChartRadarDotsProps) {
  return (
    <Card>
      <CardHeader className="items-center">
        <CardTitle>Distribuição por Classe</CardTitle>
        <CardDescription>Quantidade de objetos por classe</CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className={cn('mx-auto aspect-square', className)}
        >
          <RadarChart data={data}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="name" />
            <PolarGrid />
            <Radar
              dataKey="count"
              fill="var(--color-count)"
              fillOpacity={0.6}
              dot={{
                r: 4,
                fillOpacity: 1,
              }}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground flex items-center gap-2 leading-none">
          Distribuição atual por classe
        </div>
      </CardFooter>
    </Card>
  );
}
