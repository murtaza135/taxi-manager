import { useSuspenseQuery, queryOptions } from '@tanstack/react-query';
import { supabase } from '@/config/api/supabaseClient';
import { companyOptions } from '@/features/auth/hooks/useCompany';
import { queryClient } from '@/config/api/queryClient';

async function getCompanyLogo(): Promise<string | null> {
  const { logo_path } = await queryClient.ensureQueryData(companyOptions());
  if (!logo_path) return null;

  const { data } = await supabase
    .storage
    .from('main')
    .createSignedUrl(
      logo_path,
      10 * 60, // 10 minutes
      { download: true },
    );

  if (!data) return null;

  return data.signedUrl;
}

export function companyLogoOptions() {
  return queryOptions<string | null>({
    queryKey: ['auth', 'company', 'logo'],
    queryFn: getCompanyLogo,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

export function useCompanyLogo() {
  const query = useSuspenseQuery(companyLogoOptions());
  return query;
}
