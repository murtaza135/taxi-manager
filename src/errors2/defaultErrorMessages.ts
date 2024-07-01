import { StatusText } from '@/errors2/status';

export const defaultMessages: Record<StatusText, string> = {
  ClientOffline: 'You\'re offline! Please reconnect to the internet to continue using the app.',
  BadRequest: 'Looks like you entered invalid details. Please try again.',
  Unauthorized: 'You must be logged in!',
  Forbidden: 'You are not allowed to go here!',
  NotFound: 'We looked everywhere for this resource, but we couldn\'t find it!',
  Conflict: 'Looks like this resource already exists!',
  TooManyRequests: 'You have attemped to access this resource too many times. Please try again later.',
  InternalServerError: 'Looks like things didn\'t go as planned. Maybe you would like to retry?',
  ServiceUnavailable: 'Looks like our server is down! Hopefully we\'ll have it fixed soon. But in the meantime, please try again later.',
} as const;
