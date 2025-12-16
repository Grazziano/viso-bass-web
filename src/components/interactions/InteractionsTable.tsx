import type { IObject } from '@/types/objects';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { formatNumberBR } from '@/utils/format-number.util';
import { formatDate } from '@/utils/format-date.util';
import { cn } from '@/lib/utils';

interface Interaction {
  _id: string;
  inter_feedback: boolean;
  inter_obj_i: IObject;
  inter_obj_j: IObject;
  inter_service: number;
  inter_start: string;
  inter_end: string;
  updatedAt: string;
  createdAt: string;
}

interface InteractionsTableProps {
  interactions: Interaction[];
  total: number;
}

export default function InteractionsTable({
  interactions,
  total,
}: InteractionsTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Interações Recentes ({formatNumberBR(total, 0)})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium">Origem</th>
                <th className="text-left py-3 px-4 font-medium">Destino</th>
                <th className="text-left py-3 px-4 font-medium">Feedback</th>
                <th className="text-left py-3 px-4 font-medium">Início</th>
                <th className="text-left py-3 px-4 font-medium">Fim</th>
              </tr>
            </thead>
            <tbody>
              {interactions.map((interaction) => (
                <tr
                  key={interaction._id}
                  className="border-b hover:bg-muted/50 transition-colors"
                >
                  <td className="py-3 px-4 font-medium">
                    {interaction.inter_obj_i.obj_name}
                  </td>
                  <td className="py-3 px-4">
                    {interaction.inter_obj_j.obj_name}
                  </td>
                  <td className="py-3 px-4">
                    <Badge
                      variant="outline"
                      className={cn(
                        interaction.inter_feedback
                          ? 'bg-chart-2/20 text-chart-2'
                          : 'bg-destructive/20 text-destructive'
                      )}
                    >
                      {interaction.inter_feedback ? 'Positiva' : 'Negativa'}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">
                    {formatDate(interaction.inter_start)}
                  </td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">
                    {formatDate(interaction.inter_end)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
