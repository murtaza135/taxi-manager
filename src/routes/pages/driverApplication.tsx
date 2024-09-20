import { useDocumentTitle } from '@/features/title/hooks/useDocumentTitle';
import { DriverApplicationAccordion } from '@/features/drivers/driverApplicationDetails/DriverApplicationAccordion';
import { QueryLoaderFunction } from '@/lib/react-router-dom/types';
import { APIError } from '@/errors/classes/APIError';
import { ErrorUI } from '@/errors/components/ErrorUI';
import { driverApplicationQueryOptions } from '@/features/drivers/general/hooks/useDriverApplication';
import { Spinner } from '@/ui/Spinner';

const driverApplicationPageLoader: QueryLoaderFunction = (queryClient) => ({ params }) => {
  if (!params.id) throw new APIError({ title: 'Not Found', status: 404 });
  void queryClient.ensureQueryData(driverApplicationQueryOptions(params.id));
  return null;
};

function DriverApplicationPageSuspenseBoundary() {
  useDocumentTitle('Driver Application');
  return <Spinner />;
}

function DriverApplicationPageErrorBoundary() {
  useDocumentTitle('Driver Application');
  return <ErrorUI />;
}

function DriverApplicationPageComponent() {
  useDocumentTitle('Driver Application');
  return <DriverApplicationAccordion />;
}

export const loader = driverApplicationPageLoader;
export const SuspenseBoundary = DriverApplicationPageSuspenseBoundary;
export const ErrorBoundary = DriverApplicationPageErrorBoundary;
export const Component = DriverApplicationPageComponent;
