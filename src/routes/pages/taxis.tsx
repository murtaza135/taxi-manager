import { QueryClient } from '@tanstack/react-query';
import { useDocumentTitle } from '@/features/title/hooks/useDocumentTitle';

const taxisPageLoader = (_queryClient: QueryClient) => () => null;

function TaxisPageSuspenseBoundary() {
  useDocumentTitle('Taxis');
  return <div>TaxisPageSuspenseBoundary</div>;
}

function TaxisPageErrorBoundary() {
  useDocumentTitle('Taxis');
  return <div>TaxisPageErrorBoundary</div>;
}

function TaxisPageComponent() {
  useDocumentTitle('Taxis');

  return (
    <div>TaxisPageComponent</div>
  );
}

export const loader = taxisPageLoader;
export const SuspenseBoundary = TaxisPageSuspenseBoundary;
export const ErrorBoundary = TaxisPageErrorBoundary;
export const Component = TaxisPageComponent;
