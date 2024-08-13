import { useSuspenseQuery, queryOptions } from '@tanstack/react-query';
import { supabase } from '@/config/api/supabaseClient';
import { SupabaseError } from '@/errors/classes/SupabaseError';
import { Tables } from '@/types/database';

// async function getDriver(id: number) {

// }

// export function driverQueryOptions() {
//   return queryOptions<User, SupabaseError>({
//     queryKey: ['auth', 'user'],
//     queryFn: getUser,
//   });
// }

// export function useDriver() {
//   const query = useSuspenseQuery(driverQueryOptions());
//   return query;
// }
