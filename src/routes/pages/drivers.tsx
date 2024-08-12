import { QueryClient } from '@tanstack/react-query';
import { useScrollLock } from 'usehooks-ts';
import { Title } from '@/features/title/components/Title';
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

const driversPageLoader = (queryClient: QueryClient) => () => {
  void queryClient.prefetchInfiniteQuery(driversInfiniteQueryOptions());
  return null;
};

function DriversPageSuspenseBoundary() {
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
  return <GeneralErrorUI />;
}

function DriversPageComponent() {
  useScrollToTop();
  useScrollLock();

  return (
    <>
      <Title title="Drivers" />
      <DriversTable />
    </>
  );
}

export const loader = driversPageLoader;
export const SuspenseBoundary = DriversPageSuspenseBoundary;
export const ErrorBoundary = DriversPageErrorBoundary;
export const Component = DriversPageComponent;
