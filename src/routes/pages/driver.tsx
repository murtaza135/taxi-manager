import { useParams } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';
import { Title } from '@/features/title/components/Title';

const driverPageLoader = (_queryClient: QueryClient) => () => null;

function DriverPageSuspenseBoundary() {
  return (
    <div>DriverPageSuspenseBoundary</div>
  );
}

function DriverPageErrorBoundary() {
  return (
    <div>DriverPageErrorBoundary</div>
  );
}

function DriverPageComponent() {
  const { id } = useParams();

  return (
    <div>
      <Title title={`Driver ${id}`} />
      <div>DriverPageComponent</div>
    </div>
  );
}

export const loader = driverPageLoader;
export const SuspenseBoundary = DriverPageSuspenseBoundary;
export const ErrorBoundary = DriverPageErrorBoundary;
export const Component = DriverPageComponent;
