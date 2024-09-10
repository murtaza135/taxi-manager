import { Link } from 'react-router-dom';
import { FiEye } from 'react-icons/fi';
import { FaPoundSign } from 'react-icons/fa';
import { useMemo } from 'react';
import { toDateInputString } from '@/utils/date/toDateInputString';
import { EditableInput } from '@/ui/form/Input';
import { buttonVariants } from '@/ui/Button';
import { FileListViewer, FileConfig } from '@/ui/files/FileListViewer';
import { useHireDetails } from '@/features/hires/general/hooks/useHireDetails';

type Props = {
  id: number;
};

export function CurrentDriverHireDisplaySection({ id }: Props) {
  const { data } = useHireDetails(id);

  const files: FileConfig[] = useMemo(() => [
    {
      key: 'permissionLetter',
      title: 'Permission Letter',
      file: data.permission_letter_document_src ?? undefined,
      fileType: data.permission_letter_document_file_type,
      accept: 'image/*,pdf',
    },
    {
      key: 'contract',
      title: 'Contract',
      file: data.contract_document_src ?? undefined,
      fileType: data.contract_document_file_type,
      accept: 'image/*,pdf',
    },
    {
      key: 'depositReceipt',
      title: 'Deposit Receipt',
      file: data.deposit_receipt_document_src ?? undefined,
      fileType: data.deposit_receipt_document_file_type,
      accept: 'image/*,pdf',
    },
  ], [
    data.permission_letter_document_src,
    data.permission_letter_document_file_type,
    data.contract_document_src,
    data.contract_document_file_type,
    data.deposit_receipt_document_src,
    data.deposit_receipt_document_file_type,
  ]);

  return (
    <form
      className="flex justify-start items-start gap-8 sm:gap-14 flex-col sm:flex-row py-3 px-2"
    >
      <div className="flex flex-col justify-start items-start gap-4 flex-shrink-0">
        <FileListViewer files={files} />

        <div className="flex gap-3 justify-center items-center w-full">
          <Link
            to={`/hire/${id}`}
            className={buttonVariants({ variant: 'primary', className: 'w-full flex justify-center items-center gap-1' })}
          >
            <FiEye />
            <span>Go to Hire Agreement</span>
          </Link>
        </div>
      </div>

      <div className="space-y-3 flex-grow max-w-96">
        <EditableInput
          type="text"
          title="Hire Agreement ID"
          readOnly
          value={data.id}
        />

        <EditableInput
          type="text"
          title="Rent Amount"
          readOnly
          value={data.rent_amount}
          leftIcon={<FaPoundSign className="text-sm" />}
        />

        <EditableInput
          type="text"
          title="Deposit Amount"
          readOnly
          value={data.deposit_amount}
          leftIcon={<FaPoundSign className="text-sm" />}
        />

        <EditableInput
          type="date"
          title="Start Date"
          readOnly
          value={toDateInputString(new Date(data.start_date ?? ''))}
        />

        <EditableInput
          type="date"
          title="End Date"
          readOnly
          value={toDateInputString(new Date(data.end_date ?? ''))}
        />
      </div>
    </form>
  );
}
