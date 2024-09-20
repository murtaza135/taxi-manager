import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';

type Props = {
  text?: string;
  to: string;
  icon: ReactNode;
  active?: boolean;
  className?: string;
};

export function MobileNavLink({ text, to, icon, active, className }: Props) {
  return (
    <Link
      to={to}
      className={cn('flex-grow flex flex-col items-center px-2 pb-1 pt-2 text-achromatic-darker dark:text-achromatic-lighter', active && 'text-primary-dark dark:text-primary-light', className)}
    >
      <i className="text-2xl">{icon}</i>
      <p className="text-sm">{text}</p>
    </Link>
  );
}
