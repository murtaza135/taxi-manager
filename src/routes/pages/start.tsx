import { redirect } from 'react-router-dom';
import { getLocalSession } from '@/features/auth/hooks/useLocalSession';
import { QueryLoaderFunction } from '@/lib/react-router-dom/types';

const startPageLoader: QueryLoaderFunction = () => () => {
  const session = getLocalSession();
  if (session) return redirect('/home');
  return redirect('/login');
};

export const loader = startPageLoader;
