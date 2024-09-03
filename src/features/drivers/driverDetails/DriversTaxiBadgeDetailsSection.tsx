import { useParams } from 'react-router-dom';
import { DriversTaxiBadgeDetailsCreateSection } from '@/features/drivers/driverDetails/DriversTaxiBadgeDetailsCreateSection';
import { DriversTaxiBadgeDetailsUpdateSection } from '@/features/drivers/driverDetails/DriversTaxiBadgeDetailsUpdateSection';
import { useDriversTaxiBadgeDetails, DriversTaxiBadgeDetails } from '@/features/drivers/general/hooks/useDriversTaxiBadgeDetails';

export function DriversTaxiBadgeDetailsSection() {
  const params = useParams();
  const driver_id = Number(params.id);
  const { data: originalData } = useDriversTaxiBadgeDetails(driver_id);
  const data = originalData as Partial<DriversTaxiBadgeDetails>;

  return data.id
    ? <DriversTaxiBadgeDetailsUpdateSection />
    : <DriversTaxiBadgeDetailsCreateSection />;
}
