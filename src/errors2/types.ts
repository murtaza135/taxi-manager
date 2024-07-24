export type ErrorType =
  | 'authentication' | 'authorization'
  | 'validation' | 'conflict'
  | 'notFound' | 'tooManyRequests'
  | 'server' | 'offline' | 'unknown';

export type ErrorLike = {
  [key: string]: unknown;
  message: string;
};

export type APIErrorLike = {
  [key: string]: unknown;
  message: string;
  status: number;
};
