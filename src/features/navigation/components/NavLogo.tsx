import { Link } from 'wouter';
import { FaCarAlt } from 'react-icons/fa';
import { navHooks } from '../state/navStore';
import { config } from '@/app/config';

const [appNameFirst, ...appNameRest] = config.APP_NAME.split(' ');

export function NavLogo() {
  const close = navHooks.useClose();

  return (
    <Link href="/" onClick={() => close()}>
      <div className="font-cursive flex items-center self-center gap-2 min-h-20 hover:opacity-65 transition-opacity cursor-pointer">
        <p className="inline sm:hidden md:inline text-2xl">{appNameFirst}</p>
        <span className="text-4xl sm:text-4xl md:text-4xl text-primary-2 dark:text-primary-1"><FaCarAlt /></span>
        <p className="inline sm:hidden md:inline text-2xl">{appNameRest}</p>
      </div>
    </Link>
  );
}
