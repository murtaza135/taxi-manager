import { createBrowserRouter } from 'react-router-dom';
import { publicPages, privatePages } from './pages';
import { RootLayout } from '@/layouts/RootLayout';
import { PublicLayout } from '@/layouts/PublicLayout';
import { PrivateLayout } from '@/layouts/PrivateLayout';
import { ErrorPage } from '@/pages/ErrorPage';
import { IndexPage } from '@/pages/IndexPage';
import { createRouteOptions } from '@/lib/react-router-dom/createRouteOptions';
import { createLazyRouteOptions } from '@/lib/react-router-dom/createLazyRouteOptions';
import * as rootOptions from '@/routes/root';
import * as privateLayoutOptions from '@/routes/layouts/private';
import * as publicOnluLayoutOptions from '@/routes/layouts/publicOnly';
import * as driverOptions from '@/routes/pages/driver';
import { queryClient } from '@/config/api/queryClient';

export const router = createBrowserRouter([
  {
    path: '/',
    ...createRouteOptions(rootOptions, queryClient),
    children: [
      {
        ...createRouteOptions(privateLayoutOptions, queryClient),
        // children: publicPages,
      },
      {
        ...createRouteOptions(publicOnluLayoutOptions, queryClient),
        children: [
          {
            path: '/driver',
            lazy: createLazyRouteOptions(() => import('@/routes/pages/driver'), queryClient),
          },
        ],
      },
    ],
  },
]);
