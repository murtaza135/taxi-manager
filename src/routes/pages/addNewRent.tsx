import { useDocumentTitle } from '@/features/title/hooks/useDocumentTitle';
import { QueryLoaderFunction } from '@/lib/react-router-dom/types';
import { ErrorUI } from '@/errors/components/ErrorUI';
import { settingsQueryOptions } from '@/features/settings/hooks/useSettings';
import { hiresQueryOptions } from '@/features/hires/general/hooks/useHires';
import { AddNewRentMultiStepForm } from '@/features/rent/addNewRent/components/AddNewRentMultiStepForm';

const addNewDriverApplicationPageLoader: QueryLoaderFunction = (queryClient) => async () => {
  void queryClient.ensureQueryData(hiresQueryOptions());
  await queryClient.ensureQueryData(settingsQueryOptions());
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
    <AddNewRentMultiStepForm />
  );
}

export const loader = addNewDriverApplicationPageLoader;
export const SuspenseBoundary = AddNewDriverApplicationPageSuspenseBoundary;
export const ErrorBoundary = AddNewDriverApplicationPageErrorBoundary;
export const Component = AddNewDriverApplicationPageComponent;
