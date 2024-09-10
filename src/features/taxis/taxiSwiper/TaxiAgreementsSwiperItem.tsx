import { Suspense } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionCollapsibleContent,
  AccordionNonCollapsibleContent,
} from '@/ui/Accordion';
import { CurrentTaxiHireSection } from '@/features/taxis/taxiHiresSection/CurrentTaxiHireSection';
import { PreviousTaxiHiresSection } from '@/features/taxis/taxiHiresSection/PreviousTaxiHiresSection';
import { Separator } from '@/ui/Separator';
import { DelayedSpinner } from '@/ui/Spinner';

export function TaxiAgreementsSwiperItem() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="current">
        <h2 className="p-4 font-medium">Current Hire Agreement</h2>
        <AccordionNonCollapsibleContent className="pt-0">
          <Separator className="bg-achromatic-light dark:bg-achromatic-darker mb-3" />
          <Suspense fallback={<DelayedSpinner />}>
            <CurrentTaxiHireSection />
          </Suspense>
        </AccordionNonCollapsibleContent>
      </AccordionItem>

      <AccordionItem value="previous">
        <AccordionTrigger>Previous Hire Agreements</AccordionTrigger>
        <AccordionCollapsibleContent className="min-h-4">
          <Separator className="bg-achromatic-light dark:bg-achromatic-darker mb-3" />
          <Suspense fallback={<DelayedSpinner />}>
            <PreviousTaxiHiresSection />
          </Suspense>
        </AccordionCollapsibleContent>
      </AccordionItem>
    </Accordion>
  );
}
