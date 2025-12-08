import { TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface Friendship {
  id: number | string;
  device1: string;
  device2: string;
  score: number;
  rank: number;
  interactions: number;
}

interface FriendshipsTableProps {
  friendships: Friendship[];
}

export default function FriendshipsTable({
  friendships,
}: FriendshipsTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Todas as Relações ({friendships.length})</CardTitle>
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
                <th className="text-left py-3 px-4 font-medium">
                  Dispositivo 2
                </th>
                <th className="text-left py-3 px-4 font-medium">Score</th>
                <th className="text-left py-3 px-4 font-medium">Interações</th>
              </tr>
            </thead>
            <tbody>
              {friendships.map((friendship) => (
                <tr
                  key={friendship.id}
                  className="border-b hover:bg-muted/50 transition-colors"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-blue-500" />
                      <span className="font-bold">#{friendship.rank}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-medium">
                    {friendship.device1}
                  </td>
                  <td className="py-3 px-4">{friendship.device2}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500"
                          style={{ width: `${friendship.score * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">
                        {(friendship.score * 100).toFixed(0)}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">
                    {friendship.interactions.toLocaleString()}
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
