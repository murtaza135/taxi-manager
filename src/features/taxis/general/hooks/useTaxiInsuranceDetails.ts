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

type SupabaseTaxiInsuranceDetails = Prettify<
  Partial<NonNullableObject<
    Pick<
      Tables<'taxi_view'>,
      | 'insurance_document_path'
    >
  >> & NonNullableObject<
    Pick<
      Tables<'taxi_view'>,
      | 'insurance_id' | 'insurance_policy_number' | 'insurance_is_any_driver'
      | 'insurance_start_date' | 'insurance_end_date'
    >
  >
>;

type TaxiInsuranceDetails = Prettify<
  ReplaceNullWithUndefined<
    Pick<
      Tables<'insurance'>,
      | 'id' | 'policy_number' | 'is_any_driver'
      | 'start_date' | 'end_date' | 'document_path'
    >
  > & {
    taxi_id: number;
    document_src: string | null;
    document_file_type: FileType;
  }
>;

type PictureVariables = {
  id: number;
  path?: string;
};

export function taxiInsuranceCertificateQueryOptions({ id, path }: PictureVariables) {
  return queryOptions<string | null, void>({
    queryKey: ['taxis', id, 'insurance', 'document', path],
    queryFn: () => getFile(path),
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

async function getTaxiInsuranceDetails(taxi_id: number): Promise<TaxiInsuranceDetails> {
  const session = await queryClient.ensureQueryData(sessionOptions());

  const { data, error, status } = await supabase
    .from('taxi_view')
    .select('insurance_id, insurance_policy_number, insurance_is_any_driver, insurance_start_date, insurance_end_date, insurance_document_path')
    .eq('id', taxi_id)
    .eq('auth_id', session.user.id)
    .returns<SupabaseTaxiInsuranceDetails[]>()
    .limit(1)
    .single();

  if (error) {
    throw new SupabaseError(error, status, {
      globalTitle: 'Could not fetch taxi',
      titles: { notFound: 'Taxi does not exist' },
    });
  }

  const document_src = await queryClient.ensureQueryData(
    taxiInsuranceCertificateQueryOptions({
      id: taxi_id,
      path: data.insurance_document_path,
    }),
  );

  const document_file_type = extractFileType(data.insurance_document_path);

  const mappedData = mapValues(data, (val) => val ?? undefined) as SupabaseTaxiInsuranceDetails;

  return {
    taxi_id,
    id: mappedData.insurance_id,
    policy_number: mappedData.insurance_policy_number,
    is_any_driver: mappedData.insurance_is_any_driver,
    start_date: mappedData.insurance_start_date,
    end_date: mappedData.insurance_end_date,
    document_path: mappedData.insurance_document_path,
    document_src,
    document_file_type,
  };
}

export function taxiInsuranceDetailsQueryOptions(taxi_id: number) {
  return queryOptions<TaxiInsuranceDetails, SupabaseError>({
    queryKey: ['taxis', taxi_id, 'insurance'],
    queryFn: () => getTaxiInsuranceDetails(taxi_id),
  });
}

export function useTaxiInsuranceDetails(taxi_id: number) {
  const query = useSuspenseQuery(taxiInsuranceDetailsQueryOptions(taxi_id));
  return query;
}
