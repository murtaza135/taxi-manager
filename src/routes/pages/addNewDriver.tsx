import { QueryClient } from '@tanstack/react-query';
import { Title } from '@/features/title/components/Title';
import { AddNewDriverMultiStepForm } from '@/features/drivers/components/AddNewDriverMultiStepForm';

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
  return (
    <>
      <Title title="Add New Driver" />
      <AddNewDriverMultiStepForm />
    </>
  );
}

export const loader = addNewDriverPageLoader;
export const SuspenseBoundary = AddNewDriverPageSuspenseBoundary;
export const ErrorBoundary = AddNewDriverPageErrorBoundary;
export const Component = AddNewDriverPageComponent;
