import { useDocumentTitle } from '@/features/title/hooks/useDocumentTitle';
import { AddNewDriverApplicationForm } from '@/features/drivers/addNewDriverApplication/AddNewDriverApplicationForm';

function AddNewDriverApplicationPageComponent() {
  useDocumentTitle('Add New Application');

  return (
    <AddNewDriverApplicationForm />
  );
}

export const Component = AddNewDriverApplicationPageComponent;
