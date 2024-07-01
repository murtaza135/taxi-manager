import { useSuspenseQuery, queryOptions } from '@tanstack/react-query';
import { supabase } from '@/config/api/supabaseClient';
import { companyOptions } from '@/features/auth/hooks/useCompany';
import { queryClient } from '@/config/api/queryClient';
import { AppError } from '@/errors/AppError';

async function getCompanyLogo(): Promise<string | null> {
  const { logo_path: logoPath } = await queryClient.ensureQueryData(companyOptions());
  if (!logoPath) return null;

  const { data } = await supabase
    .storage
    .from('main')
    .createSignedUrl(
      logoPath,
      10 * 60, // 10 minutes
      { download: true },
    );

  if (!data) return null;

  return data.signedUrl;
}

export function companyLogoOptions() {
  return queryOptions<string | null, null>({
    queryKey: ['auth', 'company', 'logo'],
    queryFn: getCompanyLogo,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

export function useCompanyLogo() {
  const query = useSuspenseQuery(companyLogoOptions());
  return query;
}
