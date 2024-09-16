import { Link, useParams } from 'react-router-dom';
import { FiEye } from 'react-icons/fi';
import { useMemo } from 'react';
import { FaPoundSign } from 'react-icons/fa';
import { buttonVariants } from '@/ui/Button';
import { EditableInput } from '@/ui/form/Input';
import { FileListViewer, FileConfig } from '@/ui/files/FileListViewer';
import { useRent } from '@/features/rent/general/hooks/useRent';
import { useHireDetails } from '@/features/hires/general/hooks/useHireDetails';
import { toDateInputString } from '@/utils/date/toDateInputString';

export function RentHireSection() {
  const params = useParams();
  const rent_id = Number(params.id);
  const { data: rent } = useRent(rent_id);
  const { hire_id } = rent;
  const { data: hire_details } = useHireDetails(hire_id);

  const files: FileConfig[] = useMemo(() => [
    {
      key: 'permission_letter_document',
      title: 'Permission Letter',
      file: hire_details.permission_letter_document_src ?? undefined,
      fileType: hire_details.permission_letter_document_file_type,
      accept: 'image/*,pdf',
    },
    {
      key: 'contract_document',
      title: 'Contract',
      file: hire_details.contract_document_src ?? undefined,
      fileType: hire_details.contract_document_file_type,
      accept: 'image/*,pdf',
    },
    {
      key: 'deposit_receipt_document',
      title: 'Deposit Receipt',
      file: hire_details.deposit_receipt_document_src ?? undefined,
      fileType: hire_details.deposit_receipt_document_file_type,
      accept: 'image/*,pdf',
    },
  ], [
    hire_details.permission_letter_document_src,
    hire_details.permission_letter_document_file_type,
    hire_details.contract_document_src,
    hire_details.contract_document_file_type,
    hire_details.deposit_receipt_document_src,
    hire_details.deposit_receipt_document_file_type,
  ]);

  return (
    <form
      className="flex justify-start items-start gap-8 sm:gap-14 flex-col sm:flex-row py-3 px-2"
    >
      <div className="flex flex-col justify-start items-start gap-4 flex-shrink-0">
        <FileListViewer files={files} />

        <div className="flex gap-3 justify-center items-center w-full">
          <Link
            to={`/hire/${hire_id}`}
            className={buttonVariants({ variant: 'primary', className: 'w-full flex justify-center items-center gap-1' })}
          >
            <FiEye />
            <span>Go to Hire</span>
          </Link>
        </div>
      </div>

      <div className="space-y-3 flex-grow max-w-96">
        <EditableInput
          type="text"
          title="Hire Agreement ID"
          readOnly
          value={hire_id}
        />

        <EditableInput
          type="text"
          title="Rent Amount"
          readOnly
          value={hire_details.rent_amount}
          leftIcon={<FaPoundSign className="text-sm" />}
        />

        <EditableInput
          type="text"
          title="Deposit Amount"
          readOnly
          value={hire_details.deposit_amount}
          leftIcon={<FaPoundSign className="text-sm" />}
        />

        <EditableInput
          type="date"
          title="Start Date"
          readOnly
          value={toDateInputString(new Date(hire_details.start_date))}
        />

        <EditableInput
          type="date"
          title="End Date"
          readOnly
          value={toDateInputString(new Date(hire_details.end_date ?? ''))}
        />

        <EditableInput
          type="date"
          title="Creation Date"
          readOnly
          value={toDateInputString(new Date(hire_details.created_at ?? ''))}
        />
      </div>
    </form>
  );
}
