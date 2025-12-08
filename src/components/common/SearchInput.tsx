import { Search } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';

interface SearchInputProps {
  placeholder?: string;
}

export default function SearchInput({
  placeholder = 'Search',
}: SearchInputProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder={placeholder} className="pl-10" />
        </div>
      </CardContent>
    </Card>
  );
}
