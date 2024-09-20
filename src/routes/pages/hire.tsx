import { useDocumentTitle } from '@/features/title/hooks/useDocumentTitle';
import { HiresSwiper } from '@/features/hires/hiresSwiper/HiresSwiper';
import { hireAgreementDetailsQueryOptions } from '@/features/hires/general/hooks/useHireDetails';
import { QueryLoaderFunction } from '@/lib/react-router-dom/types';
import { APIError } from '@/errors/classes/APIError';
import { ErrorUI } from '@/errors/components/ErrorUI';
import { Spinner } from '@/ui/Spinner';

const hirePageLoader: QueryLoaderFunction = (queryClient) => ({ params }) => {
  const id = Number(params.id);
  if (Number.isNaN(id)) throw new APIError({ title: 'Not Found', status: 404 });
  void queryClient.ensureQueryData(hireAgreementDetailsQueryOptions(id));
  return null;
};

function HirePageSuspenseBoundary() {
  useDocumentTitle('Hire');
  return <Spinner />;
}

function HirePageErrorBoundary() {
  useDocumentTitle('Hire');
  return <ErrorUI />;
}

function HirePageComponent() {
  useDocumentTitle('Hire');
  return <HiresSwiper />;
}

export const loader = hirePageLoader;
export const SuspenseBoundary = HirePageSuspenseBoundary;
export const ErrorBoundary = HirePageErrorBoundary;
export const Component = HirePageComponent;
