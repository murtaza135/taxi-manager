import { QueryClient } from '@tanstack/react-query';
import { useDocumentTitle } from '@/features/title/hooks/useDocumentTitle';
import { DashboardGrid } from '@/features/dashboard/DashboardGrid';

const homePageLoader = (_queryClient: QueryClient) => () => null;

function HomePageSuspenseBoundary() {
  useDocumentTitle('Home');
  return <div>HomePageSuspenseBoundary</div>;
}

function HomePageErrorBoundary() {
  useDocumentTitle('Home');
  return <div>HomePageErrorBoundary</div>;
}

function HomePageComponent() {
  useDocumentTitle('Home');

  return (
    <DashboardGrid />
  );
}

export const loader = homePageLoader;
export const SuspenseBoundary = HomePageSuspenseBoundary;
export const ErrorBoundary = HomePageErrorBoundary;
export const Component = HomePageComponent;
