import { LoaderFunction, RouteObject, LazyRouteFunction } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';
import { createComponent } from './createComponent';

export type ImportedRouteOptions = {
  Component?: RouteObject['Component'];
  SuspenseBoundary?: RouteObject['Component'];
  ErrorBoundary?: RouteObject['ErrorBoundary'];
  loader?: (queryClient: QueryClient) => LoaderFunction;
};

export type RouteOptions = Pick<
  RouteObject,
  'Component' | 'ErrorBoundary' | 'loader'
>;

export function createRouteOptions(
  options: ImportedRouteOptions,
  queryClient: QueryClient,
): RouteOptions;
export function createRouteOptions(
  optionsFn: () => Promise<ImportedRouteOptions>,
  queryClient: QueryClient,
): LazyRouteFunction<RouteOptions>;
export function createRouteOptions(
  optionsOrFn: ImportedRouteOptions | (() => Promise<ImportedRouteOptions>),
  queryClient: QueryClient,
): RouteOptions | LazyRouteFunction<RouteOptions> {
  if (typeof optionsOrFn === 'function') {
    return async function lazyRouteOptions() {
      const { Component, SuspenseBoundary, loader, ...rest } = await optionsOrFn();
      return {
        Component: createComponent(Component, SuspenseBoundary),
        loader: loader?.(queryClient),
        ...rest,
      };
    };
  }

  const { Component, SuspenseBoundary, loader, ...rest } = optionsOrFn;
  return {
    Component: createComponent(Component, SuspenseBoundary),
    loader: loader?.(queryClient),
    ...rest,
  };
}
