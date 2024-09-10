import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionCollapsibleContent,
  AccordionNonCollapsibleContent,
} from '@/ui/Accordion';
import { CurrentDriverTaxiSection } from '@/features/drivers/driverTaxisSection/CurrentDriverTaxiSection';
import { Separator } from '@/ui/Separator';

export function DriverTaxisSwiperItem() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="current">
        <h2 className="p-4 font-medium">Current Taxi</h2>
        <AccordionNonCollapsibleContent className="pt-0">
          <Separator className="bg-achromatic-light dark:bg-achromatic-darker mb-3" />
          <CurrentDriverTaxiSection />
        </AccordionNonCollapsibleContent>
      </AccordionItem>

      <AccordionItem value="previous">
        <AccordionTrigger>Previous Taxis</AccordionTrigger>
        <AccordionCollapsibleContent>
          Previous Taxis
        </AccordionCollapsibleContent>
      </AccordionItem>
    </Accordion>
  );
}
