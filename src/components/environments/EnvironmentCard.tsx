// import { MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import type { IEnvironment } from '@/types/enrironment';

export default function EnvironmentCard(props: IEnvironment) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/environments/${props._id}`);
  };

  return (
    <Card key={props._id} className="hover:shadow-glow transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">
              {props.env_object_i.obj_name}
            </CardTitle>
            {/* <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 mr-1" />
              {location}
            </div> */}
          </div>
          <Badge
            variant={props.env_total_valid === 0 ? 'default' : 'secondary'}
            className="bg-primary text-primary-foreground"
          >
            {props.env_total_valid === 0 ? 'Operacional' : 'Manutenção'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold">{props.objects.length}</p>
            <p className="text-sm text-muted-foreground">Dispositivos</p>
          </div>
          <Button variant="outline" size="sm" onClick={handleViewDetails}>
            Ver Detalhes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
