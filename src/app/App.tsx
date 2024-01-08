import { Switch, Route } from 'wouter';
import { LoginPage } from '@/pages/LoginPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { RentPage } from '@/pages/RentPage';
import { HiresPage } from '@/pages/HiresPage';
import { TaxisPage } from '@/pages/TaxisPage';
import { DriversPage } from '@/pages/DriversPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { Navbar } from '@/features/navigation/Navbar';

export function App() {
  return (
    <div className="flex-1 bg-light-200 text-dark-900 dark:bg-dark-900 dark:text-light-100">
      <Navbar />
      <div className="container mx-auto px-4">
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
  );
}
