import { useParams, useNavigate } from 'react-router-dom';
import { FaLink } from 'react-icons/fa6';
import { FaTrashAlt } from 'react-icons/fa';
import { useMemo } from 'react';
import urlJoin from 'url-join';
import { useDriverApplication } from '@/features/drivers/general/hooks/useDriverApplication';
import { capitalizeEachWord } from '@/utils/string/capitalizeEachWord';
import { EditableInput } from '@/ui/form/Input';
import { toDateInputString } from '@/utils/date/toDateInputString';
import { PhoneNumberCell, EmailCell } from '@/ui/dataview/Cell';
import { FileListViewer, FileConfig } from '@/ui/files/FileListViewer';
import { Button } from '@/ui/Button';
import { useToast } from '@/ui/toast';
import { config } from '@/config/config';
import { useDeleteDriverApplication } from '@/features/drivers/general/hooks/useDeleteDriverApplication';

export function DriverApplicationDetailsSection() {
  const application_id = useParams().id as string;
  const { data } = useDriverApplication(application_id);
  const { mutate: deleteDriverApplication } = useDeleteDriverApplication();
  const { toast } = useToast();
  const navigate = useNavigate();

  const files: FileConfig[] = useMemo(() => [
    {
      key: 'picture',
      title: 'Driver Picture',
      file: data.picture_src ?? undefined,
      fileType: data.picture_file_type,
      accept: 'image/*',
    },
  ], [data.picture_src, data.picture_file_type]);

  const handleCopyApplicationLink: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();
    const link = urlJoin(config.env.VITE_CLIENT_URL, 'driver-application', application_id);
    await navigator.clipboard.writeText(link);
    toast({ title: 'Copied application link to clipboard' });
  };

  const handleDeleteDriverApplication: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    deleteDriverApplication(application_id, {
      onSuccess: () => navigate('/drivers/applications'),
    });
  };

  return (
    <form className="flex justify-start items-start gap-8 sm:gap-14 flex-col sm:flex-row py-3 px-2">
      <div className="flex flex-col justify-start items-start gap-4 flex-shrink-0">
        <FileListViewer files={files} />

        <div className="flex gap-3 justify-center items-center w-full">
          <Button
            type="button"
            size="sm"
            className="w-full flex justify-center items-center gap-1 text-nowrap"
            onClick={handleCopyApplicationLink}
          >
            <FaLink className="text-base" />
            <span>Copy Link</span>
          </Button>

          <Button
            type="button"
            variant="danger"
            size="sm"
            className="w-full flex justify-center items-center gap-1"
            onClick={handleDeleteDriverApplication}
          >
            <FaTrashAlt className="text-base" />
            <span>Delete</span>
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
          type="text"
          title="Reference Number"
          readOnly
          value={data.id}
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
