import { useSuspenseQuery, queryOptions, useQuery } from '@tanstack/react-query';
import { startOfWeek, endOfWeek } from 'date-fns';
import { supabase } from '@/config/api/supabaseClient';
import { sessionOptions } from '@/features/auth/hooks/useSession';
import { queryClient } from '@/config/api/queryClient';
import { SupabaseError } from '@/errors/classes/SupabaseError';

type NumRentObject = {
  paid: number;
  unpaid: number;
  total: number;
};

async function getRentCount(): Promise<NumRentObject> {
  const session = await queryClient.ensureQueryData(sessionOptions());
  const start_date = new Date(startOfWeek(new Date(), { weekStartsOn: 1 })).toDateString();
  const end_date = new Date(endOfWeek(new Date(), { weekStartsOn: 1 })).toDateString();

  // TODO since supabase returns a max of 1000 rows
  // TODO this will return an incorrect answer if there are 1000+ rents,
  // TODO figure out why aggregates are not working
  const { data, error, status } = await supabase
    .from('rent')
    .select('is_paid')
    .eq('auth_id', session.user.id)
    .gte('start_date', start_date)
    .lte('end_date', end_date);

  if (error) {
    throw new SupabaseError(error, status, {
      globalTitle: 'Could not load unpaid rent amount',
    });
  }

  const rentCount = data.reduce((prev, { is_paid }) => {
    if (is_paid) {
      return { ...prev, paid: prev.paid + 1, total: prev.total + 1 };
    }
    return { ...prev, unpaid: prev.unpaid + 1, total: prev.total + 1 };
  }, { unpaid: 0, paid: 0, total: 0 });

  return rentCount;
}

export function rentCountQueryOptions() {
  return queryOptions<NumRentObject, SupabaseError>({
    queryKey: ['rents', 'list', 'count'],
    queryFn: getRentCount,
  });
}

export function useRentCount() {
  const query = useSuspenseQuery(rentCountQueryOptions());
  return query;
}

export function useNonSuspenseRentCount() {
  const query = useQuery(rentCountQueryOptions());
  return query;
}
