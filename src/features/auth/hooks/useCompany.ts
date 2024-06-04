import { useQuery } from '@tanstack/react-query';
import { PostgrestError } from '@supabase/supabase-js';
import { supabase } from '@/config/api/supabaseClient';
import { sessionQueryKey, getSession } from '@/features/auth/hooks/useSession';
import { Tables } from '@/types/database';
import { queryClient } from '@/config/api/queryClient';
import { AppErrorBuilder } from '@/config/errors/AppErrorBuilder';

type CompanyDetails = Pick<
  Tables<'company'>,
  'logo_path' | 'name' | 'company_number' | 'address' | 'phone_number' | 'email'
>;

export const companyQueryKey = ['auth', 'company'] as const;

export async function getCompany(): Promise<CompanyDetails> {
  const session = await queryClient.ensureQueryData({
    queryKey: sessionQueryKey,
    queryFn: getSession,
  });

  const { data, error, status } = await supabase
    .from('company')
    .select('logo_path, name, company_number, address, phone_number, email')
    .eq('auth_id', session.user.id)
    .limit(1)
    .single();

  if (error) {
    throw await AppErrorBuilder
      .fromSupabaseError(error, status)
      .setAppErrorMessage('Could not load company data')
      .logoutOnAuthError()
      .build();
  }

  return data;
}

export function useCompany() {
  const query = useQuery<CompanyDetails, PostgrestError>({
    queryKey: companyQueryKey,
    queryFn: getCompany,
  });

  return query;
}
