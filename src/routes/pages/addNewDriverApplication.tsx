import { useDocumentTitle } from '@/features/title/hooks/useDocumentTitle';
import { AddNewDriverApplicationForm } from '@/features/drivers/addNewDriverApplication/AddNewDriverApplicationForm';
import { QueryLoaderFunction } from '@/lib/react-router-dom/types';
import { ErrorUI } from '@/errors/components/ErrorUI';
import { Skeleton } from '@/ui/Skeleton';

const addNewDriverApplicationPageLoader: QueryLoaderFunction = () => () => null;

function AddNewDriverApplicationPageSuspenseBoundary() {
  useDocumentTitle('Create Application for Driver');

  return (
    <div className="w-full h-full flex justify-center items-start">
      <Skeleton className="w-[32rem] h-[19.5rem]" />
    </div>
  );
}

function AddNewDriverApplicationPageErrorBoundary() {
  useDocumentTitle('Create Application for Driver');
  return <ErrorUI />;
}

function AddNewDriverApplicationPageComponent() {
  useDocumentTitle('Create Application for Driver');
  return <AddNewDriverApplicationForm />;
}

export const loader = addNewDriverApplicationPageLoader;
export const SuspenseBoundary = AddNewDriverApplicationPageSuspenseBoundary;
export const ErrorBoundary = AddNewDriverApplicationPageErrorBoundary;
export const Component = AddNewDriverApplicationPageComponent;
