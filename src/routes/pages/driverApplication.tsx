import { useDocumentTitle } from '@/features/title/hooks/useDocumentTitle';
import { DriverApplicationAccordion } from '@/features/drivers/driverApplicationDetails/DriverApplicationAccordion';
// import { driverDetailsQueryOptions } from '@/features/drivers/general/hooks/useDriverApplicationDetails';
import { QueryLoaderFunction } from '@/lib/react-router-dom/types';
import { APIError } from '@/errors/classes/APIError';
import { ErrorUI } from '@/errors/components/ErrorUI';

const driverApplicationPageLoader: QueryLoaderFunction = (queryClient) => ({ params }) => {
  // void queryClient.ensureQueryData(driverDetailsQueryOptions(id));
  const temp = 1;
  return null;
};

function DriverApplicationPageSuspenseBoundary() {
  useDocumentTitle('');

  return (
    <div>DriverApplicationPageSuspenseBoundary</div>
  );
}

function DriverApplicationPageErrorBoundary() {
  useDocumentTitle('');
  return <ErrorUI />;
}

function DriverApplicationPageComponent() {
  useDocumentTitle('Driver Application');

  return (
    <DriverApplicationAccordion />
  );
}

export const loader = driverApplicationPageLoader;
export const SuspenseBoundary = DriverApplicationPageSuspenseBoundary;
export const ErrorBoundary = DriverApplicationPageErrorBoundary;
export const Component = DriverApplicationPageComponent;
