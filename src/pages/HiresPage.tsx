import { useState, useEffect } from 'react';
import { Title } from '@/features/title/components/Title';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/ui/Tabs';
import { Carousel, CarouselContent, CarouselItem, CarouselApi } from '@/ui/Carousel';

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
      <div>
        <Tabs value={`${tab}`} onValueChange={setTabIndex}>
          <TabsList>
            <TabsTrigger value="0">Account</TabsTrigger>
            <TabsTrigger value="1">Password</TabsTrigger>
            <TabsTrigger value="2">Password</TabsTrigger>
            <TabsTrigger value="3">Password</TabsTrigger>
            <TabsTrigger value="4">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="0">Make changes to your account here.</TabsContent>
          <TabsContent value="1">Change your password here.</TabsContent>
        </Tabs>

        <Carousel setApi={setApi}>
          <CarouselContent>
            <CarouselItem>0</CarouselItem>
            <CarouselItem>1</CarouselItem>
            <CarouselItem>2</CarouselItem>
            <CarouselItem>3</CarouselItem>
            <CarouselItem>4</CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
    </>
  );
}
