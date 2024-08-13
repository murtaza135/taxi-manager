import { useParams } from 'react-router-dom';
import { MdModeEdit } from 'react-icons/md';
import { FaTrashAlt } from 'react-icons/fa';
import { PiArrowUDownLeftBold } from 'react-icons/pi';
import { useId } from 'react';
import { useDriver } from '@/features/drivers/hooks/queries/useDriver';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/Avatar';
import { extractInitials } from '@/utils/string/extractInitials';
import { capitalizeEachWord } from '@/utils/string/capitalizeEachWord';
import { EditableInput } from '@/ui/form/Input';
import { Button } from '@/ui/Button';
import { toDateInputString } from '@/utils/date/toDateInputString';

export function DriverDetailsSection() {
  const { id } = useParams();
  const { data } = useDriver(Number(id));
  const inputId = useId();
  console.log(data);

  return (
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
          {data.is_retired
            ? (
              <Button variant="ghost" className="p-0">
                <PiArrowUDownLeftBold className="text-lg xs:text-xl" />
              </Button>
            )
            : (
              <Button variant="ghost" className="p-0">
                <FaTrashAlt className="text-lg xs:text-xl text-red-800 dark:text-red-500/70" />
              </Button>
            )}
        </div>
      </div>

      <div className="space-y-3 flex-grow max-w-96">
        <EditableInput
          type="text"
          value={capitalizeEachWord(data.name)}
          className="text-2xl font-bold"
          onSave={(value) => console.log(value)}
        />
        <EditableInput
          type="tel"
          title="Phone Number"
          value={data.phone_number ?? ''}
          onSave={(value) => console.log(value)}
        />
        <EditableInput
          type="email"
          title="Email"
          value={data.email ?? ''}
          onSave={(value) => console.log(value)}
        />
        <EditableInput
          type="date"
          title="Date of Birth"
          value={data.date_of_birth ?? ''}
          onSave={(value) => console.log(value)}
        />
        <EditableInput
          type="text"
          title="National Insurance Number"
          value={data.national_insurance_number ?? ''}
          onSave={(value) => console.log(value)}
        />
        <EditableInput
          type="text"
          title="Retired"
          value={data.is_retired ? 'Yes' : 'No'}
          onSave={(value) => console.log(value)}
        />
        <EditableInput
          type="date"
          title="Creation Date"
          value={toDateInputString(new Date(data.created_at ?? ''))}
          onSave={(value) => console.log(value)}
        />
      </div>
    </div>
  );
}
