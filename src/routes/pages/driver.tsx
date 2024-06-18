import { useParams } from 'react-router-dom';
import { createComponent } from '@/lib/react-router-dom/createComponent';
import { Title } from '@/features/title/components/Title';
import { sleep } from '@/utils/sleep';

async function driverPageLoader() {
  await sleep(100);
  return null;
}

function DriverPageSuspenseBoundary() {
  return (
    <div>DriverPageSuspenseBoundary</div>
  );
}

function DriverPageErrorBoundary() {
  return (
    <div>DriverPageErrorBoundary</div>
  );
}

function DriverPageComponent() {
  const { id } = useParams();

  return (
    <div>
      <Title title={`Driver ${id}`} />
      <p>Driver</p>
    </div>
  );
}

export const loader = driverPageLoader;
export const ErrorBoundary = DriverPageErrorBoundary;
export const Component = createComponent(DriverPageComponent, DriverPageSuspenseBoundary);
