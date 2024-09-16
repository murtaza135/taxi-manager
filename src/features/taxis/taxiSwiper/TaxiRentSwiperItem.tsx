import { Suspense } from 'react';
import { DelayedSpinner } from '@/ui/Spinner';
import { TaxiRentTable } from '@/features/taxis/taxiRentSection/TaxiRentTable';

export function TaxiRentSwiperItem() {
  return (
    <Suspense fallback={<DelayedSpinner />}>
      <TaxiRentTable />
    </Suspense>
  );
}
