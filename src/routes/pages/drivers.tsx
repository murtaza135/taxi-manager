import { QueryClient } from '@tanstack/react-query';
import { useScrollLock } from 'usehooks-ts';
import { DriversTable } from '@/features/drivers/components/DriversTable';
import { GeneralErrorUI } from '@/errors/components/GeneralErrorUI';
import {
  DataViewContainerSkeleton,
  DataViewTopBarSkeleton,
  DataViewTableSkeleton,
  DataViewGridSkeleton,
} from '@/ui/dataview/DataView.skeleton';
import { useDriversLayout } from '@/features/drivers/hooks/table/useDriversLayout';
import { driversInfiniteQueryOptions } from '@/features/drivers/hooks/queries/useInfiniteDrivers';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { useDocumentTitle } from '@/features/title/hooks/useDocumentTitle';

const driversPageLoader = (queryClient: QueryClient) => () => {
  void queryClient.prefetchInfiniteQuery(driversInfiniteQueryOptions());
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
  return <GeneralErrorUI />;
}

function DriversPageComponent() {
  useDocumentTitle('Drivers');
  useScrollToTop();
  useScrollLock();

  return (
    <DriversTable />
  );
}

export const loader = driversPageLoader;
export const SuspenseBoundary = DriversPageSuspenseBoundary;
export const ErrorBoundary = DriversPageErrorBoundary;
export const Component = DriversPageComponent;
