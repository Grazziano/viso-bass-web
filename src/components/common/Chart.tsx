import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface ChartProps {
  title: string;
  content: string;
}

export default function Chart({ title, content }: ChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 flex items-center justify-center bg-muted/50 rounded-lg">
          <p className="text-muted-foreground">{content}</p>
        </div>
      </CardContent>
    </Card>
  );
}
