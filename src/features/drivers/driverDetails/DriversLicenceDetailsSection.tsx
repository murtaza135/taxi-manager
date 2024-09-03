import { useParams } from 'react-router-dom';
import { DriversLicenceDetailsCreateSection } from '@/features/drivers/driverDetails/DriversLicenceDetailsCreateSection';
import { DriversLicenceDetailsUpdateSection } from '@/features/drivers/driverDetails/DriversLicenceDetailsUpdateSection';
import { useDriversLicenceDetails, DriversLicenceDetails } from '@/features/drivers/general/hooks/useDriversLicenceDetails';

export function DriversLicenceDetailsSection() {
  const params = useParams();
  const driver_id = Number(params.id);
  const { data: originalData } = useDriversLicenceDetails(driver_id);
  const data = originalData as Partial<DriversLicenceDetails>;

  return data.id
    ? <DriversLicenceDetailsUpdateSection />
    : <DriversLicenceDetailsCreateSection />;
}
