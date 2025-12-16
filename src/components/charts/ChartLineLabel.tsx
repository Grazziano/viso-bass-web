import { TrendingUp } from 'lucide-react';
import {
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from 'recharts';

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
import { Button } from '../ui/button';

export const description = 'A line chart with a label';

const chartConfig = {
  interactions: {
    label: 'Interações',
    // color: 'var(--chart-1)',
    color: '#2B7FFF',
  },
} satisfies ChartConfig;

type TimeSeriesPoint = { date: string; interactions: number };

interface ChartLineLabelProps {
  title: string;
  description: string;
  days?: number;
  data: TimeSeriesPoint[];
  onButtonClick: () => void;
  width?: string | number;
  height?: string | number;
  className?: string;
}

export function ChartLineLabel({
  title,
  description,
  days = 7,
  data,
  onButtonClick,
  className,
}: ChartLineLabelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="flex justify-between items-center">
          {description}
          <Button
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={onButtonClick}
          >
            Ver últimos {days === 7 ? 30 : 7} dias
          </Button>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className={className}>
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              top: 20,
              left: 12,
              right: 12,
            }}
          >
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                <stop
                  offset="0%"
                  stopColor="var(--color-interactions)"
                  stopOpacity={0.9}
                />
                <stop
                  offset="100%"
                  stopColor="var(--color-interactions)"
                  stopOpacity={0.4}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => {
                const d = new Date(String(value));
                return isNaN(d.getTime())
                  ? String(value).slice(0, 3)
                  : d.toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                    });
              }}
            />
            <YAxis tickLine={false} axisLine={false} width={30} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" labelKey="date" />}
            />
            <Line
              dataKey="interactions"
              type="monotone"
              stroke="url(#lineGradient)"
              strokeWidth={2.5}
              connectNulls
              dot={{
                r: 3,
                fill: 'var(--color-interactions)',
              }}
              activeDot={{
                r: 6,
                stroke: 'var(--color-interactions)',
                strokeWidth: 2,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Mostrando interações dos últimos {days} dias
        </div>
      </CardFooter>
    </Card>
  );
}
