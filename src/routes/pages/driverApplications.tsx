import { QueryClient } from '@tanstack/react-query';
import { useScrollLock } from 'usehooks-ts';
import { DriverApplicationsTable } from '@/features/drivers/driverApplicationsTable/DriverApplicationsTable';
import {
  DataViewContainerSkeleton,
  DataViewTopBarSkeleton,
  DataViewTableSkeleton,
  DataViewGridSkeleton,
} from '@/ui/dataview/DataView.skeleton';
import { useDriverApplicationsLayout } from '@/features/drivers/driverApplicationsTable/hooks/useDriverApplicationsLayout';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { useDocumentTitle } from '@/features/title/hooks/useDocumentTitle';
import { ErrorUI } from '@/errors/components/ErrorUI';
import { driverApplicationsQueryOptions } from '@/features/drivers/general/hooks/useDriverApplications';

const driverApplicationsPageLoader = (queryClient: QueryClient) => () => {
  void queryClient.prefetchInfiniteQuery(driverApplicationsQueryOptions());
  return null;
};

function DriverApplicationsPageSuspenseBoundary() {
  useDocumentTitle('Driver Applications');
  useScrollToTop();
  useScrollLock();
  const [layout] = useDriverApplicationsLayout();

  return (
    <DataViewContainerSkeleton>
      <DataViewTopBarSkeleton />
      {layout === 'table' && <DataViewTableSkeleton />}
      {layout === 'grid' && <DataViewGridSkeleton />}
    </DataViewContainerSkeleton>
  );
}

function DriverApplicationsPageErrorBoundary() {
  useDocumentTitle('Driver Applications');
  return <ErrorUI />;
}

function DriverApplicationsPageComponent() {
  useDocumentTitle('Driver Applications');
  useScrollToTop();
  useScrollLock();

  return (
    <DriverApplicationsTable />
  );
}

export const loader = driverApplicationsPageLoader;
export const SuspenseBoundary = DriverApplicationsPageSuspenseBoundary;
export const ErrorBoundary = DriverApplicationsPageErrorBoundary;
export const Component = DriverApplicationsPageComponent;
