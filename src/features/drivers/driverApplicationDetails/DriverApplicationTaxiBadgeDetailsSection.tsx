import { useParams } from 'react-router-dom';
import { useMemo } from 'react';
import { EditableInput } from '@/ui/form/Input';
import { toDateInputString } from '@/utils/date/toDateInputString';
import { FileListViewer, FileConfig } from '@/ui/files/FileListViewer';
import { useDriverApplication } from '@/features/drivers/general/hooks/useDriverApplication';

export function DriverApplicationTaxiBadgeDetailsSection() {
  const application_id = useParams().id as string;
  const { data } = useDriverApplication(application_id);

  const files: FileConfig[] = useMemo(() => [
    {
      key: 'taxiBadge',
      title: 'Taxi Badge',
      file: data.taxi_badge_src ?? undefined,
      fileType: data.taxi_badge_file_type,
      accept: 'image/*,.pdf',
    },
  ], [data.taxi_badge_src, data.taxi_badge_file_type]);

  return (
    <form className="flex justify-start items-start gap-8 sm:gap-14 flex-col sm:flex-row py-3 px-2">
      <div className="flex flex-col justify-start items-start gap-4 flex-shrink-0">
        <FileListViewer files={files} />
      </div>

      <div className="space-y-3 flex-grow max-w-96">
        <EditableInput
          type="text"
          title="Badge Number"
          readOnly
          value={data.taxi_badge_number}
        />

        <EditableInput
          type="date"
          title="Start Date"
          readOnly
          value={toDateInputString(new Date(data.taxi_badge_start_date ?? ''))}
        />

        <EditableInput
          type="date"
          title="End Date"
          readOnly
          value={toDateInputString(new Date(data.taxi_badge_end_date ?? ''))}
        />
      </div>
    </form>
  );
}
