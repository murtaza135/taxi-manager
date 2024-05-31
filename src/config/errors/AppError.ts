type ErrorMessageObject = {
  [key: string]: unknown;
  message: string;
};
export type AppErrorConstructor = {
  message: string;
  code?: string;
  // TODO cause should really only be an Error and nothing else
  cause?: Error | ErrorMessageObject;
};

export class AppError extends Error {
  public readonly code: AppErrorConstructor['code'];

  protected __isAppError = true;

  constructor({ message, code, cause }: AppErrorConstructor) {
    // "Failed to fetch" signifies some sort of server error
    const errorMessage = cause?.message.includes('Failed to fetch')
      ? 'Something went wrong'
      : message;

    // @ts-expect-error https://github.com/tc39/proposal-error-cause
    super(errorMessage, { cause });

    this.name = this.constructor.name;
    this.code = code;
  }
}

export function isAppError(error: unknown): error is AppError {
  return typeof error === 'object' && error !== null && '__isAppError' in error;
}
