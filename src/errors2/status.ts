import type { XOR } from 'ts-essentials';
import { Prettify } from '@/types/utils';

const statusCodes = {
  ClientOffline: 0,
  BadRequest: 400,
  Unauthorized: 401,
  Forbidden: 403,
  NotFound: 404,
  Conflict: 409,
  TooManyRequests: 429,
  InternalServerError: 500,
  ServiceUnavailable: 503,
} as const;

const statusTexts = {
  0: 'ClientOffline',
  400: 'BadRequest',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'NotFound',
  409: 'Conflict',
  429: 'TooManyRequests',
  500: 'InternalServerError',
  503: 'ServiceUnavailable',
} as const;

export type StatusText = keyof typeof statusCodes;

export type StatusCode = typeof statusCodes[StatusText];

export type StatusObject = {
  [K in StatusText]: { statusText: K; statusCode: typeof statusCodes[K]; }
}[StatusText];

export type MaybePartialStatusObject = Prettify<
  StatusObject | XOR<
    { statusText: StatusText; },
    { statusCode: StatusCode; }
  >
>;

export function status(statusText: StatusText): StatusCode;
export function status(statusCode: StatusCode): StatusText;
export function status(value: StatusText | StatusCode) {
  if (typeof value === 'string') {
    return statusCodes[value];
  }

  return statusTexts[value];
}
