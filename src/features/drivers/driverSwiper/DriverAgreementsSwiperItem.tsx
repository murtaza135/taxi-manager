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
          Current Hire Agreement
        </AccordionNonCollapsibleContent>
      </AccordionItem>

      <AccordionItem value="previous">
        <AccordionTrigger>Previous Hire Agreements</AccordionTrigger>
        <AccordionCollapsibleContent>
          Previous hire Agreements
        </AccordionCollapsibleContent>
      </AccordionItem>
    </Accordion>
  );
}
