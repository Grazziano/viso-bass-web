import { Search } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

interface SearchAndFiltersProps {
  placeholder?: string;
  btnText: string;
}

export default function SearchAndFilters({
  placeholder = 'Buscar...',
  btnText,
}: SearchAndFiltersProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder={placeholder} className="pl-10" />
          </div>
          <Button variant="outline">{btnText}</Button>
        </div>
      </CardContent>
    </Card>
  );
}
