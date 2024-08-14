import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionCollapsibleContent,
  AccordionNonCollapsibleContent,
} from '@/ui/Accordion';

export function DriverTaxisSwiperItem() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="current">
        <AccordionNonCollapsibleContent>
          Current Taxi
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
