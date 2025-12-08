import type { IFriendship } from '@/types/friendship';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { formatDate } from '@/utils/format-date.util';

interface FriendshipCardProps {
  friendships: IFriendship[];
}

export default function FriendshipCard({ friendships }: FriendshipCardProps) {
  const maxAdjacency = Math.max(
    ...friendships.map((f) => f.rank_adjacency.length)
  );

  return (
    <Card className="bg-blue-500 text-white">
      <CardHeader>
        <CardTitle className="text-white">Relações Mais Relevantes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {friendships.slice(0, 3).map((friendship, index) => (
            <div
              key={friendship._id}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <Badge
                  variant="secondary"
                  className="bg-white/20 text-white border-white/30"
                >
                  #{index + 1}
                </Badge>
                <div className="text-2xl font-bold">
                  {(
                    (friendship.rank_adjacency.length / maxAdjacency) *
                    100
                  ).toFixed(0)}
                  %
                </div>
              </div>
              <p className="font-medium mb-1">
                {friendship.rank_object.obj_name}
              </p>
              <p className="text-sm text-white/80">
                ↔ {formatDate(friendship.createdAt)}
              </p>
              <p className="text-xs text-white/60 mt-2">
                {friendship.rank_adjacency.length} interações
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
