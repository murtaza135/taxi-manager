import { MultiStepForm } from '@/features/tempForm/setupForm';
import { Form1 } from '@/features/tempForm/components/Form1';
import { Form2 } from '@/features/tempForm/components/Form2';
import { Form3 } from '@/features/tempForm/components/Form3';

export function Form() {
  return (
    <MultiStepForm
      bounce
      steps={[
        { title: 'form1', component: <Form1 /> },
        { title: 'form2', component: <Form2 /> },
        { title: 'form3', component: <Form3 /> },
      ]}
    />
  );
}
