import { useParams, useNavigate } from 'react-router-dom';
import { MdPersonAddAlt1 } from 'react-icons/md';
import { FaTimesCircle, FaCheckCircle } from 'react-icons/fa';
import { useDriverApplication } from '@/features/drivers/general/hooks/useDriverApplication';
import { Button } from '@/ui/Button';
import { useConvertDriverApplicationToDriver } from '@/features/drivers/general/hooks/useConvertDriverApplicationToDriver';
import { NonNullableObject } from '@/types/utils';
import { cn } from '@/utils/cn';

export function DriverApplicationConverterSection() {
  const application_id = useParams().id as string;
  const { data } = useDriverApplication(application_id);
  const { mutate: convert } = useConvertDriverApplicationToDriver();
  const navigate = useNavigate();

  const handleConvert: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();

    const nonNullableData = data as NonNullableObject<typeof data>;

    convert({
      ...nonNullableData,
      licence_number: nonNullableData.drivers_licence_number,
      licence_start_date: nonNullableData.drivers_licence_start_date,
      licence_end_date: nonNullableData.drivers_licence_end_date,
      badge_number: nonNullableData.taxi_badge_number,
      badge_end_date: nonNullableData.taxi_badge_end_date,
      licence_document_path: nonNullableData.drivers_licence_path,
      badge_document_path: nonNullableData.taxi_badge_path,
      badge_start_date: nonNullableData.taxi_badge_start_date,
    }, {
      onSuccess: (driverId) => navigate(`/driver/${driverId}`, { preventScrollReset: false }),
    });
  };

  return (
    <div className="space-y-3">
      {data.is_submitted
        ? (
          <span className="flex gap-2 items-center">
            <FaCheckCircle className="text-green-500 dark:text-green-500 -translate-y-[0.5px]" />
            <p>The driver has submitted all details</p>
          </span>
        )
        : (
          <span className="flex gap-2 items-center">
            <FaTimesCircle className="text-red-500 dark:text-red-400 opacity-60 dark:opacity-50 -translate-y-[0.5px]" />
            <p>The driver still needs to submit his details.</p>
          </span>
        )}

      <Button
        type="button"
        size="sm"
        className={cn('flex justify-center items-center gap-1', data.is_submitted ? 'bg-green-500 dark:bg-green-500' : 'bg-red-500 dark:bg-red-400')}
        onClick={handleConvert}
        disabled={!data.is_submitted}
      >
        <MdPersonAddAlt1 className="text-lg" />
        <span>Convert</span>
      </Button>
    </div>
  );
}
