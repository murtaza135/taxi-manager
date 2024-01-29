import { MultiStepForm } from '@/features/tempForm/setupForm';
import { Form1 } from '@/features/tempForm/components/Form1';
import { Form2 } from '@/features/tempForm/components/Form2';
import { Form3 } from '@/features/tempForm/components/Form3';
import { TempFormStepper } from '@/features/tempForm/components/TempFormStepper';

export function Form() {
  return (
    <div className="flex flex-col gap-8">
      <MultiStepForm
        bounce
        steps={[
          { title: 'form1', component: <Form1 /> },
          { title: 'form2', component: <Form2 /> },
          { title: 'form3', component: <Form3 /> },
        ]}
        render={(form) => (
          <>
            <TempFormStepper />
            {form}
          </>
        )}
      />
    </div>
  );
}
