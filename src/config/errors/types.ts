export type ErrorType = 'app' | 'auth' | 'server';

export type ErrorLike = {
  [key: string]: unknown;
  message: string;
};
