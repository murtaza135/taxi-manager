import { Suspense } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionCollapsibleContent,
  AccordionNonCollapsibleContent,
} from '@/ui/Accordion';
import { CurrentTaxiDriverSection } from '@/features/taxis/taxiDriversSection/CurrentTaxiDriverSection';
import { PreviousTaxiDriversSection } from '@/features/taxis/taxiDriversSection/PreviousTaxiDriversSection';
import { Separator } from '@/ui/Separator';
import { DelayedSpinner } from '@/ui/Spinner';

export function TaxiDriversSwiperItem() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="current">
        <h2 className="p-4 font-medium">Current Driver</h2>
        <AccordionNonCollapsibleContent className="pt-0">
          <Separator className="bg-achromatic-light dark:bg-achromatic-darker mb-3" />
          <Suspense fallback={<DelayedSpinner />}>
            <CurrentTaxiDriverSection />
          </Suspense>
        </AccordionNonCollapsibleContent>
      </AccordionItem>

      <AccordionItem value="previous">
        <AccordionTrigger>Previous Drivers</AccordionTrigger>
        <AccordionCollapsibleContent className="min-h-4">
          <Separator className="bg-achromatic-light dark:bg-achromatic-darker mb-3" />
          <Suspense fallback={<DelayedSpinner />}>
            <PreviousTaxiDriversSection />
          </Suspense>
        </AccordionCollapsibleContent>
      </AccordionItem>
    </Accordion>
  );
}
