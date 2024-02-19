import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { SideNav } from '@/features/navigation/components/side-nav/SideNav';
import { NavBackdrop } from '@/features/navigation/components/side-nav/NavBackdrop';
import { TopNav } from '@/features/navigation/components/top-nav/TopNav';

export function PrivateLayout() {
  return (
    <>
      <div className="container-fluid h-dvh mx-auto px-5">
        <SideNav />
        {/* <div className="pb-5 w-full h-dvh flex flex-col [&>*:last-child]:flex-grow"> */}
        <TopNav />
        <Suspense fallback={<p>PrivateLayout Loading...</p>}>
          <div className="relative sm:pl-[8.375rem] md:pl-[17.25rem] top-20 pb-5">
            <Outlet />
          </div>
        </Suspense>
        {/* </div> */}
      </div>
      <NavBackdrop />
    </>
  );
}
