import { useParams } from 'react-router-dom';
import { TaxiInsuranceDetailsUpdateSection } from '@/features/taxis/taxiDetails/TaxiInsuranceDetailsUpdateSection';
import { useTaxiInsuranceDetails, TaxiInsuranceDetails } from '@/features/taxis/general/hooks/useTaxiInsuranceDetails';
import { TaxiInsuranceDetailsCreateSection } from '@/features/taxis/taxiDetails/TaxiInsuranceDetailsCreateSection';

export function TaxiInsuranceDetailsSection() {
  const params = useParams();
  const taxi_id = Number(params.id);
  const { data: originalData } = useTaxiInsuranceDetails(taxi_id);
  const data = originalData as Partial<TaxiInsuranceDetails>;

  return data.id
    ? <TaxiInsuranceDetailsUpdateSection />
    : <TaxiInsuranceDetailsCreateSection />;
}
