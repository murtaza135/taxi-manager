import { PostgrestError, AuthError, isAuthError } from '@supabase/supabase-js';
import { ErrorLike, APIErrorLike, ErrorType } from '@/errors/types';

export function isErrorLike(error: unknown): error is ErrorLike {
  return !!error
    && typeof error === 'object'
    && 'message' in error
    && typeof error.message === 'string';
}

export function isAPIErrorLike(error: unknown): error is APIErrorLike {
  return isErrorLike(error)
    && 'status' in error
    && typeof error.status === 'number';
}

export function extractErrorTypeFromSupabaseError(
  error: AuthError | PostgrestError | Error,
  status?: number | null | undefined,
): ErrorType {
  if (status === null || status === undefined) return 'unknown';
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
