import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { supabase } from '@/config/api/supabaseClient';

export async function getFileFromStorage(
  path: string,
  expiresIn: number = 10 * 60, // 10 minutes
): Promise<string | null> {
  const { data } = await supabase
    .storage
    .from('main')
    .createSignedUrl(path, expiresIn, { download: true });

  if (!data) return null;

  return data.signedUrl;
}

export function supabaseStorageQueryOptions(path: string) {
  return queryOptions<string | null>({
    queryKey: [path],
    queryFn: () => getFileFromStorage(path),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

export function useSupabaseStorage(path: string) {
  const query = useSuspenseQuery(supabaseStorageQueryOptions(path));
  return query;
}
