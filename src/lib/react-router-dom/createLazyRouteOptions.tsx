import { LoaderFunction, LazyRouteFunction, RouteProps, RouteObject } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';
import { createComponent } from '@/lib/react-router-dom/createComponent';

// type Options3 = LazyRouteFunction<RouteObject>;

// type Options = Omit<RouteProps, 'lazy' | 'loader'> & {
//   SuspenseBoundary?: React.ComponentType;
//   loader?: (queryClient: QueryClient) => LoaderFunction;
// };

type Options = {
  Component?: React.ComponentType | null;
  SuspenseBoundary?: React.ComponentType | null;
  ErrorBoundary?: React.ComponentType | null;
  loader?: (queryClient: QueryClient) => LoaderFunction;
};

type Fn = () => Promise<Options>;

export function createLazyRouteOptions(
  options: Fn,
  queryClient: QueryClient,
) {
  return async function lazyRouteOptions() {
    const { Component, SuspenseBoundary, loader, ...rest } = await options();
    return {
      Component: createComponent(Component, SuspenseBoundary),
      loader: loader?.(queryClient),
      ...rest,
    };
  };
}
