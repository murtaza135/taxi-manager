/* eslint-disable @typescript-eslint/lines-between-class-members */
import { isAuthError } from '@supabase/supabase-js';
import { AppError } from '@/config/errors/AppError';
import { ErrorLike } from '@/config/errors/types';
import { queryClient } from '@/config/api/queryClient';
import { config } from '@/config/config';

export class AppErrorBuilder {
  private error: Error | ErrorLike;
  private status?: number;
  private appErrorMessage: string = 'Something went wrong';
  private authErrorMessage: string = 'You need to login';
  private serverErrorMessage: string = 'Something went wrong';
  private shouldLogoutOnAuthError: boolean = false;

  constructor(error: Error | ErrorLike, status?: number) {
    this.error = error;
    this.status = status;
  }

  public setAppErrorMessage(message: string) {
    this.appErrorMessage = message;
    return this;
  }

  public setAuthErrorMessage(message: string) {
    this.authErrorMessage = message;
    return this;
  }

  public setServerErrorMessage(message: string) {
    this.serverErrorMessage = message;
    return this;
  }

  public logoutOnAuthError() {
    this.shouldLogoutOnAuthError = true;
    return this;
  }

  public async build(): Promise<AppError> {
    // a "Failed to fetch" message signifies some sort of server error
    if (this.error.message.includes('Failed to fetch')) {
      return new AppError({
        message: this.serverErrorMessage,
        type: 'server',
        cause: this.error,
      });
    }

    // (1) if it is a supabase auth error
    // (2) or network status code made during a supabase --database-- call equals 401
    // (3) or network status code made during a supabase --storage-- call equals 401
    const isSupabaseAuthError = isAuthError(this.error)
      || this.status === 401
      || ('status' in this.error && this.error.status === 401);

    if (isSupabaseAuthError) {
      if (this.shouldLogoutOnAuthError) {
        localStorage.removeItem(config.SUPABASE.authKey);
        await queryClient.invalidateQueries({ queryKey: ['auth'] });
      }

      return new AppError({
        message: this.authErrorMessage,
        type: 'auth',
        cause: this.error,
      });
    }

    return new AppError({
      message: this.appErrorMessage,
      type: 'app',
      cause: this.error,
    });
  }
}

export function buildAppError(error: Error | ErrorLike, status?: number) {
  return new AppErrorBuilder(error, status);
}
