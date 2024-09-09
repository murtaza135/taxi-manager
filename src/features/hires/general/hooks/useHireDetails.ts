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

type SupabaseHireAgreementDetails = Prettify<
  Partial<NonNullableObject<
    Pick<
      Tables<'hire_agreement_view'>,
      | 'end_date' | 'permission_letter_document_path'
      | 'contract_document_path' | 'deposit_receipt_document_path'
    >
  >> & NonNullableObject<
    Pick<
      Tables<'hire_agreement_view'>,
      | 'taxi_id' | 'driver_id' | 'start_date'
      | 'rent_amount' | 'deposit_amount' | 'is_retired' | 'created_at'
    >
  >
>;

type HireAgreementDetails = Prettify<
  SupabaseHireAgreementDetails & {
    id: number;
    permission_letter_document_src: string | null;
    permission_letter_document_file_type: FileType;
    contract_document_src: string | null;
    contract_document_file_type: FileType;
    deposit_receipt_document_src: string | null;
    deposit_receipt_document_file_type: FileType;
  }
>;

type PictureVariables = {
  id: number;
  path?: string;
};

export function hireAgreementPermissionLetterQueryOptions({ id, path }: PictureVariables) {
  return queryOptions<string | null, void>({
    queryKey: ['hires', id, 'details', 'permissionLetter', path],
    queryFn: () => getFile(path),
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

export function hireAgreementContractQueryOptions({ id, path }: PictureVariables) {
  return queryOptions<string | null, void>({
    queryKey: ['hires', id, 'details', 'contract', path],
    queryFn: () => getFile(path),
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

export function hireAgreementDepositReceiptQueryOptions({ id, path }: PictureVariables) {
  return queryOptions<string | null, void>({
    queryKey: ['hires', id, 'details', 'depositReceipt', path],
    queryFn: () => getFile(path),
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

async function getHireAgreementDetails(id: number): Promise<HireAgreementDetails> {
  const session = await queryClient.ensureQueryData(sessionOptions());

  const { data, error, status } = await supabase
    .from('hire_agreement_view')
    .select('taxi_id, driver_id, start_date, rent_amount, deposit_amount, is_retired, created_at, end_date, permission_letter_document_path, contract_document_path, deposit_receipt_document_path')
    .eq('id', id)
    .eq('auth_id', session.user.id)
    .returns<SupabaseHireAgreementDetails[]>()
    .limit(1)
    .single();

  if (error) {
    throw new SupabaseError(error, status, {
      globalTitle: 'Could not fetch hire agreement',
      titles: { notFound: 'Hire agreement does not exist' },
    });
  }

  const permission_letter_document_src = await queryClient.ensureQueryData(
    hireAgreementPermissionLetterQueryOptions({ id, path: data.permission_letter_document_path }),
  );

  const contract_document_src = await queryClient.ensureQueryData(
    hireAgreementContractQueryOptions({ id, path: data.contract_document_path }),
  );

  const deposit_receipt_document_src = await queryClient.ensureQueryData(
    hireAgreementDepositReceiptQueryOptions({ id, path: data.deposit_receipt_document_path }),
  );

  const permission_letter_document_file_type = extractFileType(
    data.permission_letter_document_path,
  );
  const contract_document_file_type = extractFileType(data.contract_document_path);
  const deposit_receipt_document_file_type = extractFileType(data.deposit_receipt_document_path);

  const mappedData = mapValues(data, (val) => val ?? undefined) as SupabaseHireAgreementDetails;

  return {
    ...mappedData,
    id,
    permission_letter_document_src,
    permission_letter_document_file_type,
    contract_document_src,
    contract_document_file_type,
    deposit_receipt_document_src,
    deposit_receipt_document_file_type,
  };
}

export function hireAgreementDetailsQueryOptions(id: number) {
  return queryOptions<HireAgreementDetails, SupabaseError>({
    queryKey: ['hires', id, 'details'],
    queryFn: () => getHireAgreementDetails(id),
  });
}

export function useHireAgreementDetails(id: number) {
  const query = useSuspenseQuery(hireAgreementDetailsQueryOptions(id));
  return query;
}
