import { useDocumentTitle } from '@/features/title/hooks/useDocumentTitle';
import { AddNewDriverMultiStepForm } from '@/features/drivers/components/AddNewDriverMultiStepForm';

function AddNewDriverPageComponent() {
  useDocumentTitle('Add New Driver');

  return (
    <AddNewDriverMultiStepForm />
  );
}

export const Component = AddNewDriverPageComponent;
