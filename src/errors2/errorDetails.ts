import { AuthError, isAuthError, PostgrestError } from '@supabase/supabase-js';
import { isStatusCode, MaybePartialStatusObject, status as statusFn } from '@/errors2/status';
import { ErrorLike } from '@/errors2/types';
import { Prettify } from '@/types/utils';
import { StorageError } from '@/types/supabase/storage-js';

export type ErrorDetails = Prettify<
  MaybePartialStatusObject & {
    code?: string | null | undefined;
    cause?: Error | ErrorLike | null | undefined;
  }
>;

export function extractErrorDetailsFromSupabaseError(
  error: AuthError | PostgrestError | StorageError | Error | ErrorLike,
  status?: number,
): ErrorDetails | null {
  const statusCode = 'status' in error && typeof error.status === 'number'
    ? error.status
    : status;
  if (!statusCode || !isStatusCode(statusCode)) return null;

  const statusText = statusFn(statusCode);

  const code = 'code' in error && typeof error.code === 'string'
    ? error.code
    : undefined;

  if (statusCode === 0 && !window.navigator.onLine) {
    return {
      statusText: 'ClientOffline',
      statusCode,
      code,
      cause: error,
    };
  }

  if (statusCode === 0) {
    return {
      statusText: 'InternalServerError',
      statusCode: 500,
      code,
      cause: error,
    };
  }

  if (isAuthError(error) && statusCode === 429) {
    return {
      statusText: 'TooManyRequests',
      statusCode,
      code,
      cause: error,
    };
  }

  return {
    statusText: 'Unauthorized',
    statusCode: 401,
    code: '23500',
    cause: error,
  };
}

// console.log(error?.status);
// console.log(window.navigator.onLine);
