import { useDarkmodeStore } from '@/features/darkmode/state/darkmodeStore';
import { applyDarkClass } from '@/features/darkmode/utils/applyDarkClass';

export function applyTheme() {
  const { isDarkmode } = useDarkmodeStore.getState();
  applyDarkClass(isDarkmode);
}
