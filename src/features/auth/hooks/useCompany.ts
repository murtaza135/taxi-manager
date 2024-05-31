import { useQuery } from '@tanstack/react-query';
import { PostgrestError } from '@supabase/supabase-js';
import { supabase } from '@/config/api/supabaseClient';
import { getSession } from '@/features/auth/hooks/useSession';
import { Tables } from '@/types/database';
import { AppError } from '@/config/errors/AppError';

// TODO use Pick instead?
type Company = Omit<
  Tables<'company'>,
  'auth_id' | 'id' | 'created_at'
>;

export const queryKey = ['auth'] as const;

export async function getCompany(): Promise<Company> {
  const session = await getSession();

  const { data, error } = await supabase
    .from('company')
    .select('logo_path, name, company_number, address, phone_number, email')
    .eq('auth_id', session.user.id)
    .limit(1)
    .single();

  // TODO create custom error to handle postgreserror
  if (error) throw new AppError({ message: error.message, cause: error });
  // TODO create custom error and change message
  if (!data) throw new AppError({ message: 'Something went wrong' });
  return data;
}

export function useCompany() {
  const query = useQuery<Company, PostgrestError>({
    queryKey,
    queryFn: getCompany,
  });

  return query;
}
