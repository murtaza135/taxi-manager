import * as SwitchPrimitives from '@radix-ui/react-switch';
import { useDarkMode } from './useDarkMode';
import { cn } from '@/util/cn';

type Props = {
  className?: string;
};

export function DarkModeButton({ className }: Props) {
  const { isDarkMode, toggle } = useDarkMode();

  return (
    <SwitchPrimitives.Root
      className={cn('peer inline-flex h-6 w-12 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=unchecked]:bg-dark-900 data-[state=checked]:bg-light-100', className)}
      checked={isDarkMode}
      onCheckedChange={() => toggle()}
    >
      <SwitchPrimitives.Thumb
        className="data-[state=unchecked]:bg-light-100 data-[state=checked]:bg-dark-900 pointer-events-none block h-4 w-4 rounded-full shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-1"
      />
    </SwitchPrimitives.Root>
  );
}
