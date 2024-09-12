/* eslint-disable max-len */
import { useDocumentTitle } from '@/features/title/hooks/useDocumentTitle';
import { QueryLoaderFunction } from '@/lib/react-router-dom/types';
import { APIError } from '@/errors/classes/APIError';
import { ErrorUI } from '@/errors/components/ErrorUI';
import { PublicDriverApplicationCompletionMessage } from '@/features/drivers/publicDriverApplicationForm/components/PublicDriverApplicationCompletionMessage';

const publicDriverApplicationFormCompletePageLoader: QueryLoaderFunction = (queryClient) => ({ params }) => {
  if (!params.id) throw new APIError({ title: 'Not Found', status: 404 });
  // void queryClient.ensureQueryData(driverDetailsQueryOptions(id));
  return null;
};

function PublicDriverApplicationFormCompletePageSuspenseBoundary() {
  useDocumentTitle('');

  return (
    <div>PublicDriverApplicationFormCompletePageSuspenseBoundary</div>
  );
}

function PublicDriverApplicationFormCompletePageErrorBoundary() {
  useDocumentTitle('');
  return <ErrorUI />;
}

function PublicDriverApplicationFormCompletePageComponent() {
  useDocumentTitle('Create Application for Driver');

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
