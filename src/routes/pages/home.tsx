import { QueryClient } from '@tanstack/react-query';
import { Title } from '@/features/title/components/Title';

const homePageLoader = (_queryClient: QueryClient) => () => null;

function HomePageSuspenseBoundary() {
  return <div>HomePageSuspenseBoundary</div>;
}

function HomePageErrorBoundary() {
  return <div>HomePageErrorBoundary</div>;
}

function HomePageComponent() {
  return (
    <div>
      <Title title="Home" />
      <div>HomePageComponent</div>
    </div>
  );
}

export const loader = homePageLoader;
export const SuspenseBoundary = HomePageSuspenseBoundary;
export const ErrorBoundary = HomePageErrorBoundary;
export const Component = HomePageComponent;
