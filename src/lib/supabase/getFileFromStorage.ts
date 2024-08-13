// TODO delete
// import { supabase } from '@/config/api/supabaseClient';

// export async function getFileFromStorage(
//   path: string,
//   expiresIn: number = 10 * 60, // 10 minutes
// ): Promise<string | null> {
//   const { data } = await supabase
//     .storage
//     .from('main')
//     .createSignedUrl(path, expiresIn, { download: true });

//   if (!data) return null;

//   return data.signedUrl;
// }
