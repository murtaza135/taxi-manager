export type AppErrorConstructor = {
  message: string;
  hint?: string | null | undefined;
  status?: number | null | undefined;
  code?: string | null | undefined;
  cause?: Error | null | undefined;
};

export class AppError extends Error {
  /**
   * Additional information that can be displayed
   * to the user or used for debugging purposes.
   */
  public readonly hint?: string | null | undefined;

  /**
   * HTTP status code received from network response.
   */
  public readonly status?: number | null | undefined;

  /**
   * A custom error code that can be used for debugging.
   */
  public readonly code?: string | null | undefined;

  constructor({ message, hint, status, code, cause }: AppErrorConstructor) {
    // @ts-expect-error https://github.com/tc39/proposal-error-cause
    super(message, { cause });

    this.name = 'AppError';
    this.hint = hint;
    this.status = status;
    this.code = code;
  }
}
