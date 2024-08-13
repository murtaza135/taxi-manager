import { useParams } from 'react-router-dom';
import { MdModeEdit } from 'react-icons/md';
import { FaTrashAlt } from 'react-icons/fa';
import { useId } from 'react';
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
import { Button } from '@/ui/Button';

export function DriverDetailsSwiperItem() {
  const { id } = useParams();
  const { data } = useDriver(Number(id));
  const inputId = useId();
  console.log(data);

  return (
    <Accordion type="multiple">
      <AccordionItem value="details">
        <AccordionNonCollapsibleContent>
          <div className="flex justify-start items-start gap-8 xs:gap-10 sm:gap-14 flex-col xs:flex-row py-3 px-2">
            <div className="flex flex-col justify-start items-start gap-4 flex-shrink-0">
              <Avatar className="w-24 h-24 xs:w-28 xs:h-28 sm:!w-40 sm:!h-40">
                {data.picture_src && (
                  <AvatarImage
                    src={data.picture_src}
                    alt={`driver-${data.id}`}
                  />
                )}
                <AvatarFallback className="w-24 h-24 xs:w-28 xs:h-28 sm:!w-40 sm:!h-40">
                  {extractInitials(data.name)}
                </AvatarFallback>
              </Avatar>

              <div className="flex gap-3 justify-center items-center w-full">
                <label htmlFor={inputId}>
                  <input
                    id={inputId}
                    aria-label="picture"
                    className="hidden"
                    type="file"
                    readOnly
                  />
                  <MdModeEdit className="text-xl xs:text-2xl transition-opacity hover:opacity-50 cursor-pointer" />
                </label>
                <Button variant="ghost" className="p-0">
                  <FaTrashAlt className="text-lg xs:text-xl text-red-800 dark:text-red-500/70" />
                </Button>
              </div>
            </div>

            <div className="space-y-2 flex-grow max-w-96">
              <EditableInput defaultValue={capitalizeEachWord(data.name)} className="text-2xl font-bold" onSave={(value) => console.log(value)} />
              <EditableInput title="lol" defaultValue="hehehe" onSave={(value) => console.log(value)} />
              <EditableInput title="lol" defaultValue="hehehe" onSave={(value) => console.log(value)} />
              <EditableInput title="lol" defaultValue="hehehe" onSave={(value) => console.log(value)} />
              <EditableInput title="lol" defaultValue="hehehe" onSave={(value) => console.log(value)} />
              <EditableInput title="lol" defaultValue="hehehe" onSave={(value) => console.log(value)} />
              <EditableInput title="lol" defaultValue="hehehe" onSave={(value) => console.log(value)} />
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
