import { useParams } from 'react-router-dom';
import { Title } from '@/features/title/components/Title';

export function TaxiPage() {
  const { id } = useParams();

  return (
    <div>
      <Title title={`Taxi ${id}`} />
    </div>
  );
}
