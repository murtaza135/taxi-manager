import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { publicPages, privatePages } from './pages';
import { RootLayout } from '@/layouts/RootLayout';
import { PublicLayout } from '@/layouts/PublicLayout';
import { PrivateLayout } from '@/layouts/PrivateLayout';
import { ErrorPage } from '@/pages/ErrorPage';
import { IndexPage } from '@/pages/IndexPage';
import * as DriverPage from '@/pages2/DriverPage';

const routes = createRoutesFromElements(
  <Route path="/">
    <Route path="/driver" {...DriverPage} />
  </Route>,
);

export const router2 = createBrowserRouter(routes);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <IndexPage />,
        index: true,
      },
      {
        element: <PublicLayout />,
        children: publicPages,
      },
      {
        element: <PrivateLayout />,
        children: privatePages,
      },
    ],
  },
]);
