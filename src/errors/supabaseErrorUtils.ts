import { isAuthError } from '@supabase/supabase-js';
import { ErrorLike } from '@/errors/types';
import { AppErrorBuilder } from '@/errors/AppErrorBuilder';

function extractStatusCodeFromSupabaseError(
  error: Error | ErrorLike,
  status?: number,
) {
  const statusCode = 'status' in error && typeof error.status === 'number'
    ? error.status
    : status;

  // if statusCode is 0, but user has network connection,
  // assume there is a problem with the server
  if (statusCode === 0 && window.navigator.onLine) return 500;

  // all server errors will return a 500 status
  if (statusCode && statusCode >= 500) return 500;

  // all auth errors (except for 429) will return a 401
  if (isAuthError(error) && error.status !== 429) return 401;

  return statusCode;
}

export function buildAppErrorFromSupabaseError(
  error: Error | ErrorLike,
  status?: number,
) {
  const statusCode = extractStatusCodeFromSupabaseError(error, status);
  const code = 'code' in error && typeof error.code === 'string'
    ? error.code
    : null;

  return new AppErrorBuilder({ status: statusCode, code, cause: error });
}
