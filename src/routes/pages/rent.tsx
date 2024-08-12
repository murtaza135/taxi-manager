import { QueryClient } from '@tanstack/react-query';
import { useDocumentTitle } from '@/features/title/hooks/useDocumentTitle';

const rentPageLoader = (_queryClient: QueryClient) => () => null;

function RentPageSuspenseBoundary() {
  useDocumentTitle('Rent');
  return <div>RentPageSuspenseBoundary</div>;
}

function RentPageErrorBoundary() {
  useDocumentTitle('Rent');
  return <div>RentPageErrorBoundary</div>;
}

function RentPageComponent() {
  useDocumentTitle('Rent');

  return (
    <div>RentPageComponent</div>
  );
}

export const loader = rentPageLoader;
export const SuspenseBoundary = RentPageSuspenseBoundary;
export const ErrorBoundary = RentPageErrorBoundary;
export const Component = RentPageComponent;
