import { PostgrestError, AuthError } from '@supabase/supabase-js';
import { APIError } from '@/errors/classes/APIError';
import { ErrorType, APIErrorLike } from '@/errors/types';
import { extractErrorTypeFromSupabaseError } from '@/errors/utils';
import { errorTitles, errorDescriptions } from '@/errors/errorMessages';

export type SupabaseErrorConstructorOptions = {
  globalTitle?: string;
  globalDescription?: string;
  titles?: Record<ErrorType, string>;
  descriptions?: Record<ErrorType, string>;
};

export class SupabaseError extends APIError {
  constructor(
    error: AuthError | PostgrestError | APIErrorLike,
    status?: number | null | undefined,
    options?: SupabaseErrorConstructorOptions,
  ) {
    const statusCode = 'status' in error && typeof error.status === 'number'
      ? error.status
      : status;

    const type = extractErrorTypeFromSupabaseError(error, status);

    const title = options?.titles?.[type]
      ?? options?.globalTitle
      ?? errorTitles[type];

    const description = options?.descriptions?.[type]
      ?? options?.globalDescription
      ?? errorDescriptions[type];

    const debugMessage = JSON.stringify(error, null, 2);

    const cause = !(error instanceof Error)
      ? new Error(debugMessage)
      : error;

    super({
      title,
      description,
      debugMessage,
      type,
      status: statusCode,
      cause,
    });

    this.name = 'SupabaseError';
  }
}
