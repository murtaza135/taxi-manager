import { useParams } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';
import { useDocumentTitle } from '@/features/title/hooks/useDocumentTitle';

const taxiPageLoader = (_queryClient: QueryClient) => () => null;

function TaxiPageSuspenseBoundary() {
  const { id } = useParams();
  useDocumentTitle(`Taxi ${id}`);
  return <div>TaxiPageSuspenseBoundary</div>;
}

function TaxiPageErrorBoundary() {
  const { id } = useParams();
  useDocumentTitle(`Taxi ${id}`);
  return <div>TaxiPageErrorBoundary</div>;
}

function TaxiPageComponent() {
  const { id } = useParams();
  useDocumentTitle(`Taxi ${id}`);

  return (
    <div>TaxiPageComponent</div>
  );
}

export const loader = taxiPageLoader;
export const SuspenseBoundary = TaxiPageSuspenseBoundary;
export const ErrorBoundary = TaxiPageErrorBoundary;
export const Component = TaxiPageComponent;
