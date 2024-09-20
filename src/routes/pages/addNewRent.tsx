import { useDocumentTitle } from '@/features/title/hooks/useDocumentTitle';
import { QueryLoaderFunction } from '@/lib/react-router-dom/types';
import { ErrorUI } from '@/errors/components/ErrorUI';
import { settingsQueryOptions } from '@/features/settings/hooks/useSettings';
import { hiresQueryOptions } from '@/features/hires/general/hooks/useHires';
import { AddNewRentMultiStepForm } from '@/features/rent/addNewRent/components/AddNewRentMultiStepForm';
import { Spinner } from '@/ui/Spinner';

const addNewDriverApplicationPageLoader: QueryLoaderFunction = (queryClient) => async () => {
  void queryClient.ensureQueryData(hiresQueryOptions());
  await queryClient.ensureQueryData(settingsQueryOptions());
  return null;
};

function AddNewDriverApplicationPageSuspenseBoundary() {
  useDocumentTitle('Add New Rent');

  return (
    <Spinner />
  );
}

function AddNewDriverApplicationPageErrorBoundary() {
  useDocumentTitle('Add New Rent');
  return <ErrorUI />;
}

function AddNewDriverApplicationPageComponent() {
  useDocumentTitle('Add New Rent');

  return (
    <AddNewRentMultiStepForm />
  );
}

export const loader = addNewDriverApplicationPageLoader;
export const SuspenseBoundary = AddNewDriverApplicationPageSuspenseBoundary;
export const ErrorBoundary = AddNewDriverApplicationPageErrorBoundary;
export const Component = AddNewDriverApplicationPageComponent;
