import { MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

interface EnvironmentCardProps {
  id: number | string;
  name: string;
  location: string;
  devices: number;
  status: string;
}

export default function EnvironmentCard({
  id,
  name,
  location,
  devices,
  status,
}: EnvironmentCardProps) {
  return (
    <Card key={id} className="hover:shadow-glow transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">{name}</CardTitle>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 mr-1" />
              {location}
            </div>
          </div>
          <Badge
            variant={status === 'Operacional' ? 'default' : 'secondary'}
            className="bg-blue-500 text-white"
          >
            {status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold">{devices}</p>
            <p className="text-sm text-muted-foreground">Dispositivos</p>
          </div>
          <Button variant="outline" size="sm">
            Ver Detalhes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
