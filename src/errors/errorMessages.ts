import { ErrorType } from '@/errors/types';

export const errorTitles: Record<ErrorType, string> = {
  offline: 'No Internet Connection',
  validation: 'Invalid Credentials',
  authentication: 'Authentication Error',
  authorization: 'Authorization Error',
  notFound: 'Not Found',
  conflict: 'Resource Already Exists',
  tooManyRequests: 'Too Many Requests',
  server: 'Server Error',
  unknown: 'Oops! Something went wrong!',
} as const;

export const errorDescriptions: Record<ErrorType, string> = {
  offline: 'You\'re offline! Please reconnect to the internet to continue using the app.',
  validation: 'Looks like you entered invalid details. Please try again.',
  authentication: 'You must be logged in!',
  authorization: 'You are not allowed to go here!',
  notFound: 'We looked everywhere for this resource, but we couldn\'t find it!',
  conflict: 'Looks like this resource already exists!',
  tooManyRequests: 'You have attemped to access this resource too many times. Please try again later.',
  server: 'Looks like things didn\'t go as planned. Maybe you would like to retry?',
  unknown: 'Looks like things didn\'t go as planned. Maybe you would like to retry?',
} as const;
