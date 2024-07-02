import { ErrorType, ErrorLike } from '@/errors/types';
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
   * from `errorTypeToDescriptionMap` cannot be found
   */
  protected globalDescription?: string;

  /**
   * When an ErrorType and corresponding error description
   * are given via `setDescription`, it will be stored in this map
   */
  protected errorTypeToDescriptionMap: Partial<Record<ErrorType, string>> = {};

  /**
   * The type of error
   */
  protected readonly type: AppErrorBuilderConstructor['type'];

  /**
   * HTTP status code received from network response.
   */
  protected status?: AppErrorBuilderConstructor['status'];

  /**
   * A custom error code that can be used for debugging.
   */
  protected code?: AppErrorBuilderConstructor['code'];

  protected cause?: Exclude<AppErrorBuilderConstructor['cause'], ErrorLike>;

  constructor({ type, status, code, cause }: AppErrorBuilderConstructor) {
    this.type = type;
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

  public setDescription(type: ErrorType, description: string): this;
  public setDescription(globalDescription: string): this;
  public setDescription(arg1: string, arg2?: string): this {
    // set globalDescription
    if (typeof arg1 === 'string' && typeof arg2 === 'undefined') {
      this.globalDescription = arg1;
      return this;
    }

    // set description associated with a particular status code
    if (typeof arg1 === 'string' && typeof arg2 === 'string') {
      this.errorTypeToDescriptionMap[arg1 as ErrorType] = arg2;
      return this;
    }

    throw new Error('Invalid `setDescription` arguments');
  }

  public build() {
    return new AppError({
      type: this.type,
      title: this.title,
      description: this.errorTypeToDescriptionMap[this.type] ?? this.globalDescription,
      status: this.status,
      code: this.code,
      cause: this.cause,
    });
  }
}
