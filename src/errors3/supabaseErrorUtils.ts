import { ErrorLike } from '@/errors3/types';
import { AppErrorBuilder } from '@/errors3/AppErrorBuilder';

function extractStatusCodeFromSupabaseError(
  error: Error | ErrorLike,
  status?: number,
) {
  const statusCode = 'status' in error && typeof error.status === 'number'
    ? error.status
    : status;

  if (statusCode === 0 && window.navigator.onLine) return 500;

  return statusCode;
}

export function buildAppErrorFromSupabaseError(
  error: Error | ErrorLike,
  status?: number,
) {
  const statusCode = extractStatusCodeFromSupabaseError(error, status);
  const code = 'code' in error && typeof error.code === 'string'
    ? error.code
    : null;

  return new AppErrorBuilder({ status: statusCode, code, cause: error });
}
