import { redirect } from 'react-router-dom';
import { QueryLoaderFunction } from '@/lib/react-router-dom/types';
import { sessionOptions } from '@/features/auth/hooks/useSession';

const startPageLoader: QueryLoaderFunction = (queryClient) => async () => {
  try {
    await queryClient.ensureQueryData(sessionOptions());
    return redirect('/home');
  } catch {
    return redirect('/login');
  }
};

export const loader = startPageLoader;
