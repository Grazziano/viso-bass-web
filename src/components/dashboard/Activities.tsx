import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface Activity {
  type: string;
  action: string;
  name: string;
  time: string;
}

interface ActivityProps {
  activities: Activity[];
}

export default function Activities({ activities }: ActivityProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Atividades Recentes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-3 border-b last:border-0"
            >
              <div>
                <p className="font-medium">
                  <span className="text-blue-500">{activity.type}</span>{' '}
                  {activity.action}: {activity.name}
                </p>
                <p className="text-sm text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
