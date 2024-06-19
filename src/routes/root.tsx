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
  const { state: navigationState } = useNavigation(); // for queries (via loaders)
  const { state: revalidatorState } = useRevalidator(); // for mutations

  const isLoading = revalidatorState === 'loading'
    || navigationState === 'loading'
    || navigationState === 'submitting';

  return (
    <>
      {isLoading && <p className="fixed top-0 left-0 z-[200] text-red-700">Loading...</p>}
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
