import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { createRouteOptions } from '@/lib/react-router-dom/createRouteOptions';
import { queryClient } from '@/config/api/queryClient';

import * as rootOptions from '@/routes/root';
import * as publicOnlyLayoutOptions from '@/routes/layouts/publicOnly';
import * as privateLayoutOptions from '@/routes/layouts/private';
import * as startPageOptions from '@/routes/pages/start';

const driverPageOptions = () => import('@/routes/pages/driver');
const driversPageOptions = () => import('@/routes/pages/drivers');
const addNewDriverPageOptions = () => import('@/routes/pages/addNewDriver');
const hirePageOptions = () => import('@/routes/pages/hire');
const hiresPageOptions = () => import('@/routes/pages/hires');
const homePageOptions = () => import('@/routes/pages/home');
const loginPageOptions = () => import('@/routes/pages/login');
const rentPageOptions = () => import('@/routes/pages/rent');
const settingsPageOptions = () => import('@/routes/pages/settings');
const taxiPageOptions = () => import('@/routes/pages/taxi');
const taxisPageOptions = () => import('@/routes/pages/taxis');

const rootProps = createRouteOptions(rootOptions, queryClient);
const publicOnlyLayoutProps = createRouteOptions(publicOnlyLayoutOptions, queryClient);
const privateLayoutProps = createRouteOptions(privateLayoutOptions, queryClient);
const startPageProps = createRouteOptions(startPageOptions, queryClient);
const driverPageProps = createRouteOptions(driverPageOptions, queryClient);
const driversPageProps = createRouteOptions(driversPageOptions, queryClient);
const addNewDriverPageProps = createRouteOptions(addNewDriverPageOptions, queryClient);
const hirePageProps = createRouteOptions(hirePageOptions, queryClient);
const hiresPageProps = createRouteOptions(hiresPageOptions, queryClient);
const homePageProps = createRouteOptions(homePageOptions, queryClient);
const loginPageProps = createRouteOptions(loginPageOptions, queryClient);
const rentPageProps = createRouteOptions(rentPageOptions, queryClient);
const settingsPageProps = createRouteOptions(settingsPageOptions, queryClient);
const taxiPageProps = createRouteOptions(taxiPageOptions, queryClient);
const taxisPageProps = createRouteOptions(taxisPageOptions, queryClient);

const routes = createRoutesFromElements(
  <Route path="/" {...rootProps}>
    <Route index {...startPageProps} />
    <Route {...publicOnlyLayoutProps}>
      <Route path="/login" lazy={loginPageProps} />
    </Route>
    <Route {...privateLayoutProps}>
      <Route path="/driver/:id" lazy={driverPageProps} />
      <Route path="/drivers" lazy={driversPageProps} />
      <Route path="/drivers/add" lazy={addNewDriverPageProps} />
      <Route path="/hire/:id" lazy={hirePageProps} />
      <Route path="/hires" lazy={hiresPageProps} />
      <Route path="/home" lazy={homePageProps} />
      <Route path="/rent" lazy={rentPageProps} />
      <Route path="/settings" lazy={settingsPageProps} />
      <Route path="/taxi/:id" lazy={taxiPageProps} />
      <Route path="/taxis" lazy={taxisPageProps} />
    </Route>
  </Route>,
);

export const router = createBrowserRouter(routes);
