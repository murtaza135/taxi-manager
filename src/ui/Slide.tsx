import * as React from 'react';
import { m, AnimatePresence, HTMLMotionProps, Variants, PanInfo } from 'framer-motion';
import { LazyMotion } from '@/app/framer-motion/LazyMotion';
import { cn } from '@/utils/cn';
import { clamp } from '@/utils/clamp';
import { Tabs, TabsList, TabsTrigger } from '@/ui/Tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/Select';
import { Separator } from '@/ui/Separator';

type Direction = 'forwards' | 'backwards';
type Orientation = 'horizontal' | 'vertical';

type SlideContextValue = {
  index: number;
  direction: Direction;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  nextIndex: (value?: number) => void;
  prevIndex: (value?: number) => void;
  min: number;
  max: number;
  orientation: Orientation;
};

const SlideContext = React.createContext<SlideContextValue>(
  null as unknown as SlideContextValue,
);

function useSlideContext() {
  const context = React.useContext(SlideContext);

  if (context === undefined) {
    throw new Error('useSlideContext must be used within <Slide />');
  }

  return context;
}

type SlideProps = {
  min: number;
  max: number;
  initial?: number;
  index?: number;
  onIndexChange?: (index: number) => void;
  orientation?: Orientation;
};

const Slide = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & SlideProps
>((
  { className, children, min, max, initial, index, onIndexChange, orientation, ...props },
  ref,
) => {
  const [internalIndex, setInternalIndex] = React.useState(index ?? initial ?? min);
  const [direction, setDirection] = React.useState<Direction>('forwards');

  const setIndex = React.useCallback((value: React.SetStateAction<number>) => {
    const newIndexValue = clamp(typeof value === 'function' ? value(internalIndex) : value, min, max);
    setInternalIndex(newIndexValue);
    setDirection(newIndexValue >= internalIndex ? 'forwards' : 'backwards');
    onIndexChange?.(newIndexValue);
  }, [internalIndex, setInternalIndex, setDirection, onIndexChange, min, max]);

  const nextIndex = React.useCallback((value?: number) => {
    setIndex((i) => i + (value ?? 1));
  }, [setIndex]);

  const prevIndex = React.useCallback((value?: number) => {
    setIndex((i) => i - (value ?? 1));
  }, [setIndex]);

  const value = React.useMemo(
    () => ({
      index: index !== undefined ? index : internalIndex,
      direction,
      setIndex,
      nextIndex,
      prevIndex,
      min,
      max,
      orientation: orientation ?? 'horizontal',
    }),
    [index, internalIndex, direction, setIndex, nextIndex, prevIndex, min, max, orientation],
  );

  return (
    <SlideContext.Provider value={value}>
      <div
        ref={ref}
        className={cn('', className)}
        {...props}
      >
        {children}
      </div>
    </SlideContext.Provider>
  );
});
Slide.displayName = 'Slide';

const SLIDE_VALUE = 1000;

const slideVectors = {
  horizontal: {
    forwards: {
      enter: { x: SLIDE_VALUE, y: 0 },
      exit: { x: -SLIDE_VALUE, y: 0 },
    },
    backwards: {
      enter: { x: -SLIDE_VALUE, y: 0 },
      exit: { x: SLIDE_VALUE, y: 0 },
    },
  },
  vertical: {
    forwards: {
      enter: { x: 0, y: SLIDE_VALUE },
      exit: { x: 0, y: -SLIDE_VALUE },
    },
    backwards: {
      enter: { x: 0, y: -SLIDE_VALUE },
      exit: { x: 0, y: SLIDE_VALUE },
    },
  },
};

type CustomVariantOptions = {
  direction: Direction;
  orientation: Orientation;
};

const variants: Variants = {
  enter: ({ orientation, direction }: CustomVariantOptions) => ({
    x: slideVectors[orientation][direction].enter.x,
    y: slideVectors[orientation][direction].enter.y,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    y: 0,
    opacity: 1,
  },
  exit: ({ orientation, direction }: CustomVariantOptions) => ({
    zIndex: 0,
    x: slideVectors[orientation][direction].exit.x,
    y: slideVectors[orientation][direction].exit.y,
    opacity: 0,
    transition: {
      opacity: { duration: 0 },
    },
  }),
};

const SWIPE_CONFIDENCE_THRESHOLD = 10000;
const swipePower = (offset: number, velocity: number) => Math.abs(offset) * velocity;

const SlideItems = React.forwardRef<
  HTMLDivElement,
  HTMLMotionProps<'div'>
>(({ className, children, ...props }, ref) => {
  const { index, direction, nextIndex, prevIndex, orientation } = useSlideContext();

  function handleDragEnd(_event: Event, { offset, velocity }: PanInfo) {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -SWIPE_CONFIDENCE_THRESHOLD) {
      nextIndex();
    } else if (swipe > SWIPE_CONFIDENCE_THRESHOLD) {
      prevIndex();
    }
  }

  return (
    <LazyMotion>
      <AnimatePresence initial={false} custom={{ direction, orientation }} mode="popLayout">
        <m.div
          key={index}
          custom={{ direction, orientation }}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            y: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 1.5 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.8}
          onDragEnd={handleDragEnd}
          className={cn('w-full', className)}
          ref={ref}
          {...props}
        >
          {children}
        </m.div>
      </AnimatePresence>
    </LazyMotion>
  );
});
SlideItems.displayName = 'SlideItems';

type SlideItemProps = {
  children?: React.ReactNode;
  index: number;
};

function SlideItem({ index, children }: SlideItemProps) {
  const { index: currentIndex } = useSlideContext();

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
  const { index, setIndex } = useSlideContext();

  function handleValueChange(value: string) {
    const newIndex = Number(value);
    if (!Number.isNaN(newIndex)) {
      setIndex(newIndex);
    }
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
  const { index, setIndex } = useSlideContext();

  function handleValueChange(value: string) {
    const newIndex = Number(value);
    if (!Number.isNaN(newIndex)) {
      setIndex(newIndex);
    }
  }

  return (
    <Select
      value={`${index}`}
      onValueChange={(value) => handleValueChange(value)}
    >
      <SelectTrigger
        className={cn('max-w-[180px] h-8 border-primary-dark dark:border-achromatic-dark', className)}
      >
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        {children}
      </SelectContent>

      <Separator className="mt-3 mb-4" />
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
  SlideItems,
  SlideItem,
  SlideTabs,
  SlideTab,
  SlideSelect,
  SlideSelectItem,
};
