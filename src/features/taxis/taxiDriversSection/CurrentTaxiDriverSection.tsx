import { useParams, Link } from 'react-router-dom';
import { buttonVariants } from '@/ui/Button';
import { useTaxiDetails } from '@/features/taxis/general/hooks/useTaxiDetails';
import { CurrentTaxiDriverDisplaySection } from '@/features/taxis/taxiDriversSection/CurrentTaxiDriverDisplaySection';

export function CurrentTaxiDriverSection() {
  const params = useParams();
  const taxi_id = Number(params.id);
  const { data } = useTaxiDetails(taxi_id);
  const { driver_id } = data;

  if (!driver_id || driver_id <= 0) {
    return (
      <div className="space-y-3">
        <p>This taxi currently has no driver. Would you like to add one?</p>
        <Link to="/hires/add" className={buttonVariants({ variant: 'primary' })}>Hire Driver</Link>
      </div>
    );
  }

  return <CurrentTaxiDriverDisplaySection id={driver_id} />;
}
