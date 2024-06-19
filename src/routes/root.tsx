import { Outlet, useNavigation, useRevalidator } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';
import { Toaster } from '@/ui/toast';
import { ScrollToTopButton } from '@/features/scroll/ScrollToTopButton';

const rootLoader = (_queryClient: QueryClient) => () => null;

function RootSuspenseBoundary() {
  return <div>RootSuspenseBoundary</div>;
}

function RootErrorBoundary() {
  return (
    <div>
      RootErrorBoundary
      <Toaster />
    </div>
  );
}

function RootComponent() {
  const { state } = useNavigation();
  const { state: state2 } = useRevalidator();
  console.log('useNavigation:', state);
  console.log('useRevalidator:', state2);

  return (
    <>
      {(state === 'loading' || state === 'submitting') && <p className="fixed top-0 left-0">Loading...</p>}
      <p>Root</p>
      <Outlet />
      <Toaster />
      <ScrollToTopButton />
    </>
  );
}

export const loader = rootLoader;
export const SuspenseBoundary = RootSuspenseBoundary;
export const ErrorBoundary = RootErrorBoundary;
export const Component = RootComponent;
