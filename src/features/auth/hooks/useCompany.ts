import { useSuspenseQuery, queryOptions } from '@tanstack/react-query';
import { supabase } from '@/config/api/supabaseClient';
import { sessionOptions } from '@/features/auth/hooks/useSession';
import { Tables } from '@/types/database';
import { queryClient } from '@/config/api/queryClient';
import { AppError } from '@/errors/AppError';

type CompanyDetails = Pick<
  Tables<'company'>,
  'logo_path' | 'name' | 'company_number' | 'address' | 'phone_number' | 'email'
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
    throw AppError.fromSupabaseError({
      error,
      status,
      message: 'Could not load company data',
    });
  }

  return data;
}

export function companyOptions() {
  return queryOptions<CompanyDetails, AppError>({
    queryKey: ['auth', 'company'],
    queryFn: getCompany,
  });
}

export function useCompany() {
  const query = useSuspenseQuery(companyOptions());
  return query;
}
