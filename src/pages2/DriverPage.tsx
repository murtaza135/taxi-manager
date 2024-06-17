import { useParams } from 'react-router-dom';
import { Suspense } from 'react';
import { Title } from '@/features/title/components/Title';

function driverPageLoader() {
  return {};
}

function DriverPageErrorBoundary() {
  return (
    <div>DriverPageErrorBoundary</div>
  );
}

function DriverPageSuspenseFallback() {
  return (
    <div>DriverPageSuspenseFallback</div>
  );
}

function DriverPageComponent() {
  const { id } = useParams();

  return (
    <div>
      <Title title={`Driver ${id}`} />
    </div>
  );
}

export const loader = driverPageLoader;
export const ErrorBoundary = DriverPageErrorBoundary;
export function Component() {
  return (
    <Suspense fallback={<DriverPageSuspenseFallback />}>
      <DriverPageComponent />
    </Suspense>
  );
}
