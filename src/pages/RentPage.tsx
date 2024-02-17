import { Title } from '@/features/title/components/Title';
import { SlidingContainer, Slide, SlideContent, SlideItem } from '@/ui/SlidingContainer';

export function RentPage() {
  return (
    <div>
      <Title title="Rent" />
      {/* <SlidingContainer>
        lol
      </SlidingContainer> */}
      <Slide min={0} max={6}>
        <SlideContent>
          <SlideItem index={0}>0</SlideItem>
          <SlideItem index={1}>1</SlideItem>
          <SlideItem index={2}>2</SlideItem>
          <SlideItem index={3}>3</SlideItem>
          <SlideItem index={4}>4</SlideItem>
        </SlideContent>
      </Slide>
    </div>
  );
}
