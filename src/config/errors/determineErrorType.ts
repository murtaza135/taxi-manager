import { isAuthError } from '@supabase/supabase-js';

type ErrorType = 'AppError' | 'AuthError' | 'ServerError';

export function determineErrorType(error: Error): ErrorType;
export function determineErrorType(status: number): ErrorType;
export function determineErrorType(arg: Error | number): ErrorType {
  if (typeof arg === 'number') {
    if (arg === 401 || arg === 403) return 'AuthError';
    return 'AppError';
  }

  if (arg.message.includes('Failed to fetch')) {
    return 'ServerError';
  }

  if (isAuthError(arg)) {
    return 'AuthError';
  }

  if ('status' in arg && (arg.status === 401 || arg.status === 403)) {
    return 'AuthError';
  }

  return 'AppError';
}
