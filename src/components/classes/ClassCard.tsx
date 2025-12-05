import { Edit, Trash2 } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface ClassItemProps {
  id: string;
  name: string;
  objects: number;
  description: string;
}

export default function ClassCard({
  id,
  name,
  objects,
  description,
}: ClassItemProps) {
  return (
    <Card key={id} className="hover:shadow-glow transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">{name}</CardTitle>
          <Badge
            variant="outline"
            className="px-2 py-1 bg-blue-100 text-blue-800"
          >
            {objects} objetos
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 hover:bg-blue-500 hover:text-white transition-colors"
          >
            <Edit className="w-4 h-4 mr-2" />
            Editar
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="hover:bg-red-500 hover:text-white"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
