import { queryOptions, useSuspenseQuery, useQuery } from '@tanstack/react-query';
import { queryClient } from '@/config/api/queryClient';
import { sessionOptions } from '@/features/auth/hooks/useSession';
import { supabase } from '@/config/api/supabaseClient';
import { SupabaseError } from '@/errors/classes/SupabaseError';
import { APIError } from '@/errors/classes/APIError';

async function getTaxisCount(): Promise<number> {
  const session = await queryClient.ensureQueryData(sessionOptions());

  const { error, status, count } = await supabase
    .from('taxi')
    .select('*', { count: 'exact', head: true })
    .eq('auth_id', session.user.id)
    .eq('is_retired', false);

  if (error) {
    throw new SupabaseError(error, status, {
      globalTitle: 'Could not fetch taxis',
    });
  }

  if (count === null) {
    throw new APIError({
      title: 'Could not fetch taxis',
    });
  }

  return count;
}

export function taxisCountQueryOptions() {
  return queryOptions<number, SupabaseError>({
    queryKey: ['taxis', 'list', 'count'],
    queryFn: getTaxisCount,
  });
}

export function useTaxisCount() {
  const query = useSuspenseQuery(taxisCountQueryOptions());
  return query;
}

export function useNonSuspenseTaxisCount() {
  const query = useQuery(taxisCountQueryOptions());
  return query;
}
