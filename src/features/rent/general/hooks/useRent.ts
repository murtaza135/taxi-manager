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

type SupabaseRent = Prettify<
  Partial<NonNullableObject<
    Pick<
      Tables<'rent_view'>,
      | 'receipt_document_path' | 'paid_date' | 'phc_number'
    >
  >> & NonNullableObject<
    Pick<
      Tables<'rent_view'>,
      | 'id' | 'hire_id' | 'start_date'
      | 'end_date' | 'amount' | 'is_paid' | 'created_at'
      | 'driver_id' | 'driver_name'
      | 'taxi_id' | 'number_plate'
    >
  >
>;

export type Rent = Prettify<
  Omit<SupabaseRent, 'amount'> & {
    amount: string,
    receipt_document_src: string | null;
    receipt_document_file_type: FileType;
  }
>;

type DocumentVariables = {
  id: number;
  path?: string;
};

export function receiptDocumentQueryOptions({ id, path }: DocumentVariables) {
  return queryOptions<string | null, void>({
    queryKey: ['rents', id, 'receipt', path],
    queryFn: () => getFile(path),
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

async function getRent(id: number): Promise<Rent> {
  const session = await queryClient.ensureQueryData(sessionOptions());

  const { data, error, status } = await supabase
    .from('rent_view')
    .select('hire_id, start_date, end_date, amount, is_paid, created_at, driver_id, driver_name, taxi_id, number_plate, receipt_document_path, paid_date, phc_number')
    .eq('id', id)
    .eq('auth_id', session.user.id)
    .returns<SupabaseRent[]>()
    .limit(1)
    .single();

  if (error) {
    throw new SupabaseError(error, status, {
      globalTitle: 'Could not fetch rent',
      titles: { notFound: 'Rent does not exist' },
    });
  }

  const receipt_document_src = await queryClient.ensureQueryData(
    receiptDocumentQueryOptions({ id, path: data.receipt_document_path }),
  );
  const receipt_document_file_type = extractFileType(data.receipt_document_path);

  const mappedData = mapValues(data, (val) => val ?? undefined) as SupabaseRent;

  return {
    ...mappedData,
    id,
    amount: `${mappedData.amount}`,
    receipt_document_src,
    receipt_document_file_type,
  };
}

export function rentQueryOptions(id: number) {
  return queryOptions<Rent, SupabaseError>({
    queryKey: ['rents', id],
    queryFn: () => getRent(id),
  });
}

export function useRent(id: number) {
  const query = useSuspenseQuery(rentQueryOptions(id));
  return query;
}
