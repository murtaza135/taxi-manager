import { useParams } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';
import { Title } from '@/features/title/components/Title';

const addNewDriverPageLoader = (_queryClient: QueryClient) => () => null;

function AddNewDriverPageSuspenseBoundary() {
  return (
    <div>AddNewDriverPageSuspenseBoundary</div>
  );
}

function AddNewDriverPageErrorBoundary() {
  return (
    <div>AddNewDriverPageErrorBoundary</div>
  );
}

function AddNewDriverPageComponent() {
  const { id } = useParams();

  return (
    <div>
      <Title title={`Driver ${id}`} />
      <div>AddNewDriverPageComponent</div>
    </div>
  );
}

export const loader = addNewDriverPageLoader;
export const SuspenseBoundary = AddNewDriverPageSuspenseBoundary;
export const ErrorBoundary = AddNewDriverPageErrorBoundary;
export const Component = AddNewDriverPageComponent;
