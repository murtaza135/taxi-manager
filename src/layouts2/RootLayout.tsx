import { Outlet, useNavigation } from 'react-router-dom';
import { Toaster } from '@/ui/toast';
import { ScrollToTopButton } from '@/features/scroll/ScrollToTopButton';
import { createComponent } from '@/lib/react-router-dom/createComponent';

function rootLoader() {

}

function RootSuspenseBoundary() {
  return <div>RootSuspenseBoundary</div>;
}

function RootErrorBoundary() {
  return <div>RootErrorBoundary</div>;
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
export const Component = createComponent(RootComponent, RootSuspenseBoundary);