import { Link } from 'react-router-dom';
import { FaCarAlt } from 'react-icons/fa';
import { config } from '@/config/config';

const [appNameFirst, appNameSecond] = config.appName.split(' ');

export function NavLogo() {
  return (
    <Link
      to="/"
      className="text-2xl font-cursive flex items-center self-center gap-2 min-h-20 hover:opacity-65 transition-opacity cursor-pointer"
    >
      <p className="hidden xs:inline">{appNameFirst}</p>
      <span className="text-4xl text-achromatic-lighter dark:text-primary-light"><FaCarAlt /></span>
      {!!appNameSecond && <p className="hidden xs:inline">{appNameSecond}</p>}
    </Link>
  );
}