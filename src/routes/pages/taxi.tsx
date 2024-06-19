import { useParams } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';
import { Title } from '@/features/title/components/Title';

const taxiPageLoader = (_queryClient: QueryClient) => () => null;

function TaxiPageSuspenseBoundary() {
  return <div>TaxiPageSuspenseBoundary</div>;
}

function TaxiPageErrorBoundary() {
  return <div>TaxiPageErrorBoundary</div>;
}

function TaxiPageComponent() {
  const { id } = useParams();

  return (
    <div>
      <Title title={`Taxi ${id}`} />
      <div>TaxiPageComponent</div>
    </div>
  );
}

export const loader = taxiPageLoader;
export const SuspenseBoundary = TaxiPageSuspenseBoundary;
export const ErrorBoundary = TaxiPageErrorBoundary;
export const Component = TaxiPageComponent;
