import { useBreakpoint } from '@/hooks/useBreakpoint';
import {
  Swiper,
  SwiperItems,
  SwiperItem,
  SwiperTabs,
  SwiperTab,
  SwiperSelect,
  SwiperSelectItem,
} from '@/ui/Swiper';
import { DriverDetailsSwiperItem } from '@/features/drivers/components/DriverDetailsSwiperItem';
import { DriverTaxisSwiperItem } from '@/features/drivers/components/DriverTaxisSwiperItem';
import { DriverAgreementsSwiperItem } from '@/features/drivers/components/DriverAgreementsSwiperItem';
import { DriverRentSwiperItem } from '@/features/drivers/components/DriverRentSwiperItem';

export function DriverSwiper() {
  const breakpoint = useBreakpoint('sm');

  return (
    <Swiper min={1} max={4} className="flex flex-col">
      {breakpoint
        ? (
          <SwiperTabs>
            <SwiperTab index={1}>Details</SwiperTab>
            <SwiperTab index={2}>Taxis</SwiperTab>
            <SwiperTab index={3}>Agreements</SwiperTab>
            <SwiperTab index={4}>Rent</SwiperTab>
          </SwiperTabs>
        )
        : (
          <SwiperSelect>
            <SwiperSelectItem index={1}>Details</SwiperSelectItem>
            <SwiperSelectItem index={2}>Taxis</SwiperSelectItem>
            <SwiperSelectItem index={3}>Agreements</SwiperSelectItem>
            <SwiperSelectItem index={4}>Rent</SwiperSelectItem>
          </SwiperSelect>
        )}

      <SwiperItems className="flex-grow">
        <SwiperItem index={1}><DriverDetailsSwiperItem /></SwiperItem>
        <SwiperItem index={2}><DriverTaxisSwiperItem /></SwiperItem>
        <SwiperItem index={3}><DriverAgreementsSwiperItem /></SwiperItem>
        <SwiperItem index={4}><DriverRentSwiperItem /></SwiperItem>
      </SwiperItems>
    </Swiper>
  );
}
