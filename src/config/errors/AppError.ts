/* eslint-disable @typescript-eslint/lines-between-class-members */
import { isAuthError } from '@supabase/supabase-js';
import { ErrorType, ErrorLike } from '@/config/errors/types';

export type AppErrorConstructor = {
  type: ErrorType;
  message?: string;
  cause?: Error | ErrorLike;
};

export type AppErrorFromSupabaseError = {
  error: Error | ErrorLike;
  status?: number;
  message?: string;
};

const defaultMessages: Record<ErrorType, string> = {
  app: 'Something went wrong',
  auth: 'Please login again',
  server: 'Something went wrong',
};

export class AppError extends Error {
  public readonly type: AppErrorConstructor['type'];
  protected readonly original: AppErrorConstructor['cause'];
  protected __isAppError = true;

  constructor({ type, message, cause }: AppErrorConstructor) {
    const messageOfType = message ?? defaultMessages[type];

    if (cause instanceof Error) {
      // @ts-expect-error https://github.com/tc39/proposal-error-cause
      super(messageOfType, { cause });
    } else {
      super(messageOfType);
    }

    this.name = this.constructor.name;
    this.type = type;
    this.original = cause;
  }

  public static fromSupabaseError({ error, status, message }: AppErrorFromSupabaseError): AppError {
    // a "Failed to fetch" message signifies some sort of server error
    if (error.message.includes('Failed to fetch')) {
      return new AppError({
        message: message ?? defaultMessages.server,
        type: 'server',
        cause: error,
      });
    }

    // (1) if it is a supabase auth error
    // (2) or network status code made during a supabase --database-- call equals 401
    // (3) or network status code made during a supabase --storage-- call equals 401
    const isSupabaseAuthError = isAuthError(error)
      || status === 401
      || (error && 'status' in error && error.status === 401);

    if (isSupabaseAuthError) {
      return new AppError({
        message: message ?? defaultMessages.auth,
        type: 'auth',
        cause: error,
      });
    }

    // general app error
    return new AppError({
      message: message ?? defaultMessages.app,
      type: 'app',
      cause: error,
    });
  }
}

export function isAppError(error: unknown): error is AppError {
  return typeof error === 'object' && error !== null && '__isAppError' in error;
}
