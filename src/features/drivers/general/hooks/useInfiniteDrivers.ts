import { keepPreviousData, infiniteQueryOptions, QueryKey, useSuspenseInfiniteQuery, InfiniteData } from '@tanstack/react-query';
import { Prettify } from '@/types/utils';
import { Tables } from '@/types/database';
import { queryClient } from '@/config/api/queryClient';
import { sessionOptions } from '@/features/auth/hooks/useSession';
import { supabase } from '@/config/api/supabaseClient';
import { capitalizeEachWord } from '@/utils/string/capitalizeEachWord';
import { supabaseStorageQueryOptions } from '@/lib/supabase/useSupabaseStorage';
import { SupabaseError } from '@/errors/classes/SupabaseError';
import { DriversRowFilterState } from '@/features/drivers/general/types';

const fetchSize = 50;

type DriverDataFromSupabase = {
  id: number;
  name: string | null;
  phone_number: string | null;
  email: string | null;
  picture_path: string | null;
  taxi_id: number | null;
  number_plate: string | null;
  hire_agreement_id: number | null;
  created_at: string | null;
};

export type Driver = Prettify<
  Pick<
    Tables<'driver_view'>,
    | 'phone_number' | 'email'
    | 'taxi_id' | 'number_plate'
    | 'hire_agreement_id' | 'created_at'
  > & {
    id: number;
    name: string;
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
      'id, name, phone_number, email, picture_path, taxi_id, number_plate, hire_agreement_id, created_at',
      { count: 'estimated' },
    )
    .eq('auth_id', session.user.id)
    .eq('is_retired', isRetired)
    .order('created_at', { ascending: false })
    .or(`name.ilike.%${search}%, email.ilike.%${search}%, number_plate.ilike.%${search}%`)
    .range(from, to)
    .returns<DriverDataFromSupabase[]>();

  if (status === 404) return { data: [], count: 0 };

  if (error) {
    throw new SupabaseError(error, status, {
      globalTitle: 'Could not fetch drivers',
    });
  }

  const drivers = await Promise.all(
    data.map(async ({ name, number_plate, picture_path, ...rest }) => ({
      ...rest,
      name: capitalizeEachWord(name ?? 'Unknown'),
      number_plate: number_plate?.toUpperCase() ?? null,
      picture_src: picture_path
        ? await queryClient.ensureQueryData(supabaseStorageQueryOptions(picture_path))
        : null,
    })),
  );

  return {
    data: drivers,
    count: count ?? 0,
  };
}

export function driversInfiniteQueryOptions(options?: DriversInfiniteQueryOptions) {
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

export function useInfiniteDrivers(options?: DriversInfiniteQueryOptions) {
  const query = useSuspenseInfiniteQuery(driversInfiniteQueryOptions(options));
  return query;
}
