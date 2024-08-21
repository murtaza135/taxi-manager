import { useSuspenseQuery, queryOptions } from '@tanstack/react-query';
import mapValues from 'lodash/mapValues';
import { supabase } from '@/config/api/supabaseClient';
import { SupabaseError } from '@/errors/classes/SupabaseError';
import { Tables } from '@/types/database';
import { queryClient } from '@/config/api/queryClient';
import { sessionOptions } from '@/features/auth/hooks/useSession';
import { Prettify, NonNullableObject, ReplaceNullWithUndefined } from '@/types/utils';
import { getFile } from '@/lib/supabase/getFile';

type SupabaseDriversLicenceDetails = Prettify<
  NonNullableObject<
    Pick<
      Tables<'driver_view'>,
      | 'drivers_licence_id' | 'drivers_licence_number'
      | 'drivers_licence_start_date' | 'drivers_licence_end_date'
    >
  > & Partial<NonNullableObject<
    Pick<Tables<'driver_view'>, 'drivers_licence_document_path'>
  >>
>;

type DriversLicenceDetails = Prettify<
  ReplaceNullWithUndefined<
    Pick<
      Tables<'drivers_licence'>,
      | 'id' | 'licence_number' | 'start_date'
      | 'end_date' | 'document_path'
    >
  > & {
    driver_id: number;
    document_src: string | null;
  }
>;

type PictureVariables = {
  driver_id: number;
  path?: string;
};

export function driversLicencePictureQueryOptions({ driver_id, path }: PictureVariables) {
  return queryOptions<string | null, void>({
    queryKey: ['drivers', driver_id, 'licence', 'document', path],
    queryFn: () => getFile(path),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

async function getDriversLicenceDetails(driver_id: number): Promise<DriversLicenceDetails> {
  const session = await queryClient.ensureQueryData(sessionOptions());

  const { data, error, status } = await supabase
    .from('driver_view')
    .select('drivers_licence_id, drivers_licence_number, drivers_licence_start_date, drivers_licence_end_date, drivers_licence_document_path')
    .eq('id', driver_id)
    .eq('auth_id', session.user.id)
    .returns<SupabaseDriversLicenceDetails[]>()
    .limit(1)
    .single();

  if (error) {
    throw new SupabaseError(error, status, {
      globalTitle: 'Could not fetch driver',
      titles: { notFound: `Driver ${driver_id} does not exist` },
    });
  }

  const drivers_licence_document_src = await queryClient.ensureQueryData(
    driversLicencePictureQueryOptions({ driver_id, path: data.drivers_licence_document_path }),
  );

  const mappedData = mapValues(data, (val) => val ?? undefined) as SupabaseDriversLicenceDetails;

  return {
    id: mappedData.drivers_licence_id,
    licence_number: mappedData.drivers_licence_number,
    start_date: mappedData.drivers_licence_start_date,
    end_date: mappedData.drivers_licence_end_date,
    document_path: mappedData.drivers_licence_document_path,
    document_src: drivers_licence_document_src,
    driver_id,
  };
}

export function driversLicenceDetailsQueryOptions(driver_id: number) {
  return queryOptions<DriversLicenceDetails, SupabaseError>({
    queryKey: ['drivers', driver_id, 'licence'],
    queryFn: () => getDriversLicenceDetails(driver_id),
  });
}

export function useDriversLicenceDetails(driver_id: number) {
  const query = useSuspenseQuery(driversLicenceDetailsQueryOptions(driver_id));
  return query;
}
