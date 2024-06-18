import { Outlet, useNavigation } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';
import { createComponent } from '@/lib/react-router-dom/createComponent';
import { Toaster } from '@/ui/toast';
import { ScrollToTopButton } from '@/features/scroll/ScrollToTopButton';

// TODO

// eslint-disable-next-line arrow-body-style
const rootLoader = (queryClient: QueryClient) => () => {
  return null;
};

// function rootLoader() {
//   return null;
// }

function RootSuspenseBoundary() {
  return <div>RootSuspenseBoundary</div>;
}

function RootErrorBoundary() {
  return <div>RootErrorBoundary</div>;
}

function RootComponent() {
  const { state } = useNavigation();
  console.log(state);

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
// export const Component = createComponent(RootComponent, RootSuspenseBoundary);
