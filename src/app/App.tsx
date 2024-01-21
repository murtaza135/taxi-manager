import { Switch, Route } from 'wouter';
import { LoginPage } from '@/pages/LoginPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { RentPage } from '@/pages/RentPage';
import { HiresPage } from '@/pages/HiresPage';
import { TaxisPage } from '@/pages/TaxisPage';
import { DriversPage } from '@/pages/DriversPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { TopNav } from '@/features/navigation/components/TopNav';
import { SideNav } from '@/features/navigation/components/SideNav';
import { NavBackdrop } from '@/features/navigation/components/NavBackdrop';
import { applyTheme } from '@/features/darkmode/util/applyTheme';

applyTheme();

export function App() {
  return (
    <div className="min-h-dvh bg-light-200 text-dark-900 dark:bg-dark-900 dark:text-light-100">
      <div className="container-fluid mx-auto px-5 flex gap-10">
        <SideNav />
        <div className="w-full mb-12">
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
    </div>
  );
}
