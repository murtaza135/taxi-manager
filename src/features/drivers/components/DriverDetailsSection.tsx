import { useParams } from 'react-router-dom';
import { MdModeEdit } from 'react-icons/md';
import { FaTrashAlt } from 'react-icons/fa';
import { HiDotsHorizontal } from 'react-icons/hi';
import { PiArrowUDownLeftBold } from 'react-icons/pi';
import { useId } from 'react';
import { useDriver } from '@/features/drivers/hooks/queries/useDriver';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/Avatar';
import { extractInitials } from '@/utils/string/extractInitials';
import { capitalizeEachWord } from '@/utils/string/capitalizeEachWord';
import { EditableInput, OnSaveArgs } from '@/ui/form/Input';
import { Button } from '@/ui/Button';
import { toDateInputString } from '@/utils/date/toDateInputString';
import { Checkbox } from '@/ui/form/Checkbox';
import { useUpdateDriver, UpdateDriverVariables } from '@/features/drivers/hooks/mutations/useUpdateDriver';

export function DriverDetailsSection() {
  const { id } = useParams();
  const { data } = useDriver(Number(id));
  const inputId = useId();
  const { mutate } = useUpdateDriver();
  console.log(data);

  const handleSave = (value: string, name?: string) => {
    if (name) {
      console.log(data[name as keyof UpdateDriverVariables]);
      console.log(value);
    }
  };

  return (
    <div className="flex justify-start items-start gap-8 xs:gap-10 sm:gap-14 flex-col xs:flex-row py-3 px-2">
      <div className="flex flex-row xs:flex-col justify-start items-start gap-4 flex-shrink-0">
        <label htmlFor={inputId} className="relative group">
          <input
            id={inputId}
            aria-label="picture"
            className="hidden"
            type="file"
            readOnly
          />
          <Avatar className="w-24 h-24 xs:w-28 xs:h-28 sm:!w-40 sm:!h-40 relative cursor-pointer select-none after:content-[''] after:absolute after:w-full after:h-full group-hover:after:bg-achromatic-dark/50">
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
          <p className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-60 text-xl xs:text-2xl cursor-pointer">
            <MdModeEdit />
          </p>
        </label>

        <div className="flex gap-3 justify-center items-center w-full">
          <Button size="sm" className="w-full flex justify-center items-center gap-1">
            <MdModeEdit className="text-base" />
            Edit
          </Button>
        </div>
      </div>

      <div className="space-y-3 flex-grow max-w-96">
        <EditableInput
          name="name"
          type="text"
          defaultValue={capitalizeEachWord(data.name)}
          className="text-2xl font-bold flex-grow"
          onSave={handleSave}
        />
        <EditableInput
          name="phone_number"
          type="tel"
          title="Phone Number"
          defaultValue={data.phone_number ?? ''}
          onSave={handleSave}
        />
        <EditableInput
          name="email"
          type="email"
          title="Email"
          defaultValue={data.email ?? ''}
          onSave={handleSave}
        />
        <EditableInput
          name="date_of_birth"
          type="date"
          title="Date of Birth"
          defaultValue={data.date_of_birth ?? ''}
          onSave={handleSave}
        />
        <EditableInput
          name="national_insurance_number"
          type="text"
          title="National Insurance Number"
          defaultValue={data.national_insurance_number ?? ''}
          onSave={handleSave}
        />
        <div className="space-y-0.5">
          <p className="font-semibold text-sm text-achromatic-dark/65 dark:text-achromatic-500">Retired</p>
          <div className="flex items-center justify-start gap-2 translate-x-[1px]">
            <Checkbox checked={data.is_retired ?? false} />
            <span className="translate-y-[1px]">{data.is_retired ? 'Yes' : 'No'}</span>
          </div>
        </div>
        <EditableInput
          name="created_at"
          type="date"
          title="Creation Date"
          defaultValue={toDateInputString(new Date(data.created_at ?? ''))}
          onSave={handleSave}
        />
      </div>
    </div>
  );
}
