import { useParams } from 'react-router-dom';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionCollapsibleContent,
  AccordionNonCollapsibleContent,
} from '@/ui/Accordion';
import { useDriver } from '@/features/drivers/hooks/queries/useDriver';

export function DriverDetailsSwiperItem() {
  const { id } = useParams();
  const { data } = useDriver(Number(id));
  console.log(data);

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
