import { useSuspenseQuery, queryOptions, useQuery } from '@tanstack/react-query';
import { supabase } from '@/config/api/supabaseClient';
import { sessionOptions } from '@/features/auth/hooks/useSession';
import { queryClient } from '@/config/api/queryClient';
import { SupabaseError } from '@/errors/classes/SupabaseError';

async function getAllUnpaidRentAmount(): Promise<number> {
  const session = await queryClient.ensureQueryData(sessionOptions());

  // TODO since supabase returns a max of 1000 rows
  // TODO this will return an incorrect answer if there are 1000+ unpaid rents,
  // TODO figure out why aggregates are not working
  const { data, error, status } = await supabase
    .from('rent')
    .select('amount')
    .eq('auth_id', session.user.id)
    .eq('is_paid', false);

  if (error) {
    throw new SupabaseError(error, status, {
      globalTitle: 'Could not load unpaid rent amount',
    });
  }

  const unpaidAmount = data.reduce((acc, { amount }) => acc + amount, 0);
  return unpaidAmount;
}

export function allUnpaidRentAmountQueryOptions() {
  return queryOptions<number, SupabaseError>({
    queryKey: ['rents', 'list', 'unpaid'],
    queryFn: getAllUnpaidRentAmount,
  });
}

export function useAllUnpaidRentAmount() {
  const query = useSuspenseQuery(allUnpaidRentAmountQueryOptions());
  return query;
}

export function useNonSuspenseAllUnpaidRentAmount() {
  const query = useQuery(allUnpaidRentAmountQueryOptions());
  return query;
}
