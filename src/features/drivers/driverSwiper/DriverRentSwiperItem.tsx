import { Suspense } from 'react';
import { DelayedSpinner } from '@/ui/Spinner';
import { DriverRentTable } from '@/features/drivers/driverRentSection/DriverRentTable';

export function DriverRentSwiperItem() {
  return (
    <Suspense fallback={<DelayedSpinner />}>
      <DriverRentTable />
    </Suspense>
  );
}
