import { Suspense } from 'react';

export function createComponent(
  Component?: React.ComponentType | null,
  SuspenseBoundary?: React.ComponentType | null,
) {
  if (!Component) {
    return null;
  }

  if (!SuspenseBoundary) {
    return Component;
  }

  // eslint-disable-next-line react/function-component-definition
  const SuspenseWrappedComponent: React.ComponentType = () => (
    <Suspense fallback={<SuspenseBoundary />}>
      <Component />
    </Suspense>
  );

  return SuspenseWrappedComponent;
}
