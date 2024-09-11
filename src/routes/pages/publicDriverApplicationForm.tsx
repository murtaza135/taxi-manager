import { useDocumentTitle } from '@/features/title/hooks/useDocumentTitle';
import { QueryLoaderFunction } from '@/lib/react-router-dom/types';
import { APIError } from '@/errors/classes/APIError';
import { ErrorUI } from '@/errors/components/ErrorUI';

// eslint-disable-next-line max-len
const publicDriverApplicationFormPageLoader: QueryLoaderFunction = (queryClient) => ({ params }) => {
  if (!params.id) throw new APIError({ title: 'Not Found', status: 404 });
  // void queryClient.ensureQueryData(driverDetailsQueryOptions(id));
  return null;
};

function PublicDriverApplicationFormPageSuspenseBoundary() {
  useDocumentTitle('Apply for Taxi Vehicle');

  return (
    <div>PublicDriverApplicationFormPageSuspenseBoundary</div>
  );
}

function PublicDriverApplicationFormPageErrorBoundary() {
  useDocumentTitle('Apply for Taxi Vehicle | Error');
  return <ErrorUI />;
}

function PublicDriverApplicationFormPageComponent() {
  useDocumentTitle('Apply for Taxi Vehicle');

  return (
    <div />
  );
}

export const loader = publicDriverApplicationFormPageLoader;
export const SuspenseBoundary = PublicDriverApplicationFormPageSuspenseBoundary;
export const ErrorBoundary = PublicDriverApplicationFormPageErrorBoundary;
export const Component = PublicDriverApplicationFormPageComponent;
