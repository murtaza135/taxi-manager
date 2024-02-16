import { useState, useEffect } from 'react';
import { Title } from '@/features/title/components/Title';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/ui/Tabs';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, CarouselApi } from '@/ui/Carousel';

export function HiresPage() {
  const [tab, setTab] = useState(0);
  const [api, setApi] = useState<CarouselApi>();

  const setTabIndex = (index: string) => {
    const tabIndex = Number(index);
    setTab(tabIndex);
    api?.scrollTo(tabIndex);
  };

  useEffect(() => {
    const setCarouselIndex = (carouselApi: CarouselApi) => {
      const carouselIndex = carouselApi?.selectedScrollSnap();
      if (typeof carouselIndex !== 'undefined') {
        setTab(carouselIndex);
      }
    };
    api?.on('select', setCarouselIndex);
    return () => { api?.off('select', setCarouselIndex); };
  }, [api]);

  return (
    <>
      <Title title="Hires" />
      <div className="h-full">
        <Tabs value={`${tab}`} onValueChange={setTabIndex}>
          <TabsList>
            <TabsTrigger value="0">Account</TabsTrigger>
            <TabsTrigger value="1">Password</TabsTrigger>
            <TabsTrigger value="2">Password</TabsTrigger>
            <TabsTrigger value="3">Password</TabsTrigger>
            <TabsTrigger value="4">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">Make changes to your account here.</TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>

        <Carousel setApi={setApi} className="h-full [&>div]:h-full">
          <CarouselContent className="h-full">
            <CarouselItem>
              <div className="center">0</div>
            </CarouselItem>
            <CarouselItem>
              <div className="center">1</div>
            </CarouselItem>
            <CarouselItem>
              <div className="center">2</div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </>
  );
}
