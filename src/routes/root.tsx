import { Outlet, isRouteErrorResponse, useNavigation, useRevalidator, useRouteError } from 'react-router-dom';
import { Toaster } from '@/ui/toast';
import { ScrollToTopButton } from '@/features/scroll/ScrollToTopButton';
import { BasicContainer } from '@/ui/Container';
import { Spinner } from '@/ui/Spinner';
import { SimpleTopNav } from '@/features/navigation/components/top-nav/SimpleTopNav';
import { TopBarProgress } from '@/ui/TopBarProgress';
import { NotFoundError } from '@/errors3/components/NotFoundError';
import { GeneralError } from '@/errors3/components/GeneralError';

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
    ? <NotFoundError />
    : <GeneralError />;

  return (
    <>
      <SimpleTopNav />
      <BasicContainer center>
        {errorUI}
      </BasicContainer>
      <Toaster />
    </>
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
      {isLoading && <TopBarProgress />}
      <Outlet />
      <Toaster />
      <ScrollToTopButton />
    </>
  );
}

export const SuspenseBoundary = RootSuspenseBoundary;
export const ErrorBoundary = RootErrorBoundary;
export const Component = RootComponent;
