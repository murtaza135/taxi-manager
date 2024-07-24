import { AppError, AppErrorConstructor } from '@/errors2/classes/AppError';
import { ErrorType } from '@/errors2/types';
import { Prettify } from '@/types/utils';

export type APIErrorConstructor = Prettify<
  AppErrorConstructor & {
    type: ErrorType;
    status?: number | null | undefined;
  }
>;

export class APIError extends AppError {
  /**
   * The type of error
   */
  public readonly type: ErrorType;

  /**
   * HTTP status code received from network response.
   */
  public readonly status?: number | null | undefined;

  constructor({
    type,
    title,
    description,
    debugMessage,
    status,
    cause,
  }: APIErrorConstructor) {
    super({ title, description, debugMessage, cause });

    this.name = 'APIError';
    this.type = type;
    this.status = status;
  }
}
