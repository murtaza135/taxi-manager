import { createClient } from '@supabase/supabase-js';
import { config } from '@/config/config';
import { Database } from '@/types/database';
import { AppError } from '@/config/errors/AppError';
import { determineErrorType } from '@/config/errors/utils';
import { ErrorLike } from '@/config/errors/types';

export const supabaseClient = createClient<Database>(
  config.VITE_SUPABASE_URL,
  config.VITE_SUPABASE_ANON_KEY,
);

export type SupabaseClient = typeof supabaseClient;

type SupabaseBaseReturnType = {
  data: unknown;
  error: Error | ErrorLike | null;
  status?: number;
  statusText?: string;
  count?: number | null;
};

type SupabaseDataReturnType<T extends SupabaseBaseReturnType> =
  Omit<T, 'data' | 'error'> & {
    data: NonNullable<T['data']>;
    error: null;
  };

type SupabaseErrorReturnType<T extends SupabaseBaseReturnType> =
  Omit<T, 'data' | 'error'> & {
    data: null;
    error: AppError;
  };

type SupabaseReturnType<T extends SupabaseBaseReturnType> =
  Omit<T, 'data' | 'error'> & ({
    data: NonNullable<T['data']>;
    error: null;
  } | {
    data: null;
    error: AppError;
  });

type SupabaseFn<T extends SupabaseBaseReturnType> =
  (client: SupabaseClient) => PromiseLike<T>;

export type Options = {
  throwError?: boolean;
  appErrorMessage?: string;
  authErrorMessage?: string;
  serverErrorMessage?: string;
};

export async function supabase<T extends SupabaseBaseReturnType>(
  fn: SupabaseFn<T>,
  options: Options & { throwError: true; },
): Promise<SupabaseDataReturnType<T>>;
export async function supabase<T extends SupabaseBaseReturnType>(
  fn: SupabaseFn<T>,
  options: Options & { throwError?: false; },
): Promise<SupabaseReturnType<T>>;
export async function supabase<T extends SupabaseBaseReturnType>(
  fn: SupabaseFn<T>,
  options: Options,
): Promise<SupabaseReturnType<T>>;
export async function supabase<T extends SupabaseBaseReturnType>(
  fn: SupabaseFn<T>,
  options: Options,
) {
  const value = await fn(supabaseClient);

  if (value.error) {
    const errorType = determineErrorType(value.error, value.status);

    if (errorType === 'server') {
      const error = new AppError({
        message: options.serverErrorMessage ?? 'Something went wrong',
        type: errorType,
        cause: value.error,
      });
      if (options.throwError) throw error;
      return { ...value, error } as SupabaseReturnType<T>;
    }

    if (errorType === 'auth') {
      const error = new AppError({
        message: options.authErrorMessage ?? 'You need to login',
        type: errorType,
        cause: value.error,
      });
      if (options.throwError) throw error;
      return { ...value, error } as SupabaseReturnType<T>;
    }

    const error = new AppError({
      message: options.appErrorMessage ?? 'Something went wrong',
      type: errorType,
      cause: value.error,
    });
    if (options.throwError) throw error;
    return { ...value, error } as SupabaseReturnType<T>;
  }

  return value as SupabaseDataReturnType<T>;
}
