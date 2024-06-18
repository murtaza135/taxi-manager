import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { createRouteOptions } from '@/lib/react-router-dom/createRouteOptions';
import { createLazyRouteOptions } from '@/lib/react-router-dom/createLazyRouteOptions';
import { queryClient } from '@/config/api/queryClient';
import * as rootOptions from '@/routes/root';
// import * as driverOptions from '@/routes/pages/driver';

type X = typeof import('@/routes/pages/driver');
const routes = createRoutesFromElements(
  <Route path="/" {...createRouteOptions(rootOptions, queryClient)}>
    <Route
      path="/driver"
      lazy={createLazyRouteOptions(() => import('@/routes/pages/driver'), queryClient)}
    />
  </Route>,
);

// const routes = createRoutesFromElements(
//   <Route path="/" {...rootOptions}>
//     <Route path="/driver" {...driverOptions} />
//     {/* <Route path="/driver" lazy={() => import('@/routes/pages/driver')} /> */}
//   </Route>,
// );

export const router = createBrowserRouter(routes);
