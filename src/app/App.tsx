import { Switch, Route } from 'wouter';
import { Dashboard } from '@/pages/Dashboard';
import { DarkModeButton } from '@/features/darkmode/DarkModeButton';

export function App() {
  return (
    <div className="min-h-dvh bg-light-200 dark:bg-dark-900">
      <DarkModeButton />
      <div className="min-h-dvh container mx-auto px-4">
        <Switch>
          <Route path="/" component={Dashboard} />
          <Route>404, Not Found!</Route>
        </Switch>
      </div>
    </div>
  );
}
