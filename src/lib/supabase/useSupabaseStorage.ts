import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { supabase } from '@/config/api/supabaseClient';

export async function getFileFromStorage(
  path?: string | undefined,
  expiresIn: number = 10 * 60, // 10 minutes
): Promise<string | null> {
  if (!path) return null;

  const { data } = await supabase
    .storage
    .from('main')
    .createSignedUrl(path, expiresIn, { download: true });

  if (!data) return null;

  return data.signedUrl;
}

export function supabaseStorageQueryOptions(path?: string | undefined) {
  return queryOptions<string | null>({
    queryKey: ['storage', path],
    queryFn: () => getFileFromStorage(path),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

export function useSupabaseStorage(path?: string | undefined) {
  const query = useSuspenseQuery(supabaseStorageQueryOptions(path));
  return query;
}
