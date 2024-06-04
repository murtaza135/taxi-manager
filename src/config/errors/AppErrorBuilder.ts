/* eslint-disable @typescript-eslint/lines-between-class-members */
import { isAuthError } from '@supabase/supabase-js';
import { AppError } from '@/config/errors/AppError';
import { ErrorLike, ErrorType } from '@/config/errors/types';
import { queryClient } from '@/config/api/queryClient';
import { config } from '@/config/config';

type AppErrorBuilderConstructor = {
  type?: ErrorType;
  error?: Error | ErrorLike;
  status?: number;
};

export class AppErrorBuilder {
  private error?: Error | ErrorLike;
  private type?: ErrorType;
  private status?: number;
  private appErrorMessage: string = 'Something went wrong';
  private authErrorMessage: string = 'Please login again';
  private serverErrorMessage: string = 'Something went wrong';
  private shouldDeleteSessionOnAuthError: boolean = false;

  constructor({ type, error, status }: AppErrorBuilderConstructor) {
    this.type = type;
    this.error = error;
    this.status = status;
  }

  public static fromSupabaseError(error: Error | ErrorLike, status?: number) {
    return new AppErrorBuilder({ error, status });
  }

  public static fromType(type: ErrorType) {
    return new AppErrorBuilder({ type });
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

  public deleteSessionOnAuthError() {
    this.shouldDeleteSessionOnAuthError = true;
    return this;
  }

  public async build(): Promise<AppError> {
    // a "Failed to fetch" message signifies some sort of server error
    const isServerError = this.error?.message.includes('Failed to fetch')
      || this.type === 'server';

    if (isServerError) {
      return new AppError({
        message: this.serverErrorMessage,
        type: 'server',
        cause: this.error,
      });
    }

    // (1) if it is a supabase auth error
    // (2) or network status code made during a supabase --database-- call equals 401
    // (3) or network status code made during a supabase --storage-- call equals 401
    // (4) or consumer wants error of type "auth"
    const isSupabaseAuthError = isAuthError(this.error)
      || this.status === 401
      || (this.error && 'status' in this.error && this.error.status === 401)
      || this.type === 'auth';

    if (isSupabaseAuthError) {
      if (this.shouldDeleteSessionOnAuthError) {
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
