import { QueryClient } from '@tanstack/react-query';
import { useDocumentTitle } from '@/features/title/hooks/useDocumentTitle';

const hiresPageLoader = (_queryClient: QueryClient) => () => null;

function HiresPageSuspenseBoundary() {
  useDocumentTitle('Hires');
  return <div>HiresPageSuspenseBoundary</div>;
}

function HiresPageErrorBoundary() {
  useDocumentTitle('Hires');
  return <div>HiresPageErrorBoundary</div>;
}

function HiresPageComponent() {
  useDocumentTitle('Hires');

  return (
    <div>HiresPageComponent</div>
  );
}

export const loader = hiresPageLoader;
export const SuspenseBoundary = HiresPageSuspenseBoundary;
export const ErrorBoundary = HiresPageErrorBoundary;
export const Component = HiresPageComponent;
