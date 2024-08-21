import { useSuspenseQuery, queryOptions } from '@tanstack/react-query';
import mapValues from 'lodash/mapValues';
import { supabase } from '@/config/api/supabaseClient';
import { SupabaseError } from '@/errors/classes/SupabaseError';
import { Tables } from '@/types/database';
import { queryClient } from '@/config/api/queryClient';
import { sessionOptions } from '@/features/auth/hooks/useSession';
import { Prettify, NonNullableObject } from '@/types/utils';
import { driverPictureQueryOptions } from '@/features/drivers/general/hooks/useDriverPicture';

type Driver = Prettify<
  Partial<NonNullableObject<
    Omit<Tables<'driver_view'>, 'id' | 'name' | 'is_retired'>
  >> & {
    id: number;
    name: string;
    is_retired: boolean;
    picture_src: string | null;
  }
>;

async function getDriver(id: number): Promise<Driver> {
  const session = await queryClient.ensureQueryData(sessionOptions());

  const { data, error, status } = await supabase
    .from('driver_view')
    .select('*')
    .eq('id', id)
    .eq('auth_id', session.user.id)
    .returns<Driver[]>()
    .limit(1)
    .single();

  if (error) {
    throw new SupabaseError(error, status, {
      globalTitle: 'Could not fetch driver',
      titles: { notFound: `Driver ${id} does not exist` },
    });
  }

  const picture_src = await queryClient.ensureQueryData(
    driverPictureQueryOptions({ id, path: data.picture_path }),
  );

  const mappedData = mapValues(data, (val) => val ?? undefined) as Driver;
  return { ...mappedData, picture_src };
}

export function driverQueryOptions(id: number) {
  return queryOptions<Driver, SupabaseError>({
    queryKey: ['drivers', id],
    queryFn: () => getDriver(id),
  });
}

export function useDriver(id: number) {
  const query = useSuspenseQuery(driverQueryOptions(id));
  return query;
}
