/* eslint-disable @typescript-eslint/naming-convention */
import { keepPreviousData, infiniteQueryOptions, QueryKey, useSuspenseInfiniteQuery, InfiniteData } from '@tanstack/react-query';
import { Prettify } from '@/types/utils';
import { Tables } from '@/types/database';
import { queryClient } from '@/config/api/queryClient';
import { sessionOptions } from '@/features/auth/hooks/useSession';
import { supabase } from '@/config/api/supabaseClient';
import { buildAppErrorFromSupabaseError } from '@/errors/supabaseErrorUtils';
import { AppError } from '@/errors/AppError';
import { capitalizeEachWord } from '@/utils/string/capitalizeEachWord';
import { driverPictureQueryOptions } from '@/features/drivers/hooks/useDriverPicture';

const fetchSize = 50;

export type Driver = Prettify<
  Pick<
    Tables<'driver_view'>,
    | 'id' | 'phone_number' | 'email'
    | 'taxi_id' | 'number_plate'
    | 'hire_agreement_id' | 'created_at'
  > & {
    name: string;
    picture_src: string | null;
  }
>;

type DriversQueryFnOptions = {
  search: string;
  pageParam: number;
};

async function getDrivers(
  { search = '', pageParam = 0 }: DriversQueryFnOptions,
): Promise<Driver[]> {
  const session = await queryClient.ensureQueryData(sessionOptions());

  const from = fetchSize * pageParam;
  const to = from + fetchSize - 1;

  const { data, error, status } = await supabase
    .from('driver_view')
    .select('id, name, phone_number, email, picture_path, taxi_id, number_plate, hire_agreement_id, created_at')
    .eq('auth_id', session.user.id)
    .order('created_at', { ascending: false })
    .or(`name.ilike.%${search}%, email.ilike.%${search}%, number_plate.ilike.%${search}%`)
    .range(from, to);

  if (status === 404) return [];

  if (error) {
    throw buildAppErrorFromSupabaseError(error, status)
      .setTitle('Could not fetch drivers')
      .setDescription('Something went wrong')
      .setDescription('notFound', 'You currently have no drivers')
      .setDescription('offline', 'You are offline! Please reconnect to continue using the app.')
      .setDescription('tooManyRequests', 'Something went wrong. Please try again later.')
      .build();
  }

  const drivers = data.map(async (driver) => {
    const { name, number_plate, picture_path, ...rest } = driver;
    return {
      ...rest,
      name: capitalizeEachWord(name ?? 'Unknown'),
      number_plate: number_plate?.toUpperCase() ?? null,
      picture_src: picture_path
        ? await queryClient.ensureQueryData(driverPictureQueryOptions(picture_path))
        : null,
    };
  });

  return Promise.all(drivers);
}

export function driversQueryOptions(search: string = '') {
  return infiniteQueryOptions<Driver[], AppError, InfiniteData<Driver>, QueryKey, number>({
    queryKey: ['drivers', 'list', { search }],
    queryFn: ({ pageParam }) => getDrivers({ search, pageParam }),
    staleTime: 1000 * 60, // 60 seconds,
    initialPageParam: 0,
    getNextPageParam: (_lastGroup, groups) => groups.length,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });
}

export function useInfiniteDrivers(search: string = '') {
  const query = useSuspenseInfiniteQuery(driversQueryOptions(search));
  return query;
}
