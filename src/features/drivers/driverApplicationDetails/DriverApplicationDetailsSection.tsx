import { useParams, useNavigate } from 'react-router-dom';
import { MdPersonAddAlt1 } from 'react-icons/md';
import { useMemo } from 'react';
import { useDriverApplication } from '@/features/drivers/general/hooks/useDriverApplication';
import { capitalizeEachWord } from '@/utils/string/capitalizeEachWord';
import { EditableInput } from '@/ui/form/Input';
import { Button } from '@/ui/Button';
import { toDateInputString } from '@/utils/date/toDateInputString';
import { useConvertDriverApplicationToDriver } from '@/features/drivers/general/hooks/useConvertDriverApplicationToDriver';
import { PhoneNumberCell, EmailCell } from '@/ui/dataview/Cell';
import { FileListViewer, FileConfig } from '@/ui/files/FileListViewer';
import { NonNullableObject } from '@/types/utils';

export function DriverApplicationDetailsSection() {
  const application_id = useParams().id as string;
  const { data } = useDriverApplication(application_id);
  const { mutate: convert } = useConvertDriverApplicationToDriver();
  const navigate = useNavigate();

  const files: FileConfig[] = useMemo(() => [
    {
      key: 'picture',
      title: 'Driver Picture',
      file: data.picture_src ?? undefined,
      fileType: data.picture_file_type,
      accept: 'image/*',
    },
    {
      key: 'licence',
      title: 'Drivers Licence',
      file: data.drivers_licence_src ?? undefined,
      fileType: data.drivers_licence_file_type,
      accept: 'image/*,.pdf',
    },
    {
      key: 'taxiBadge',
      title: 'Taxi Badge',
      file: data.taxi_badge_src ?? undefined,
      fileType: data.taxi_badge_file_type,
      accept: 'image/*,.pdf',
    },
  ], [
    data.picture_src,
    data.picture_file_type,
    data.drivers_licence_src,
    data.drivers_licence_file_type,
    data.taxi_badge_src,
    data.taxi_badge_file_type,
  ]);

  const handleConvert: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();

    const nonNullableData = data as NonNullableObject<typeof data>;

    convert({
      ...nonNullableData,
      licence_number: nonNullableData.drivers_licence_number,
      licence_start_date: nonNullableData.drivers_licence_start_date,
      licence_end_date: nonNullableData.drivers_licence_end_date,
      badge_number: nonNullableData.taxi_badge_number,
      badge_end_date: nonNullableData.taxi_badge_end_date,
      licence_document_path: nonNullableData.drivers_licence_path,
      badge_document_path: nonNullableData.taxi_badge_path,
      badge_start_date: nonNullableData.taxi_badge_start_date,
    }, {
      onSuccess: (driverId) => navigate(`/driver/${driverId}`, { preventScrollReset: false }),
    });
  };

  return (
    <form
      className="flex justify-start items-start gap-8 sm:gap-14 flex-col sm:flex-row py-3 px-2"
    >
      <div className="flex flex-col justify-start items-start gap-4 flex-shrink-0">
        <FileListViewer files={files} />

        <div className="flex gap-3 justify-center items-center w-full">
          <Button
            type="button"
            size="sm"
            className="w-full flex justify-center items-center gap-1"
            onClick={handleConvert}
            disabled={!data.is_submitted}
          >
            <MdPersonAddAlt1 className="text-lg" />
            <span>Convert</span>
          </Button>
        </div>
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
