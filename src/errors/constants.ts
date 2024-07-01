export type ErrorType =
  | 'BAD_REQUEST' | 'UNAUTHORIZED' | 'FORBIDDEN'
  | 'NOT_FOUND' | 'CONFLICT' | 'TOO_MANY_REQUESTS'
  | 'SERVER' | 'CLIENT_OFFLINE' | 'SERVER_OFFLINE';

export const defaultMessages: Record<ErrorType, string> = {
  BAD_REQUEST: 'Looks like you entered invalid details. Please try again.',
  UNAUTHORIZED: 'You must be logged in!',
  FORBIDDEN: 'You are not allowed to go here!',
  NOT_FOUND: 'We looked everywhere for this resource, but we couldn\'t find it!',
  CONFLICT: 'Looks like this resource already exists!',
  TOO_MANY_REQUESTS: 'You have attemped to access this resource too many times. Please try again later.',
  SERVER: 'Looks like things didn\'t go as planned. Maybe you would like to retry?',
  CLIENT_OFFLINE: 'You\'re offline! Please reconnect to the internet to continue using the app.',
  SERVER_OFFLINE: 'Looks like our server is down! Hopefully we\'ll have it fixed soon. But in the meantime, please try again later.',
} as const;
