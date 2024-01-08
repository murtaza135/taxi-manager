import { DarkModeButton } from '@/features/darkmode/DarkModeButton';

export function Navbar() {
  return (
    <div className="container mx-auto px-4 flex gap-3">
      <p>Navbar</p>
      <DarkModeButton />
    </div>
  );
}
