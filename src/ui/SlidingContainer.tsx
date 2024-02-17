/* eslint-disable @typescript-eslint/indent */
import * as React from 'react';
import { m, AnimatePresence, HTMLMotionProps } from 'framer-motion';
import { LazyMotion } from '@/app/framer-motion/LazyMotion';
import { cn } from '@/utils/cn';
import { clamp } from '@/utils/clamp';

// TODO
// create context provider with root relative div
// create content component containing the animation related divs
// create item components that will be children of animation related divs and conditionally render the item based upon state in context
// additional components can be placed under provider component

// TODO add orientation

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => Math.abs(offset) * velocity;

const SlidingContainer = React.forwardRef<
  HTMLDivElement,
  HTMLMotionProps<'div'> // TODO change props to normal div
>(({ className, children, ...props }, ref) => {
  const [index, setIndex] = React.useState(0);
  const [direction, setDirection] = React.useState(0);

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
                setDirection(1);
              } else if (swipe > swipeConfidenceThreshold) {
                // paginate(-1);
                setIndex((i) => clamp(i - 1, 0, 10));
                setDirection(-1);
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

export { SlidingContainer };
