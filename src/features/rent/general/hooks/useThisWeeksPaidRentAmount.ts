import { useSuspenseQuery, queryOptions, useQuery } from '@tanstack/react-query';
import { startOfWeek, endOfWeek } from 'date-fns';
import { supabase } from '@/config/api/supabaseClient';
import { sessionOptions } from '@/features/auth/hooks/useSession';
import { queryClient } from '@/config/api/queryClient';
import { SupabaseError } from '@/errors/classes/SupabaseError';

async function getThisWeeksPaidRentAmount(): Promise<number> {
  const session = await queryClient.ensureQueryData(sessionOptions());
  const start_date = startOfWeek(new Date(), { weekStartsOn: 1 });
  const end_date = endOfWeek(new Date(), { weekStartsOn: 1 });

  // TODO since supabase returns a max of 1000 rows
  // TODO this will return an incorrect answer if there are 1000+ paid rents,
  // TODO figure out why aggregates are not working
  const { data, error, status } = await supabase
    .from('rent')
    .select('amount')
    .eq('auth_id', session.user.id)
    .eq('is_paid', true)
    .eq('start_date', start_date)
    .eq('end_date', end_date);

  if (error) {
    throw new SupabaseError(error, status, {
      globalTitle: 'Could not load unpaid rent amount',
    });
  }

  const paidAmount = data.reduce((acc, { amount }) => acc + amount, 0);
  return paidAmount;
}

export function thisWeeksPaidRentAmountQueryOptions() {
  return queryOptions<number, SupabaseError>({
    queryKey: ['rents', 'list', 'currentWeek', 'paid'],
    queryFn: getThisWeeksPaidRentAmount,
  });
}

export function useThisWeeksPaidRentAmount() {
  const query = useSuspenseQuery(thisWeeksPaidRentAmountQueryOptions());
  return query;
}

export function useNonSuspenseThisWeeksPaidRentAmount() {
  const query = useQuery(thisWeeksPaidRentAmountQueryOptions());
  return query;
}
