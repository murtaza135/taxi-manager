import { QueryClient } from '@tanstack/react-query';
import { redirect } from 'react-router-dom';
import { getLocalSession } from '@/features/auth/hooks/useLocalSession';

const startPageLoader = (_queryClient: QueryClient) => () => {
  const session = getLocalSession();
  if (session) return redirect('/home');
  return redirect('/login');
};

export const loader = startPageLoader;
