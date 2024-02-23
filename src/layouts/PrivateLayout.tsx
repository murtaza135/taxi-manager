import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { SideNav } from '@/features/navigation/components/side-nav/SideNav';
import { TopNav } from '@/features/navigation/components/top-nav/TopNav';
import { ContentContainer } from '@/ui/Container';
import { Spinner } from '@/ui/Spinner';

export function PrivateLayout() {
  return (
    <>
      <SideNav />
      <TopNav />
      <ContentContainer>
        <Suspense fallback={<Spinner className="w-28 h-28" />}>
          <Outlet />
        </Suspense>
      </ContentContainer>
    </>
  );
}
