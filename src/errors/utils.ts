import { isAuthError } from '@supabase/supabase-js';
import { ErrorLike, ErrorDetails } from '@/errors/types';
import { ErrorType } from '@/errors/constants';

export function extractErrorDetailsFromSupabaseError(
  error: Error | ErrorLike,
  status?: number,
): ErrorDetails {
  return {
    type: 'auth',
    statusText: 'Unauthorized',
    status: 401,
    code: '23500',
    cause: error,
  };
}

// export function determineAppErrorTypeFromSupabaseError(
//   error: Error | ErrorLike,
//   status?: number,
// ): ErrorType {
//   // a "Failed to fetch" message signifies some sort of server error
//   // TODO what about CLIENT_OFFLINE error?
//   if (error.message.includes('Failed to fetch')) return 'SERVER_OFFLINE';

//   // (1) if it is a supabase auth error
//   // (2) or network status code made during a supabase --database-- call equals 401
//   // (3) or network status code made during a supabase --storage-- call equals 401
//   const isSupabaseAuthError = isAuthError(error)
//     || status === 401
//     || (error && 'status' in error && error.status === 401);
//   if (isSupabaseAuthError) return 'auth';

//   isAuthError(error) && error.code === ""

//   // general app error
//   return 'app';
// }

export function determineAppErrorTypeFromSupabaseError(
  error: Error | ErrorLike,
  status?: number,
): 'server' | 'auth' | 'app' {
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
