import { Suspense } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionCollapsibleContent,
} from '@/ui/Accordion';
import { Separator } from '@/ui/Separator';
import { DriverDetailsSection } from '@/features/drivers/driverDetails/DriverDetailsSection';
import { DriversLicenceDetailsSection } from '@/features/drivers/driverDetails/DriversLicenceDetailsSection';
import { DriversTaxiBadgeDetailsSection } from '@/features/drivers/driverDetails/DriversTaxiBadgeDetailsSection';
import { Spinner } from '@/ui/Spinner';

export function DriverDetailsSwiperItem() {
  return (
    <Accordion type="multiple" defaultValue={['details']}>
      <AccordionItem value="details">
        <AccordionTrigger>Driver Details</AccordionTrigger>
        <AccordionCollapsibleContent>
          <Separator className="bg-achromatic-light dark:bg-achromatic-darker mb-3" />
          <DriverDetailsSection />
        </AccordionCollapsibleContent>
      </AccordionItem>

      <AccordionItem value="driversLicence">
        <AccordionTrigger>Drivers Licence</AccordionTrigger>
        <AccordionCollapsibleContent className="flex flex-col">
          <Separator className="bg-achromatic-light dark:bg-achromatic-darker mb-3" />
          <Suspense fallback={<Spinner />}>
            <DriversLicenceDetailsSection />
          </Suspense>
        </AccordionCollapsibleContent>
      </AccordionItem>

      <AccordionItem value="taxiBadge">
        <AccordionTrigger>Taxi Badge</AccordionTrigger>
        <AccordionCollapsibleContent className="flex flex-col">
          <Separator className="bg-achromatic-light dark:bg-achromatic-darker mb-3" />
          <Suspense fallback={<Spinner />}>
            <DriversTaxiBadgeDetailsSection />
          </Suspense>
        </AccordionCollapsibleContent>
      </AccordionItem>
    </Accordion>
  );
}
