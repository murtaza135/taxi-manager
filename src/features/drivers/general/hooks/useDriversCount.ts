import { queryOptions, useSuspenseQuery, useQuery } from '@tanstack/react-query';
import { queryClient } from '@/config/api/queryClient';
import { sessionOptions } from '@/features/auth/hooks/useSession';
import { supabase } from '@/config/api/supabaseClient';
import { SupabaseError } from '@/errors/classes/SupabaseError';
import { APIError } from '@/errors/classes/APIError';

async function getDriversCount(): Promise<number> {
  const session = await queryClient.ensureQueryData(sessionOptions());

  const { error, status, count } = await supabase
    .from('driver')
    .select('*', { count: 'exact', head: true })
    .eq('auth_id', session.user.id)
    .eq('is_retired', false);

  if (error) {
    throw new SupabaseError(error, status, {
      globalTitle: 'Could not fetch drivers',
    });
  }

  if (count === null) {
    throw new APIError({
      title: 'Could not fetch drivers',
    });
  }

  return count;
}

export function driversCountQueryOptions() {
  return queryOptions<number, SupabaseError>({
    queryKey: ['drivers', 'list', 'count'],
    queryFn: getDriversCount,
  });
}

export function useDriversCount() {
  const query = useSuspenseQuery(driversCountQueryOptions());
  return query;
}

export function useNonSuspenseDriversCount() {
  const query = useQuery(driversCountQueryOptions());
  return query;
}
