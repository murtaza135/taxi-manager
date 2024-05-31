import { useQuery } from '@tanstack/react-query';
import { PostgrestError } from '@supabase/supabase-js';
import { supabase } from '@/config/api/supabaseClient';
import { getSession } from '@/features/auth/hooks/useSession';
import { Tables } from '@/types/database';

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
  // eslint-disable-next-line @typescript-eslint/no-throw-literal
  if (error1) throw error1;
  // TODO create custom error and change message
  if (!data1.logo_path) return null;

  const { data, error: error2 } = await supabase
    .storage
    .from('main')
    .download(data1.logo_path);

  if (error2) throw error2;

  return data;
}

export function useCompanyLogo() {
  const query = useQuery<Blob | null, Error>({
    queryKey,
    queryFn: getCompanyLogo,
  });

  return query;
}
