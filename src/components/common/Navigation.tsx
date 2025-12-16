import {
  ActivitySquare,
  Box,
  Globe2,
  Info,
  Layers,
  LayoutDashboard,
  Users,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

export default function Navigation() {
  const location = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Box, label: 'Objetos', path: '/objects' },
    { icon: Layers, label: 'Classes', path: '/classes' },
    { icon: ActivitySquare, label: 'Interações', path: '/interactions' },
    { icon: Globe2, label: 'Ambientes', path: '/environments' },
    { icon: Users, label: 'Relações', path: '/friendships' },
    { icon: Info, label: 'Sobre', path: '/about' },
  ];

  return (
    <nav className="border-b bg-card">
      <div className="container mx-auto px-4">
        <div className="flex gap-1 overflow-x-auto py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive ? 'default' : 'ghost'}
                  size="sm"
                  className={cn(
                    'whitespace-nowrap',
                    isActive &&
                      'shadow-md bg-primary text-primary-foreground hover:bg-primary/90'
                  )}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
