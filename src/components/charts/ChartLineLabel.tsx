import { TrendingUp } from 'lucide-react';
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from 'recharts';

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
}

export function ChartLineLabel({
  title,
  description,
  days = 7,
  data,
  onButtonClick,
}: ChartLineLabelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="flex justify-between items-center">
          {description}
          <Button
            className="bg-blue-500 hover:bg-blue-600 hover:text-white"
            onClick={onButtonClick}
          >
            Ver últimos {days === 7 ? 30 : 7} dias
          </Button>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              top: 20,
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => String(value).slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="interactions"
              type="natural"
              stroke="var(--color-interactions)"
              strokeWidth={2}
              dot={{
                fill: 'var(--color-interactions)',
              }}
              activeDot={{
                r: 6,
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
