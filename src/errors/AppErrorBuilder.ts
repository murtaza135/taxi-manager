import { ErrorLike } from '@/errors/types';
import { AppError, AppErrorConstructor } from '@/errors/AppError';
import { Prettify } from '@/types/utils';

export type AppErrorBuilderConstructor = Prettify<
  Omit<AppErrorConstructor, 'title' | 'description' | 'cause'> & {
    cause?: Error | ErrorLike | null | undefined;
  }
>;

export class AppErrorBuilder {
  /**
   * A title message describing what the error is.
   * Should be user-friendly, such that it can be displayed
   * to the user on an error screen.
   */
  protected title: string = 'Something went wrong';

  /**
   * The global description will be used when a custom description
   * from `statusCodeToDescriptionMap` cannot be found
   */
  protected globalDescription?: string;

  /**
   * When a valid HTTP status code and a corresponding error description
   * is given via `addDescription`, it will be stored in this map
   */
  protected statusCodeToDescriptionMap: Record<number, string | undefined> = {};

  /**
   * HTTP status code received from network response.
   */
  protected status?: AppErrorBuilderConstructor['status'];

  /**
   * A custom error code that can be used for debugging.
   */
  protected code?: AppErrorBuilderConstructor['code'];

  protected cause?: Exclude<AppErrorBuilderConstructor['cause'], ErrorLike>;

  constructor({ status, code, cause }: AppErrorBuilderConstructor) {
    this.status = status;
    this.code = code;
    this.cause = cause && !(cause instanceof Error)
      ? new Error(cause.message)
      : cause;
  }

  public setTitle(title: string) {
    this.title = title;
    return this;
  }

  public addDescription(globalDescription: string): this;
  public addDescription(status: number, description: string): this;
  public addDescription(arg1: string | number, arg2?: string): this {
    // set globalDescription
    if (typeof arg1 === 'string' && typeof arg2 === 'undefined') {
      this.globalDescription = arg1;
      return this;
    }

    // set description associated with a particular status code
    if (typeof arg1 === 'number' && typeof arg2 === 'string') {
      this.statusCodeToDescriptionMap[arg1] = arg2;
      return this;
    }

    throw new Error('Invalid `addDescription` arguments');
  }

  private determineDescription() {
    if (this.status) {
      return this.statusCodeToDescriptionMap[this.status] ?? this.globalDescription;
    }

    return this.globalDescription;
  }

  public build() {
    return new AppError({
      title: this.title,
      description: this.determineDescription(),
      status: this.status,
      code: this.code,
      cause: this.cause,
    });
  }
}
