import { Outlet } from 'react-router-dom';
import { Toaster } from '@/ui/toast';
import { ScrollToTopButton } from '@/features/scroll/ScrollToTopButton';
import { BasicContainer } from '@/ui/Container';
import { Spinner } from '@/ui/Spinner';
import { SimpleTopNav } from '@/features/navigation/components/top-nav/SimpleTopNav';
import { TopBarProgress } from '@/ui/TopBarProgress';
import { ErrorUI } from '@/errors/components/ErrorUI';

function RootWrapper({ children }: { children?: React.ReactNode; }) {
  return (
    <>
      <TopBarProgress />
      {children}
      <Toaster />
      <ScrollToTopButton />
    </>
  );
}

function RootSuspenseBoundary() {
  return (
    <RootWrapper>
      <BasicContainer center>
        <Spinner />
      </BasicContainer>
    </RootWrapper>
  );
}

function RootErrorBoundary() {
  return (
    <RootWrapper>
      <SimpleTopNav />
      <BasicContainer center>
        <ErrorUI />
      </BasicContainer>
    </RootWrapper>
  );
}

function RootComponent() {
  return (
    <RootWrapper>
      <Outlet />
    </RootWrapper>
  );
}

export const SuspenseBoundary = RootSuspenseBoundary;
export const ErrorBoundary = RootErrorBoundary;
export const Component = RootComponent;
