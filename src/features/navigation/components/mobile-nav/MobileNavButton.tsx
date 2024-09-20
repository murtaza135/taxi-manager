import { ReactNode } from 'react';
import { cn } from '@/utils/cn';

type Props = {
  text?: string;
  icon: ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export function MobileNavButton({ text, icon, className, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn('flex-grow flex flex-col items-center px-2 pb-1 pt-2 text-achromatic-darker dark:text-achromatic-lighter', className)}
    >
      <i className="text-2xl">{icon}</i>
      <p className="text-sm">{text}</p>
    </button>
  );
}
