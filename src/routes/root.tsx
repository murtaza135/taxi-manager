import { Outlet, useNavigation } from 'react-router-dom';
import { createComponent } from '@/lib/react-router-dom/createComponent';
import { Toaster } from '@/ui/toast';
import { ScrollToTopButton } from '@/features/scroll/ScrollToTopButton';

// TODO

function rootLoader() {
  return null;
}

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
export const ErrorBoundary = RootErrorBoundary;
export const Component = createComponent(RootComponent, RootSuspenseBoundary);
