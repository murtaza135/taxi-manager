import { useParams } from 'react-router-dom';
import { Title } from '@/features/title/components/Title';

export function HirePage() {
  const { id } = useParams();

  return (
    <div>
      <Title title={`Hire ${id}`} />
    </div>
  );
}
