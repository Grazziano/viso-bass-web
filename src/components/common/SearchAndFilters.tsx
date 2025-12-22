import { Search, type LucideIcon } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

import { useState } from 'react';

interface SearchAndFiltersProps {
  placeholder?: string;
  btnText: string | LucideIcon;
  onSearch?: (query: string) => void;
}

export default function SearchAndFilters({
  placeholder = 'Buscar...',
  btnText,
  onSearch,
}: SearchAndFiltersProps) {
  const [query, setQuery] = useState('');

  const Icon = btnText;

  return (
    <Card>
      <CardContent className="">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={placeholder}
              className="pl-10"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onSearch?.(query.trim());
                }
              }}
            />
          </div>
          <Button variant="outline" onClick={() => onSearch?.(query.trim())}>
            {typeof btnText === 'string' ? (
              btnText
            ) : (
              <Icon className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
