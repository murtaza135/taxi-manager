import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import * as rootOptions from '@/routes/root';

const routes = createRoutesFromElements(
  <Route path="/" {...rootOptions}>
    <Route path="/driver" lazy={() => import('@/routes/pages/driver')} />
  </Route>,
);

export const router = createBrowserRouter(routes);
