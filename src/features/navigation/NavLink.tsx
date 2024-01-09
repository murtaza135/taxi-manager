import { ReactNode } from 'react';
import { Link } from 'wouter';
import { cn } from '@/util/cn';

type Props = {
  text?: string;
  href: string;
  icon?: ReactNode;
  active?: boolean;
};

export function NavLink({ text, href, icon, active }: Props) {
  return (
    <Link href={href} className={cn('text-xl border-l-[6px] border-transparent transition-opacity', !!active && 'border-primary-700 dark:border-primary-600 text-primary-700 dark:text-primary-600', !active && 'hover:opacity-50')}>
      {/* the Link does not want to render its a tag without some other content inside it */}
      {' '}
      <div className="flex gap-4 items-center pl-8 pr-4 sm:pr-10 py-2 hover:translate-x-2 transition-transform">
        <i className="text-4xl md:text-2xl">{icon}</i>
        <p className="hidden md:inline">{text}</p>
      </div>
    </Link>
  );
}
