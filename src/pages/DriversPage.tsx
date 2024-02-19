import { Title } from '@/features/title/components/Title';
import { Spinner } from '@/ui/Spinner';
import { Skeleton } from '@/ui/Skeleton';

export default function DriversPage() {
  return (
    <div className="center">
      <Title title="Drivers" />
      {/* <Spinner className="w-20 h-20" /> */}
      {/* <div className="flex gap-4 items-center">
        <Skeleton className="rounded-full w-10 h-10" />
        <div className="space-y-2">
          <Skeleton className="w-32 h-4" />
          <Skeleton className="w-24 h-4" />
        </div>
      </div> */}
    </div>
  );
}
