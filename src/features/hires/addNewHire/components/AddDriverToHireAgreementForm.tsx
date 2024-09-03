import { Button } from '@/ui/Button';
import { useMultiStepFormContext } from '@/ui/form/MultiStepForm';

export function AddDriverToHireAgreementForm() {
  const {
    nextStep,
  } = useMultiStepFormContext();

  return (
    <div className="pt-3 flex justify-end gap-3">
      <Button type="button" variant="primary" onClick={() => nextStep()}>Next</Button>
    </div>
  );
}
