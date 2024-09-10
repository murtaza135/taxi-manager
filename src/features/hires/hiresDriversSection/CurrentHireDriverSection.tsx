import { Link, useParams } from 'react-router-dom';
import { FiEye } from 'react-icons/fi';
import { useMemo } from 'react';
import { buttonVariants } from '@/ui/Button';
import { EditableInput } from '@/ui/form/Input';
import { FileListViewer, FileConfig } from '@/ui/files/FileListViewer';
import { useDriverDetails } from '@/features/drivers/general/hooks/useDriverDetails';
import { useHireDetails } from '@/features/hires/general/hooks/useHireDetails';
import { toDateInputString } from '@/utils/date/toDateInputString';

export function CurrentHireDriverSection() {
  const params = useParams();
  const hire_id = Number(params.id);
  const { data: hire_details } = useHireDetails(hire_id);
  const { driver_id } = hire_details;
  const { data: driver_details } = useDriverDetails(driver_id);

  const files: FileConfig[] = useMemo(() => [
    {
      key: 'picture',
      title: 'Picture',
      file: driver_details.picture_src ?? undefined,
      fileType: driver_details.picture_file_type,
      accept: 'image/*',
    },
  ], [driver_details.picture_src, driver_details.picture_file_type]);

  return (
    <form
      className="flex justify-start items-start gap-8 sm:gap-14 flex-col sm:flex-row py-3 px-2"
    >
      <div className="flex flex-col justify-start items-start gap-4 flex-shrink-0">
        <FileListViewer files={files} />

        <div className="flex gap-3 justify-center items-center w-full">
          <Link
            to={`/driver/${driver_id}`}
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
          value={driver_details.name}
          className="capitalize placeholder:normal-case"
        />

        <EditableInput
          type="text"
          title="Email"
          readOnly
          value={driver_details.email}
        />

        <EditableInput
          type="text"
          title="Phone Number"
          readOnly
          value={driver_details.phone_number}
        />

        <EditableInput
          type="text"
          title="National Insurance Number"
          readOnly
          value={driver_details.national_insurance_number}
          className="uppercase placeholder:normal-case"
        />

        <EditableInput
          type="date"
          title="Date of Birth"
          readOnly
          value={toDateInputString(new Date(driver_details.date_of_birth ?? ''))}
        />
      </div>
    </form>
  );
}
