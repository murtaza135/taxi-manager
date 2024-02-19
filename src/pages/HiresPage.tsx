import { Title } from '@/features/title/components/Title';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionCollapsibleContent,
  AccordionNonCollapsibleContent,
} from '@/ui/Accordion';

export default function HiresPage() {
  return (
    <>
      <Title title="Hires" />
      <div>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionNonCollapsibleContent>
              lol
            </AccordionNonCollapsibleContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionCollapsibleContent>
              Yes. It comes with default styles that matches the other
              components&apos; aesthetic.
            </AccordionCollapsibleContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionNonCollapsibleContent>
              Yes. It&apos;s animated by default, but you can disable it if you prefer.
            </AccordionNonCollapsibleContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}
