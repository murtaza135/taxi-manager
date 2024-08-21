import { queryOptions, useQuery } from '@tanstack/react-query';
import { supabase } from '@/config/api/supabaseClient';

type DriverQueryFunctionVariables = {
  id: number;
  path?: string;
};

export async function getDriverPicture({ path }: DriverQueryFunctionVariables) {
  console.log('getDriverPicture');
  if (!path) return null;

  const { data } = await supabase
    .storage
    .from('main')
    .createSignedUrl(path, 10 * 60 /* 10 minutes */);

  if (!data) return null;
  console.log('getDriverPicture2');
  return data.signedUrl;
}

export function driverPictureQueryOptions({ id, path }: DriverQueryFunctionVariables) {
  return queryOptions<string | null, void>({
    queryKey: ['drivers', id, 'picture', path],
    queryFn: () => getDriverPicture({ id, path }),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

export function useDriverPicture({ id, path }: DriverQueryFunctionVariables) {
  const query = useQuery(driverPictureQueryOptions({ id, path }));
  return query;
}
