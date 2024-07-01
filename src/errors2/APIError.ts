import { AppError, AppErrorConstructor } from '@/errors2/AppError';
import { status, StatusCode, StatusText, MaybePartialStatusObject } from '@/errors2/status';
import { ErrorDetails } from '@/errors2/errorDetails';
import { Prettify } from '@/types/utils';

export type APIErrorConstructor = Prettify<
  AppErrorConstructor & MaybePartialStatusObject
>;

export type FromErrorDetailsArguments = Prettify<
  Omit<AppErrorConstructor, 'code' | 'cause'>
  & { errorDetails: ErrorDetails; }
>;

// export type APIErrorConstructorWithErrorDetails = Prettify<

//   >;

export class APIError extends AppError {
  /**
   * HTTP Status Code received from network response,
   * which corresponds to the HTTP Status Text below.
   *
   * NOTE: This should not be confused with the `code` property,
   * which is a custom error code that has nothing to do with
   * http status codes.
   */
  public readonly statusCode: StatusCode;

  /**
   * HTTP Status Text received from network response,
   * which corresponds to the HTTP Status Code above.
   */
  public readonly statusText: StatusText;

  constructor({ statusText, statusCode, ...rest }: APIErrorConstructor) {
    super(rest);
    this.name = 'APIError';
    this.statusText = statusText ?? status(statusCode);
    this.statusCode = statusCode ?? status(statusText);
  }

  public static fromErrorDetails({ message, hint, errorDetails }: FromErrorDetailsArguments) {
    return new APIError({ message, hint, ...errorDetails });
  }
}
