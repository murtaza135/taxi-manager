import { useSuspenseQuery, queryOptions } from '@tanstack/react-query';
import mapValues from 'lodash/mapValues';
import { supabase } from '@/config/api/supabaseClient';
import { SupabaseError } from '@/errors/classes/SupabaseError';
import { Tables } from '@/types/database';
import { queryClient } from '@/config/api/queryClient';
import { sessionOptions } from '@/features/auth/hooks/useSession';
import { Prettify, NonNullableObject, ReplaceNullWithUndefined } from '@/types/utils';
import { getFile } from '@/lib/supabase/getFile';

type SupabaseDriversTaxiBadgeDetails = Prettify<
  NonNullableObject<
    Pick<
      Tables<'driver_view'>,
      | 'drivers_taxi_badge_id' | 'drivers_taxi_badge_number'
      | 'drivers_taxi_badge_end_date'
    >
  > & Partial<NonNullableObject<
    Pick<Tables<'driver_view'>,
      'drivers_taxi_badge_start_date' | 'drivers_taxi_badge_document_path'
    >
  >>
>;

type DriversTaxiBadgeDetails = Prettify<
  ReplaceNullWithUndefined<
    Pick<
      Tables<'drivers_taxi_badge'>,
      | 'id' | 'badge_number' | 'start_date'
      | 'end_date' | 'document_path'
    >
  > & {
    driver_id: number;
    document_src: string | null;
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
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

async function getDriversTaxiBadgeDetails(driver_id: number): Promise<DriversTaxiBadgeDetails> {
  const session = await queryClient.ensureQueryData(sessionOptions());

  const { data, error, status } = await supabase
    .from('driver_view')
    .select('drivers_taxi_badge_id, drivers_taxi_badge_number, drivers_taxi_badge_start_date, drivers_taxi_badge_end_date, drivers_taxi_badge_document_path')
    .eq('id', driver_id)
    .eq('auth_id', session.user.id)
    .returns<SupabaseDriversTaxiBadgeDetails[]>()
    .limit(1)
    .single();

  if (error) {
    throw new SupabaseError(error, status, {
      globalTitle: 'Could not fetch driver',
      titles: { notFound: `Driver ${driver_id} does not exist` },
    });
  }

  const drivers_taxi_badge_document_src = await queryClient.ensureQueryData(
    driversTaxiBadgeDocumentQueryOptions({
      driver_id,
      path: data.drivers_taxi_badge_document_path,
    }),
  );

  const mappedData = mapValues(data, (val) => val ?? undefined) as SupabaseDriversTaxiBadgeDetails;

  return {
    id: mappedData.drivers_taxi_badge_id,
    badge_number: mappedData.drivers_taxi_badge_number,
    start_date: mappedData.drivers_taxi_badge_start_date,
    end_date: mappedData.drivers_taxi_badge_end_date,
    document_path: mappedData.drivers_taxi_badge_document_path,
    document_src: drivers_taxi_badge_document_src,
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
