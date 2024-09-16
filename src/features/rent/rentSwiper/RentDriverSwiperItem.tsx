import { Suspense } from 'react';
import { Separator } from '@/ui/Separator';
import { Card, CardTitle } from '@/ui/Card';
import { RentDriversSection } from '@/features/rent/rentDriversSection/RentDriversSection';
import { DelayedSpinner } from '@/ui/Spinner';

export function RentDriverSwiperItem() {
  return (
    <Card className="p-4 text-achromatic-dark dark:text-achromatic-lighter">
      <CardTitle className="text-start text-base pb-4">Driver</CardTitle>
      <div>
        <Separator className="bg-achromatic-light dark:bg-achromatic-darker mb-3" />
        <Suspense fallback={<DelayedSpinner />}>
          <RentDriversSection />
        </Suspense>
      </div>
    </Card>
  );
}
