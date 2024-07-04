import { BsSunFill, BsMoonStarsFill } from 'react-icons/bs';
import { useIsDarkmode, useDarkmodeActions } from '@/features/darkmode/state/darkmodeStore';

export function SimpleDarkmodeSwitch() {
  const isDarkmode = useIsDarkmode();
  const { toggleDarkmode } = useDarkmodeActions();

  return (
    <button
      type="button"
      aria-label={isDarkmode ? 'dark-mode' : 'light-mode'}
      onClick={() => toggleDarkmode()}
    >
      {isDarkmode
        ? <BsMoonStarsFill className="text-lg hover:opacity-75" />
        : <BsSunFill className="text-xl hover:opacity-75" />}
    </button>
  );
}
