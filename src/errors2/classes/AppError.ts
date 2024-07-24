export type AppErrorConstructor = {
  title: string;
  description?: string | null | undefined;
  debugMessage?: string | null | undefined;
  cause?: Error | null | undefined;
};

export class AppError extends Error {
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

  constructor({ title, description, debugMessage, cause }: AppErrorConstructor) {
    // @ts-expect-error https://github.com/tc39/proposal-error-cause
    super(debugMessage ?? title, { cause });

    this.name = 'AppError';
    this.title = title;
    this.description = description;
  }
}
