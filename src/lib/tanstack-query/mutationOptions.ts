import { DefaultError, UseMutationOptions } from '@tanstack/react-query';

/* eslint-disable max-len */
export function mutationOptions<TData = unknown, TError = DefaultError, TVariables = void, TContext = unknown>(options: UseMutationOptions<TData, TError, TVariables, TContext>): UseMutationOptions<TData, TError, TVariables, TContext> {
  return options;
}
