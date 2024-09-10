import { useParams, Link } from 'react-router-dom';
import { buttonVariants } from '@/ui/Button';
import { useTaxiDetails } from '@/features/taxis/general/hooks/useTaxiDetails';
import { CurrentTaxiHireDisplaySection } from '@/features/taxis/taxiHiresSection/CurrentTaxiHireDisplaySection';

export function CurrentTaxiHireSection() {
  const params = useParams();
  const taxi_id = Number(params.id);
  const { data } = useTaxiDetails(taxi_id);
  const { hire_agreement_id } = data;

  if (!hire_agreement_id || hire_agreement_id <= 0) {
    return (
      <div className="space-y-3">
        <p>This taxi currently has no hire agreement. Would you like to add one?</p>
        <Link to="/hires/add" className={buttonVariants({ variant: 'primary' })}>Add</Link>
      </div>
    );
  }

  return <CurrentTaxiHireDisplaySection id={hire_agreement_id} />;
}
