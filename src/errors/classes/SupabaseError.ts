import { PostgrestError, AuthError } from '@supabase/supabase-js';
import { APIError } from '@/errors/classes/APIError';
import { ErrorType } from '@/errors/types';
import { extractStatusCodeFromSupabaseError, extractErrorTypeFromSupabaseError } from '@/errors/utils';
import { errorTitles, errorDescriptions } from '@/errors/errorMessages';

export type SupabaseErrorConstructorOptions = {
  globalTitle?: string;
  globalDescription?: string;
  titles?: Partial<Record<ErrorType, string>>;
  descriptions?: Partial<Record<ErrorType, string>>;
  context?: Partial<Record<string, unknown>>;
};

export class SupabaseError extends APIError {
  constructor(
    // TODO Error was originally ErrorLike, the remaining code is behaving as though it is still an ErrorLike, determine if Error is suitable and make the appropriate changes to the remaining code
    error: AuthError | PostgrestError | Error,
    status?: number | null | undefined,
    options?: SupabaseErrorConstructorOptions,
  ) {
    const statusCode = extractStatusCodeFromSupabaseError(error, status);
    const type = extractErrorTypeFromSupabaseError(error, statusCode);

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
      context: options?.context,
    });

    this.name = 'SupabaseError';
  }
}
