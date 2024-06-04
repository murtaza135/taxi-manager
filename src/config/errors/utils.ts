import { isAuthError } from '@supabase/supabase-js';
import { ErrorType, ErrorLike } from '@/config/errors/types';
import { AppError } from '@/config/errors/AppError';
import { queryClient } from '@/config/api/queryClient';
import { config } from '@/config/config';

export type Options = {
  appErrorMessage?: string;
  authErrorMessage?: string;
  serverErrorMessage?: string;
  logoutOnAuthError?: boolean;
};

const defaultOptions: Options = {

};

export async function generateAppError(
  error: Error | ErrorLike,
  status?: number | null | undefined,
  options?: Options,
) {
  // a "Failed to fetch" message signifies some sort of server error
  if (error.message.includes('Failed to fetch')) {
    const message = options?.serverErrorMessage ?? 'Something went wrong';
    throw new AppError({ message, type: 'server', cause: error });
  }

  const isSupabaseAuthError = isAuthError(error)
    || status === 401
    || ('status' in error && error.status === 401);

  if (isSupabaseAuthError) {
    localStorage.removeItem(config.SUPABASE.authKey);
    await queryClient.invalidateQueries({ queryKey: ['auth'] });
    const message = options?.authErrorMessage ?? 'You need to login';
    throw new AppError({ message, type: 'auth', cause: error });
  }

  // // if it is a supabase auth error
  // if (isAuthError(error)) {
  //   return 'auth';
  // }

  // // if network status code made during a supabase --database-- call equals 401
  // if (status === 401) {
  //   return 'auth';
  // }

  // // if network status code made during a supabase --storage-- call equals 401
  // if ('status' in error && error.status === 401) {
  //   return 'auth';
  // }

  const message = options?.appErrorMessage ?? 'Something went wrong';
  throw new AppError({ message, type: 'app', cause: error });
}

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
