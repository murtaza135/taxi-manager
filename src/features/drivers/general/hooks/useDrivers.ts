import { keepPreviousData, infiniteQueryOptions, QueryKey, useSuspenseInfiniteQuery, InfiniteData, QueryFunctionContext, useInfiniteQuery } from '@tanstack/react-query';
import { Prettify, NonNullableObject } from '@/types/utils';
import { Tables } from '@/types/database';
import { queryClient } from '@/config/api/queryClient';
import { sessionOptions } from '@/features/auth/hooks/useSession';
import { supabase } from '@/config/api/supabaseClient';
import { capitalizeEachWord } from '@/utils/string/capitalizeEachWord';
import { SupabaseError } from '@/errors/classes/SupabaseError';
import { driverPictureQueryOptions } from '@/features/drivers/general/hooks/useDriverDetails';
import { sleep } from '@/utils/sleep';

const fetchSize = 50;

// TODO cleanup types merge SupabaseDriver and Driver types together
type SupabaseDriver = Prettify<
  Partial<NonNullableObject<
    Pick<
      Tables<'driver_view'>,
      | 'phone_number' | 'email' | 'picture_path'
      | 'taxi_id' | 'number_plate'
      | 'hire_agreement_id' | 'created_at'
    >
  >> & {
    name: string;
    is_retired: boolean;
  }
>;

export type Driver = Prettify<
  SupabaseDriver & {
    id: number;
    picture_src: string | null;
  }
>;

type DriversResult = {
  data: Driver[];
  count: number;
};

type Variables = {
  search?: string;
  isRetired?: boolean;
};

type Context = QueryFunctionContext<QueryKey, number>;

async function getDrivers(
  { search = '', isRetired = false }: Variables,
  { pageParam }: Context,
): Promise<DriversResult> {
  console.log(search);
  // await sleep(5000);
  const session = await queryClient.ensureQueryData(sessionOptions());

  const from = fetchSize * pageParam;
  const to = from + fetchSize - 1;

  const { data, error, status, count } = await supabase
    .from('driver_view')
    .select(
      'id, name, phone_number, email, picture_path, taxi_id, number_plate, is_retired, hire_agreement_id, created_at',
      { count: 'estimated' },
    )
    .eq('auth_id', session.user.id)
    .eq('is_retired', isRetired)
    .order('created_at', { ascending: false })
    .or(`name.ilike.%${search}%, email.ilike.%${search}%, number_plate.ilike.%${search}%`)
    .range(from, to)
    .returns<Driver[]>();

  if (status === 404) return { data: [], count: 0 };

  if (error) {
    throw new SupabaseError(error, status, {
      globalTitle: 'Could not fetch drivers',
    });
  }

  const drivers = await Promise.all(
    data.map(async (driver) => {
      const name = capitalizeEachWord(driver.name);
      const number_plate = driver.number_plate?.toUpperCase();
      const picture_src = await queryClient.ensureQueryData(
        driverPictureQueryOptions({ id: driver.id, path: driver.picture_path }),
      );
      return { ...driver, name, number_plate, picture_src };
    }),
  );

  return {
    data: drivers,
    count: count ?? 0,
  };
}

export function driversQueryOptions(options?: Variables) {
  const search = options?.search;
  const isRetired = options?.isRetired;

  return infiniteQueryOptions<
    DriversResult,
    SupabaseError,
    InfiniteData<DriversResult, number>,
    QueryKey,
    number
  >({
    queryKey: ['drivers', 'list', { search, isRetired }],
    queryFn: (context) => getDrivers({ search, isRetired }, context),
    initialPageParam: 0,
    getNextPageParam: (_lastGroup, groups) => groups.length,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });
}

export function useDrivers(options?: Variables) {
  const query = useSuspenseInfiniteQuery(driversQueryOptions(options));
  return query;
}

export function useNonSuspenseDrivers(options?: Variables) {
  const query = useInfiniteQuery(driversQueryOptions(options));
  return query;
}
