import { useScrollLock } from 'usehooks-ts';
import { DriversTable } from '@/features/drivers/driverTable/DriversTable';
import {
  DataViewContainerSkeleton,
  DataViewTopBarSkeleton,
  DataViewTableSkeleton,
  DataViewGridSkeleton,
} from '@/ui/dataview/DataView.skeleton';
import { useDriversLayout } from '@/features/drivers/driverTable/hooks/useDriversLayout';
import { driversQueryOptions } from '@/features/drivers/general/hooks/useDrivers';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { useDocumentTitle } from '@/features/title/hooks/useDocumentTitle';
import { ErrorUI } from '@/errors/components/ErrorUI';
import { QueryLoaderFunction } from '@/lib/react-router-dom/types';

const driversPageLoader: QueryLoaderFunction = (queryClient) => () => {
  void queryClient.prefetchInfiniteQuery(driversQueryOptions());
  return null;
};

function DriversPageSuspenseBoundary() {
  useDocumentTitle('Drivers');
  useScrollToTop();
  useScrollLock();
  const [layout] = useDriversLayout();

  return (
    <DataViewContainerSkeleton>
      <DataViewTopBarSkeleton />
      {layout === 'table' && <DataViewTableSkeleton />}
      {layout === 'grid' && <DataViewGridSkeleton />}
    </DataViewContainerSkeleton>
  );
}

function DriversPageErrorBoundary() {
  useDocumentTitle('Drivers');
  return <ErrorUI />;
}

function DriversPageComponent() {
  useDocumentTitle('Drivers');
  useScrollToTop();
  useScrollLock();
  return <DriversTable />;
}

export const loader = driversPageLoader;
export const SuspenseBoundary = DriversPageSuspenseBoundary;
export const ErrorBoundary = DriversPageErrorBoundary;
export const Component = DriversPageComponent;
