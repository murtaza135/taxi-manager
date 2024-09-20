import { validate as uuidValidate } from 'uuid';
import { useDocumentTitle } from '@/features/title/hooks/useDocumentTitle';
import { QueryLoaderFunction } from '@/lib/react-router-dom/types';
import { APIError } from '@/errors/classes/APIError';
import { ErrorUI } from '@/errors/components/ErrorUI';
import { PublicDriverApplicationCompletionMessage } from '@/features/drivers/publicDriverApplicationForm/components/PublicDriverApplicationCompletionMessage';
import { Spinner } from '@/ui/Spinner';

const publicDriverApplicationFormCompletePageLoader: QueryLoaderFunction = () => ({ params }) => {
  if (!params.id) throw new APIError({ title: 'Not Found', status: 404 });
  if (!uuidValidate(params.id)) throw new APIError({ title: 'Not Found', status: 404 });
  return null;
};

function PublicDriverApplicationFormCompletePageSuspenseBoundary() {
  useDocumentTitle('Success | Apply for Taxi Vehicle');

  return (
    <div className="min-h-[calc(100dvh-12rem)] w-full center">
      <Spinner />
    </div>
  );
}

function PublicDriverApplicationFormCompletePageErrorBoundary() {
  useDocumentTitle('Success | Apply for Taxi Vehicle');

  return (
    <div className="min-h-[calc(100dvh-4rem)] w-full center">
      <ErrorUI />
    </div>
  );
}

function PublicDriverApplicationFormCompletePageComponent() {
  useDocumentTitle('Success | Apply for Taxi Vehicle');

  return (
    <div className="py-12 center">
      <PublicDriverApplicationCompletionMessage />
    </div>
  );
}

export const loader = publicDriverApplicationFormCompletePageLoader;
export const SuspenseBoundary = PublicDriverApplicationFormCompletePageSuspenseBoundary;
export const ErrorBoundary = PublicDriverApplicationFormCompletePageErrorBoundary;
export const Component = PublicDriverApplicationFormCompletePageComponent;
