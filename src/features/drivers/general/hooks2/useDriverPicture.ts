import { queryOptions, useQuery } from '@tanstack/react-query';
import { supabase } from '@/config/api/supabaseClient';

type Variables = {
  id: number;
  path?: string;
};

export async function getDriverPicture({ path }: Variables) {
  if (!path) return undefined;

  const { data } = await supabase
    .storage
    .from('main')
    .createSignedUrl(path, 10 * 60 /* 10 minutes */);

  if (!data) return undefined;
  return data.signedUrl;
}

export function driverPictureQueryOptions({ id, path }: Variables) {
  return queryOptions<string | undefined, void>({
    queryKey: ['drivers', id, 'picture', path],
    queryFn: () => getDriverPicture({ id, path }),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

export function useDriverPicture({ id, path }: Variables) {
  const query = useQuery(driverPictureQueryOptions({ id, path }));
  return query;
}
