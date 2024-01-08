import { Switch, Route } from 'wouter';
import { Dashboard } from '@/pages/Dashboard';

export function App() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route>404, Not Found!</Route>
    </Switch>
  );
}
