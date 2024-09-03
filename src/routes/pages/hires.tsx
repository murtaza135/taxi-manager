import { QueryClient } from '@tanstack/react-query';
import { useScrollLock } from 'usehooks-ts';
import { useDocumentTitle } from '@/features/title/hooks/useDocumentTitle';
import {
  DataViewContainerSkeleton,
  DataViewTopBarSkeleton,
  DataViewTableSkeleton,
  DataViewGridSkeleton,
} from '@/ui/dataview/DataView.skeleton';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { ErrorUI } from '@/errors/components/ErrorUI';
import { HiresTable } from '@/features/hires/hiresTable/HiresTable';
import { useHiresLayout } from '@/features/hires/hiresTable/hooks/useHiresLayout';

const hiresPageLoader = (_queryClient: QueryClient) => () => null;

function HiresPageSuspenseBoundary() {
  useDocumentTitle('Hires');
  useScrollToTop();
  useScrollLock();
  const [layout] = useHiresLayout();

  return (
    <DataViewContainerSkeleton>
      <DataViewTopBarSkeleton />
      {layout === 'table' && <DataViewTableSkeleton />}
      {layout === 'grid' && <DataViewGridSkeleton />}
    </DataViewContainerSkeleton>
  );
}

function HiresPageErrorBoundary() {
  useDocumentTitle('Hires');
  return <ErrorUI />;
}

function HiresPageComponent() {
  useDocumentTitle('Hires');
  useScrollToTop();
  useScrollLock();

  return (
    <HiresTable />
  );
}

export const loader = hiresPageLoader;
export const SuspenseBoundary = HiresPageSuspenseBoundary;
export const ErrorBoundary = HiresPageErrorBoundary;
export const Component = HiresPageComponent;
