import { useParams } from 'react-router-dom';
import { TaxiLicenceDetailsUpdateSection } from '@/features/taxis/taxiDetails/TaxiLicenceDetailsUpdateSection';
import { TaxiLicenceDetailsCreateSection } from '@/features/taxis/taxiDetails/TaxiLicenceDetailsCreateSection';
import { useTaxiLicenceDetails, TaxiLicenceDetails } from '@/features/taxis/general/hooks/useTaxiLicenceDetails';

export function TaxiLicenceDetailsSection() {
  const params = useParams();
  const taxi_id = Number(params.id);
  const { data: originalData } = useTaxiLicenceDetails(taxi_id);
  const data = originalData as Partial<TaxiLicenceDetails>;

  return data.id
    ? <TaxiLicenceDetailsUpdateSection />
    : <TaxiLicenceDetailsCreateSection />;
}
