/* eslint-disable @typescript-eslint/indent */
import * as React from 'react';
import { m, AnimatePresence, HTMLMotionProps, Variants } from 'framer-motion';
import { LazyMotion } from '@/app/framer-motion/LazyMotion';
import { cn } from '@/utils/cn';
import { clamp } from '@/utils/clamp';
import { Tabs, TabsList, TabsTrigger } from '@/ui/Tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/Select';
import { Separator } from '@/ui/Separator';

// TODO add orientation

type Direction = 'forwards' | 'backwards';

type SlideContextValue = {
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  direction: Direction;
  setDirection: React.Dispatch<React.SetStateAction<Direction>>;
};

const SlideContext = React.createContext<SlideContextValue>(null as unknown as SlideContextValue);

function useSlide() {
  const context = React.useContext(SlideContext);

  if (context === undefined) {
    throw new Error('useSlide must be used within <Slide />');
  }

  return context;
}

type SlideProps = {
  min: number;
  max: number;
  initial?: number;
};

const Slide = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & SlideProps
>(({ className, children, min, max, initial, ...props }, ref) => {
  const [index, setIndexValue] = React.useState(initial ?? min);
  const [direction, setDirection] = React.useState<Direction>('forwards');

  const setIndex = React.useCallback((value: React.SetStateAction<number>) => {
    if (typeof value === 'function') {
      setIndexValue((i) => clamp(value(i), min, max));
    } else {
      setIndexValue(clamp(value, min, max));
    }
  }, [setIndexValue, min, max]);

  // const setSlide = React.useCallback((value: React.SetStateAction<number>) => {
  //   if (typeof value === 'function') {
  //     setIndexValue((i) => clamp(value(i), min, max));
  //   } else {
  //     setIndexValue(clamp(value, min, max));
  //     setDirection(value < index ? 'backwards' : 'forwards');
  //   }
  // }, [setIndexValue, min, max]);

  const value = React.useMemo(() => ({
    index, setIndex, direction, setDirection,
  }), [index, setIndex, direction, setDirection]);

  return (
    <SlideContext.Provider value={value}>
      <div
        ref={ref}
        className={cn('relative w-full h-full', className)}
        {...props}
      >
        {children}
      </div>
    </SlideContext.Provider>
  );
});
Slide.displayName = 'Slide';

const variants: Variants = {
  enter: (direction: Direction) => ({
    x: direction === 'forwards' ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: Direction) => ({
    zIndex: 0,
    x: direction === 'backwards' ? 1000 : -1000,
    opacity: 0,
    transition: {
      opacity: { duration: 0 },
    },
  }),
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => Math.abs(offset) * velocity;

const SlideContent = React.forwardRef<
  HTMLDivElement,
  HTMLMotionProps<'div'>
>(({ className, children, ...props }, ref) => {
  const { index, setIndex, direction, setDirection } = useSlide();

  return (
    <LazyMotion>
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <m.div
          key={index}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 1.5 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.8}
          onDragEnd={(_event, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              setIndex((i) => i + 1);
              setDirection('forwards');
            } else if (swipe > swipeConfidenceThreshold) {
              setIndex((i) => i - 1);
              setDirection('backwards');
            }
          }}
          className={cn('absolute w-full h-full', className)}
          ref={ref}
          {...props}
        >
          {children}
        </m.div>
      </AnimatePresence>
    </LazyMotion>
  );
});
SlideContent.displayName = 'SlideContent';

type SlideItemProps = {
  children?: React.ReactNode;
  index: number;
};

function SlideItem({ index, children }: SlideItemProps) {
  const { index: currentIndex } = useSlide();

  return (
    index === currentIndex
      ? children
      : null
  );
}

type SlideTabsProps = {
  children?: React.ReactNode;
  className?: string;
};

function SlideTabs({ className, children }: SlideTabsProps) {
  const { index, setIndex, setDirection } = useSlide();

  function handleValueChange(value: string) {
    const newIndex = Number(value);
    setIndex(newIndex);
    setDirection(newIndex < index ? 'backwards' : 'forwards');
  }

  return (
    <Tabs
      value={`${index}`}
      onValueChange={(value) => handleValueChange(value)}
      className={cn('mb-4', className)}
    >
      <TabsList>
        {children}
      </TabsList>
    </Tabs>
  );
}

type SlideTabProps = {
  index: number;
  children?: React.ReactNode;
  className?: string;
};

function SlideTab({ index, className, children }: SlideTabProps) {
  return (
    <TabsTrigger
      className={cn(className)}
      value={`${index}`}
    >
      {children}
    </TabsTrigger>
  );
}

type SlideSelectProps = {
  children?: React.ReactNode;
  className?: string;
};

function SlideSelect({ className, children }: SlideSelectProps) {
  const { index, setIndex, setDirection } = useSlide();

  function handleValueChange(value: string) {
    const newIndex = Number(value);
    setIndex(newIndex);
    setDirection(newIndex < index ? 'backwards' : 'forwards');
  }

  return (
    <Select
      value={`${index}`}
      onValueChange={(value) => handleValueChange(value)}
    >
      <SelectTrigger
        className={cn('max-w-[180px] h-8 mb-3 border-primary-dark dark:border-achromatic-dark', className)}
      >
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        {children}
      </SelectContent>

      <Separator className="mb-4" />
    </Select>
  );
}

type SlideSelectItemProps = {
  index: number;
  children?: React.ReactNode;
  className?: string;
};

function SlideSelectItem({ index, className, children }: SlideSelectItemProps) {
  return (
    <SelectItem
      className={cn(className)}
      value={`${index}`}
    >
      {children}
    </SelectItem>
  );
}

export {
  Slide,
  SlideContent,
  SlideItem,
  SlideTabs,
  SlideTab,
  SlideSelect,
  SlideSelectItem,
};
