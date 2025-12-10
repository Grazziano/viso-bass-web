import { Search } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

import { useEffect, useState, useRef } from 'react';

interface SearchAndFiltersProps {
  placeholder?: string;
  btnText: string;
  onSearch?: (query: string) => void;
}

export default function SearchAndFilters({
  placeholder = 'Buscar...',
  btnText,
  onSearch,
}: SearchAndFiltersProps) {
  const [query, setQuery] = useState('');
  const debounceRef = useRef<number | null>(null);

  useEffect(() => {
    // debounce 600ms to prevent throttling
    if (debounceRef.current) {
      window.clearTimeout(debounceRef.current);
    }

    debounceRef.current = window.setTimeout(() => {
      onSearch?.(query.trim());
    }, 600);

    return () => {
      if (debounceRef.current) {
        window.clearTimeout(debounceRef.current);
      }
    };
  }, [query, onSearch]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
      onSearch?.(query.trim());
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={placeholder}
              className="pl-10"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <Button variant="outline" onClick={() => onSearch?.(query.trim())}>
            {btnText}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
