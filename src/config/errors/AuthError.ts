import { AppError, AppErrorConstructor } from '@/config/errors/AppError';

export type AuthErrorConstructor = AppErrorConstructor;

export class AuthError extends AppError {
  protected __isAuthError = true;

  constructor({ message, code }: AuthErrorConstructor) {
    super({ message, code });
  }
}

export function isAuthError(error: unknown): error is AppError {
  return typeof error === 'object' && error !== null && '__isAuthError' in error;
}
