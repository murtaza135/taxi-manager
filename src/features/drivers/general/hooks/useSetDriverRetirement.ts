// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { useRevalidator } from 'react-router-dom';
// import { supabase } from '@/config/api/supabaseClient';
// import { queryClient as globalQueryClient } from '@/config/api/queryClient';
// import { sessionOptions } from '@/features/auth/hooks/useSession';
// import { SupabaseError } from '@/errors/classes/SupabaseError';
// import { useToast } from '@/ui/toast';

// type SetDriverRetirementVariables = {
//   id: number;
//   isRetired: boolean;
// };

// export async function setDriverRetirement({ id, isRetired }: SetDriverRetirementVariables) {
//   const session = await globalQueryClient.ensureQueryData(sessionOptions());

//   const { error, status } = await supabase
//     .from('driver')
//     .update({ is_retired: isRetired })
//     .eq('auth_id', session.user.id)
//     .eq('id', id);

//   if (error) {
//     throw new SupabaseError(error, status, {
//       globalTitle: isRetired
//         ? 'Could not retire driver'
//         : 'Could not recover driver',
//     });
//   }
// }

// export function useSetDriverRetirement() {
//   const queryClient = useQueryClient();
//   const { revalidate } = useRevalidator();
//   const { toast } = useToast();

//   const mutation = useMutation<void, SupabaseError, SetDriverRetirementVariables>({
//     mutationFn: setDriverRetirement,
//     onSuccess: async (_data, { id }) => {
//       await Promise.all([
//         queryClient.invalidateQueries({ queryKey: ['drivers', 'list'] }),
//         queryClient.invalidateQueries({ queryKey: ['drivers', id] }),
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
