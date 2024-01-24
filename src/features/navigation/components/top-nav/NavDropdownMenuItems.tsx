import { useLocation } from 'wouter';
import { useIsDarkmode, useDarkmodeActions } from '@/features/darkmode/state/darkmodeStore';
import { Switch } from '@/ui/Switch';
import { DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/ui/DropdownMenu';

export function NavDropdownMenuItems() {
  const [, navigate] = useLocation();
  const isDarkmode = useIsDarkmode();
  const { toggleDarkmode } = useDarkmodeActions();

  const handleToggleDarkMode = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    toggleDarkmode();
  };

  return (
    <>
      <DropdownMenuLabel>Username</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        onClick={handleToggleDarkMode}
        className="flex gap-2 justify-center items-center"
      >
        <p className="translate-y-[1px]">Darkmode</p>
        <Switch checked={isDarkmode} />
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => navigate('/settings')}>Settings</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Logout</DropdownMenuItem>
    </>
  );
}
