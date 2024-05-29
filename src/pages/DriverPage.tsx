import { useParams } from 'react-router-dom';
import { Title } from '@/features/title/components/Title';

export function DriverPage() {
  const { id } = useParams();

  return (
    <div>
      <Title title={`Driver ${id}`} />
    </div>
  );
}
