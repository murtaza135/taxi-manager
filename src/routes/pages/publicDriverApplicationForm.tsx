import { validate as uuidValidate } from 'uuid';
import { useDocumentTitle } from '@/features/title/hooks/useDocumentTitle';
import { QueryLoaderFunction } from '@/lib/react-router-dom/types';
import { APIError } from '@/errors/classes/APIError';
import { ErrorUI } from '@/errors/components/ErrorUI';
import { PublicDriverApplicationMultiStepForm } from '@/features/drivers/publicDriverApplicationForm/components/PublicDriverApplicationMultiStepForm';
import { driverApplicationQueryOptions } from '@/features/drivers/general/hooks/useDriverApplication';
import { Spinner } from '@/ui/Spinner';

// eslint-disable-next-line max-len
const publicDriverApplicationFormPageLoader: QueryLoaderFunction = (queryClient) => ({ params }) => {
  if (!params.id) throw new APIError({ title: 'Not Found', status: 404 });
  if (!uuidValidate(params.id)) throw new APIError({ title: 'Not Found', status: 404 });
  void queryClient.ensureQueryData(driverApplicationQueryOptions(params.id));
  return null;
};

function PublicDriverApplicationFormPageSuspenseBoundary() {
  useDocumentTitle('Apply for Taxi Vehicle');
  return (
    <div className="min-h-[calc(100dvh-12rem)] w-full center">
      <Spinner />
    </div>
  );
}

function PublicDriverApplicationFormPageErrorBoundary() {
  useDocumentTitle('Apply for Taxi Vehicle');
  return (
    <div className="min-h-[calc(100dvh-4rem)] w-full center">
      <ErrorUI />
    </div>
  );
}

function PublicDriverApplicationFormPageComponent() {
  useDocumentTitle('Apply for Taxi Vehicle');

  return (
    <div className="py-12">
      <PublicDriverApplicationMultiStepForm />
    </div>
  );
}

export const loader = publicDriverApplicationFormPageLoader;
export const SuspenseBoundary = PublicDriverApplicationFormPageSuspenseBoundary;
export const ErrorBoundary = PublicDriverApplicationFormPageErrorBoundary;
export const Component = PublicDriverApplicationFormPageComponent;
