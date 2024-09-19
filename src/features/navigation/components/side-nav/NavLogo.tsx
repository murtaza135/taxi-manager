import { Link } from 'react-router-dom';
import { FaCarSide } from 'react-icons/fa';
import { useNavActions } from '@/features/navigation/state/navStore';
import { config } from '@/config/config';

const [appNameFirst, appNameSecond] = config.appName.split(' ');

export function NavLogo() {
  const { closeNav } = useNavActions();

  return (
    <Link
      to="/"
      onClick={() => closeNav()}
      className="text-2xl font-cursive flex items-center self-center gap-2 min-h-20 hover:opacity-65 transition-opacity cursor-pointer"
    >
      <p className="inline sm:hidden md:inline">{appNameFirst}</p>
      <span className="text-4xl text-primary-dark dark:text-primary-light"><FaCarSide /></span>
      {!!appNameSecond && <p className="inline sm:hidden md:inline">{appNameSecond}</p>}
    </Link>
  );
}
