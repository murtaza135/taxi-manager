import { useEffect } from 'react';
import { Title } from '@/features/title/components/Title';
import { Spinner } from '@/ui/Spinner';
import { Skeleton } from '@/ui/Skeleton';
import { useToast, ToastAction } from '@/ui/toast';
import { TooltipWrapper } from '@/ui/Tooltip';
import { ScrollToTopButton } from '@/features/scroll/ScrollToTopButton';

export default function DriversPage() {
  const { toast } = useToast();

  // useEffect(() => {
  //   toast({
  //     title: 'Scheduled: Catch up',
  //     description: 'Friday, February 10, 2023 at 5:57 PM',
  //     variant: 'destructive',
  //     action: <ToastAction altText="Try again">Try again</ToastAction>,
  //   });
  // }, [toast]);

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
      {/* <TooltipWrapper text="lol">
        <p>Hover</p>
      </TooltipWrapper> */}
    </div>
  );
}
