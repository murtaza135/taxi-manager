import { Separator } from '@/ui/Separator';
import { Card, CardTitle } from '@/ui/Card';
import { RentHireSection } from '@/features/rent/rentHireSection/RentHireSection';

export function RentHireSwiperItem() {
  return (
    <Card className="p-4 text-achromatic-dark dark:text-achromatic-lighter">
      <CardTitle className="text-start text-base pb-4">Hire Agreement</CardTitle>
      <div>
        <Separator className="bg-achromatic-light dark:bg-achromatic-darker mb-3" />
        <RentHireSection />
      </div>
    </Card>
  );
}
