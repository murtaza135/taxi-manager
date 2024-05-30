import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Spinner } from '@/ui/Spinner';
import { BasicContainer } from '@/ui/Container';
import { SimpleTopNav } from '@/features/navigation/components/top-nav/SimpleTopNav';
import { useSession } from '@/features/auth/hooks/useSession';

export function PublicLayout() {
  const { data, error, status } = useSession();
  console.log(data);
  console.log(error);
  console.log(status);

  return (
    <>
      <SimpleTopNav />
      <BasicContainer>
        <Suspense fallback={<Spinner className="w-28 h-28" />}>
          <Outlet />
        </Suspense>
      </BasicContainer>
    </>
  );
}
