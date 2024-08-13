// TODO delete
// import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
// import { getFileFromStorage } from '@/lib/supabase/getFileFromStorage';

// export function driverPictureQueryOptions(path: string) {
//   return queryOptions<string | null>({
//     queryKey: ['drivers', 'picture', path],
//     queryFn: () => getFileFromStorage(path),
//     staleTime: 1000 * 60 * 10, // 10 minutes
//   });
// }

// export function useDriverPicture(path: string) {
//   const query = useSuspenseQuery(driverPictureQueryOptions(path));
//   return query;
// }
