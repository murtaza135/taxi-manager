import { Title } from '@/features/title/components/Title';
import { AddNewDriverMultiStepForm } from '@/features/drivers/components/AddNewDriverMultiStepForm';

function AddNewDriverPageComponent() {
  return (
    <>
      <Title title="Add New Driver" />
      <AddNewDriverMultiStepForm />
    </>
  );
}

export const Component = AddNewDriverPageComponent;
