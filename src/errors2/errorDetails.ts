import { MaybePartialStatusObject } from '@/errors2/status';
import { ErrorLike } from '@/errors2/types';
import { Prettify } from '@/types/utils';

export type ErrorDetails = Prettify<
  MaybePartialStatusObject & {
    code?: string;
    cause?: Error | ErrorLike;
  }
>;

export function extractErrorDetailsFromSupabaseError(
  error: Error | ErrorLike,
  status?: number,
): ErrorDetails {
  return {
    statusText: 'Unauthorized',
    statusCode: 401,
    code: '23500',
    cause: error,
  };
}
