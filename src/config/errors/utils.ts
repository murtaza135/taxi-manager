import { isAuthError } from '@supabase/supabase-js';
import { ErrorType, ErrorLike } from '@/config/errors/types';

export function determineAppErrorTypeFromSupabaseError(
  error: Error | ErrorLike,
  status?: number,
): ErrorType {
  // a "Failed to fetch" message signifies some sort of server error
  if (error.message.includes('Failed to fetch')) return 'server';

  // (1) if it is a supabase auth error
  // (2) or network status code made during a supabase --database-- call equals 401
  // (3) or network status code made during a supabase --storage-- call equals 401
  const isSupabaseAuthError = isAuthError(error)
    || status === 401
    || (error && 'status' in error && error.status === 401);
  if (isSupabaseAuthError) return 'auth';

  // general app error
  return 'app';
}
