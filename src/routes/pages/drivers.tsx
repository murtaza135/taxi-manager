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

const driversPageLoader = (_queryClient: QueryClient) => () => null;

function DriversPageSuspenseBoundary() {
  useScrollLock();

  return (
    <DataViewContainerSkeleton>
      <DataViewTopBarSkeleton />
      <DataViewGridSkeleton />
    </DataViewContainerSkeleton>
  );
}

function DriversPageErrorBoundary() {
  return <GeneralErrorUI />;
}

function DriversPageComponent() {
  useScrollLock();

  return (
    <div>
      <Title title="Drivers" />
      <DriversTable />
    </div>
  );
}

export const loader = driversPageLoader;
export const SuspenseBoundary = DriversPageSuspenseBoundary;
export const ErrorBoundary = DriversPageErrorBoundary;
export const Component = DriversPageComponent;
