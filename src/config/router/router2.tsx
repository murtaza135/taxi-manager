import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { createRouteOptions } from '@/lib/react-router-dom/createRouteOptions';
import { queryClient } from '@/config/api/queryClient';
import * as rootOptions from '@/routes/root';
import * as privateLayoutOptions from '@/routes/layouts/private';
import * as publicOnlyLayoutOptions from '@/routes/layouts/publicOnly';

const routes = createRoutesFromElements(
  <Route
    id="root"
    path="/"
    {...createRouteOptions(rootOptions, queryClient)}
  >
    <Route
      id="publicOnlyLayout"
      {...createRouteOptions(publicOnlyLayoutOptions, queryClient)}
    >
      <Route
        id="driverPage"
        path="/driver"
        lazy={createRouteOptions(() => import('@/routes/pages/driver'), queryClient)}
      />
    </Route>
    <Route
      id="privateLayout"
      {...createRouteOptions(privateLayoutOptions, queryClient)}
    >
      <Route
        id="driver2Page"
        path="/driver2"
        lazy={createRouteOptions(() => import('@/routes/pages/driver'), queryClient)}
      />
    </Route>
  </Route>,
);

export const router = createBrowserRouter(routes);
