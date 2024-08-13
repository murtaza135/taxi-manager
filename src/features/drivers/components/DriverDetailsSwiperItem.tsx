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
          <div className="flex justify-start items-start gap-8 xs:gap-10 sm:gap-14 flex-col xs:flex-row py-3 px-2">
            <div className="flex flex-col justify-start items-start gap-4 xs:max-w-48">
              <Avatar className="w-full h-full max-w-24 max-h-24 xs:max-w-40 xs:max-h-40">
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
              <EditableInput defaultValue={capitalizeEachWord(data.name)} className="text-2xl font-bold" onSave={(value) => console.log(value)} />
            </div>

            <div className="flex gap-8 flex-wrap flex-grow overflow-hidden [&_input]:w-fit">
              <div className="space-y-2">
                <EditableInput title="lol" defaultValue="hehehe" onSave={(value) => console.log(value)} />
                <EditableInput title="lol" defaultValue="hehehe" onSave={(value) => console.log(value)} />
                <EditableInput title="lol" defaultValue="hehehe" onSave={(value) => console.log(value)} />
                <EditableInput title="lol" defaultValue="hehehe" onSave={(value) => console.log(value)} />
                <EditableInput title="lol" defaultValue="hehehedasdasdsadasdasdasdasdad" onSave={(value) => console.log(value)} />
                <EditableInput title="lol" defaultValue="hehehe" onSave={(value) => console.log(value)} />
              </div>
              <div className="space-y-2">
                <EditableInput title="lol" defaultValue="hehehe" onSave={(value) => console.log(value)} />
                <EditableInput title="lol" defaultValue="hehehe" onSave={(value) => console.log(value)} />
                <EditableInput title="lol" defaultValue="hehehe" onSave={(value) => console.log(value)} />
                <EditableInput title="lol" defaultValue="hehehe" onSave={(value) => console.log(value)} />
                <EditableInput title="lol" defaultValue="hehehe" onSave={(value) => console.log(value)} />
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
