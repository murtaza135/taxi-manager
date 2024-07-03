import { useMediaQuery } from 'usehooks-ts';
import { config } from '@/config/config';

type Breakpoint = keyof typeof config.breakpoints;

export function useBreakpoint(breakpoint: Breakpoint) {
  return useMediaQuery(`(min-width: ${config.breakpoints[breakpoint]})`);
}
