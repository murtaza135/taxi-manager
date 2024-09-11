import { useDocumentTitle } from '@/features/title/hooks/useDocumentTitle';
import { AddNewDriverApplicationForm } from '@/features/drivers/addNewDriverApplication/AddNewDriverApplicationForm';

function AddNewDriverApplicationPageComponent() {
  useDocumentTitle('Create Application for Driver');

  return (
    <AddNewDriverApplicationForm />
  );
}

export const Component = AddNewDriverApplicationPageComponent;
