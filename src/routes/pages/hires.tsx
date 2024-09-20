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
import { QueryLoaderFunction } from '@/lib/react-router-dom/types';
import { hiresQueryOptions } from '@/features/hires/general/hooks/useHires';

const hiresPageLoader: QueryLoaderFunction = (queryClient) => () => {
  void queryClient.prefetchInfiniteQuery(hiresQueryOptions());
  return null;
};

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
