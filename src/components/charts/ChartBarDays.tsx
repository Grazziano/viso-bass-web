import { TrendingUp } from 'lucide-react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from 'recharts';

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

export const description = 'A bar chart of interactions per day';

const chartConfig = {
  count: {
    label: 'Interações',
    theme: {
      light: 'oklch(0.6487 0.1538 150.3071)',
      dark: 'oklch(0.6487 0.1538 150.3071)',
    },
  },
} satisfies ChartConfig;

type DayData = { day: string; count: number };

interface ChartBarDaysProps {
  data: DayData[];
  title?: string;
  description?: string;
  className?: string;
  onButtonClick: () => void;
  period?: string;
}

export function ChartBarDays({
  data,
  title = 'Interações por Dia',
  description = 'Quantidade de interações registradas por dia',
  className = 'w-full h-56',
  onButtonClick,
  period = 'month',
}: ChartBarDaysProps) {
  const hasData = Array.isArray(data) && data.length > 0;

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
            Ver últim{period === 'week' ? 'o Mês' : 'a Semana'}
          </Button>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!hasData ? (
          <div className="w-full h-56 flex items-center justify-center bg-muted/50 rounded-lg">
            <p className="text-muted-foreground text-sm">
              Nenhum dado disponível
            </p>
          </div>
        ) : (
          <ChartContainer config={chartConfig} className={className}>
            <BarChart
              accessibilityLayer
              data={data}
              margin={{
                top: 20,
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="day"
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
              <YAxis tickLine={false} axisLine={false} />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent indicator="line" labelKey="day" />
                }
              />
              <Bar
                dataKey="count"
                fill="var(--color-count)"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Total registrado <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Distribuição diária de interações
        </div>
      </CardFooter>
    </Card>
  );
}
