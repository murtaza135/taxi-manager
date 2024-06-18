import { Suspense } from 'react';
import { SuspenseOptions } from './types';

type Props = SuspenseOptions & {
  children?: React.ReactNode;
};

export function SuspenseWrapper({ SuspenseBoundary, suspenseElement, children }: Props) {
  if (!SuspenseBoundary && !suspenseElement) {
    return children;
  }

  if (SuspenseBoundary) {
    return (
      <Suspense fallback={<SuspenseBoundary />}>
        {children}
      </Suspense>
    );
  }

  return (
    <Suspense fallback={suspenseElement}>
      {children}
    </Suspense>
  );
}
