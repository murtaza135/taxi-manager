/* eslint-disable @typescript-eslint/lines-between-class-members */
import { ErrorType, ErrorLike } from '@/config/errors/types';

export type AppErrorConstructor = {
  message: string;
  type?: ErrorType;
  cause?: Error | ErrorLike;
};

export class AppError extends Error {
  public readonly type: AppErrorConstructor['type'];
  protected readonly original: AppErrorConstructor['cause'];
  protected __isAppError = true;

  constructor({ message, type = 'app', cause }: AppErrorConstructor) {
    // @ts-expect-error https://github.com/tc39/proposal-error-cause
    super(message, { cause: cause instanceof Error ? cause : null });

    this.name = this.constructor.name;
    this.type = type;
    this.original = cause;
  }
}

export function isAppError(error: unknown): error is AppError {
  return typeof error === 'object' && error !== null && '__isAppError' in error;
}
