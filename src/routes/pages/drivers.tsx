import { QueryClient } from '@tanstack/react-query';
import { Title } from '@/features/title/components/Title';

const driversPageLoader = (_queryClient: QueryClient) => () => null;

function DriversPageSuspenseBoundary() {
  return <div>DriversPageSuspenseBoundary</div>;
}

function DriversPageErrorBoundary() {
  return <div>DriversPageErrorBoundary</div>;
}

function DriversPageComponent() {
  return (
    <div>
      <Title title="Drivers" />
      <div>DriversPageComponent</div>
    </div>
  );
}

export const loader = driversPageLoader;
export const SuspenseBoundary = DriversPageSuspenseBoundary;
export const ErrorBoundary = DriversPageErrorBoundary;
export const Component = DriversPageComponent;
