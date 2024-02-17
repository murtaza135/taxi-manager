import { m } from 'framer-motion';
import { LazyMotion } from '@/app/framer-motion/LazyMotion';
import { Title } from '@/features/title/components/Title';

export function TaxisPage() {
  return (
    <>
      <Title title="Taxis" />
      <LazyMotion>
        <m.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          lol
        </m.div>
      </LazyMotion>
    </>
  );
}
