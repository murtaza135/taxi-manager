import { ReactNode } from 'react';
import { Link } from 'wouter';
import { cn } from '@/util/cn';
import { navHooks } from '../state/navStore';

type Props = {
  text?: string;
  href: string;
  icon?: ReactNode;
  active?: boolean;
  className?: string;
};

export function NavLink({ text, href, icon, active, className }: Props) {
  const close = navHooks.useClose();

  return (
    <Link href={href} onClick={() => close()} className={cn('text-xl border-l-[6px] border-transparent transition-opacity', !!active && 'border-primary-2 dark:border-primary-1 text-primary-2 dark:text-primary-1', !active && 'hover:opacity-50', className)}>
      {/* the Link does not want to render its `a` tag without some other content inside it */}
      {' '}
      <div className="flex items-center gap-4 pl-8 pr-10 md:pr-4 py-2 hover:translate-x-2 transition-transform">
        <i className="text-2xl sm:text-4xl md:text-2xl">{icon}</i>
        <p className="inline sm:hidden md:inline">{text}</p>
      </div>
    </Link>
  );
}
