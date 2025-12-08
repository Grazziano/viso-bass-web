import { TrendingUp } from 'lucide-react';
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
                <th className="text-left py-3 px-4 font-medium">
                  Dispositivo 1
                </th>
                {/* <th className="text-left py-3 px-4 font-medium">
                  Dispositivo 2
                </th> */}
                <th className="text-left py-3 px-4 font-medium">Score</th>
                {/* <th className="text-left py-3 px-4 font-medium">Interações</th> */}
                <th className="text-left py-3 px-4 font-medium">Criado</th>
              </tr>
            </thead>
            <tbody>
              {friendships.map((friendship, index) => (
                <tr
                  key={friendship._id}
                  className="border-b hover:bg-muted/50 transition-colors"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-blue-500" />
                      <span className="font-bold">#{index + 1}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-medium">
                    {friendship.rank_object.obj_name}
                  </td>
                  {/* <td className="py-3 px-4">
                    {friendship.rank_object.obj_name}
                  </td> */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500"
                          style={{
                            width: `${friendship.rank_adjacency.length * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-sm font-medium">
                        {(friendship.rank_adjacency.length * 100).toFixed(0)}%
                      </span>
                    </div>
                  </td>
                  {/* <td className="py-3 px-4 text-muted-foreground">
                    {friendship.rank_adjacency.toLocaleString()}
                  </td> */}
                  <td className="py-3 px-4 text-muted-foreground">
                    {formatDate(friendship.createdAt)}
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
