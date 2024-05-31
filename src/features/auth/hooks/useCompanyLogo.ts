import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/config/api/supabaseClient';
import { getSession } from '@/features/auth/hooks/useSession';
import { AppError } from '@/config/errors/AppError';

export const queryKey = ['auth', 'logo'] as const;

export async function getCompanyLogo(): Promise<Blob | null> {
  const session = await getSession();

  const { data: data1, error: error1 } = await supabase
    .from('company')
    .select('logo_path')
    .eq('auth_id', session.user.id)
    .limit(1)
    .single();

  // TODO create custom error to handle postgreserror
  if (error1) throw new AppError({ message: error1.message, cause: error1 });
  // TODO create custom error and change message
  if (!data1.logo_path) return null;

  const { data, error: error2 } = await supabase
    .storage
    .from('main')
    .download(data1.logo_path);

  if (error2) throw new AppError({ message: error2.message, cause: error2 });

  return data;
}

export function useCompanyLogo() {
  const query = useQuery<Blob | null, Error>({
    queryKey,
    queryFn: getCompanyLogo,
  });

  return query;
}
