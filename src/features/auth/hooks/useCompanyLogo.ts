import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/config/api/supabaseClient';
import { companyQueryKey, getCompany } from '@/features/auth/hooks/useCompany';
import { queryClient } from '@/config/api/queryClient';
import { AppErrorBuilder } from '@/config/errors/AppErrorBuilder';

export const queryKey = ['auth', 'company', 'logo'] as const;

export async function getCompanyLogo(): Promise<Blob | null> {
  const { logo_path: logoPath } = await queryClient.ensureQueryData({
    queryKey: companyQueryKey,
    queryFn: getCompany,
  });

  if (!logoPath) return null;

  const { data: logo, error } = await supabase
    .storage
    .from('main')
    .download(logoPath);

  if (error) {
    throw await AppErrorBuilder
      .fromSupabaseError(error)
      .setAppErrorMessage('Could not load company logo')
      .logoutOnAuthError()
      .build();
  }

  return logo;
}

export function useCompanyLogo() {
  const query = useQuery<Blob | null, Error>({
    queryKey,
    queryFn: getCompanyLogo,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });

  return query;
}
