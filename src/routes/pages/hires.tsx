import { QueryClient } from '@tanstack/react-query';
import { Title } from '@/features/title/components/Title';

const hiresPageLoader = (_queryClient: QueryClient) => () => null;

function HiresPageSuspenseBoundary() {
  return <div>HiresPageSuspenseBoundary</div>;
}

function HiresPageErrorBoundary() {
  return <div>HiresPageErrorBoundary</div>;
}

function HiresPageComponent() {
  return (
    <div>
      <Title title="Hires" />
      <div>HiresPageComponent</div>
    </div>
  );
}

export const loader = hiresPageLoader;
export const SuspenseBoundary = HiresPageSuspenseBoundary;
export const ErrorBoundary = HiresPageErrorBoundary;
export const Component = HiresPageComponent;
