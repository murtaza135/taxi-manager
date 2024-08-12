import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionCollapsibleContent,
  AccordionNonCollapsibleContent,
} from '@/ui/Accordion';

export function DriverDetailsSwiperItem() {
  return (
    <Accordion type="multiple">
      <AccordionItem value="details">
        <AccordionNonCollapsibleContent>
          Driver Details
        </AccordionNonCollapsibleContent>
      </AccordionItem>

      <AccordionItem value="driversLicence">
        <AccordionTrigger>Drivers Licence</AccordionTrigger>
        <AccordionCollapsibleContent>
          Drivers Licence
        </AccordionCollapsibleContent>
      </AccordionItem>

      <AccordionItem value="taxiBadge">
        <AccordionTrigger>Taxi Badge</AccordionTrigger>
        <AccordionCollapsibleContent>
          Taxi Badge
        </AccordionCollapsibleContent>
      </AccordionItem>
    </Accordion>
  );
}
