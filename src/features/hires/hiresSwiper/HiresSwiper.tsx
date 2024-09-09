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
import { HiresDetailsSwiperItem } from '@/features/hires/hiresSwiper/HiresDetailsSwiperItem';
import { HiresTaxiSwiperItem } from '@/features/hires/hiresSwiper/HiresTaxiSwiperItem';
import { HiresDriverSwiperItem } from '@/features/hires/hiresSwiper/HiresDriverSwiperItem';
import { HiresRentSwiperItem } from '@/features/hires/hiresSwiper/HiresRentSwiperItem';

export function HiresSwiper() {
  const breakpoint = useBreakpoint('sm');

  return (
    <Swiper min={1} max={4} className="flex flex-col">
      {breakpoint
        ? (
          <SwiperTabs>
            <SwiperTab index={1}>Details</SwiperTab>
            <SwiperTab index={2}>Taxi</SwiperTab>
            <SwiperTab index={3}>Driver</SwiperTab>
            <SwiperTab index={4}>Rent</SwiperTab>
          </SwiperTabs>
        )
        : (
          <SwiperSelect>
            <SwiperSelectItem index={1}>Details</SwiperSelectItem>
            <SwiperSelectItem index={2}>Taxi</SwiperSelectItem>
            <SwiperSelectItem index={3}>Driver</SwiperSelectItem>
            <SwiperSelectItem index={4}>Rent</SwiperSelectItem>
          </SwiperSelect>
        )}

      <SwiperItems disableDrag className="flex-grow">
        <SwiperItem index={1}><HiresDetailsSwiperItem /></SwiperItem>
        <SwiperItem index={2}><HiresTaxiSwiperItem /></SwiperItem>
        <SwiperItem index={3}><HiresDriverSwiperItem /></SwiperItem>
        <SwiperItem index={4}><HiresRentSwiperItem /></SwiperItem>
      </SwiperItems>
    </Swiper>
  );
}
