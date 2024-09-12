import { useSuspenseQuery, queryOptions } from '@tanstack/react-query';
import mapValues from 'lodash/mapValues';
import { supabase } from '@/config/api/supabaseClient';
import { sessionOptions } from '@/features/auth/hooks/useSession';
import { Tables } from '@/types/database';
import { queryClient } from '@/config/api/queryClient';
import { SupabaseError } from '@/errors/classes/SupabaseError';
import { Prettify, ReplaceNullWithUndefined } from '@/types/utils';
import { extractFileType, FileType } from '@/utils/path/extractFileType';

type SupabaseCompanyDetails = Prettify<
  ReplaceNullWithUndefined<
    Pick<
      Tables<'company'>,
      'logo_path' | 'name' | 'company_number' | 'address' | 'phone_number' | 'email'
    >
  >
>;

type CompanyDetails = Prettify<
  SupabaseCompanyDetails & {
    logo_src: string | null;
    logo_file_type: FileType;
  }
>;

async function getCompany(): Promise<CompanyDetails> {
  const session = await queryClient.ensureQueryData(sessionOptions());

  const { data, error, status } = await supabase
    .from('company')
    .select('logo_path, name, company_number, address, phone_number, email')
    .eq('auth_id', session.user.id)
    .limit(1)
    .single();

  if (error) {
    throw new SupabaseError(error, status, {
      globalTitle: 'Could not load company data',
    });
  }

  const logo_file_type = extractFileType(data.logo_path ?? undefined);
  const mappedData = mapValues(data, (val) => val ?? undefined) as SupabaseCompanyDetails;
  return { ...mappedData, logo_src: null, logo_file_type };
}

export function companyOptions() {
  return queryOptions<CompanyDetails, SupabaseError>({
    queryKey: ['auth', 'company'],
    queryFn: getCompany,
  });
}

export function useCompany() {
  const query = useSuspenseQuery(companyOptions());
  return query;
}
