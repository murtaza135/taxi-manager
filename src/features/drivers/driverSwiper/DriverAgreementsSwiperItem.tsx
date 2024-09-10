import { Suspense } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionCollapsibleContent,
  AccordionNonCollapsibleContent,
} from '@/ui/Accordion';
import { CurrentDriverHireSection } from '@/features/drivers/driverHiresSection/CurrentDriverHireSection';
import { PreviousDriverHiresSection } from '@/features/drivers/driverHiresSection/PreviousDriverHiresSection';
import { Separator } from '@/ui/Separator';
import { DelayedSpinner } from '@/ui/Spinner';

export function DriverAgreementsSwiperItem() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="current">
        <h2 className="p-4 font-medium">Current Taxi</h2>
        <AccordionNonCollapsibleContent className="pt-0">
          <Separator className="bg-achromatic-light dark:bg-achromatic-darker mb-3" />
          <Suspense fallback={<DelayedSpinner />}>
            <CurrentDriverHireSection />
          </Suspense>
        </AccordionNonCollapsibleContent>
      </AccordionItem>

      <AccordionItem value="previous">
        <AccordionTrigger>Previous Taxis</AccordionTrigger>
        <AccordionCollapsibleContent className="min-h-4">
          <Separator className="bg-achromatic-light dark:bg-achromatic-darker mb-3" />
          <Suspense fallback={<DelayedSpinner />}>
            <PreviousDriverHiresSection />
          </Suspense>
        </AccordionCollapsibleContent>
      </AccordionItem>
    </Accordion>
  );
}
