/* eslint-disable @typescript-eslint/naming-convention */
import { useSuspenseQuery, queryOptions } from '@tanstack/react-query';
import mapValues from 'lodash/mapValues';
import { supabase } from '@/config/api/supabaseClient';
import { SupabaseError } from '@/errors/classes/SupabaseError';
import { Tables } from '@/types/database';
import { queryClient } from '@/config/api/queryClient';
import { sessionOptions } from '@/features/auth/hooks/useSession';
import { Prettify, NonNullableObject } from '@/types/utils';
import { supabaseStorageQueryOptions } from '@/lib/supabase/useSupabaseStorage';

type DriverDataFromSupabase = Prettify<
  Partial<NonNullableObject<
    Omit<Tables<'driver_view'>, 'id' | 'name' | 'is_retired'>
  >> & {
    id: number;
    name: string;
    is_retired: boolean;
  }
>;

export type Driver = Prettify<
  Omit<DriverDataFromSupabase, 'picture_path'> & {
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
    .returns<DriverDataFromSupabase[]>()
    .limit(1)
    .single();

  if (error) {
    throw new SupabaseError(error, status, {
      globalTitle: 'Could not fetch driver',
      titles: { notFound: `Driver ${id} does not exist` },
    });
  }

  const picture_src = data.picture_path
    ? await queryClient.ensureQueryData(supabaseStorageQueryOptions(data.picture_path))
    : null;

  const { picture_path, ...rest } = data;
  const mappedData = mapValues(rest, (val) => val ?? undefined) as DriverDataFromSupabase;
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
