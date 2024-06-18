import { Suspense } from 'react';

export function createComponent(
  Component: () => JSX.Element,
  SuspenseBoundary?: (() => JSX.Element) | null,
  componentName?: string,
) {
  if (!SuspenseBoundary) {
    return Component;
  }

  const SuspenseWrappedComponent = function SuspenseWrappedComponent() {
    return (
      <Suspense fallback={<SuspenseBoundary />}>
        <Component />
      </Suspense>
    );
  };

  if (componentName) {
    SuspenseWrappedComponent.name = componentName;
  }

  return SuspenseWrappedComponent;
}
