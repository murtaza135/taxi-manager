import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { createRouteOptions } from '@/lib/react-router-dom/createRouteOptions';
import { queryClient } from '@/config/api/queryClient';
import * as rootOptions from '@/routes/root';
import * as privateLayoutOptions from '@/routes/layouts/private';
import * as publicOnlyLayoutOptions from '@/routes/layouts/publicOnly';
// import * as driverOptions from '@/routes/pages/driver';

const routes = createRoutesFromElements(
  <Route path="/" {...createRouteOptions(rootOptions, queryClient)}>
    <Route {...createRouteOptions(publicOnlyLayoutOptions, queryClient)}>
      <Route
        path="/driver"
        lazy={createRouteOptions(() => import('@/routes/pages/driver'), queryClient)}
      />
    </Route>
    <Route {...createRouteOptions(privateLayoutOptions, queryClient)}>
      <Route
        path="/driver2"
        lazy={createRouteOptions(() => import('@/routes/pages/driver'), queryClient)}
      />
    </Route>
  </Route>,
);

export const router = createBrowserRouter(routes);
