import { useSuspenseQuery, queryOptions } from '@tanstack/react-query';
import mapValues from 'lodash/mapValues';
import { supabase } from '@/config/api/supabaseClient';
import { SupabaseError } from '@/errors/classes/SupabaseError';
import { Tables } from '@/types/database';
import { queryClient } from '@/config/api/queryClient';
import { sessionOptions } from '@/features/auth/hooks/useSession';
import { Prettify, NonNullableObject } from '@/types/utils';
import { getFile } from '@/lib/supabase/getFile';
import { extractFileType, FileType } from '@/utils/path/extractFileType';

type SupabaseTaxiDetails = Prettify<
  Partial<NonNullableObject<
    Pick<
      Tables<'taxi_view'>,
      | 'registration_date' | 'expected_expiry_date' | 'road_tax_expiry_date'
      | 'picture_path' | 'logbook_document_path' | 'logbook_document2_path' | 'cc' | 'fuel_type'
      | 'driver_id' | 'hire_agreement_id'
    >
  >> & NonNullableObject<
    Pick<
      Tables<'taxi_view'>,
      | 'number_plate' | 'colour' | 'chassis_number'
      | 'is_retired' | 'make' | 'model' | 'created_at'
    >
  >
>;

type TaxiDetails = Prettify<
  SupabaseTaxiDetails & {
    id: number;
    picture_src: string | null;
    picture_file_type: FileType;
    logbook_document_src: string | null;
    logbook_document_file_type: FileType;
    logbook_document2_src: string | null;
    logbook_document2_file_type: FileType;
  }
>;

type PictureVariables = {
  id: number;
  path?: string;
};

export function taxiPictureQueryOptions({ id, path }: PictureVariables) {
  return queryOptions<string | null, void>({
    queryKey: ['taxis', id, 'details', 'picture', path],
    queryFn: () => getFile(path),
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

export function taxiLogbookQueryOptions({ id, path }: PictureVariables) {
  return queryOptions<string | null, void>({
    queryKey: ['taxis', id, 'details', 'logbook', path],
    queryFn: () => getFile(path),
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

async function getTaxiDetails(id: number): Promise<TaxiDetails> {
  const session = await queryClient.ensureQueryData(sessionOptions());

  const { data, error, status } = await supabase
    .from('taxi_view')
    .select('number_plate, colour, chassis_number, is_retired, make, model, created_at, registration_date, expected_expiry_date, road_tax_expiry_date, picture_path, logbook_document_path, logbook_document2_path, cc, fuel_type, driver_id, hire_agreement_id')
    .eq('id', id)
    .eq('auth_id', session.user.id)
    .returns<SupabaseTaxiDetails[]>()
    .limit(1)
    .single();

  if (error) {
    throw new SupabaseError(error, status, {
      globalTitle: 'Could not fetch taxi',
      titles: { notFound: 'Taxi does not exist' },
    });
  }

  const picture_src = await queryClient.ensureQueryData(
    taxiPictureQueryOptions({ id, path: data.picture_path }),
  );

  const logbook_document_src = await queryClient.ensureQueryData(
    taxiLogbookQueryOptions({ id, path: data.logbook_document_path }),
  );

  const logbook_document2_src = await queryClient.ensureQueryData(
    taxiLogbookQueryOptions({ id, path: data.logbook_document2_path }),
  );

  const picture_file_type = extractFileType(data.picture_path);
  const logbook_document_file_type = extractFileType(data.logbook_document_path);
  const logbook_document2_file_type = extractFileType(data.logbook_document2_path);

  const mappedData = mapValues(data, (val) => val ?? undefined) as SupabaseTaxiDetails;

  return {
    ...mappedData,
    id,
    picture_src,
    picture_file_type,
    logbook_document_src,
    logbook_document_file_type,
    logbook_document2_src,
    logbook_document2_file_type,
  };
}

export function taxiDetailsQueryOptions(id: number) {
  return queryOptions<TaxiDetails, SupabaseError>({
    queryKey: ['taxis', id, 'details'],
    queryFn: () => getTaxiDetails(id),
  });
}

export function useTaxiDetails(id: number) {
  const query = useSuspenseQuery(taxiDetailsQueryOptions(id));
  return query;
}
