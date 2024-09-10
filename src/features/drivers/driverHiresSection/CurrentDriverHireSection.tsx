import { useParams, Link } from 'react-router-dom';
import { buttonVariants } from '@/ui/Button';
import { useDriverDetails } from '@/features/drivers/general/hooks/useDriverDetails';
import { CurrentDriverHireDisplaySection } from '@/features/drivers/driverHiresSection/CurrentDriverHireDisplaySection';

export function CurrentDriverHireSection() {
  const params = useParams();
  const driver_id = Number(params.id);
  const { data } = useDriverDetails(driver_id);
  const { hire_agreement_id } = data;

  if (!hire_agreement_id || hire_agreement_id <= 0) {
    return (
      <div className="space-y-3">
        <p>This driver currently has no hire agreement. Would you like to add one?</p>
        <Link to="/hires/add" className={buttonVariants({ variant: 'primary' })}>Hire</Link>
      </div>
    );
  }

  return <CurrentDriverHireDisplaySection id={hire_agreement_id} />;
}
