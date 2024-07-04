import { BsSunFill, BsMoonStarsFill } from 'react-icons/bs';
import { useIsDarkmode, useDarkmodeActions } from '@/features/darkmode/state/darkmodeStore';
import { Button } from '@/ui/Button';
import { cn } from '@/utils/cn';

type Props = {
  className?: string;
};

export function SimpleDarkmodeSwitch({ className }: Props) {
  const isDarkmode = useIsDarkmode();
  const { toggleDarkmode } = useDarkmodeActions();

  return (
    <Button
      type="button"
      variant="ghost"
      shape="circle"
      size="sm"
      aria-label={isDarkmode ? 'dark-mode' : 'light-mode'}
      onClick={() => toggleDarkmode()}
      className={cn('hover:opacity-70', className)}
    >
      {isDarkmode
        ? <BsMoonStarsFill className="text-lg" />
        : <BsSunFill className="text-xl" />}
    </Button>
  );
}
