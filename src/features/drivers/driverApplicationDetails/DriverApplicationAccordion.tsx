import { Suspense } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionCollapsibleContent,
} from '@/ui/Accordion';
import { Separator } from '@/ui/Separator';
import { DriverApplicationDetailsSection } from '@/features/drivers/driverApplicationDetails/DriverApplicationDetailsSection';
import { DriverApplicationLicenceDetailsSection } from '@/features/drivers/driverApplicationDetails/DriverApplicationLicenceDetailsSection';
import { DriverApplicationTaxiBadgeDetailsSection } from '@/features/drivers/driverApplicationDetails/DriverApplicationTaxiBadgeDetailsSection';
import { DriverApplicationConverterSection } from '@/features/drivers/driverApplicationDetails/DriverApplicationConverterSection';
import { Spinner } from '@/ui/Spinner';

export function DriverApplicationAccordion() {
  return (
    <Accordion type="multiple" defaultValue={['details', 'convert']} className="!flex-grow-0">
      <AccordionItem value="details">
        <AccordionTrigger>Driver Details</AccordionTrigger>
        <AccordionCollapsibleContent>
          <Separator className="bg-achromatic-light dark:bg-achromatic-darker mb-3" />
          <DriverApplicationDetailsSection />
        </AccordionCollapsibleContent>
      </AccordionItem>

      <AccordionItem value="driversLicence">
        <AccordionTrigger>Drivers Licence</AccordionTrigger>
        <AccordionCollapsibleContent className="flex flex-col">
          <Separator className="bg-achromatic-light dark:bg-achromatic-darker mb-3" />
          <Suspense fallback={<Spinner />}>
            <DriverApplicationLicenceDetailsSection />
          </Suspense>
        </AccordionCollapsibleContent>
      </AccordionItem>

      <AccordionItem value="taxiBadge">
        <AccordionTrigger>Taxi Badge</AccordionTrigger>
        <AccordionCollapsibleContent className="flex flex-col">
          <Separator className="bg-achromatic-light dark:bg-achromatic-darker mb-3" />
          <Suspense fallback={<Spinner />}>
            <DriverApplicationTaxiBadgeDetailsSection />
          </Suspense>
        </AccordionCollapsibleContent>
      </AccordionItem>

      <AccordionItem value="convert">
        <AccordionTrigger>Convert to Driver</AccordionTrigger>
        <AccordionCollapsibleContent className="flex flex-col">
          <Separator className="bg-achromatic-light dark:bg-achromatic-darker mb-3" />
          <Suspense fallback={<Spinner />}>
            <DriverApplicationConverterSection />
          </Suspense>
        </AccordionCollapsibleContent>
      </AccordionItem>
    </Accordion>
  );
}
