import { keepPreviousData, infiniteQueryOptions, QueryKey, useSuspenseInfiniteQuery, InfiniteData, QueryFunctionContext } from '@tanstack/react-query';
import { Prettify, NonNullableObject } from '@/types/utils';
import { Tables } from '@/types/database';
import { queryClient } from '@/config/api/queryClient';
import { sessionOptions } from '@/features/auth/hooks/useSession';
import { supabase } from '@/config/api/supabaseClient';
import { capitalizeEachWord } from '@/utils/string/capitalizeEachWord';
import { SupabaseError } from '@/errors/classes/SupabaseError';

const fetchSize = 50;

export type Hire = Prettify<
  Partial<NonNullableObject<
    Pick<
      Tables<'hire_agreement_view'>,
      'end_date' | 'taxi_licence_phc_number'
      | 'taxi_licence_compliance_certificate_licence_number'
      | 'driver_picture_path' | 'taxi_picture_path'
    >
  >> & NonNullableObject<
    Pick<
      Tables<'hire_agreement_view'>,
      | 'id' | 'taxi_id' | 'taxi_number_plate'
      | 'driver_id' | 'driver_name' | 'start_date'
      | 'rent_amount' | 'deposit_amount' | 'is_retired'
      | 'taxi_chassis_number' | 'created_at'
    >
  >
>;

type HireResult = {
  data: Hire[];
  count: number;
};

type Variables = {
  search?: string;
  isRetired?: boolean;
  driver_id?: number;
  taxi_id?: number;
};

type Context = QueryFunctionContext<QueryKey, number>;

async function getHires(
  { search = '', isRetired = false, driver_id, taxi_id }: Variables,
  { pageParam }: Context,
): Promise<HireResult> {
  const session = await queryClient.ensureQueryData(sessionOptions());

  const from = fetchSize * pageParam;
  const to = from + fetchSize - 1;

  let query = supabase
    .from('hire_agreement_view')
    .select(
      'id, taxi_id, taxi_number_plate, driver_id, driver_name, start_date, rent_amount, deposit_amount, is_retired, taxi_chassis_number, created_at, end_date, taxi_licence_phc_number, taxi_licence_compliance_certificate_licence_number, driver_picture_path, taxi_picture_path',
      { count: 'estimated' },
    )
    .eq('auth_id', session.user.id)
    .eq('is_retired', isRetired);

  if (driver_id) query = query.eq('driver_id', driver_id);
  if (taxi_id) query = query.eq('taxi_id', taxi_id);

  query = query
    .order('created_at', { ascending: false })
    .or(`taxi_number_plate.ilike.%${search}%, driver_name.ilike.%${search}%,  taxi_chassis_number.ilike.%${search}%, taxi_licence_phc_number.ilike.%${search}%, taxi_licence_compliance_certificate_licence_number.ilike.%${search}%`)
    .range(from, to);

  const { data, error, status, count } = await query.returns<Hire[]>();

  if (status === 404) return { data: [], count: 0 };

  if (error) {
    throw new SupabaseError(error, status, {
      globalTitle: 'Could not fetch hires',
    });
  }

  const hires = await Promise.all(
    data.map((hire) => {
      const driver_name = capitalizeEachWord(hire.driver_name);
      const taxi_chassis_number = hire.taxi_chassis_number.toUpperCase();
      const taxi_licence_phc_number = hire.taxi_licence_phc_number?.toUpperCase();
      const taxi_number_plate = hire.taxi_number_plate.toUpperCase();

      return {
        ...hire,
        driver_name,
        taxi_chassis_number,
        taxi_licence_phc_number,
        taxi_number_plate,
      };
    }),
  );

  return {
    data: hires,
    count: count ?? 0,
  };
}

export function hiresQueryOptions(options?: Variables) {
  const search = options?.search;
  const isRetired = options?.isRetired;
  const driver_id = options?.driver_id;
  const taxi_id = options?.taxi_id;

  return infiniteQueryOptions<
    HireResult,
    SupabaseError,
    InfiniteData<HireResult, number>,
    QueryKey,
    number
  >({
    queryKey: ['hires', 'list', { search, isRetired, driver_id, taxi_id }],
    queryFn: (context) => getHires({ search, isRetired, driver_id, taxi_id }, context),
    initialPageParam: 0,
    getNextPageParam: (_lastGroup, groups) => groups.length,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });
}

export function useHires(options?: Variables) {
  const query = useSuspenseInfiniteQuery(hiresQueryOptions(options));
  return query;
}
