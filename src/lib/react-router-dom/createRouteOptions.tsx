import { LoaderFunction, LazyRouteFunction, RouteProps } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';
import { createComponent } from '@/lib/react-router-dom/createComponent';

// type Options = Omit<RouteProps, 'lazy' | 'loader'> & {
//   SuspenseBoundary?: React.ComponentType;
//   loader?: (queryClient: QueryClient) => LoaderFunction;
// };

type Options = {
  Component?: () => JSX.Element;
  SuspenseBoundary?: () => JSX.Element;
  ErrorBoundary?: () => JSX.Element;
  loader?: (queryClient: QueryClient) => LoaderFunction;
};

export function createRouteOptions(
  options: Options,
  queryClient: QueryClient,
): RouteProps {
  const { Component, SuspenseBoundary, loader, ...rest } = options;
  return {
    Component: createComponent(Component, SuspenseBoundary),
    loader: loader?.(queryClient),
    ...rest,
  };
}
