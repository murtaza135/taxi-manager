import { Suspense } from 'react';

// TODO clean up

export function createComponent(
  Component?: React.ComponentType | null,
  SuspenseBoundary?: React.ComponentType | null,
  componentName?: string | null,
) {
  if (!Component) {
    return null;
  }

  if (!SuspenseBoundary) {
    return Component;
  }

  // eslint-disable-next-line react/function-component-definition
  const SuspenseWrappedComponent = () => (
    <Suspense fallback={<SuspenseBoundary />}>
      <Component />
    </Suspense>
  );
  SuspenseWrappedComponent.name = Component.name ?? componentName;

  return SuspenseWrappedComponent;
}
