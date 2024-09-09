import { Separator } from '@/ui/Separator';
import { Card, CardTitle } from '@/ui/Card';

export function HiresTaxiSwiperItem() {
  return (
    <Card className="p-4 text-achromatic-dark dark:text-achromatic-lighter">
      <CardTitle className="text-start text-base pb-4">Hired Taxi</CardTitle>
      <div>
        <Separator className="bg-achromatic-light dark:bg-achromatic-darker mb-3" />
        <div>HiresTaxiSwiperItem</div>
      </div>
    </Card>
  );
}
