import { Separator } from '@/ui/Separator';
import { Card, CardTitle } from '@/ui/Card';

export function HiresDriverSwiperItem() {
  return (
    <Card className="p-4 text-achromatic-dark dark:text-achromatic-lighter">
      <CardTitle className="text-start text-base pb-4">Hired Driver</CardTitle>
      <div>
        <Separator className="bg-achromatic-light dark:bg-achromatic-darker mb-3" />
        <div>HiresDriverSwiperItem</div>
      </div>
    </Card>
  );
}
