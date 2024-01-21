import { useDarkmodeStore } from '../state/darkmodeStore';
import { applyDarkClass } from './applyDarkClass';

export function applyTheme() {
  const { isDarkmode } = useDarkmodeStore.getState();
  applyDarkClass(isDarkmode);
}
