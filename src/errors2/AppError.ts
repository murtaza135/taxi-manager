import { ErrorLike } from '@/errors2/types';

export type AppErrorConstructor = {
  message: string;
  hint?: string | null | undefined;
  code?: string | null | undefined;
  cause?: Error | ErrorLike | null;
};

export class AppError extends Error {
  /**
   * Additional information that can be displayed to the user or used for debugging purposes
   */
  public readonly hint?: string | null | undefined;

  /**
   * A custom error code that can be used for debugging
   */
  public readonly code?: string | null | undefined;

  constructor({ message, hint, code, cause }: AppErrorConstructor) {
    if (cause && cause instanceof Error) {
      // @ts-expect-error https://github.com/tc39/proposal-error-cause
      super(message, { cause });
    } else if (cause) {
      // @ts-expect-error https://github.com/tc39/proposal-error-cause
      super(message, { cause: new Error(cause.message) });
    } else {
      super(message);
    }

    this.name = 'AppError';
    this.hint = hint;
    this.code = code;
  }
}
