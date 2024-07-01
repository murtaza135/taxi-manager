import { ErrorLike } from '@/errors/types';
import { AppError, AppErrorConstructor } from '@/errors/AppError';
import { Prettify } from '@/types/utils';

export type AppErrorBuilderConstructor = Prettify<
  Omit<AppErrorConstructor, 'message' | 'hint' | 'cause'> & {
    cause?: Error | ErrorLike | null | undefined;
  }
>;

export class AppErrorBuilder {
  /**
   * The global error message will be used when a custom message
   * from `statusCodeToMessageMap` cannot be found
   */
  protected globalMessage: string = 'Something went wrong';

  /**
   * When a valid HTTP status code and a corresponding error message
   * is given via `addMessage`, it will be stored in this map
   */
  protected statusCodeToMessageMap: Record<number, string | undefined> = {};

  /**
   * The global error hint will be used when a custom hint
   * from `statusCodeToHintMap` cannot be found
   */
  protected globalHint?: string;

  /**
   * When a valid HTTP status code and a corresponding error hint
   * is given via `addHint`, it will be stored in this map
   */
  protected statusCodeToHintMap: Record<number, string | undefined> = {};

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

  public addGlobalMessage(message: string) {
    this.globalMessage = message;
    return this;
  }

  public addMessage(status: number, message: string) {
    this.statusCodeToMessageMap[status] = message;
    return this;
  }

  public addGlobalHint(hint: string) {
    this.globalHint = hint;
    return this;
  }

  public addHint(status: number, hint: string) {
    this.statusCodeToHintMap[status] = hint;
    return this;
  }

  private extractMessage() {
    if (this.status) {
      return this.statusCodeToMessageMap[this.status] ?? this.globalMessage;
    }

    return this.globalMessage;
  }

  private extractHint() {
    if (this.status) {
      return this.statusCodeToHintMap[this.status] ?? this.globalHint;
    }

    return this.globalHint;
  }

  public build() {
    return new AppError({
      message: this.extractMessage(),
      hint: this.extractHint(),
      status: this.status,
      code: this.code,
      cause: this.cause,
    });
  }
}
