import { useParams } from 'react-router-dom';
import { useMemo } from 'react';
import { useDriverApplication } from '@/features/drivers/general/hooks/useDriverApplication';
import { capitalizeEachWord } from '@/utils/string/capitalizeEachWord';
import { EditableInput } from '@/ui/form/Input';
import { toDateInputString } from '@/utils/date/toDateInputString';
import { PhoneNumberCell, EmailCell } from '@/ui/dataview/Cell';
import { FileListViewer, FileConfig } from '@/ui/files/FileListViewer';

export function DriverApplicationDetailsSection() {
  const application_id = useParams().id as string;
  const { data } = useDriverApplication(application_id);

  const files: FileConfig[] = useMemo(() => [
    {
      key: 'picture',
      title: 'Driver Picture',
      file: data.picture_src ?? undefined,
      fileType: data.picture_file_type,
      accept: 'image/*',
    },
  ], [data.picture_src, data.picture_file_type]);

  return (
    <form className="flex justify-start items-start gap-8 sm:gap-14 flex-col sm:flex-row py-3 px-2">
      <div className="flex flex-col justify-start items-start gap-4 flex-shrink-0">
        <FileListViewer files={files} />
      </div>

      <div className="space-y-3 flex-grow max-w-96">
        <EditableInput
          type="text"
          className="text-2xl font-bold flex-grow"
          readOnly
          value={capitalizeEachWord(data.name)}
        />

        {data.phone_number
          ? (
            <PhoneNumberCell phone={data.phone_number} className="w-full [&>.icon]:pr-6">
              <EditableInput
                type="text"
                title="Phone Number"
                readOnly
                value={data.phone_number ?? ''}
                className="!cursor-pointer"
              />
            </PhoneNumberCell>
          ) : (
            <EditableInput
              type="text"
              title="Phone Number"
              readOnly
              value={data.phone_number ?? ''}
            />
          )}

        {data.email
          ? (
            <EmailCell email={data.email} className="w-full [&>.icon]:pr-6">
              <EditableInput
                type="email"
                title="Email"
                readOnly
                value={data.email ?? ''}
                className="!cursor-pointer"
              />
            </EmailCell>
          ) : (
            <EditableInput
              type="email"
              title="Email"
              readOnly
              value={data.email ?? ''}
            />
          )}

        <EditableInput
          type="date"
          title="Date of Birth"
          readOnly
          value={toDateInputString(new Date(data.date_of_birth ?? ''))}
        />

        <EditableInput
          type="text"
          title="National Insurance Number"
          readOnly
          value={data.national_insurance_number ?? ''}
        />

        <EditableInput
          type="date"
          title="Creation Date"
          readOnly
          value={toDateInputString(new Date(data.created_at))}
        />
      </div>
    </form>
  );
}
