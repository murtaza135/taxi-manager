import { Outlet, isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { Toaster } from '@/ui/toast';
import { ScrollToTopButton } from '@/features/scroll/ScrollToTopButton';
import { BasicContainer } from '@/ui/Container';
import { Spinner } from '@/ui/Spinner';
import { SimpleTopNav } from '@/features/navigation/components/top-nav/SimpleTopNav';
import { TopBarProgress } from '@/ui/TopBarProgress';
import { NotFoundErrorUI } from '@/errors/components/NotFoundErrorUI';
import { GeneralErrorUI } from '@/errors/components/GeneralErrorUI';

function RootSuspenseBoundary() {
  return (
    <>
      <BasicContainer center>
        <Spinner />
      </BasicContainer>
      <Toaster />
    </>
  );
}

function RootErrorBoundary() {
  const error = useRouteError();

  const errorUI = isRouteErrorResponse(error) && error.status === 404
    ? <NotFoundErrorUI />
    : <GeneralErrorUI />;

  return (
    <>
      <TopBarProgress />
      <SimpleTopNav />
      <BasicContainer center>
        {errorUI}
      </BasicContainer>
      <Toaster />
    </>
  );
}

function RootComponent() {
  return (
    <>
      <TopBarProgress />
      <Outlet />
      <Toaster />
      <ScrollToTopButton />
    </>
  );
}

export const SuspenseBoundary = RootSuspenseBoundary;
export const ErrorBoundary = RootErrorBoundary;
export const Component = RootComponent;
