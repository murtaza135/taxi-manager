export const defaultErrorMessages: Record<number, string> = {
  0: 'You\'re offline! Please reconnect to the internet to continue using the app.',
  400: 'Looks like you entered invalid details. Please try again.',
  401: 'You must be logged in!',
  403: 'You are not allowed to go here!',
  404: 'We looked everywhere for this resource, but we couldn\'t find it!',
  409: 'Looks like this resource already exists!',
  429: 'You have attemped to access this resource too many times. Please try again later.',
  500: 'Looks like things didn\'t go as planned. Maybe you would like to retry?',
  503: 'Looks like our server is down! Hopefully we\'ll have it fixed soon. But in the meantime, please try again later.',
} as const;
