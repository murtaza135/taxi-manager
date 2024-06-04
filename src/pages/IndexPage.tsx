import { Navigate } from 'react-router-dom';
import { useLocalSession } from '@/features/auth/hooks/useLocalSession';

export function IndexPage() {
  const session = useLocalSession();

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return <Navigate to="/home" replace />;
}
