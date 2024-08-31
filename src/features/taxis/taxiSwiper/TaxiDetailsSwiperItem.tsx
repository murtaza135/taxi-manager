import { Suspense } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionCollapsibleContent,
} from '@/ui/Accordion';
import { TaxiDetailsSection } from '@/features/taxis/taxiDetails/TaxiDetailsSection';
import { TaxiLicenceDetailsSection } from '@/features/taxis/taxiDetails/TaxiLicenceDetailsSection';
import { TaxiInsuranceDetailsSection } from '@/features/taxis/taxiDetails/TaxiInsuranceDetailsSection';
import { Separator } from '@/ui/Separator';
import { Spinner } from '@/ui/Spinner';

export function TaxiDetailsSwiperItem() {
  return (
    <Accordion type="multiple" defaultValue={['details']}>
      <AccordionItem value="details">
        <AccordionTrigger>Taxi Details</AccordionTrigger>
        <AccordionCollapsibleContent>
          <Separator className="bg-achromatic-light dark:bg-achromatic-darker mb-3" />
          <TaxiDetailsSection />
        </AccordionCollapsibleContent>
      </AccordionItem>

      <AccordionItem value="taxiLicence">
        <AccordionTrigger>Taxi Licence</AccordionTrigger>
        <AccordionCollapsibleContent className="min-h-48 flex flex-col">
          <Separator className="bg-achromatic-light dark:bg-achromatic-darker mb-3" />
          <Suspense fallback={<Spinner />}>
            <TaxiLicenceDetailsSection />
          </Suspense>
        </AccordionCollapsibleContent>
      </AccordionItem>

      <AccordionItem value="insurance">
        <AccordionTrigger>Insurance</AccordionTrigger>
        <AccordionCollapsibleContent className="min-h-48 flex flex-col">
          <Separator className="bg-achromatic-light dark:bg-achromatic-darker mb-3" />
          <Suspense fallback={<Spinner />}>
            <TaxiInsuranceDetailsSection />
          </Suspense>
        </AccordionCollapsibleContent>
      </AccordionItem>
    </Accordion>
  );
}
