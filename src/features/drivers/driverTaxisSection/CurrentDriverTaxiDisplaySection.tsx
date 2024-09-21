import { Link } from 'react-router-dom';
import { FiEye } from 'react-icons/fi';
import { useMemo } from 'react';
import { EditableInput } from '@/ui/form/Input';
import { buttonVariants } from '@/ui/Button';
import { FileListViewer, FileConfig } from '@/ui/files/FileListViewer';
import { useTaxiDetails } from '@/features/taxis/general/hooks/useTaxiDetails';
import { useTaxiLicenceDetails } from '@/features/taxis/general/hooks/useTaxiLicenceDetails';

type Props = {
  id: number;
};

export function CurrentDriverTaxiDisplaySection({ id }: Props) {
  const { data: taxi_details } = useTaxiDetails(id);
  const { data: licence_details } = useTaxiLicenceDetails(id);

  const files: FileConfig[] = useMemo(() => [
    {
      key: 'picture',
      title: 'Picture',
      file: taxi_details.picture_src ?? undefined,
      fileType: taxi_details.picture_file_type,
      accept: 'image/*',
    },
    {
      key: 'logbook',
      title: 'Logbook (Front)',
      file: taxi_details.logbook_document_src ?? undefined,
      fileType: taxi_details.logbook_document_file_type,
      accept: 'image/*,.pdf',
    },
    {
      key: 'logbook2',
      title: 'Logbook (Back)',
      file: taxi_details.logbook_document2_src ?? undefined,
      fileType: taxi_details.logbook_document2_file_type,
      accept: 'image/*,.pdf',
    },
  ], [
    taxi_details.picture_src,
    taxi_details.picture_file_type,
    taxi_details.logbook_document_src,
    taxi_details.logbook_document_file_type,
    taxi_details.logbook_document2_src,
    taxi_details.logbook_document2_file_type,
  ]);

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
            <span>Go to Taxi</span>
          </Link>
        </div>
      </div>

      <div className="space-y-3 flex-grow max-w-96">
        <EditableInput
          type="text"
          title="Number Plate"
          readOnly
          value={taxi_details.number_plate}
          className="uppercase placeholder:normal-case"
        />

        <EditableInput
          type="text"
          title="PH Number"
          readOnly
          value={licence_details.phc_number}
          className="uppercase placeholder:normal-case"
        />

        <EditableInput
          type="text"
          title="Make"
          readOnly
          value={taxi_details.make}
          className="capitalize placeholder:normal-case"
        />

        <EditableInput
          type="text"
          title="Model"
          readOnly
          value={taxi_details.model}
          className="capitalize placeholder:normal-case"
        />

        <EditableInput
          type="text"
          title="Colour"
          readOnly
          value={taxi_details.colour}
          className="capitalize placeholder:normal-case"
        />

        <EditableInput
          type="text"
          title="Chassis Number"
          readOnly
          value={taxi_details.chassis_number}
          className="uppercase placeholder:normal-case"
        />
      </div>
    </form>
  );
}
