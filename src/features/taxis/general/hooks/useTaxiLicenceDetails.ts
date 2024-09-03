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

type SupabaseTaxiLicenceDetails = Prettify<
  Partial<NonNullableObject<
    Pick<
      Tables<'taxi_view'>,
      | 'taxi_licence_start_date' | 'compliance_certificate_document_path'
      | 'phc_licence_document_path'
    >
  >> & NonNullableObject<
    Pick<
      Tables<'taxi_view'>,
      | 'taxi_licence_id' | 'compliance_certificate_licence_number'
      | 'phc_number' | 'taxi_licence_end_date'
    >
  >
>;

export type TaxiLicenceDetails = Prettify<
  ReplaceNullWithUndefined<
    Pick<
      Tables<'taxi_licence'>,
      | 'id' | 'compliance_certificate_licence_number' | 'phc_number' | 'start_date' | 'end_date'
      | 'compliance_certificate_document_path' | 'phc_licence_document_path'
    >
  > & {
    taxi_id: number;
    compliance_certificate_document_src: string | null;
    compliance_certificate_document_file_type: FileType;
    phc_licence_document_src: string | null;
    phc_licence_document_file_type: FileType;
  }
>;

type PictureVariables = {
  id: number;
  path?: string;
};

export function taxiComplianceCertificateQueryOptions({ id, path }: PictureVariables) {
  return queryOptions<string | null, void>({
    queryKey: ['taxis', id, 'licence', 'complianceCertificate', path],
    queryFn: () => getFile(path),
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

export function taxiPhcLicenceQueryOptions({ id, path }: PictureVariables) {
  return queryOptions<string | null, void>({
    queryKey: ['taxis', id, 'licence', 'phcLicence', path],
    queryFn: () => getFile(path),
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

async function getTaxiLicenceDetails(taxi_id: number): Promise<TaxiLicenceDetails> {
  const session = await queryClient.ensureQueryData(sessionOptions());

  const { data, error, status } = await supabase
    .from('taxi_view')
    .select('taxi_licence_id, compliance_certificate_licence_number, phc_number, taxi_licence_start_date, taxi_licence_end_date, compliance_certificate_document_path, phc_licence_document_path')
    .eq('id', taxi_id)
    .eq('auth_id', session.user.id)
    .returns<SupabaseTaxiLicenceDetails[]>()
    .limit(1)
    .single();

  if (error) {
    throw new SupabaseError(error, status, {
      globalTitle: 'Could not fetch taxi',
      titles: { notFound: 'Taxi does not exist' },
    });
  }

  const compliance_certificate_document_src = await queryClient.ensureQueryData(
    taxiComplianceCertificateQueryOptions({
      id: taxi_id,
      path: data.compliance_certificate_document_path,
    }),
  );

  const phc_licence_document_src = await queryClient.ensureQueryData(
    taxiPhcLicenceQueryOptions({ id: taxi_id, path: data.phc_licence_document_path }),
  );

  const compliance_certificate_document_file_type = extractFileType(
    data.compliance_certificate_document_path,
  );

  const phc_licence_document_file_type = extractFileType(data.phc_licence_document_path);

  const mappedData = mapValues(data, (val) => val ?? undefined) as SupabaseTaxiLicenceDetails;

  return {
    ...mappedData,
    id: mappedData.taxi_licence_id,
    taxi_id,
    start_date: mappedData.taxi_licence_start_date,
    end_date: mappedData.taxi_licence_end_date,
    compliance_certificate_document_path: mappedData.compliance_certificate_document_path,
    phc_licence_document_path: mappedData.phc_licence_document_path,
    compliance_certificate_document_src,
    compliance_certificate_document_file_type,
    phc_licence_document_src,
    phc_licence_document_file_type,
  };
}

export function taxiLicenceDetailsQueryOptions(taxi_id: number) {
  return queryOptions<TaxiLicenceDetails, SupabaseError>({
    queryKey: ['taxis', taxi_id, 'licence'],
    queryFn: () => getTaxiLicenceDetails(taxi_id),
  });
}

export function useTaxiLicenceDetails(taxi_id: number) {
  const query = useSuspenseQuery(taxiLicenceDetailsQueryOptions(taxi_id));
  return query;
}
