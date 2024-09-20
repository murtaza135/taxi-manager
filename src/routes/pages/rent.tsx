import { useDocumentTitle } from '@/features/title/hooks/useDocumentTitle';
import { QueryLoaderFunction } from '@/lib/react-router-dom/types';
import { APIError } from '@/errors/classes/APIError';
import { rentQueryOptions } from '@/features/rent/general/hooks/useRent';
import { ErrorUI } from '@/errors/components/ErrorUI';
import { RentSwiper } from '@/features/rent/rentSwiper/RentSwiper';
import { Spinner } from '@/ui/Spinner';

const rentPageLoader: QueryLoaderFunction = (queryClient) => ({ params }) => {
  const id = Number(params.id);
  if (Number.isNaN(id)) throw new APIError({ title: 'Not Found', status: 404 });
  void queryClient.ensureQueryData(rentQueryOptions(id));
  return null;
};

function RentPageSuspenseBoundary() {
  useDocumentTitle('Rent');
  return <Spinner />;
}

function RentPageErrorBoundary() {
  useDocumentTitle('Rent');
  return <ErrorUI />;
}

function RentPageComponent() {
  useDocumentTitle('Rent');
  return <RentSwiper />;
}

export const loader = rentPageLoader;
export const SuspenseBoundary = RentPageSuspenseBoundary;
export const ErrorBoundary = RentPageErrorBoundary;
export const Component = RentPageComponent;
