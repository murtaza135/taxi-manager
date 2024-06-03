import { useQuery } from '@tanstack/react-query';
import { supabaseClient, supabase } from '@/config/api/supabaseClient';
import { getSession } from '@/features/auth/hooks/useSession';
import { AppError } from '@/config/errors/AppError';
import { StorageError } from '@/types/supabase/storage-js';

export const queryKey = ['auth', 'logo'] as const;

export async function getCompanyLogo(): Promise<Blob | null> {
  const session = await getSession();

  // const {data: dataA, error: errorA} = await supabaseClient
  //   .from('company')
  //   .select('logo_path')
  //   .eq('auth_id', session.user.id)
  //   .limit(1)
  //   .single();

  const { data: logoPath, error: logoPathError } = await supabase(
    (client) => client
      .from('company')
      .select('logo_path')
      .eq('auth_id', session.user.id)
      .limit(1)
      .single(),
    {
      throwError: true,
      appErrorMessage: 'Could not load company logo',
    },
  );

  // const { data: data1, error: error1 } = await supabase
  //   .from('company')
  //   .select('logo_path')
  //   .eq('auth_id', session.user.id)
  //   .limit(1)
  //   .single();

  // if (logoPathError) throw logoPathError;
  if (!logoPath.logo_path) return null;

  const temp2 = await supabaseClient
    .storage
    .from('main')
    .download(`${data1.logo_path}`);

  // const { data: dataB, error: errorB } = await supabaseClient
  //   .storage
  //   .from('main')
  //   .download(`${data1.logo_path}`);

  const { data, error: error2 } = await supabase((client) => client
    .storage
    .from('main')
    .download(`${data1.logo_path}`));

  console.log(error2?.name);
  console.log(error2?.message);
  console.log((error2 as StorageError)?.status);
  console.log(error2?.stack);

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
