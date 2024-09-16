import { Separator } from '@/ui/Separator';
import { Card, CardTitle } from '@/ui/Card';
import { RentDetailsSection } from '@/features/rent/rentDetails/RentDetailsSection';

export function RentDetailsSwiperItem() {
  return (
    <Card className="p-4 text-achromatic-dark dark:text-achromatic-lighter">
      <CardTitle className="text-start text-base pb-4">Rent Details</CardTitle>
      <div>
        <Separator className="bg-achromatic-light dark:bg-achromatic-darker mb-3" />
        <RentDetailsSection />
      </div>
    </Card>
  );
}
