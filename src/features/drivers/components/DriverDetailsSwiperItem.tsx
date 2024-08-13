import { useParams } from 'react-router-dom';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionCollapsibleContent,
  AccordionNonCollapsibleContent,
} from '@/ui/Accordion';
import { useDriver } from '@/features/drivers/hooks/queries/useDriver';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/Avatar';
import { extractInitials } from '@/utils/string/extractInitials';
import { capitalizeEachWord } from '@/utils/string/capitalizeEachWord';
import { EditableInput } from '@/ui/form/Input';

export function DriverDetailsSwiperItem() {
  const { id } = useParams();
  const { data } = useDriver(Number(id));
  console.log(data);

  return (
    <Accordion type="multiple">
      <AccordionItem value="details">
        <AccordionNonCollapsibleContent>
          <div className="flex items-center gap-6 flex-col xs:flex-row xs:items-start">
            <div>
              <Avatar className="w-full h-full max-w-40 max-h-40">
                {data.picture_src && (
                  <AvatarImage
                    src={data.picture_src}
                    alt={`driver-${data.id}`}
                  />
                )}
                <AvatarFallback>
                  {extractInitials(data.name)}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="space-y-4 flex-grow w-full xs:w-fit">
              <h2 className="text-2xl font-bold text-center xs:text-start">{capitalizeEachWord(data.name)}</h2>
              <div>
                <EditableInput title="lol" defaultValue="hehehe" onSave={(value) => console.log(value)} />
              </div>
            </div>
          </div>
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
