import { QueryLoaderFunction } from '@/lib/react-router-dom/types';
import { useDocumentTitle } from '@/features/title/hooks/useDocumentTitle';
import { APIError } from '@/errors/classes/APIError';
import { taxiDetailsQueryOptions } from '@/features/taxis/general/hooks/useTaxiDetails';
import { ErrorUI } from '@/errors/components/ErrorUI';
import { TaxiSwiper } from '@/features/taxis/taxiSwiper/TaxiSwiper';
import { Spinner } from '@/ui/Spinner';

const taxiPageLoader: QueryLoaderFunction = (queryClient) => ({ params }) => {
  const id = Number(params.id);
  if (Number.isNaN(id)) throw new APIError({ title: 'Not Found', status: 404 });
  void queryClient.ensureQueryData(taxiDetailsQueryOptions(id));
  return null;
};

function TaxiPageSuspenseBoundary() {
  useDocumentTitle('Taxi');
  return <Spinner />;
}

function TaxiPageErrorBoundary() {
  useDocumentTitle('Taxi');
  return <ErrorUI />;
}

function TaxiPageComponent() {
  useDocumentTitle('Taxi');
  return <TaxiSwiper />;
}

export const loader = taxiPageLoader;
export const SuspenseBoundary = TaxiPageSuspenseBoundary;
export const ErrorBoundary = TaxiPageErrorBoundary;
export const Component = TaxiPageComponent;
