import { useParams } from 'react-router-dom';
import { useMemo } from 'react';
import { EditableInput } from '@/ui/form/Input';
import { toDateInputString } from '@/utils/date/toDateInputString';
import { FileListViewer, FileConfig } from '@/ui/files/FileListViewer';
import { useDriverApplication } from '@/features/drivers/general/hooks/useDriverApplication';

export function DriverApplicationLicenceDetailsSection() {
  const application_id = useParams().id as string;
  const { data } = useDriverApplication(application_id);

  const files: FileConfig[] = useMemo(() => [
    {
      key: 'licence',
      title: 'Drivers Licence (Front)',
      file: data.drivers_licence_src ?? undefined,
      fileType: data.drivers_licence_file_type,
      accept: 'image/*,.pdf',
    },
    {
      key: 'licence2',
      title: 'Drivers Licence (Back)',
      file: data.drivers_licence2_src ?? undefined,
      fileType: data.drivers_licence2_file_type,
      accept: 'image/*,.pdf',
    },
  ], [
    data.drivers_licence_src,
    data.drivers_licence_file_type,
    data.drivers_licence2_src,
    data.drivers_licence2_file_type,
  ]);

  return (
    <form className="flex justify-start items-start gap-8 sm:gap-14 flex-col sm:flex-row py-3 px-2">
      <div className="flex flex-col justify-start items-start gap-4 flex-shrink-0">
        <FileListViewer files={files} />
      </div>

      <div className="space-y-3 flex-grow max-w-96">
        <EditableInput
          type="text"
          title="Licence Number"
          readOnly
          value={data.drivers_licence_number}
        />

        <EditableInput
          type="date"
          title="Start Date"
          readOnly
          value={toDateInputString(new Date(data.drivers_licence_start_date ?? ''))}
        />

        <EditableInput
          type="date"
          title="End Date"
          readOnly
          value={toDateInputString(new Date(data.drivers_licence_end_date ?? ''))}
        />
      </div>
    </form>
  );
}
