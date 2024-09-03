import { useDocumentTitle } from '@/features/title/hooks/useDocumentTitle';
import { AddNewHireMultiStepForm } from '@/features/hires/addNewHire/components/AddNewHireAgreementMultiStepForm';

function AddNewHireAgreementPageComponent() {
  useDocumentTitle('Add New Hire Agreement');

  return (
    <AddNewHireMultiStepForm />
  );
}

export const Component = AddNewHireAgreementPageComponent;
