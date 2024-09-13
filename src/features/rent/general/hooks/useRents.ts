/* eslint-disable max-len */
import { keepPreviousData, infiniteQueryOptions, QueryKey, useSuspenseInfiniteQuery, InfiniteData, QueryFunctionContext } from '@tanstack/react-query';
import { Prettify, NonNullableObject } from '@/types/utils';
import { Tables } from '@/types/database';
import { queryClient } from '@/config/api/queryClient';
import { sessionOptions } from '@/features/auth/hooks/useSession';
import { supabase } from '@/config/api/supabaseClient';
import { capitalizeEachWord } from '@/utils/string/capitalizeEachWord';
import { SupabaseError } from '@/errors/classes/SupabaseError';

const fetchSize = 50;

type SupabaseRent = Prettify<
  Partial<NonNullableObject<
    Pick<
      Tables<'rent_view'>,
      | 'paid_date' | 'phc_number'
    >
  >> & NonNullableObject<
    Pick<
      Tables<'rent_view'>,
      | 'id' | 'hire_agreement_id' | 'start_date'
      | 'end_date' | 'amount' | 'is_paid' | 'created_at'
      | 'driver_id' | 'driver_name'
      | 'taxi_id' | 'number_plate'
    >
  >
>;

type Rent = Prettify<
  Omit<SupabaseRent, 'amount'> & {
    amount: string,
  }
>;

type RentResult = {
  data: Rent[];
  count: number;
};

type Variables = {
  search?: string;
  isRetired?: boolean;
  hire_agreement_id?: number;
  driver_id?: number;
  taxi_id?: number;
};

type Context = QueryFunctionContext<QueryKey, number>;

async function getRents(
  { search = '', isRetired = false, hire_agreement_id, driver_id, taxi_id }: Variables,
  { pageParam }: Context,
): Promise<RentResult> {
  const session = await queryClient.ensureQueryData(sessionOptions());

  const from = fetchSize * pageParam;
  const to = from + fetchSize - 1;

  let query = supabase
    .from('rent_view')
    .select(
      'id, hire_agreement_id, start_date, end_date, amount, is_paid, created_at, driver_id, driver_name, taxi_id, number_plate, paid_date, phc_number',
      { count: 'estimated' },
    )
    .eq('auth_id', session.user.id)
    .eq('is_retired', isRetired);

  if (hire_agreement_id) query = query.eq('hire_agreement_id', hire_agreement_id);
  if (driver_id) query = query.eq('driver_id', driver_id);
  if (taxi_id) query = query.eq('taxi_id', taxi_id);

  query = query
    .order('created_at', { ascending: false })
    .or(`number_plate.ilike.%${search}%, driver_name.ilike.%${search}%,  phc_number.ilike.%${search}%`)
    .range(from, to);

  const { data, error, status, count } = await query.returns<Rent[]>();

  if (status === 404) return { data: [], count: 0 };

  if (error) {
    throw new SupabaseError(error, status, {
      globalTitle: 'Could not fetch rents',
    });
  }

  const rents = await Promise.all(
    data.map((rent) => {
      const driver_name = capitalizeEachWord(rent.driver_name);
      const phc_number = rent.phc_number?.toUpperCase();
      const number_plate = rent.number_plate.toUpperCase();

      return {
        ...rent,
        driver_name,
        phc_number,
        number_plate,
      };
    }),
  );

  return {
    data: rents,
    count: count ?? 0,
  };
}

export function rentsQueryOptions(options?: Variables) {
  const search = options?.search;
  const isRetired = options?.isRetired;
  const hire_agreement_id = options?.hire_agreement_id;
  const driver_id = options?.driver_id;
  const taxi_id = options?.taxi_id;

  return infiniteQueryOptions<
    RentResult,
    SupabaseError,
    InfiniteData<RentResult, number>,
    QueryKey,
    number
  >({
    queryKey: ['rents', 'list', { search, isRetired, hire_agreement_id, driver_id, taxi_id }],
    queryFn: (context) => getRents({ search, isRetired, hire_agreement_id, driver_id, taxi_id }, context),
    initialPageParam: 0,
    getNextPageParam: (_lastGroup, groups) => groups.length,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });
}

export function useRents(options?: Variables) {
  const query = useSuspenseInfiniteQuery(rentsQueryOptions(options));
  return query;
}
