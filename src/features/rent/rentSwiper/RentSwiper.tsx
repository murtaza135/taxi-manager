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
import { RentDetailsSwiperItem } from '@/features/rent/rentSwiper/RentDetailsSwiperItem';
import { RentHireSwiperItem } from '@/features/rent/rentSwiper/RentHireSwiperItem';
import { RentDriverSwiperItem } from '@/features/rent/rentSwiper/RentDriverSwiperItem';
import { RentTaxiSwiperItem } from '@/features/rent/rentSwiper/RentTaxiSwiperItem';

export function RentSwiper() {
  const breakpoint = useBreakpoint('sm');

  return (
    <Swiper min={1} max={4} className="flex flex-col">
      {breakpoint
        ? (
          <SwiperTabs>
            <SwiperTab index={1}>Details</SwiperTab>
            <SwiperTab index={2}>Hire</SwiperTab>
            <SwiperTab index={3}>Driver</SwiperTab>
            <SwiperTab index={4}>Taxi</SwiperTab>
          </SwiperTabs>
        )
        : (
          <SwiperSelect>
            <SwiperSelectItem index={1}>Details</SwiperSelectItem>
            <SwiperSelectItem index={2}>Hire</SwiperSelectItem>
            <SwiperSelectItem index={3}>Driver</SwiperSelectItem>
            <SwiperSelectItem index={4}>Taxi</SwiperSelectItem>
          </SwiperSelect>
        )}

      <SwiperItems disableDrag className="flex-grow">
        <SwiperItem index={1}><RentDetailsSwiperItem /></SwiperItem>
        <SwiperItem index={2}><RentHireSwiperItem /></SwiperItem>
        <SwiperItem index={3}><RentDriverSwiperItem /></SwiperItem>
        <SwiperItem index={4}><RentTaxiSwiperItem /></SwiperItem>
      </SwiperItems>
    </Swiper>
  );
}
