import { Outlet, useNavigation } from 'react-router-dom';
import { Suspense } from 'react';
import { Toaster } from '@/ui/toast';
import { ScrollToTopButton } from '@/features/scroll/ScrollToTopButton';

function rootLoader() {

}

function RootErrorBoundary() {
  return <div>RootErrorBoundary</div>;
}

function RootSuspenseFallback() {
  return <div>RootSuspenseFallback</div>;
}

function RootComponent() {
  const { state } = useNavigation();

  return (
    <>
      {(state === 'idle' || state === 'submitting') && <p className="fixed top-0 left-0">Loading...</p>}
      <Outlet />
      <Toaster />
      <ScrollToTopButton />
    </>
  );
}

export const loader = rootLoader;
export const ErrorBoundary = RootErrorBoundary;
export function Component() {
  return (
    <Suspense fallback={<RootSuspenseFallback />}>
      <RootComponent />
    </Suspense>
  );
}
