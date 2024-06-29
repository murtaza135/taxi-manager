import { Outlet, isRouteErrorResponse, useNavigation, useRevalidator, useRouteError, useNavigate } from 'react-router-dom';
import { Toaster } from '@/ui/toast';
import { ScrollToTopButton } from '@/features/scroll/ScrollToTopButton';
import { BasicContainer } from '@/ui/Container';
import { Spinner } from '@/ui/Spinner';
import { SimpleTopNav } from '@/features/navigation/components/top-nav/SimpleTopNav';
import { useIsDarkmode } from '@/features/darkmode/state/darkmodeStore';
import notFoundLightImage from '@/assets/images/404-page-not-found-light.svg';
import notFoundDarkImage from '@/assets/images/404-page-not-found-dark.svg';
import bugFixingLightImage from '@/assets/images/bug-fixing-light.svg';
import bugFixingDarkImage from '@/assets/images/bug-fixing-dark.svg';
import { TopBarProgress } from '@/ui/TopBarProgress';
import { ErrorContainer, ErrorImage, ErrorTitle, ErrorMessage, ErrorButtons } from '@/ui/Error';
import { Button } from '@/ui/Button';

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
  const isDarkMode = useIsDarkmode();
  const navigate = useNavigate();
  const { revalidate } = useRevalidator();

  if (isRouteErrorResponse(error) && error.status === 405) {
    return (
      <>
        <SimpleTopNav />
        <BasicContainer center>
          <ErrorContainer>
            <ErrorImage
              src={isDarkMode ? notFoundLightImage : notFoundDarkImage}
              alt="404 Not Found"
            />
            <ErrorTitle>Page Not Found</ErrorTitle>
            <ErrorMessage>
              We looked everywhere for the page, but we couldn&apos;t find it!
              Are you sure the website URL is correct?
            </ErrorMessage>
            <ErrorButtons>
              <Button
                variant="outline"
                className="text-primary-dark dark:text-primary-light"
                onClick={() => navigate(-1)}
              >
                Go Back
              </Button>
              <Button variant="primary" onClick={() => navigate('/')}>Go Home</Button>
            </ErrorButtons>
          </ErrorContainer>
        </BasicContainer>
        <Toaster />
      </>
    );
  }

  return (
    <>
      <SimpleTopNav />
      <BasicContainer center>
        <ErrorContainer>
          <ErrorImage
            src={isDarkMode ? bugFixingLightImage : bugFixingDarkImage}
            alt="Bug Fixing"
            className="max-w-60"
          />
          <ErrorTitle>Oops</ErrorTitle>
          <ErrorMessage>Something went wrong!</ErrorMessage>
          <ErrorButtons>
            <Button
              variant="outline"
              className="text-primary-dark dark:text-primary-light"
              onClick={() => navigate(-1)}
            >
              Go Back
            </Button>
            <Button variant="primary" onClick={() => navigate('/')}>Go Home</Button>
          </ErrorButtons>
        </ErrorContainer>
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
