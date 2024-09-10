import { Suspense } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionCollapsibleContent,
  AccordionNonCollapsibleContent,
} from '@/ui/Accordion';
import { CurrentDriverTaxiSection } from '@/features/drivers/driverTaxisSection/CurrentDriverTaxiSection';
import { PreviousDriverTaxisSection } from '@/features/drivers/driverTaxisSection/PreviousDriverTaxisSection';
import { Separator } from '@/ui/Separator';
import { DelayedSpinner } from '@/ui/Spinner';

export function DriverTaxisSwiperItem() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="current">
        <h2 className="p-4 font-medium">Current Taxi</h2>
        <AccordionNonCollapsibleContent className="pt-0">
          <Separator className="bg-achromatic-light dark:bg-achromatic-darker mb-3" />
          <Suspense fallback={<DelayedSpinner />}>
            <CurrentDriverTaxiSection />
          </Suspense>
        </AccordionNonCollapsibleContent>
      </AccordionItem>

      <AccordionItem value="previous">
        <AccordionTrigger>Previous Taxis</AccordionTrigger>
        <AccordionCollapsibleContent className="min-h-4">
          <Separator className="bg-achromatic-light dark:bg-achromatic-darker mb-3" />
          <Suspense fallback={<DelayedSpinner />}>
            <PreviousDriverTaxisSection />
          </Suspense>
        </AccordionCollapsibleContent>
      </AccordionItem>
    </Accordion>
  );
}
