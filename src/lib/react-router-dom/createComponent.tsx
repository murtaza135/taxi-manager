import { Suspense } from 'react';

// TODO clean up

export function createComponent(
  Component: () => JSX.Element,
  SuspenseBoundary?: (() => JSX.Element) | null,
  componentName?: string | null,
) {
  if (!SuspenseBoundary) {
    return Component;
  }

  // eslint-disable-next-line react/function-component-definition
  const SuspenseWrappedComponent = () => (
    <Suspense fallback={<SuspenseBoundary />}>
      <Component />
    </Suspense>
  );

  if (componentName) {
    SuspenseWrappedComponent.name = componentName;
  }

  return SuspenseWrappedComponent;
}
