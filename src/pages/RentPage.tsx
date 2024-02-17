import { Title } from '@/features/title/components/Title';
import { Slide, SlideContent, SlideItem, SlideTabs, SlideTab, SlideSelect, SlideSelectItem } from '@/ui/Slide';
import { useBreakpoint } from '@/hooks/useBreakpoint';

export function RentPage() {
  const breakpoint = useBreakpoint('xs');

  return (
    <div>
      <Title title="Rent" />

      <Slide min={1} max={4}>
        {!breakpoint
          ? (
            <SlideSelect>
              <SlideSelectItem index={1}>Option 1</SlideSelectItem>
              <SlideSelectItem index={2}>Option 2</SlideSelectItem>
              <SlideSelectItem index={3}>Option 3</SlideSelectItem>
              <SlideSelectItem index={4}>Option 4</SlideSelectItem>
            </SlideSelect>
          )
          : (
            <SlideTabs>
              <SlideTab index={1}>Option 1</SlideTab>
              <SlideTab index={2}>Option 2</SlideTab>
              <SlideTab index={3}>Option 3</SlideTab>
              <SlideTab index={4}>Option 4</SlideTab>
            </SlideTabs>
          )}

        <SlideContent>
          <SlideItem index={1}>1</SlideItem>
          <SlideItem index={2}>2</SlideItem>
          <SlideItem index={3}>3</SlideItem>
          <SlideItem index={4}>4</SlideItem>
        </SlideContent>
      </Slide>
    </div>
  );
}
