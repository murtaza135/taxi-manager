import { useParams } from 'react-router-dom';
import { FaCircleCheck } from 'react-icons/fa6';
import { Card, CardTitle } from '@/ui/Card';
import { CopyCell } from '@/ui/dataview/Cell';

export function PublicDriverApplicationCompletionMessage() {
  const id = useParams().id as string;

  return (
    <Card className="max-w-[32rem] w-full flex flex-col items-center gap-4">
      <FaCircleCheck className="text-8xl" />
      <CardTitle className="text-3xl">Success</CardTitle>
      <p className="text-center">Your application for a taxi vehicle has been submitted! The company will be in touch with you shortly.</p>
      <div className="text-center text-sm font-semibold">
        <p>Reference Number:</p>
        <CopyCell text={id} className="font-semibold hover:opacity-100" />
      </div>
    </Card>
  );
}
