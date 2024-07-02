import { ErrorType } from '@/errors/types';

export type AppErrorConstructor = {
  type: ErrorType;
  title: string;
  description?: string | null | undefined;
  status?: number | null | undefined;
  code?: string | null | undefined;
  cause?: Error | null | undefined;
};

export class AppError extends Error {
  /**
   * The type of error
   */
  public readonly type: ErrorType;

  /**
   * A title message describing what the error is.
   * Should be user-friendly, such that it can be displayed
   * to the user on an error screen.
   */
  public readonly title: string;

  /**
   * Additional information that can be displayed
   * to the user or used for debugging purposes.
   */
  public readonly description?: string | null | undefined;

  /**
   * HTTP status code received from network response.
   */
  public readonly status?: number | null | undefined;

  /**
   * A custom error code that can be used for debugging.
   */
  public readonly code?: string | null | undefined;

  constructor({ type, title, description, status, code, cause }: AppErrorConstructor) {
    // @ts-expect-error https://github.com/tc39/proposal-error-cause
    super(title, { cause });

    this.name = 'AppError';
    this.type = type;
    this.title = title;
    this.description = description;
    this.status = status;
    this.code = code;
  }
}
