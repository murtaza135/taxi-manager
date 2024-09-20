import { useDocumentTitle } from '@/features/title/hooks/useDocumentTitle';
import { DriverSwiper } from '@/features/drivers/driverSwiper/DriverSwiper';
import { driverDetailsQueryOptions } from '@/features/drivers/general/hooks/useDriverDetails';
import { QueryLoaderFunction } from '@/lib/react-router-dom/types';
import { APIError } from '@/errors/classes/APIError';
import { ErrorUI } from '@/errors/components/ErrorUI';
import { Spinner } from '@/ui/Spinner';

const driverPageLoader: QueryLoaderFunction = (queryClient) => ({ params }) => {
  const id = Number(params.id);
  if (Number.isNaN(id)) throw new APIError({ title: 'Not Found', status: 404 });
  void queryClient.ensureQueryData(driverDetailsQueryOptions(id));
  return null;
};

function DriverPageSuspenseBoundary() {
  useDocumentTitle('Driver');
  return <Spinner />;
}

function DriverPageErrorBoundary() {
  useDocumentTitle('Driver');
  return <ErrorUI />;
}

function DriverPageComponent() {
  useDocumentTitle('Driver');
  return <DriverSwiper />;
}

export const loader = driverPageLoader;
export const SuspenseBoundary = DriverPageSuspenseBoundary;
export const ErrorBoundary = DriverPageErrorBoundary;
export const Component = DriverPageComponent;
