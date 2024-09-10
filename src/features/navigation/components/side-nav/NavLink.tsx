import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useNavActions } from '@/features/navigation/state/navStore';
import { cn } from '@/utils/cn';

type Props = {
  text?: string;
  to: string;
  icon?: ReactNode;
  active?: boolean;
  className?: string;
};

export function NavLink({ text, to, icon, active, className }: Props) {
  const { closeNav } = useNavActions();

  return (
    <Link
      to={to}
      onClick={() => closeNav()}
      className={cn('text-xl border-l-[6px] transition-opacity', !!active && 'border-primary-dark dark:border-primary-light text-primary-dark dark:text-primary-light', !active && 'border-transparent hover:opacity-50', className)}
    >
      <div className="flex items-center gap-4 pl-8 pr-10 md:pr-4 py-2 hover:translate-x-2 transition-transform">
        <i className="text-2xl sm:text-4xl md:text-2xl">{icon}</i>
        <p className="inline sm:hidden md:inline overflow-hidden whitespace-nowrap text-ellipsis">{text}</p>
      </div>
    </Link>
  );
}
