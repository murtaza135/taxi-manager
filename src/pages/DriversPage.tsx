import { Title } from '@/features/title/components/Title';
import { Spinner } from '@/ui/Spinner';

export default function DriversPage() {
  return (
    <div className="center">
      <Title title="Drivers" />
      <Spinner className="w-20 h-20" />
    </div>
  );
}
