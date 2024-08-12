import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionCollapsibleContent,
  AccordionNonCollapsibleContent,
} from '@/ui/Accordion';

export function DriverAgreementsSwiperItem() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="current">
        <AccordionNonCollapsibleContent>
          Current Agreement
        </AccordionNonCollapsibleContent>
      </AccordionItem>

      <AccordionItem value="previous">
        <AccordionTrigger>Previous Agreements</AccordionTrigger>
        <AccordionCollapsibleContent>
          Previous Agreements
        </AccordionCollapsibleContent>
      </AccordionItem>
    </Accordion>
  );
}
