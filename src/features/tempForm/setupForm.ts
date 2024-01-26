import { createMultiStepForm } from '@/ui/MultiStepForm';
import { FormSchemaType } from '@/features/tempForm/schema';

type StepTitle = 'form1' | 'form2' | 'form3';

export const { MultiStepForm, useMultiStepForm } = createMultiStepForm<FormSchemaType, StepTitle>();
