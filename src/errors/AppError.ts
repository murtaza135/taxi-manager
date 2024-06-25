/* eslint-disable @typescript-eslint/lines-between-class-members */
import { ErrorType, ErrorLike } from '@/errors/types';
import { determineAppErrorTypeFromSupabaseError } from '@/errors/utils';

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

  constructor({ type, message = defaultMessages[type], cause }: AppErrorConstructor) {
    // @ts-expect-error https://github.com/tc39/proposal-error-cause
    super(message, { cause: cause instanceof Error ? cause : undefined });

    this.name = this.constructor.name;
    this.type = type;
    this.original = cause;
  }

  public static fromSupabaseError({ error, status, message }: AppErrorFromSupabaseError) {
    const errorType = determineAppErrorTypeFromSupabaseError(error, status);

    return new AppError({
      type: errorType,
      message: message ?? defaultMessages[errorType],
      cause: error,
    });
  }
}

export function isAppError(error: unknown): error is AppError {
  return typeof error === 'object' && error !== null && '__isAppError' in error;
}
