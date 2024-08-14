import { useDocumentTitle } from '@/features/title/hooks/useDocumentTitle';
import { DriverSwiper } from '@/features/drivers/driverSwiper/DriverSwiper';
import { driverQueryOptions } from '@/features/drivers/general/hooks/useDriver';
import { QueryLoaderFunction } from '@/lib/react-router-dom/types';
import { APIError } from '@/errors/classes/APIError';
import { ErrorUI } from '@/errors/components/ErrorUI';

const driverPageLoader: QueryLoaderFunction = (queryClient) => ({ params }) => {
  const id = Number(params.id);
  if (Number.isNaN(id)) throw new APIError({ title: 'Not Found', status: 404 });
  void queryClient.ensureQueryData(driverQueryOptions(id));
  return null;
};

function DriverPageSuspenseBoundary() {
  useDocumentTitle('');

  return (
    <div>DriverPageSuspenseBoundary</div>
  );
}

function DriverPageErrorBoundary() {
  useDocumentTitle('');
  return <ErrorUI />;
}

function DriverPageComponent() {
  useDocumentTitle('Driver');

  return (
    <DriverSwiper />
  );
}

export const loader = driverPageLoader;
export const SuspenseBoundary = DriverPageSuspenseBoundary;
export const ErrorBoundary = DriverPageErrorBoundary;
export const Component = DriverPageComponent;
