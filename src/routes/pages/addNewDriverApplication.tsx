import { useDocumentTitle } from '@/features/title/hooks/useDocumentTitle';
import { AddNewDriverApplicationForm } from '@/features/drivers/addNewDriverApplication/AddNewDriverApplicationForm';
import { QueryLoaderFunction } from '@/lib/react-router-dom/types';
import { APIError } from '@/errors/classes/APIError';
import { ErrorUI } from '@/errors/components/ErrorUI';

const addNewDriverApplicationPageLoader: QueryLoaderFunction = (queryClient) => ({ params }) => {
  if (!params.id) throw new APIError({ title: 'Not Found', status: 404 });
  // void queryClient.ensureQueryData(driverDetailsQueryOptions(id));
  return null;
};

function AddNewDriverApplicationPageSuspenseBoundary() {
  useDocumentTitle('');

  return (
    <div>AddNewDriverApplicationPageSuspenseBoundary</div>
  );
}

function AddNewDriverApplicationPageErrorBoundary() {
  useDocumentTitle('');
  return <ErrorUI />;
}

function AddNewDriverApplicationPageComponent() {
  useDocumentTitle('Create Application for Driver');

  return (
    <AddNewDriverApplicationForm />
  );
}

export const loader = addNewDriverApplicationPageLoader;
export const SuspenseBoundary = AddNewDriverApplicationPageSuspenseBoundary;
export const ErrorBoundary = AddNewDriverApplicationPageErrorBoundary;
export const Component = AddNewDriverApplicationPageComponent;
