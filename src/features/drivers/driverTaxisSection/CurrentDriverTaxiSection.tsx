import { useParams, Link } from 'react-router-dom';
import { buttonVariants } from '@/ui/Button';
import { useDriverDetails } from '@/features/drivers/general/hooks/useDriverDetails';
import { CurrentDriverTaxiDisplaySection } from '@/features/drivers/driverTaxisSection/CurrentDriverTaxiDisplaySection';

export function CurrentDriverTaxiSection() {
  const params = useParams();
  const driver_id = Number(params.id);
  const { data } = useDriverDetails(driver_id);
  const { taxi_id } = data;

  if (!taxi_id || taxi_id <= 0) {
    return (
      <div className="space-y-3">
        <p>This driver currently has no hired taxi. Would you like to add one?</p>
        <Link to="/hires/add" className={buttonVariants({ variant: 'primary' })}>Hire</Link>
      </div>
    );
  }

  return <CurrentDriverTaxiDisplaySection id={taxi_id} />;
}
