import { useMediaQuery } from 'usehooks-ts';
import { config } from '@/config/config';

export function useMobilePWA() {
  return useMediaQuery(`(max-width: ${config.BREAKPOINTS.sm}) and (display-mode: standalone)`);
}
