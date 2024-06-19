import { Outlet, isRouteErrorResponse, useNavigation, useRevalidator, useRouteError, useNavigate } from 'react-router-dom';
import { VscWorkspaceUnknown } from 'react-icons/vsc';
import { Toaster } from '@/ui/toast';
import { ScrollToTopButton } from '@/features/scroll/ScrollToTopButton';
import { BasicContainer } from '@/ui/Container';
import { Spinner } from '@/ui/Spinner';
import { useLocalSession } from '@/features/auth/hooks/useLocalSession';
import { TopNav } from '@/features/navigation/components/top-nav/TopNav';
import { SimpleTopNav } from '@/features/navigation/components/top-nav/SimpleTopNav';
import { Button } from '@/ui/Button';

function RootSuspenseBoundary() {
  return (
    <>
      <BasicContainer>
        <Spinner />
      </BasicContainer>
      <Toaster />
    </>
  );
}

function RootErrorBoundary() {
  const session = useLocalSession();
  const error = useRouteError();
  const navigate = useNavigate();

  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <>
        {session ? <TopNav /> : <SimpleTopNav />}
        <BasicContainer className="text-center justify-center items-center gap-4">
          <i className="center *:translate-y-1 text-6xl rounded-full text-achromatic-light bg-primary-dark p-6 dark:text-achromatic-dark dark:bg-primary-light">
            <VscWorkspaceUnknown />
          </i>
          <h1>404 Page Not Found</h1>
          <p>Sorry, but we couldn&apos;t find this page.</p>
          <Button onClick={() => navigate('/')}>Go Home</Button>
        </BasicContainer>
        <Toaster />
      </>
    );
  }

  return (
    <>
      {session ? <TopNav /> : <SimpleTopNav />}
      <BasicContainer className="text-center justify-center items-center gap-4">
        <p>Oops</p>
        <p>Something went wrong!</p>
        <Button onClick={() => navigate('/')}>Go Home</Button>
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
      {isLoading && <p className="fixed top-0 left-0 z-[200] text-red-700">Loading...</p>}
      <Outlet />
      <Toaster />
      <ScrollToTopButton />
    </>
  );
}

export const SuspenseBoundary = RootSuspenseBoundary;
export const ErrorBoundary = RootErrorBoundary;
export const Component = RootComponent;
