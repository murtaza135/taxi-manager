import { useDarkMode } from './useDarkMode';

export function DarkModeButton() {
  const { toggle } = useDarkMode();

  return (
    <button
      type="button"
      onClick={() => toggle()}
    >
      Toggle
    </button>
  );
}
