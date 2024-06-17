import { ReactNode } from 'react';
import { LazyMotion as FramerMotionLazyMotion } from 'framer-motion';

const loadFeatures = () => import('./features.ts').then((res) => res.domMax);

type LazyMotionProps = {
  children: ReactNode;
};

export function LazyMotion({ children }: LazyMotionProps) {
  return (
    <FramerMotionLazyMotion features={loadFeatures} strict>
      {children}
    </FramerMotionLazyMotion>
  );
}
