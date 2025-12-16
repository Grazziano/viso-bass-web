import { Loader2, TrendingUp, type LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface CardStatusProps {
  icon: LucideIcon;
  label: string;
  value: string;
  change: string;
  color: string;
  loading?: boolean;
}

export default function CardStatus({
  change,
  color,
  icon,
  label,
  value,
  loading,
}: CardStatusProps) {
  const Icon = icon;
  return (
    <Card key={label} className="hover:shadow-glow transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {label}
        </CardTitle>
        <Icon className={`w-4 h-4 ${color}`} />
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            <div className="h-7 w-24 bg-muted rounded animate-pulse" />
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Loader2 className="w-3 h-3 animate-spin" />
              <span>Carregando...</span>
            </div>
          </div>
        ) : (
          <>
            <div className="text-2xl font-bold">{value}</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <TrendingUp className="w-3 h-3 mr-1 text-chart-2" />
              <span className="text-chart-2">{change}</span>
              <span className="ml-1">vs mês anterior</span>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
