// import { Edit, Trash2 } from 'lucide-react';
import { Badge } from '../ui/badge';
// import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface ClassItemProps {
  id: string;
  name: string;
  objects: string[];
  class_function: string[];
}

export default function ClassCard({
  name,
  objects,
  class_function,
}: ClassItemProps) {
  return (
    <Card className="hover:shadow-glow transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">{name}</CardTitle>
          <Badge
            variant="outline"
            className="px-2 py-1 bg-primary/10 text-primary"
          >
            {objects.length} objetos
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-lg text-muted-foreground mb-4">Funções:</p>
        {class_function.map((func, index) => (
          <p key={index} className="text-sm text-muted-foreground mb-4">
            {func}
          </p>
        ))}
        {/* <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <Edit className="w-4 h-4 mr-2" />
            Editar
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="hover:bg-destructive hover:text-destructive-foreground"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div> */}
      </CardContent>
    </Card>
  );
}
