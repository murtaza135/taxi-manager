import { Title } from '@/features/title/components/Title';
import { Slide, SlideContent, SlideItem, SlideTabs, SlideTab, SlideSelect, SlideSelectItem } from '@/ui/SlidingContainer';
import { useBreakpoint } from '@/hooks/useBreakpoint';

export function RentPage() {
  const breakpoint = useBreakpoint('xs');

  return (
    <div>
      <Title title="Rent" />

      <Slide min={0} max={4}>
        {breakpoint
          ? (
            <SlideTabs>
              <SlideTab index={0}>Option 0</SlideTab>
              <SlideTab index={1}>Option 1</SlideTab>
              <SlideTab index={2}>Option 2</SlideTab>
              <SlideTab index={3}>Option 3</SlideTab>
            </SlideTabs>
          )
          : (
            <SlideSelect>
              <SlideSelectItem index={0}>Option 0</SlideSelectItem>
              <SlideSelectItem index={1}>Option 1</SlideSelectItem>
              <SlideSelectItem index={2}>Option 2</SlideSelectItem>
              <SlideSelectItem index={3}>Option 3</SlideSelectItem>
            </SlideSelect>
          )}

        <SlideContent>
          <SlideItem index={0}>0</SlideItem>
          <SlideItem index={1}>1</SlideItem>
          <SlideItem index={2}>2</SlideItem>
          <SlideItem index={3}>3</SlideItem>
        </SlideContent>
      </Slide>
    </div>
  );
}
