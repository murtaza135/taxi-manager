// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { useRevalidator } from 'react-router-dom';
// import { v4 as uuidv4 } from 'uuid';
// import isEmpty from 'lodash/isEmpty';
// import { supabase } from '@/config/api/supabaseClient';
// import { queryClient as globalQueryClient } from '@/config/api/queryClient';
// import { sessionOptions } from '@/features/auth/hooks/useSession';
// import { SupabaseError } from '@/errors/classes/SupabaseError';
// import { useToast } from '@/ui/toast';
// import { Tables } from '@/types/database';
// import { Prettify, NonNullableObject } from '@/types/utils';
// import { compressImage } from '@/utils/compression/compressImage';

// // TODO make simpler
// type SupabaseTaxiDetails = Prettify<
//   Partial<NonNullableObject<
//     Pick<
//       Tables<'taxi_view'>,
//       | 'registration_date' | 'expected_expiry_date' | 'road_tax_expiry_date'
//       | 'picture_path' | 'logbook_document_path' | 'cc' | 'fuel_type'
//     >
//   >> & NonNullableObject<
//     Pick<
//       Tables<'taxi_view'>,
//       | 'number_plate' | 'colour' | 'chassis_number'
//       | 'is_retired' | 'make' | 'model' | 'created_at'
//     >
//   >
// >;

// export type Variables = Prettify<
//   Partial<
//     Pick<
//       Tables<'taxi'>,
//       | 'number_plate' | 'color' | 'chassis_number' | 'registration_date' | 'expected_expiry_date' | 'road_tax_expiry_date' | 'is_retired'
//     >
//   > & {
//     id: number;
//     picture?: File | null | undefined;
//   }
// >;

// export async function updateTaxiDetails({ id, picture, ...vars }: Variables) {
//   const session = await globalQueryClient.ensureQueryData(sessionOptions());

//   if (!isEmpty(vars)) {
//     const { error, status } = await supabase
//       .from('taxi')
//       .update(vars)
//       .eq('auth_id', session.user.id)
//       .eq('id', id);

//     if (error) {
//       throw new SupabaseError(error, status, {
//         globalTitle: 'Could not update taxi',
//       });
//     }
//   }

//   const {
//     data: pictureSelectData,
//     error: pictureSelectError,
//     status: pictureSelectStatus,
//   } = await supabase
//     .from('taxi')
//     .select('picture_path')
//     .eq('auth_id', session.user.id)
//     .eq('id', id)
//     .limit(1)
//     .single();

//   if (pictureSelectError) {
//     throw new SupabaseError(pictureSelectError, pictureSelectStatus, {
//       globalTitle: 'Could not update taxi',
//     });
//   }

//   if (picture && !pictureSelectData.picture_path) {
//     /* add picture */
//     const picture_path = `${session.user.id}/taxi-pictures/${uuidv4()}`;
//     const compressedPicture = await compressImage(
//       picture,
//       { maxWidth: 150, maxHeight: 150 },
//     );

//     const { error: pictureError } = await supabase
//       .storage
//       .from('main')
//       .upload(picture_path, compressedPicture, { upsert: true });

//     if (pictureError) {
//       throw new SupabaseError(pictureError, null, {
//         globalTitle: 'Could not update taxi',
//       });
//     }

//     const { error: picturePathError, status: picturePathStatus } = await supabase
//       .from('taxi')
//       .update({ picture_path })
//       .eq('auth_id', session.user.id)
//       .eq('id', id);

//     if (picturePathError) {
//       throw new SupabaseError(picturePathError, picturePathStatus, {
//         globalTitle: 'Could not update taxi',
//       });
//     }
//   } else if (picture && pictureSelectData.picture_path) {
//     /* replace picture */
//     const compressedPicture = await compressImage(
//       picture,
//       { maxWidth: 150, maxHeight: 150 },
//     );

//     const { error: pictureError } = await supabase
//       .storage
//       .from('main')
//       .update(pictureSelectData.picture_path, compressedPicture, { upsert: true });

//     if (pictureError) {
//       throw new SupabaseError(pictureError, null, {
//         globalTitle: 'Could not update taxi',
//       });
//     }
//   } else if (picture === null && pictureSelectData.picture_path) {
//     /* delete picture */
//     const { error: pictureError } = await supabase
//       .storage
//       .from('main')
//       .remove([pictureSelectData.picture_path]);

//     if (pictureError) {
//       throw new SupabaseError(pictureError, null, {
//         globalTitle: 'Could not update taxi',
//       });
//     }

//     const { error: picturePathError, status: picturePathStatus } = await supabase
//       .from('taxi')
//       .update({ picture_path: null })
//       .eq('auth_id', session.user.id)
//       .eq('id', id);

//     if (picturePathError) {
//       throw new SupabaseError(picturePathError, picturePathStatus, {
//         globalTitle: 'Could not update taxi',
//       });
//     }
//   }
// }

// export function useUpdateTaxiDetails() {
//   const queryClient = useQueryClient();
//   const { revalidate } = useRevalidator();
//   const { toast } = useToast();

//   const mutation = useMutation<void, SupabaseError, Variables>({
//     mutationFn: updateTaxiDetails,
//     onSuccess: async (_data, { id, picture }) => {
//       if (picture !== undefined) {
//         queryClient.removeQueries({ queryKey: ['taxis', id, 'details', 'picture'] });
//       }
//       await Promise.all([
//         queryClient.invalidateQueries({ queryKey: ['taxis', 'list'] }),
//         queryClient.invalidateQueries({ queryKey: ['taxis', id, 'details'], exact: true }),
//       ]);
//       revalidate();
//     },
//     onError: (error) => {
//       toast({
//         title: error.title,
//         description: error.description,
//         variant: 'destructive',
//       });
//     },
//   });

//   return mutation;
// }
