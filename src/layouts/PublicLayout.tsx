import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

export function PublicLayout() {
  return (
    <div className="container-fluid mx-auto px-5">
      <Suspense fallback={<p>PrivateLayout Loading...</p>}>
        <Outlet />
      </Suspense>
    </div>
  );
}
