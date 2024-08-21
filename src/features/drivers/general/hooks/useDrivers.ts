import { keepPreviousData, infiniteQueryOptions, QueryKey, useSuspenseInfiniteQuery, InfiniteData } from '@tanstack/react-query';
import { Prettify, NonNullableObject } from '@/types/utils';
import { Tables } from '@/types/database';
import { queryClient } from '@/config/api/queryClient';
import { sessionOptions } from '@/features/auth/hooks/useSession';
import { supabase } from '@/config/api/supabaseClient';
import { capitalizeEachWord } from '@/utils/string/capitalizeEachWord';
// import { supabaseStorageQueryOptions } from '@/lib/supabase/useSupabaseStorage';
import { SupabaseError } from '@/errors/classes/SupabaseError';
import { DriversRowFilterState } from '@/features/drivers/general/types';
import { driverPictureQueryOptions } from '@/features/drivers/general/hooks/useDriverPicture';

const fetchSize = 50;

export type Driver = Prettify<
  Partial<NonNullableObject<
    Pick<
      Tables<'driver_view'>,
      | 'phone_number' | 'email' | 'picture_path'
      | 'taxi_id' | 'number_plate'
      | 'hire_agreement_id' | 'created_at'
    >
  >> & {
    id: number;
    name: string;
    is_retired: boolean;
    picture_src: string | null;
  }
>;

export type DriversResult = {
  data: Driver[];
  count: number;
};

type DriversInfiniteQueryOptions = {
  search: string;
  rowFilter: DriversRowFilterState;
};

type DriversQueryFnOptions = DriversInfiniteQueryOptions & {
  pageParam: number;
};

// TODO create 2 arguments: options and context (QueryFunctionContext)
async function getDrivers({
  search = '',
  rowFilter = 'notRetired',
  pageParam = 0,
}: DriversQueryFnOptions): Promise<DriversResult> {
  const session = await queryClient.ensureQueryData(sessionOptions());

  const from = fetchSize * pageParam;
  const to = from + fetchSize - 1;
  const isRetired = rowFilter !== 'notRetired';

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
      const name = capitalizeEachWord(driver.name ?? 'Unknown');
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

export function driversQueryOptions(options?: DriversInfiniteQueryOptions) {
  const { search, rowFilter } = options ?? { search: '', rowFilter: 'notRetired' };

  return infiniteQueryOptions<
    DriversResult, SupabaseError, InfiniteData<DriversResult, number>, QueryKey, number
  >({
    queryKey: ['drivers', 'list', rowFilter, { search }],
    queryFn: ({ pageParam }) => getDrivers({ search, rowFilter, pageParam }),
    staleTime: 1000 * 60, // 60 seconds,
    initialPageParam: 0,
    getNextPageParam: (_lastGroup, groups) => groups.length,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });
}

export function useDrivers(options?: DriversInfiniteQueryOptions) {
  const query = useSuspenseInfiniteQuery(driversQueryOptions(options));
  return query;
}
