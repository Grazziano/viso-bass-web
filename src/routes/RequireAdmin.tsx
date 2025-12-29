import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/useAuth';
import RequireAuth from './RequireAuth';

interface Props {
  children: React.ReactElement;
}

export default function RequireAdmin({ children }: Props) {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return <RequireAuth>{children}</RequireAuth>;
}
