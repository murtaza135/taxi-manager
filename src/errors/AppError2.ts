/* eslint-disable @typescript-eslint/lines-between-class-members */
import type { XOR } from 'ts-essentials';
import { ErrorDetails, ErrorDetailsWithOptionalStatus, ErrorLike, statusesMap } from '@/errors/types';
// import { determineAppErrorTypeFromSupabaseError } from '@/errors/utils';
import { defaultMessages } from '@/errors/constants';

type BaseAppErrorConstructor = {
  title: string;
  message?: string;
  fields?: Record<string, string>;
};

type AppErrorConstructorWithErrorDetails = BaseAppErrorConstructor & {
  errorDetails: ErrorDetails;
};

type AppErrorConstructorWithErrorProperties =
  BaseAppErrorConstructor
  & ErrorDetailsWithOptionalStatus;

export type AppErrorConstructor = XOR<
  AppErrorConstructorWithErrorDetails,
  AppErrorConstructorWithErrorProperties
>;

const x: AppErrorConstructor = {
  title: 'lol',
  type: 'auth',
  statusText: 'Forbidden',
};

export class AppError extends Error {
  public readonly statusText: AppErrorConstructor['statusText'];
  public readonly status: AppErrorConstructor['status'];
  public readonly type: AppErrorConstructor['type'];
  public readonly code: AppErrorConstructor['code'];
  public readonly title: AppErrorConstructor['title'];
  public readonly fields: AppErrorConstructor['fields'];
  protected readonly original: AppErrorConstructor['cause'];
  protected readonly __isAppError = true;

  constructor({
    errorDetails,
    statusText,
    status,
    type,
    code,
    title,
    message,
    fields,
    cause,
  }: AppErrorConstructor) {
    const errorCauseBase = errorDetails?.cause ?? cause;
    const errorCause = errorCauseBase instanceof Error ? errorCauseBase : undefined;

    // @ts-expect-error https://github.com/tc39/proposal-error-cause
    super(message, { cause: errorCause });

    this.name = this.constructor.name;
    this.statusText = errorDetails?.statusText
      ?? statusText
      ?? statusesMap.getReverse(errorDetails?.status)
      ?? statusesMap.getReverse(status);
    this.status = statusesMap.get(errorDetails?.statusText)
      ?? statusesMap.get(statusText)
      ?? errorDetails?.status
      ?? status;
    this.type = errorDetails?.type ?? type;
    this.code = errorDetails?.code ?? code;
    this.title = title;
    this.fields = fields;
    this.original = cause;
  }
}

export function isAppError(error: unknown): error is AppError {
  return typeof error === 'object' && error !== null && '__isAppError' in error;
}

// const temp = new AppError({});
