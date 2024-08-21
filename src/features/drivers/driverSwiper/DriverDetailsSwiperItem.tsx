import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionCollapsibleContent,
} from '@/ui/Accordion';
import { Separator } from '@/ui/Separator';
import { DriverDetailsSection } from '@/features/drivers/driverDetails/DriverDetailsSection';

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
        <AccordionCollapsibleContent>
          <Separator className="bg-achromatic-light dark:bg-achromatic-darker" />
          Drivers Licence
        </AccordionCollapsibleContent>
      </AccordionItem>

      <AccordionItem value="taxiBadge">
        <AccordionTrigger>Taxi Badge</AccordionTrigger>
        <AccordionCollapsibleContent>
          <Separator className="bg-achromatic-light dark:bg-achromatic-darker" />
          Taxi Badge
        </AccordionCollapsibleContent>
      </AccordionItem>
    </Accordion>
  );
}
