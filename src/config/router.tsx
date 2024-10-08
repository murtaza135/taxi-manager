/* eslint-disable max-len */
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { createRouteOptions } from '@/lib/react-router-dom/createRouteOptions';
import { queryClient } from '@/config/api/queryClient';

import * as rootOptions from '@/routes/root';
import * as publicOnlyLayoutOptions from '@/routes/layouts/publicOnly';
import * as privateLayoutOptions from '@/routes/layouts/private';
import * as publicOrPrivateOptions from '@/routes/layouts/publicOrPrivate';
import * as startPageOptions from '@/routes/pages/start';

const driverPageOptions = () => import('@/routes/pages/driver');
const driversPageOptions = () => import('@/routes/pages/drivers');
const addNewDriverPageOptions = () => import('@/routes/pages/addNewDriver');
const driverApplicationPageOptions = () => import('@/routes/pages/driverApplication');
const driverApplicationsPageOptions = () => import('@/routes/pages/driverApplications');
const addNewDriverApplicationPageOptions = () => import('@/routes/pages/addNewDriverApplication');
const publicDriverApplicationFormPageOptions = () => import('@/routes/pages/publicDriverApplicationForm');
const publicDriverApplicationFormCompletePageOptions = () => import('@/routes/pages/publicDriverApplicationFormComplete');
const hirePageOptions = () => import('@/routes/pages/hire');
const addNewHireAgreementPageOptions = () => import('@/routes/pages/addNewHireAgreement');
const hiresPageOptions = () => import('@/routes/pages/hires');
const homePageOptions = () => import('@/routes/pages/home');
const loginPageOptions = () => import('@/routes/pages/login');
const rentPageOptions = () => import('@/routes/pages/rent');
const rentsPageOptions = () => import('@/routes/pages/rents');
const addNewRentPageOptions = () => import('@/routes/pages/addNewRent');
const settingsPageOptions = () => import('@/routes/pages/settings');
const taxiPageOptions = () => import('@/routes/pages/taxi');
const addNewTaxiPageOptions = () => import('@/routes/pages/addNewTaxi');
const taxisPageOptions = () => import('@/routes/pages/taxis');

const rootProps = createRouteOptions(rootOptions, queryClient);
const publicOnlyLayoutProps = createRouteOptions(publicOnlyLayoutOptions, queryClient);
const privateLayoutProps = createRouteOptions(privateLayoutOptions, queryClient);
const publicOrPrivateLayoutProps = createRouteOptions(publicOrPrivateOptions, queryClient);
const startPageProps = createRouteOptions(startPageOptions, queryClient);
const driverPageProps = createRouteOptions(driverPageOptions, queryClient);
const driversPageProps = createRouteOptions(driversPageOptions, queryClient);
const addNewDriverPageProps = createRouteOptions(addNewDriverPageOptions, queryClient);
const driverApplicationPageProps = createRouteOptions(driverApplicationPageOptions, queryClient);
const driverApplicationsPageProps = createRouteOptions(driverApplicationsPageOptions, queryClient);
const addNewDriverApplicationPageProps = createRouteOptions(addNewDriverApplicationPageOptions, queryClient);
const publicDriverApplicationFormPageProps = createRouteOptions(publicDriverApplicationFormPageOptions, queryClient);
const publicDriverApplicationFormCompletePageProps = createRouteOptions(publicDriverApplicationFormCompletePageOptions, queryClient);
const hirePageProps = createRouteOptions(hirePageOptions, queryClient);
const addNewHireAgreementPageProps = createRouteOptions(addNewHireAgreementPageOptions, queryClient);
const hiresPageProps = createRouteOptions(hiresPageOptions, queryClient);
const homePageProps = createRouteOptions(homePageOptions, queryClient);
const loginPageProps = createRouteOptions(loginPageOptions, queryClient);
const rentPageProps = createRouteOptions(rentPageOptions, queryClient);
const rentsPageProps = createRouteOptions(rentsPageOptions, queryClient);
const addNewRentPageProps = createRouteOptions(addNewRentPageOptions, queryClient);
const settingsPageProps = createRouteOptions(settingsPageOptions, queryClient);
const taxiPageProps = createRouteOptions(taxiPageOptions, queryClient);
const addNewTaxiPageProps = createRouteOptions(addNewTaxiPageOptions, queryClient);
const taxisPageProps = createRouteOptions(taxisPageOptions, queryClient);

const routes = createRoutesFromElements(
  <Route path="/" {...rootProps}>
    <Route index {...startPageProps} />
    <Route {...publicOrPrivateLayoutProps}>
      <Route path="/driver-application/:id" lazy={publicDriverApplicationFormPageProps} />
      <Route path="/driver-application/:id/complete" lazy={publicDriverApplicationFormCompletePageProps} />
    </Route>
    <Route {...publicOnlyLayoutProps}>
      <Route path="/login" lazy={loginPageProps} />
    </Route>
    <Route {...privateLayoutProps}>
      <Route path="/driver/:id" lazy={driverPageProps} />
      <Route path="/drivers" lazy={driversPageProps} />
      <Route path="/drivers/add" lazy={addNewDriverPageProps} />
      <Route path="/drivers/application/:id" lazy={driverApplicationPageProps} />
      <Route path="/drivers/applications" lazy={driverApplicationsPageProps} />
      <Route path="/drivers/applications/add" lazy={addNewDriverApplicationPageProps} />
      <Route path="/hire/:id" lazy={hirePageProps} />
      <Route path="/hires" lazy={hiresPageProps} />
      <Route path="/hires/add" lazy={addNewHireAgreementPageProps} />
      <Route path="/home" lazy={homePageProps} />
      <Route path="/rent/:id" lazy={rentPageProps} />
      <Route path="/rents" lazy={rentsPageProps} />
      <Route path="/rents/add" lazy={addNewRentPageProps} />
      <Route path="/settings" lazy={settingsPageProps} />
      <Route path="/taxi/:id" lazy={taxiPageProps} />
      <Route path="/taxis" lazy={taxisPageProps} />
      <Route path="/taxis/add" lazy={addNewTaxiPageProps} />
    </Route>
  </Route>,
);

export const router = createBrowserRouter(routes);
