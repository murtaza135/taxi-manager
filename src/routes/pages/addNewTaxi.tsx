import { useDocumentTitle } from '@/features/title/hooks/useDocumentTitle';
import { AddNewTaxiMultiStepForm } from '@/features/taxis/addNewTaxi/components/AddNewTaxiMultiStepForm';

function AddNewTaxiPageComponent() {
  useDocumentTitle('Add New Taxi');
  return <AddNewTaxiMultiStepForm />;
}

export const Component = AddNewTaxiPageComponent;
