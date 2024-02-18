import { Form } from '@/features/tempForm/components/Form';
import { NewForm } from '@/features/tempForm/components/NewForm';

export function LoginPage() {
  return (
    <div className="flex flex-col items-center gap-5">
      {/* <Form /> */}
      <NewForm />
    </div>
  );
}
