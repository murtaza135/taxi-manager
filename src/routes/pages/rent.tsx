import { QueryClient } from '@tanstack/react-query';
import { Title } from '@/features/title/components/Title';

const rentPageLoader = (_queryClient: QueryClient) => () => null;

function RentPageSuspenseBoundary() {
  return <div>RentPageSuspenseBoundary</div>;
}

function RentPageErrorBoundary() {
  return <div>RentPageErrorBoundary</div>;
}

function RentPageComponent() {
  return (
    <div>
      <Title title="Rent" />
      <div>RentPageComponent</div>
    </div>
  );
}

export const loader = rentPageLoader;
export const SuspenseBoundary = RentPageSuspenseBoundary;
export const ErrorBoundary = RentPageErrorBoundary;
export const Component = RentPageComponent;
