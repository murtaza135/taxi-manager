import { useParams } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';
import { Title } from '@/features/title/components/Title';

const hirePageLoader = (_queryClient: QueryClient) => () => null;

function HirePageSuspenseBoundary() {
  return <div>HirePageSuspenseBoundary</div>;
}

function HirePageErrorBoundary() {
  return <div>HirePageErrorBoundary</div>;
}

function HirePageComponent() {
  const { id } = useParams();

  return (
    <div>
      <Title title={`Hire ${id}`} />
      <div>HirePageComponent</div>
    </div>
  );
}

export const loader = hirePageLoader;
export const SuspenseBoundary = HirePageSuspenseBoundary;
export const ErrorBoundary = HirePageErrorBoundary;
export const Component = HirePageComponent;
