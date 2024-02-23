import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Spinner } from '@/ui/Spinner';
import { BasicContainer } from '@/ui/Container';

export function PublicLayout() {
  return (
    <BasicContainer>
      <Suspense fallback={<Spinner className="w-28 h-28" />}>
        <Outlet />
      </Suspense>
    </BasicContainer>
  );
}
