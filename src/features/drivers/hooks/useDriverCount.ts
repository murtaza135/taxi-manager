import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { supabase } from '@/config/api/supabaseClient';
import { sessionOptions } from '@/features/auth/hooks/useSession';
import { queryClient } from '@/config/api/queryClient';
import { buildAppErrorFromSupabaseError } from '@/errors/supabaseErrorUtils';
import { AppError } from '@/errors/AppError';

async function getDriverCount() {
  const session = await queryClient.ensureQueryData(sessionOptions());

  const { count, error, status } = await supabase
    .from('driver_view')
    .select('*', { count: 'exact', head: true })
    .eq('auth_id', session.user.id);

  if (error) {
    throw buildAppErrorFromSupabaseError(error, status)
      .setTitle('Could not fetch drivers')
      .setDescription('Something went wrong')
      .setDescription('offline', 'You are offline! Please reconnect to continue using the app.')
      .setDescription('tooManyRequests', 'Something went wrong. Please try again later.')
      .build();
  }

  return count ?? 0;
}

export function driverCountQueryOptions() {
  return queryOptions<number, AppError>({
    queryKey: ['drivers', 'list', 'count'],
    queryFn: getDriverCount,
    staleTime: 1000 * 60, // 60 seconds
  });
}

export function useDriverCount() {
  const query = useSuspenseQuery(driverCountQueryOptions());
  return query;
}
