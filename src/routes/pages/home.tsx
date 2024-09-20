import { useDocumentTitle } from '@/features/title/hooks/useDocumentTitle';
import { DashboardGrid } from '@/features/dashboard/DashboardGrid';
import { QueryLoaderFunction } from '@/lib/react-router-dom/types';
import { allUnpaidRentAmountQueryOptions } from '@/features/rent/general/hooks/useAllUnpaidRentAmount';
import { thisWeeksUnpaidRentAmountQueryOptions } from '@/features/rent/general/hooks/useThisWeeksUnpaidRentAmount';
import { thisWeeksPaidRentAmountQueryOptions } from '@/features/rent/general/hooks/useThisWeeksPaidRentAmount';
import { rentCountQueryOptions } from '@/features/rent/general/hooks/useRentCount';
import { taxisCountQueryOptions } from '@/features/taxis/general/hooks/useTaxisCount';
import { driversCountQueryOptions } from '@/features/drivers/general/hooks/useDriversCount';
import { Spinner } from '@/ui/Spinner';
import { ErrorUI } from '@/errors/components/ErrorUI';

const homePageLoader: QueryLoaderFunction = (queryClient) => () => {
  void queryClient.ensureQueryData(allUnpaidRentAmountQueryOptions());
  void queryClient.ensureQueryData(thisWeeksUnpaidRentAmountQueryOptions());
  void queryClient.ensureQueryData(thisWeeksPaidRentAmountQueryOptions());
  void queryClient.ensureQueryData(rentCountQueryOptions());
  void queryClient.ensureQueryData(taxisCountQueryOptions());
  void queryClient.ensureQueryData(driversCountQueryOptions());
  return null;
};

function HomePageSuspenseBoundary() {
  useDocumentTitle('Home');
  return <Spinner />;
}

function HomePageErrorBoundary() {
  useDocumentTitle('Home');
  return <ErrorUI />;
}

function HomePageComponent() {
  useDocumentTitle('Home');
  return <DashboardGrid />;
}

export const loader = homePageLoader;
export const SuspenseBoundary = HomePageSuspenseBoundary;
export const ErrorBoundary = HomePageErrorBoundary;
export const Component = HomePageComponent;
