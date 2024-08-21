import { supabase } from '@/config/api/supabaseClient';

const defaultBucket = 'main';
const defaultExpiresIn = 10 * 60; // 10 minutes

type Options = {
  bucket?: string;
  expiresIn?: number;
};

export async function getFile(
  path?: string,
  options?: Options,
): Promise<string | null> {
  if (!path) return null;

  const bucket = options?.bucket ?? defaultBucket;
  const expiresIn = options?.expiresIn ?? defaultExpiresIn;

  const { data } = await supabase
    .storage
    .from(bucket)
    .createSignedUrl(path, expiresIn, { download: true });

  if (!data) return null;
  return data.signedUrl;
}
