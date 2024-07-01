import type { XOR } from 'ts-essentials';
import { ImmutableTwoWayMap } from '@/utils/ImmutableTwoWayMap';

export type ErrorType = 'auth' | 'server' | 'app';
// export type ErrorType = 'auth' | 'resource' | 'offline' | 'other';

export type ErrorLike = {
  [key: string]: unknown;
  message: string;
};

const statuses = {
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

export const statusesMap = new ImmutableTwoWayMap(statuses);

type ConvertToStatusUnions<T extends Record<string, number>> = {
  [K in keyof T]: { statusText: K; status: T[K]; }
}[keyof T];

export type StatusObject = ConvertToStatusUnions<typeof statuses> | {
  statusText?: null | undefined,
  status?: null | undefined;
};

// export type StatusObject = {
//   statusText: 'ClientOffline',
//   status: 0;
// } | {
//   statusText: 'BadRequest',
//   status: 400;
// } | {
//   statusText: 'Unauthorized',
//   status: 401;
// } | {
//   statusText: 'Forbidden',
//   status: 403;
// } | {
//   statusText: 'NotFound',
//   status: 404;
// } | {
//   statusText: 'Conflict',
//   status: 409;
// } | {
//   statusText: 'TooManyRequests',
//   status: 429;
// } | {
//   statusText: 'InternalServerError',
//   status: 500;
// } | {
//   statusText: 'ServiceUnavailable',
//   status: 503;
// } | {
//   statusText?: null | undefined,
//   status?: null | undefined;
// };

export type StatusText = StatusObject['statusText'];
export type Status = StatusObject['status'];

export type BaseErrorProperties = {
  type: ErrorType;
  code?: string;
  cause?: Error | ErrorLike;
};

export type ErrorDetails = BaseErrorProperties & StatusObject;
export type ErrorDetailsWithOptionalStatus = BaseErrorProperties & Partial<StatusObject>;
// export type ErrorDetailsWithOptionalStatus = XOR<
//   BaseErrorProperties & { statusText: StatusText; },
//   BaseErrorProperties & { status: Status; }
// >;
