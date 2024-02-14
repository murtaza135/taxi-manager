import { Switch, Route } from 'wouter';
import { LoginPage } from '@/pages/LoginPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { RentPage } from '@/pages/RentPage';
import { HiresPage } from '@/pages/HiresPage';
import { TaxisPage } from '@/pages/TaxisPage';
import { DriversPage } from '@/pages/DriversPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { TopNav } from '@/features/navigation/components/top-nav/TopNav';
import { SideNav } from '@/features/navigation/components/side-nav/SideNav';
import { NavBackdrop } from '@/features/navigation/components/side-nav/NavBackdrop';
import { applyTheme } from '@/features/darkmode/utils/applyTheme';

applyTheme();

export function App() {
  return (
    <>
      <div className="container-fluid mx-auto px-5 flex gap-10">
        <SideNav />
        <div className="pb-12 w-full h-full overflow-clip">
          <TopNav />
          <Switch>
            <Route path="/login" component={LoginPage} />
            <Route path="/" component={DashboardPage} />
            <Route path="/rent" component={RentPage} />
            <Route path="/hires" component={HiresPage} />
            <Route path="/taxis" component={TaxisPage} />
            <Route path="/drivers" component={DriversPage} />
            <Route path="/settings" component={SettingsPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </div>
      <NavBackdrop />
    </>
  );
}
