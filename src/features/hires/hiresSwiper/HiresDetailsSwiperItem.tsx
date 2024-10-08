import { Separator } from '@/ui/Separator';
import { Card, CardTitle } from '@/ui/Card';
import { HiresDetailsSection } from '@/features/hires/hiresDetails/HiresDetailsSection';

export function HiresDetailsSwiperItem() {
  return (
    <Card className="p-4 text-achromatic-dark dark:text-achromatic-lighter">
      <CardTitle className="text-start text-base pb-4">Hire Details</CardTitle>
      <div>
        <Separator className="bg-achromatic-light dark:bg-achromatic-darker mb-3" />
        <HiresDetailsSection />
      </div>
    </Card>
  );
}
