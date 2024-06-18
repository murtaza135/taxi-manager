import { useParams } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';
import { Title } from '@/features/title/components/Title';
import { sleep } from '@/utils/sleep';

const driverPageLoader = (_queryClient: QueryClient) => async () => {
  await sleep(100);
  return null;
};

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
      <p>Driver</p>
    </div>
  );
}

export const loader = driverPageLoader;
export const SuspenseBoundary = DriverPageSuspenseBoundary;
export const ErrorBoundary = DriverPageErrorBoundary;
export const Component = DriverPageComponent;
