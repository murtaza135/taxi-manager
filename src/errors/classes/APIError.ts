import { AppError, AppErrorConstructor } from '@/errors/classes/AppError';
import { Prettify } from '@/types/utils';

export type APIErrorConstructor = Prettify<
  AppErrorConstructor & {
    status?: number | null | undefined;
  }
>;

export class APIError extends AppError {
  /**
   * HTTP status code received from network response.
   */
  public readonly status?: number | null | undefined;

  constructor({
    title,
    description,
    type,
    debugMessage,
    status,
    context,
    cause,
  }: APIErrorConstructor) {
    super({ title, description, type, debugMessage, context, cause });

    this.name = 'APIError';
    this.status = status;
  }
}
