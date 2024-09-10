import { useSuspenseQuery, queryOptions } from '@tanstack/react-query';
import mapValues from 'lodash/mapValues';
import { supabase } from '@/config/api/supabaseClient';
import { SupabaseError } from '@/errors/classes/SupabaseError';
import { Tables } from '@/types/database';
import { queryClient } from '@/config/api/queryClient';
import { sessionOptions } from '@/features/auth/hooks/useSession';
import { Prettify, ReplaceNullWithUndefined } from '@/types/utils';
import { getFile } from '@/lib/supabase/getFile';
import { extractFileType, FileType } from '@/utils/path/extractFileType';

type SupabaseDriverApplication = ReplaceNullWithUndefined<
  Omit<
    Tables<'driver_application'>,
    'auth_id' | 'company_name'
  >
>;

type DriverApplication = Prettify<
  SupabaseDriverApplication & {
    picture_src: string | null;
    picture_file_type: FileType;
    drivers_licence_src: string | null;
    drivers_licence_file_type: FileType;
    taxi_badge_src: string | null;
    taxi_badge_file_type: FileType;
  }
>;

type PictureVariables = {
  id: string;
  path?: string | undefined;
};

export function driverApplicationPictureQueryOptions({ id, path }: PictureVariables) {
  return queryOptions<string | null, void>({
    queryKey: ['driverApplications', id, 'picture', path],
    queryFn: () => getFile(path),
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

export function driverApplicationLicenceQueryOptions({ id, path }: PictureVariables) {
  return queryOptions<string | null, void>({
    queryKey: ['driverApplications', id, 'licence', path],
    queryFn: () => getFile(path),
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

export function driverApplicationBadgeQueryOptions({ id, path }: PictureVariables) {
  return queryOptions<string | null, void>({
    queryKey: ['driverApplications', id, 'badge', path],
    queryFn: () => getFile(path),
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

async function getDriverApplication(id: string): Promise<DriverApplication> {
  const session = await queryClient.ensureQueryData(sessionOptions());

  const { data, error, status } = await supabase
    .from('driver_application')
    .select('*')
    .eq('id', id)
    .eq('auth_id', session.user.id)
    .returns<SupabaseDriverApplication[]>()
    .limit(1)
    .single();

  if (error) {
    throw new SupabaseError(error, status, {
      globalTitle: 'Could not fetch driver application',
      titles: { notFound: 'Driver application does not exist' },
    });
  }

  const picture_src = await queryClient.ensureQueryData(
    driverApplicationPictureQueryOptions({ id, path: data.picture_path }),
  );
  const picture_file_type = extractFileType(data.picture_path ?? undefined);

  const drivers_licence_src = await queryClient.ensureQueryData(
    driverApplicationPictureQueryOptions({ id, path: data.drivers_licence_path }),
  );
  const drivers_licence_file_type = extractFileType(data.drivers_licence_path ?? undefined);

  const taxi_badge_src = await queryClient.ensureQueryData(
    driverApplicationPictureQueryOptions({ id, path: data.taxi_badge_path }),
  );
  const taxi_badge_file_type = extractFileType(data.taxi_badge_path ?? undefined);

  // eslint-disable-next-line max-len
  const mappedData = mapValues(data, (val) => val ?? undefined) as ReplaceNullWithUndefined<typeof data>;
  return {
    ...mappedData,
    id,
    picture_src,
    picture_file_type,
    drivers_licence_src,
    drivers_licence_file_type,
    taxi_badge_src,
    taxi_badge_file_type,
  };
}

export function driverApplicationQueryOptions(id: string) {
  return queryOptions<DriverApplication, SupabaseError>({
    queryKey: ['driverApplications', id],
    queryFn: () => getDriverApplication(id),
  });
}

export function useDriverApplication(id: string) {
  const query = useSuspenseQuery(driverApplicationQueryOptions(id));
  return query;
}
