import { QueryClient } from '@tanstack/react-query';
import { Title } from '@/features/title/components/Title';

const taxisPageLoader = (_queryClient: QueryClient) => () => null;

function TaxisPageSuspenseBoundary() {
  return <div>TaxisPageSuspenseBoundary</div>;
}

function TaxisPageErrorBoundary() {
  return <div>TaxisPageErrorBoundary</div>;
}

function TaxisPageComponent() {
  return (
    <div>
      <Title title="Taxis" />
      <div>TaxisPageComponent</div>
    </div>
  );
}

export const loader = taxisPageLoader;
export const SuspenseBoundary = TaxisPageSuspenseBoundary;
export const ErrorBoundary = TaxisPageErrorBoundary;
export const Component = TaxisPageComponent;
