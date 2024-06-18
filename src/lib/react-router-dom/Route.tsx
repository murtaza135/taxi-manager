import {
  Route as ReactRouterRoute,
  PathRouteProps as ReactRouterPathRouteProps,
  IndexRouteProps as ReacRouterIndexRouteProps,
  NonIndexRouteObject as ReactRouterNonIndexRouteObject,
  IndexRouteObject as ReactRouterIndexRouteObject,
  LazyRouteFunction,
} from 'react-router-dom';
import { SuspenseOptions } from './types';
import { SuspenseWrapper } from './SuspenseWrapper';

export type PathRouteProps =
  Omit<ReactRouterPathRouteProps, 'lazy'> & SuspenseOptions & {
    lazy?: LazyRouteFunction<ReactRouterNonIndexRouteObject & SuspenseOptions>;
  };

export type IndexRouteProps =
  Omit<ReacRouterIndexRouteProps, 'lazy'> & SuspenseOptions & {
    lazy?: LazyRouteFunction<ReactRouterIndexRouteObject & SuspenseOptions>;
  };

export type RouteProps = PathRouteProps | IndexRouteProps;

export function Route({
  Component,
  element,
  SuspenseBoundary,
  suspenseElement,
  lazy,
  ...rest
}: RouteProps) {
  const suspenseLazy = lazy && (async () => {
    const {
      Component: LazyComponent,
      element: lazyElement,
      SuspenseBoundary: LazySuspenseBoundary,
      suspenseElement: lazySuspenseElement,
      ...lazyRest
    } = await lazy();

    return {
      element: (
        <SuspenseWrapper
          SuspenseBoundary={LazySuspenseBoundary}
          suspenseElement={lazySuspenseElement}
        >
          {LazyComponent ? <LazyComponent /> : lazyElement}
        </SuspenseWrapper>
      ),
      ...lazyRest,
    };
  });

  return (
    <ReactRouterRoute
      element={(
        <SuspenseWrapper
          SuspenseBoundary={SuspenseBoundary}
          suspenseElement={suspenseElement}
        >
          {Component ? <Component /> : element}
        </SuspenseWrapper>
      )}
      lazy={suspenseLazy}
      {...rest}
    />
  );
}
