import { Link } from 'react-router-dom';
import { FiEye } from 'react-icons/fi';
import { useMemo } from 'react';
import { EditableInput } from '@/ui/form/Input';
import { buttonVariants } from '@/ui/Button';
import { FileListViewer, FileConfig } from '@/ui/files/FileListViewer';
import { useDriverDetails } from '@/features/drivers/general/hooks/useDriverDetails';
import { toDateInputString } from '@/utils/date/toDateInputString';

type Props = {
  id: number;
};

export function CurrentTaxiDriverDisplaySection({ id }: Props) {
  const { data } = useDriverDetails(id);

  const files: FileConfig[] = useMemo(() => [
    {
      key: 'picture',
      title: 'Picture',
      file: data.picture_src ?? undefined,
      fileType: data.picture_file_type,
      accept: 'image/*',
    },
  ], [data.picture_src, data.picture_file_type]);

  return (
    <form
      className="flex justify-start items-start gap-8 sm:gap-14 flex-col sm:flex-row py-3 px-2"
    >
      <div className="flex flex-col justify-start items-start gap-4 flex-shrink-0">
        <FileListViewer files={files} />

        <div className="flex gap-3 justify-center items-center w-full">
          <Link
            to={`/taxi/${id}`}
            className={buttonVariants({ variant: 'primary', className: 'w-full flex justify-center items-center gap-1' })}
          >
            <FiEye />
            <span>Go to Driver</span>
          </Link>
        </div>
      </div>

      <div className="space-y-3 flex-grow max-w-96">
        <EditableInput
          type="text"
          title="Name"
          readOnly
          value={data.name}
          className="capitalize placeholder:normal-case"
        />

        <EditableInput
          type="text"
          title="Email"
          readOnly
          value={data.email}
        />

        <EditableInput
          type="text"
          title="Phone Number"
          readOnly
          value={data.phone_number}
        />

        <EditableInput
          type="text"
          title="National Insurance Number"
          readOnly
          value={data.national_insurance_number}
          className="uppercase placeholder:normal-case"
        />

        <EditableInput
          type="date"
          title="Date of Birth"
          readOnly
          value={toDateInputString(new Date(data.date_of_birth ?? ''))}
        />
      </div>
    </form>
  );
}
