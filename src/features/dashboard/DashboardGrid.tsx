import { RiMoneyPoundCircleFill } from 'react-icons/ri';
import { TbCurrencyPoundOff } from 'react-icons/tb';
import { MdNumbers } from 'react-icons/md';
import { BsPersonCircle } from 'react-icons/bs';
import { FaCarSide } from 'react-icons/fa';
import { DashboardGridCell } from '@/features/dashboard/DashboardGridCell';
import { useAllUnpaidRentAmount } from '@/features/rent/general/hooks/useAllUnpaidRentAmount';
import { useThisWeeksUnpaidRentAmount } from '@/features/rent/general/hooks/useThisWeeksUnpaidRentAmount';
import { useThisWeeksPaidRentAmount } from '@/features/rent/general/hooks/useThisWeeksPaidRentAmount';
import { useRentCount } from '@/features/rent/general/hooks/useRentCount';
import { useTaxisCount } from '@/features/taxis/general/hooks/useTaxisCount';
import { useDriversCount } from '@/features/drivers/general/hooks/useDriversCount';

export function DashboardGrid() {
  const { data: totalUnpaidRentAmount } = useAllUnpaidRentAmount();
  const { data: unpaidRentAmount } = useThisWeeksUnpaidRentAmount();
  const { data: paidRentAmount } = useThisWeeksPaidRentAmount();
  const { data: rentCount } = useRentCount();
  const { data: taxisCount } = useTaxisCount();
  const { data: driversCount } = useDriversCount();

  return (
    <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] [align-content:start]">
      <DashboardGridCell icon={<RiMoneyPoundCircleFill />} title="Paid Rent" subtitle="This Week" text={`£${paidRentAmount}`} />
      <DashboardGridCell icon={<TbCurrencyPoundOff className="text-5xl mx-1" />} title="Unpaid Rent" subtitle="This Week" text={`£${unpaidRentAmount}`} />
      <DashboardGridCell icon={<TbCurrencyPoundOff className="text-5xl mx-1" />} title="Unpaid Rent" subtitle="Total" text={`£${totalUnpaidRentAmount}`} />
      <DashboardGridCell icon={<MdNumbers className="mx-0.5" />} title="Rents" subtitle="This Week" text={`${rentCount.paid} / ${rentCount.total}`} />
      <DashboardGridCell icon={<FaCarSide className="text-5xl mx-1" />} title="Taxis" text={taxisCount} />
      <DashboardGridCell icon={<BsPersonCircle className="text-5xl mx-1" />} title="Drivers" text={driversCount} />
    </div>
  );
}
