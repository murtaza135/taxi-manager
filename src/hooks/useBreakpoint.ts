import { useMediaQuery } from 'usehooks-ts';
import { config } from '@/app/config';

type Breakpoint = keyof typeof config.BREAKPOINTS;

export function useBreakpoint(breakpoint: Breakpoint) {
  return useMediaQuery(`(min-width: ${config.BREAKPOINTS[breakpoint]})`);
}
