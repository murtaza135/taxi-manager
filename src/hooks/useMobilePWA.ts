import { useMediaQuery } from 'usehooks-ts';
import { config } from '@/app/config';

export function useMobilePWA() {
  return useMediaQuery(`(max-width: ${config.BREAKPOINTS.sm}) and (display-mode: standalone)`);
}
