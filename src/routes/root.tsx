import { Outlet, isRouteErrorResponse, useNavigation, useRevalidator, useRouteError } from 'react-router-dom';
import { Toaster } from '@/ui/toast';
import { ScrollToTopButton } from '@/features/scroll/ScrollToTopButton';
import { BasicContainer } from '@/ui/Container';
import { Spinner } from '@/ui/Spinner';
import { SimpleTopNav } from '@/features/navigation/components/top-nav/SimpleTopNav';
import { ErrorComponent } from '@/config/errors/ErrorComponent';
import { useIsDarkmode } from '@/features/darkmode/state/darkmodeStore';
import notFoundLightImage from '@/assets/images/404-page-not-found-light.svg';
import notFoundDarkImage from '@/assets/images/404-page-not-found-dark.svg';
import bugFixingLightImage from '@/assets/images/bug-fixing-light.svg';
import bugFixingDarkImage from '@/assets/images/bug-fixing-dark.svg';
import { TopBarProgress } from '@/lib/react-topbar-progress-indicator/TopBarProgress';

function RootSuspenseBoundary() {
  return (
    <>
      <BasicContainer className="center">
        <Spinner />
      </BasicContainer>
      <Toaster />
    </>
  );
}

function RootErrorBoundary() {
  const error = useRouteError();
  const isDarkMode = useIsDarkmode();

  if (isRouteErrorResponse(error) && error.status === 405) {
    return (
      <>
        <SimpleTopNav />
        <BasicContainer className="center">
          <ErrorComponent
            image={(
              <img
                src={isDarkMode ? notFoundLightImage : notFoundDarkImage}
                alt="404 Not Found"
                className="w-80"
              />
            )}
            title="Page Not Found"
            description="We looked everywhere for the page, but we couldn&apos;t find it!"
            description2="Are you sure the website URL is correct?"
          />
        </BasicContainer>
        <Toaster />
      </>
    );
  }

  return (
    <>
      <SimpleTopNav />
      <BasicContainer className="center">
        <ErrorComponent
          image={(
            <img
              src={isDarkMode ? bugFixingLightImage : bugFixingDarkImage}
              alt="404 Not Found"
              className="w-60"
            />
          )}
          title="Oops"
          description="Something went wrong!"
        />
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
