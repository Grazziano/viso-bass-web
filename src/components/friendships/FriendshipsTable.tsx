import { TrendingUp, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import type { IFriendship } from '@/types/friendship';
import { formatDate } from '@/utils/format-date.util';

interface FriendshipsTableProps {
  friendships: IFriendship[];
  total: number;
}

export default function FriendshipsTable({
  friendships,
  total,
}: FriendshipsTableProps) {
  const uniqueCounts = friendships.map((f) => new Set(f.rank_adjacency).size);
  const maxAdjacency = uniqueCounts.length > 0 ? Math.max(...uniqueCounts) : 1;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Todas as Relações ({total})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium">Rank</th>
                <th className="text-left py-3 px-4 font-medium">Dispositivo</th>
                <th className="text-left py-3 px-4 font-medium">
                  <div className="flex items-center gap-2">
                    <span>Relevância (Únicas)</span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          aria-label="Definição de relevância (únicas)"
                          className="inline-flex"
                        >
                          <Info className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="top" align="center">
                        Percentual baseado em conexões únicas: (conexões únicas
                        / máximo de conexões únicas) × 100.
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </th>
                <th className="text-left py-3 px-4 font-medium">
                  <div className="flex items-center gap-2">
                    <span>Conexões únicas</span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          aria-label="Conexões únicas (definição)"
                          className="inline-flex"
                        >
                          <Info className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="top" align="center">
                        Quantidade de conexões únicas (IDs distintos em
                        rank_adjacency).
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </th>
                <th className="text-left py-3 px-4 font-medium">Criado</th>
              </tr>
            </thead>
            <tbody>
              {friendships.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="py-8 px-4 text-center text-muted-foreground"
                  >
                    Nenhuma relação encontrada
                  </td>
                </tr>
              ) : (
                friendships.map((friendship, index) => {
                  const uniqueCount = new Set(friendship.rank_adjacency).size;
                  const percentage = (uniqueCount / maxAdjacency) * 100;
                  return (
                    <tr
                      key={friendship._id}
                      className="border-b hover:bg-muted/50 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-primary" />
                          <span className="font-bold">#{index + 1}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-medium">
                        {friendship.rank_object.obj_name}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary transition-all"
                              style={{
                                width: `${percentage}%`,
                              }}
                            />
                          </div>
                          <span className="text-sm font-medium">
                            {percentage.toFixed(1)}%
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <span>{uniqueCount}</span>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                type="button"
                                aria-label="Conexões únicas"
                                className="inline-flex"
                              >
                                <Info className="w-4 h-4" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent side="top" align="center">
                              Conexões únicas: número de IDs distintos
                              relacionados.
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">
                        {formatDate(friendship.createdAt)}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
