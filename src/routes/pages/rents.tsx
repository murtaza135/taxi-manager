import { QueryClient } from '@tanstack/react-query';
import { useScrollLock } from 'usehooks-ts';
import { RentsTable } from '@/features/rent/rentTable/RentTable';
import {
  DataViewContainerSkeleton,
  DataViewTopBarSkeleton,
  DataViewTableSkeleton,
  DataViewGridSkeleton,
} from '@/ui/dataview/DataView.skeleton';
import { useRentsLayout } from '@/features/rent/rentTable/hooks/useRentsLayout';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { useDocumentTitle } from '@/features/title/hooks/useDocumentTitle';
import { ErrorUI } from '@/errors/components/ErrorUI';
import { rentsQueryOptions } from '@/features/rent/general/hooks/useRents';

const driverApplicationsPageLoader = (queryClient: QueryClient) => () => {
  void queryClient.prefetchInfiniteQuery(rentsQueryOptions());
  return null;
};

function DriverApplicationsPageSuspenseBoundary() {
  useDocumentTitle('Driver Applications');
  useScrollToTop();
  useScrollLock();
  const [layout] = useRentsLayout();

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
    <RentsTable />
  );
}

export const loader = driverApplicationsPageLoader;
export const SuspenseBoundary = DriverApplicationsPageSuspenseBoundary;
export const ErrorBoundary = DriverApplicationsPageErrorBoundary;
export const Component = DriverApplicationsPageComponent;
