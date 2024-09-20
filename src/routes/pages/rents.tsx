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
import { QueryLoaderFunction } from '@/lib/react-router-dom/types';

const driverApplicationsPageLoader: QueryLoaderFunction = (queryClient) => () => {
  void queryClient.prefetchInfiniteQuery(rentsQueryOptions());
  return null;
};

function DriverApplicationsPageSuspenseBoundary() {
  useDocumentTitle('Rents');
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
  useDocumentTitle('Rents');
  return <ErrorUI />;
}

function DriverApplicationsPageComponent() {
  useDocumentTitle('Rents');
  useScrollToTop();
  useScrollLock();
  return <RentsTable />;
}

export const loader = driverApplicationsPageLoader;
export const SuspenseBoundary = DriverApplicationsPageSuspenseBoundary;
export const ErrorBoundary = DriverApplicationsPageErrorBoundary;
export const Component = DriverApplicationsPageComponent;
