import { Suspense } from 'react';
import { DelayedSpinner } from '@/ui/Spinner';
import { HiresRentTable } from '@/features/hires/hiresRentSection/HiresRentTable';

export function HiresRentSwiperItem() {
  return (
    <Suspense fallback={<DelayedSpinner />}>
      <HiresRentTable />
    </Suspense>
  );
}
