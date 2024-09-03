// import { keepPreviousData, infiniteQueryOptions, QueryKey, useSuspenseInfiniteQuery, InfiniteData, QueryFunctionContext } from '@tanstack/react-query';
// import { Prettify, NonNullableObject } from '@/types/utils';
// import { Tables } from '@/types/database';
// import { queryClient } from '@/config/api/queryClient';
// import { sessionOptions } from '@/features/auth/hooks/useSession';
// import { supabase } from '@/config/api/supabaseClient';
// import { capitalizeEachWord } from '@/utils/string/capitalizeEachWord';
// import { SupabaseError } from '@/errors/classes/SupabaseError';
// // import { hirePictureQueryOptions } from '@/features/hires/general/hooks/useHireDetails';

// const fetchSize = 50;

// type SupabaseHire = Prettify<
//   Partial<NonNullableObject<
//     Pick<
//       Tables<'hire_agreement_view'>,
//       | 'permission_letter_document_path' | 'contract_document_path'
//       | 'deposit_receipt_document_path' | 'end_date'
//     >
//   >> & NonNullableObject<
//     Pick<
//       Tables<'hire_agreement_view'>,
//       | 'id' | 'taxi_id' | 'taxi_number_plate'
//       | 'driver_id' | 'driver_name' | 'start_date'
//       | 'rent_amount' | 'deposit_amount' | 'is_retired'
//       | 'created_at'
//     >
//   >
// >;

// export type Hire = Prettify<
//   SupabaseHire & {
//     permission_letter_document_src: string | null;
//     contract_document_src: string | null;
//     deposit_receipt_document_src: string | null;
//   }
// >;

// type HireResult = {
//   data: Hire[];
//   count: number;
// };

// type Variables = {
//   search?: string;
//   isRetired?: boolean;
// };

// type Context = QueryFunctionContext<QueryKey, number>;

// async function getHires(
//   { search = '', isRetired = false }: Variables,
//   { pageParam }: Context,
// ): Promise<HireResult> {
//   const session = await queryClient.ensureQueryData(sessionOptions());

//   const from = fetchSize * pageParam;
//   const to = from + fetchSize - 1;

//   const { data, error, status, count } = await supabase
//     .from('hire_agreement_view')
//     .select(
//       'id, taxi_id, taxi_number_plate, driver_id, driver_name, start_date, rent_amount, deposit_amount, is_retired, created_at, permission_letter_document_path, contract_document_path, deposit_receipt_document_path, end_date',
//       { count: 'estimated' },
//     )
//     .eq('auth_id', session.user.id)
//     .eq('is_retired', isRetired)
//     .order('created_at', { ascending: false })
//     .or(`taxi_number_plate.ilike.%${search}%, driver_name.ilike.%${search}%, model.ilike.%${search}%,  phc_number.ilike.%${search}%`)
//     .range(from, to)
//     .returns<SupabaseHire[]>();

//   if (status === 404) return { data: [], count: 0 };

//   if (error) {
//     throw new SupabaseError(error, status, {
//       globalTitle: 'Could not fetch hires',
//     });
//   }

//   const hires = await Promise.all(
//     data.map(async (hire) => {
//       const number_plate = hire.number_plate.toUpperCase();
//       const colour = capitalizeEachWord(hire.colour);
//       const make = capitalizeEachWord(hire.make);
//       const model = capitalizeEachWord(hire.model);
//       const phc_number = hire.phc_number?.toUpperCase();
//       const driver_name = hire.driver_name ? capitalizeEachWord(hire.driver_name) : undefined;
//       const picture_src = await queryClient.ensureQueryData(
//         hirePictureQueryOptions({ id: hire.id, path: hire.picture_path }),
//       );
//       return { ...hire, number_plate, colour, make, model, driver_name, phc_number, picture_src };
//     }),
//   );

//   return {
//     data: hires,
//     count: count ?? 0,
//   };
// }

// export function hiresQueryOptions(options?: Variables) {
//   const search = options?.search;
//   const isRetired = options?.isRetired;

//   return infiniteQueryOptions<
//     HireResult,
//     SupabaseError,
//     InfiniteData<HireResult, number>,
//     QueryKey,
//     number
//   >({
//     queryKey: ['hires', 'list', { search, isRetired }],
//     queryFn: (context) => getHires({ search, isRetired }, context),
//     initialPageParam: 0,
//     getNextPageParam: (_lastGroup, groups) => groups.length,
//     refetchOnWindowFocus: false,
//     placeholderData: keepPreviousData,
//   });
// }

// export function useHires(options?: Variables) {
//   const query = useSuspenseInfiniteQuery(hiresQueryOptions(options));
//   return query;
// }
