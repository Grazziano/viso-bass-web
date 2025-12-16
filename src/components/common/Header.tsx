import { LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { useAuth } from '@/context/useAuth';
import { ModeToggle } from './mode-toggle';
import Logo from './Logo';

export default function Header() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success('Logout realizado com sucesso!');
    navigate('/login');
  };

  return (
    <header className="border-b bg-card sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center gap-3">
          <Logo size="md" />
          <div>
            <h1 className="text-xl font-bold">VISO-BASS</h1>
            <p className="text-xs text-muted-foreground">Social IoT Data</p>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <Button variant="ghost" onClick={handleLogout} size="sm">
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </div>
    </header>
  );
}
