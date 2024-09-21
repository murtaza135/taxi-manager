import { useSuspenseQuery, queryOptions } from '@tanstack/react-query';
import mapValues from 'lodash/mapValues';
import { supabase } from '@/config/api/supabaseClient';
import { SupabaseError } from '@/errors/classes/SupabaseError';
import { Tables } from '@/types/database';
import { queryClient } from '@/config/api/queryClient';
import { sessionOptions } from '@/features/auth/hooks/useSession';
import { Prettify, NonNullableObject, ReplaceNullWithUndefined } from '@/types/utils';
import { getFile } from '@/lib/supabase/getFile';
import { extractFileType, FileType } from '@/utils/path/extractFileType';

type SupabaseDriversTaxiBadgeDetails = Prettify<
  NonNullableObject<
    Pick<
      Tables<'driver_view'>,
      | 'drivers_taxi_badge_id' | 'drivers_taxi_badge_number'
      | 'drivers_taxi_badge_end_date'
    >
  > & Partial<NonNullableObject<
    Pick<Tables<'driver_view'>,
      'drivers_taxi_badge_start_date' | 'drivers_taxi_badge_document_path' | 'drivers_taxi_badge_document2_path'
    >
  >>
>;

export type DriversTaxiBadgeDetails = Prettify<
  ReplaceNullWithUndefined<
    Pick<
      Tables<'drivers_taxi_badge'>,
      | 'id' | 'badge_number' | 'start_date'
      | 'end_date' | 'document_path' | 'document2_path'
    >
  > & {
    driver_id: number;
    document_src: string | null;
    document_file_type: FileType;
    document2_src: string | null;
    document2_file_type: FileType;
  }
>;

type DocumentVariables = {
  driver_id: number;
  path?: string;
};

export function driversTaxiBadgeDocumentQueryOptions({ driver_id, path }: DocumentVariables) {
  return queryOptions<string | null, void>({
    queryKey: ['drivers', driver_id, 'taxiBadge', 'document', path],
    queryFn: () => getFile(path),
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

async function getDriversTaxiBadgeDetails(driver_id: number): Promise<DriversTaxiBadgeDetails> {
  const session = await queryClient.ensureQueryData(sessionOptions());

  const { data, error, status } = await supabase
    .from('driver_view')
    .select('drivers_taxi_badge_id, drivers_taxi_badge_number, drivers_taxi_badge_start_date, drivers_taxi_badge_end_date, drivers_taxi_badge_document_path, drivers_taxi_badge_document2_path')
    .eq('id', driver_id)
    .eq('auth_id', session.user.id)
    .returns<SupabaseDriversTaxiBadgeDetails[]>()
    .limit(1)
    .single();

  if (error) {
    throw new SupabaseError(error, status, {
      globalTitle: 'Could not fetch driver',
      titles: { notFound: 'Driver does not exist' },
    });
  }

  const drivers_taxi_badge_document_src = await queryClient.ensureQueryData(
    driversTaxiBadgeDocumentQueryOptions({
      driver_id,
      path: data.drivers_taxi_badge_document_path,
    }),
  );
  const document_file_type = extractFileType(data.drivers_taxi_badge_document_path);

  const drivers_taxi_badge_document2_src = await queryClient.ensureQueryData(
    driversTaxiBadgeDocumentQueryOptions({
      driver_id,
      path: data.drivers_taxi_badge_document2_path,
    }),
  );
  const document2_file_type = extractFileType(data.drivers_taxi_badge_document2_path);

  const mappedData = mapValues(data, (val) => val ?? undefined) as SupabaseDriversTaxiBadgeDetails;

  return {
    id: mappedData.drivers_taxi_badge_id,
    badge_number: mappedData.drivers_taxi_badge_number,
    start_date: mappedData.drivers_taxi_badge_start_date,
    end_date: mappedData.drivers_taxi_badge_end_date,
    document_path: mappedData.drivers_taxi_badge_document_path,
    document_src: drivers_taxi_badge_document_src,
    document_file_type,
    document2_path: mappedData.drivers_taxi_badge_document2_path,
    document2_src: drivers_taxi_badge_document2_src,
    document2_file_type,
    driver_id,
  };
}

export function driversTaxiBadgeDetailsQueryOptions(driver_id: number) {
  return queryOptions<DriversTaxiBadgeDetails, SupabaseError>({
    queryKey: ['drivers', driver_id, 'taxiBadge'],
    queryFn: () => getDriversTaxiBadgeDetails(driver_id),
  });
}

export function useDriversTaxiBadgeDetails(driver_id: number) {
  const query = useSuspenseQuery(driversTaxiBadgeDetailsQueryOptions(driver_id));
  return query;
}
