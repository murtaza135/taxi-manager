import { isAuthError } from '@supabase/supabase-js';
import { ErrorType, ErrorLike } from '@/errors/types';
import { AppErrorBuilder } from '@/errors/AppErrorBuilder';

function extractErrorTypeFromSupabaseError(
  error: Error | ErrorLike,
  status?: number,
): ErrorType {
  if (typeof status === 'undefined') return 'unknown';
  if (status === 0 && !window.navigator.onLine) return 'offline';
  if (status === 0 && window.navigator.onLine) return 'server';
  if (status >= 500) return 'server';
  if (status === 429) return 'tooManyRequests';
  if (isAuthError(error) || status === 401) return 'authentication';
  if (status === 400) return 'validation';
  if (status === 403) return 'authorization';
  if (status === 404) return 'notFound';
  if (status === 409) return 'conflict';
  return 'unknown';
}

export function buildAppErrorFromSupabaseError(
  error: Error | ErrorLike,
  status?: number,
) {
  const statusCode = 'status' in error && typeof error.status === 'number'
    ? error.status
    : status;

  const type = extractErrorTypeFromSupabaseError(error, statusCode);

  const code = 'code' in error && typeof error.code === 'string'
    ? error.code
    : null;

  return new AppErrorBuilder({ type, status: statusCode, code, cause: error });
}
