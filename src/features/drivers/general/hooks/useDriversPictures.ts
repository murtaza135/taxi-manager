// import { queryOptions, useQuery } from '@tanstack/react-query';
// import { supabase } from '@/config/api/supabaseClient';
// import { driversQueryOptions } from '@/features/drivers/general/hooks/useDrivers';
// import { queryClient } from '@/config/api/queryClient';

// // type DriverQueryFunctionVariables = {
// //   id: number;
// //   path?: string;
// // };

// export async function getDriverPicture() {
//   const {  } = await queryClient.ensureQueryData(driversQueryOptions());
//   if (!picture_path) return null;

//   const { data } = await supabase
//     .storage
//     .from('main')
//     .createSignedUrl(picture_path, 10 * 60 /* 10 minutes */);

//   if (!data) return null;
//   return data.signedUrl;
// }

// export function driverPictureQueryOptions(id: number) {
//   return queryOptions<string | null, void>({
//     queryKey: ['drivers', id, 'picture'],
//     queryFn: () => getDriverPicture(id),
//     staleTime: 1000 * 60 * 10, // 10 minutes
//   });
// }

// export function useDriverPicture(id: number) {
//   const query = useQuery(driverPictureQueryOptions(id));
//   return query;
// }
