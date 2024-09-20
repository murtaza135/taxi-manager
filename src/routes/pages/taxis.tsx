import { useScrollLock } from 'usehooks-ts';
import {
  DataViewContainerSkeleton,
  DataViewTopBarSkeleton,
  DataViewTableSkeleton,
  DataViewGridSkeleton,
} from '@/ui/dataview/DataView.skeleton';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { useDocumentTitle } from '@/features/title/hooks/useDocumentTitle';
import { TaxisTable } from '@/features/taxis/taxiTable/TaxisTable';
import { ErrorUI } from '@/errors/components/ErrorUI';
import { useTaxisLayout } from '@/features/taxis/taxiTable/hooks/useTaxisLayout';
import { taxisQueryOptions } from '@/features/taxis/general/hooks/useTaxis';
import { QueryLoaderFunction } from '@/lib/react-router-dom/types';

const taxisPageLoader: QueryLoaderFunction = (queryClient) => () => {
  void queryClient.prefetchInfiniteQuery(taxisQueryOptions());
  return null;
};

function TaxisPageSuspenseBoundary() {
  useDocumentTitle('Taxis');
  useScrollToTop();
  useScrollLock();
  const [layout] = useTaxisLayout();

  return (
    <DataViewContainerSkeleton>
      <DataViewTopBarSkeleton />
      {layout === 'table' && <DataViewTableSkeleton />}
      {layout === 'grid' && <DataViewGridSkeleton />}
    </DataViewContainerSkeleton>
  );
}

function TaxisPageErrorBoundary() {
  useDocumentTitle('Taxis');
  return <ErrorUI />;
}

function TaxisPageComponent() {
  useDocumentTitle('Taxis');
  useScrollToTop();
  useScrollLock();
  return <TaxisTable />;
}

export const loader = taxisPageLoader;
export const SuspenseBoundary = TaxisPageSuspenseBoundary;
export const ErrorBoundary = TaxisPageErrorBoundary;
export const Component = TaxisPageComponent;
