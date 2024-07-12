import { QueryClient } from '@tanstack/react-query';
import { useScrollLock } from 'usehooks-ts';
import { Title } from '@/features/title/components/Title';
import { DriversTable } from '@/features/drivers/components/DriversTable';

const driversPageLoader = (_queryClient: QueryClient) => () => null;

function DriversPageSuspenseBoundary() {
  return <div>DriversPageSuspenseBoundary</div>;
}

function DriversPageErrorBoundary() {
  return <div>DriversPageErrorBoundary</div>;
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
