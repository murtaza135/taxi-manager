import { useSuspenseQuery, queryOptions, useQuery } from '@tanstack/react-query';
import { startOfWeek, endOfWeek } from 'date-fns';
import { supabase } from '@/config/api/supabaseClient';
import { sessionOptions } from '@/features/auth/hooks/useSession';
import { queryClient } from '@/config/api/queryClient';
import { SupabaseError } from '@/errors/classes/SupabaseError';

// TODO combine with useThisWeeksPaidRentAmount.tsx
// TODO since only difference is the line `.eq('is_paid', false/true)`

async function getThisWeeksUnpaidRentAmount(): Promise<number> {
  const session = await queryClient.ensureQueryData(sessionOptions());
  const start_date = new Date(startOfWeek(new Date(), { weekStartsOn: 1 })).toDateString();
  const end_date = new Date(endOfWeek(new Date(), { weekStartsOn: 1 })).toDateString();

  // TODO since supabase returns a max of 1000 rows
  // TODO this will return an incorrect answer if there are 1000+ unpaid rents,
  // TODO figure out why aggregates are not working
  const { data, error, status } = await supabase
    .from('rent')
    .select('amount')
    .eq('auth_id', session.user.id)
    .eq('is_paid', false)
    .gte('start_date', start_date)
    .lte('end_date', end_date);

  if (error) {
    throw new SupabaseError(error, status, {
      globalTitle: 'Could not load unpaid rent amount',
    });
  }

  const unpaidAmount = data.reduce((acc, { amount }) => acc + amount, 0);
  return unpaidAmount;
}

export function thisWeeksUnpaidRentAmountQueryOptions() {
  return queryOptions<number, SupabaseError>({
    queryKey: ['rents', 'list', 'currentWeek', 'unpaid'],
    queryFn: getThisWeeksUnpaidRentAmount,
  });
}

export function useThisWeeksUnpaidRentAmount() {
  const query = useSuspenseQuery(thisWeeksUnpaidRentAmountQueryOptions());
  return query;
}

export function useNonSuspenseThisWeeksUnpaidRentAmount() {
  const query = useQuery(thisWeeksUnpaidRentAmountQueryOptions());
  return query;
}
