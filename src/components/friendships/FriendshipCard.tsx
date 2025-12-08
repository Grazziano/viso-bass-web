import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface Friendship {
  id: number | string;
  device1: string;
  device2: string;
  score: number;
  rank: number;
  interactions: number;
}

interface FriendshipCardProps {
  friendships: Friendship[];
}

export default function FriendshipCard({ friendships }: FriendshipCardProps) {
  return (
    <Card className="bg-blue-500 text-white">
      <CardHeader>
        <CardTitle className="text-white">Relações Mais Relevantes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {friendships.slice(0, 3).map((friendship, index) => (
            <div
              key={friendship.id}
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
                  {(friendship.score * 100).toFixed(0)}%
                </div>
              </div>
              <p className="font-medium mb-1">{friendship.device1}</p>
              <p className="text-sm text-white/80">↔ {friendship.device2}</p>
              <p className="text-xs text-white/60 mt-2">
                {friendship.interactions} interações
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
