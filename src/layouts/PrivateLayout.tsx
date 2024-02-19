import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { SideNav } from '@/features/navigation/components/side-nav/SideNav';
import { NavBackdrop } from '@/features/navigation/components/side-nav/NavBackdrop';
import { TopNav } from '@/features/navigation/components/top-nav/TopNav';

export function PrivateLayout() {
  return (
    <>
      <div className="container-fluid mx-auto px-5 flex gap-10">
        <SideNav />
        <div className="pb-5 w-full h-dvh overflow-clip flex flex-col [&>*:last-child]:flex-grow">
          <TopNav />
          <Suspense fallback={<p>PrivateLayout Loading...</p>}>
            <Outlet />
          </Suspense>
        </div>
      </div>
      <NavBackdrop />
    </>
  );
}
