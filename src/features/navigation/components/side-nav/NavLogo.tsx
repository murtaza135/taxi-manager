import { Link } from 'react-router-dom';
import { FaCarAlt } from 'react-icons/fa';
import { useNavActions } from '@/features/navigation/state/navStore';
import { config } from '@/app/config';

const [appNameFirst, ...appNameRest] = config.APP_NAME.split(' ');
const appNameSecond = appNameRest[0] as string | undefined;

export function NavLogo() {
  const { closeNav } = useNavActions();

  return (
    <Link
      to="/"
      onClick={() => closeNav()}
      className="text-2xl font-cursive flex items-center self-center gap-2 min-h-20 hover:opacity-65 transition-opacity cursor-pointer"
    >
      <p className="inline sm:hidden md:inline">{appNameFirst}</p>
      <span className="text-4xl text-primary-dark dark:text-primary-light"><FaCarAlt /></span>
      {!!appNameSecond && <p className="inline sm:hidden md:inline">{appNameSecond}</p>}
    </Link>
  );
}
