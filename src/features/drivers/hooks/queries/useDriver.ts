/* eslint-disable @typescript-eslint/naming-convention */
import { useSuspenseQuery, queryOptions } from '@tanstack/react-query';
import { supabase } from '@/config/api/supabaseClient';
import { SupabaseError } from '@/errors/classes/SupabaseError';
import { Tables } from '@/types/database';
import { queryClient } from '@/config/api/queryClient';
import { sessionOptions } from '@/features/auth/hooks/useSession';
import { Prettify } from '@/types/utils';
import { driverPictureQueryOptions } from '@/features/drivers/hooks/queries/useDriverPicture';

type DriverDataFromSupabase = Prettify<
  Omit<Tables<'driver_view'>, 'id'> & {
    id: number;
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
      globalTitle: `Could not fetch driver ${id}`,
      titles: { notFound: `Driver ${id} does not exist` },
    });
  }

  const picture_src = data.picture_path
    ? await queryClient.ensureQueryData(driverPictureQueryOptions(data.picture_path))
    : null;

  const { picture_path, ...rest } = data;
  return { ...rest, picture_src };
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
