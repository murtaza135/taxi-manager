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
import { TaxiDetailsSwiperItem } from '@/features/taxis/taxiSwiper/TaxiDetailsSwiperItem';
import { TaxiDriversSwiperItem } from '@/features/taxis/taxiSwiper/TaxiDriversSwiperItem';
import { TaxiAgreementsSwiperItem } from '@/features/taxis/taxiSwiper/TaxiAgreementsSwiperItem';
import { TaxiRentSwiperItem } from '@/features/taxis/taxiSwiper/TaxiRentSwiperItem';

export function TaxiSwiper() {
  const breakpoint = useBreakpoint('sm');

  return (
    <Swiper min={1} max={4} className="flex flex-col">
      {breakpoint
        ? (
          <SwiperTabs>
            <SwiperTab index={1}>Details</SwiperTab>
            <SwiperTab index={2}>Drivers</SwiperTab>
            <SwiperTab index={3}>Hires</SwiperTab>
            <SwiperTab index={4}>Rent</SwiperTab>
          </SwiperTabs>
        )
        : (
          <SwiperSelect>
            <SwiperSelectItem index={1}>Details</SwiperSelectItem>
            <SwiperSelectItem index={2}>Drivers</SwiperSelectItem>
            <SwiperSelectItem index={3}>Hires</SwiperSelectItem>
            <SwiperSelectItem index={4}>Rent</SwiperSelectItem>
          </SwiperSelect>
        )}

      <SwiperItems disableDrag className="flex-grow">
        <SwiperItem index={1}><TaxiDetailsSwiperItem /></SwiperItem>
        <SwiperItem index={2}><TaxiDriversSwiperItem /></SwiperItem>
        <SwiperItem index={3}><TaxiAgreementsSwiperItem /></SwiperItem>
        <SwiperItem index={4}><TaxiRentSwiperItem /></SwiperItem>
      </SwiperItems>
    </Swiper>
  );
}
