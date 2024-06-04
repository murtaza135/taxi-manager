import { useQuery, queryOptions } from '@tanstack/react-query';
import { supabase } from '@/config/api/supabaseClient';
import { companyOptions } from '@/features/auth/hooks/useCompany';
import { queryClient } from '@/config/api/queryClient';
import { AppError } from '@/config/errors/AppError';

async function getCompanyLogo(): Promise<Blob | null> {
  const { logo_path: logoPath } = await queryClient.ensureQueryData(companyOptions());
  if (!logoPath) return null;

  const { data: logo, error } = await supabase
    .storage
    .from('main')
    .download(logoPath);

  if (error) {
    throw AppError.fromSupabaseError({
      error,
      message: 'Could not load company logo',
    });
  }

  return logo;
}

export function companyLogoOptions() {
  return queryOptions<Blob | null, AppError>({
    queryKey: ['auth', 'company', 'logo'],
    queryFn: getCompanyLogo,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

export function useCompanyLogo() {
  const query = useQuery(companyLogoOptions());
  return query;
}
