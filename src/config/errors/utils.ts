import { isAuthError } from '@supabase/supabase-js';
import { ErrorType, ErrorLike } from '@/config/errors/types';

export function determineErrorType(
  error: Error | ErrorLike,
  status?: number,
): ErrorType {
  // a "Failed to fetch" message signifies some sort of server error
  if (error.message.includes('Failed to fetch')) {
    return 'server';
  }

  // if it is a supabase auth error
  if (isAuthError(error)) {
    return 'auth';
  }

  // if network status code made during a supabase --database-- call equals 401
  if (status === 401) {
    return 'auth';
  }

  // if network status code made during a supabase --storage-- call equals 401
  if ('status' in error && error.status === 401) {
    return 'auth';
  }

  return 'app';
}
