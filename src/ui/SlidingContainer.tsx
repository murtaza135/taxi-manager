/* eslint-disable @typescript-eslint/indent */
import * as React from 'react';
import { m, AnimatePresence, HTMLMotionProps, Variants } from 'framer-motion';
import { LazyMotion } from '@/app/framer-motion/LazyMotion';
import { cn } from '@/utils/cn';
import { clamp } from '@/utils/clamp';

// TODO
// create context provider with root relative div
// create content component containing the animation related divs
// create item components that will be children of animation related divs and conditionally render the item based upon state in context
// additional components can be placed under provider component

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
      setIndexValue((i) => clamp(i + value, min, max));
    }
  }, [setIndexValue, min, max]);

  const value = React.useMemo(() => ({
    index, setIndex, direction, setDirection,
  }), [index, setIndex, direction, setDirection]);

  return (
    <SlideContext.Provider value={value}>
      <div
        ref={ref}
        className={cn('border-2 border-red-500 cursor-pointer relative w-full h-full', className)}
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
  children: React.ReactNode;
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

// -------------------------------------------

const SlidingContainer = React.forwardRef<
  HTMLDivElement,
  HTMLMotionProps<'div'> // TODO change props to normal div
>(({ className, children, ...props }, ref) => {
  const [index, setIndex] = React.useState(0);
  const [direction, setDirection] = React.useState<Direction>('forwards');

  return (
    <LazyMotion>
      <div className={cn('border-2 border-red-500 cursor-pointer relative w-full h-full', className)}>
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <m.div
            key={index}
            custom={direction}
            // layoutId="slide"
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.8}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                // paginate(1);
                setIndex((i) => clamp(i + 1, 0, 10));
                setDirection('forwards');
              } else if (swipe > swipeConfidenceThreshold) {
                // paginate(-1);
                setIndex((i) => clamp(i - 1, 0, 10));
                setDirection('backwards');
              }
            }}
            // className={cn('border-2 border-red-500 cursor-pointer absolute w-full h-full', className)}
            className={cn('absolute w-full h-full')}
            ref={ref}
            {...props}
          >
            {index}
          </m.div>
        </AnimatePresence>
      </div>
    </LazyMotion>
  );
});
SlidingContainer.displayName = 'SlidingContainer';

export {
  SlidingContainer,
  Slide,
  SlideContent,
  SlideItem,
};
