import { useParams } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';
import { useDocumentTitle } from '@/features/title/hooks/useDocumentTitle';

const hirePageLoader = (_queryClient: QueryClient) => () => null;

function HirePageSuspenseBoundary() {
  const { id } = useParams();
  useDocumentTitle(`Hire ${id}`);
  return <div>HirePageSuspenseBoundary</div>;
}

function HirePageErrorBoundary() {
  const { id } = useParams();
  useDocumentTitle(`Hire ${id}`);
  return <div>HirePageErrorBoundary</div>;
}

function HirePageComponent() {
  const { id } = useParams();
  useDocumentTitle(`Hire ${id}`);

  return (
    <div>HirePageComponent</div>
  );
}

export const loader = hirePageLoader;
export const SuspenseBoundary = HirePageSuspenseBoundary;
export const ErrorBoundary = HirePageErrorBoundary;
export const Component = HirePageComponent;
