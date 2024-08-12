import { useParams } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';
import { useDocumentTitle } from '@/features/title/hooks/useDocumentTitle';
import { DriverSwiper } from '@/features/drivers/components/DriverSwiper';

const driverPageLoader = (queryClient: QueryClient) => () => {
  // void queryClient.prefetchInfiniteQuery();
  const temp = 0;
  return null;
};

function DriverPageSuspenseBoundary() {
  const { id } = useParams();
  useDocumentTitle(`Driver ${id}`);

  return (
    <div>DriverPageSuspenseBoundary</div>
  );
}

function DriverPageErrorBoundary() {
  const { id } = useParams();
  useDocumentTitle(`Driver ${id}`);

  return (
    <div>DriverPageErrorBoundary</div>
  );
}

function DriverPageComponent() {
  const { id } = useParams();
  useDocumentTitle(`Driver ${id}`);

  return (
    <DriverSwiper />
  );
}

export const loader = driverPageLoader;
export const SuspenseBoundary = DriverPageSuspenseBoundary;
export const ErrorBoundary = DriverPageErrorBoundary;
export const Component = DriverPageComponent;
