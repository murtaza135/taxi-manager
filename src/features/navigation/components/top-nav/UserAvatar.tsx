import { Avatar, AvatarFallback, AvatarImage } from '@/ui/Avatar';

export function UserAvatar() {
  return (
    <Avatar className="hover:opacity-65 transition-opacity">
      <AvatarImage src="" alt="user" />
      <AvatarFallback className="dark:text-achromatic-light">Cn</AvatarFallback>
    </Avatar>
  );
}
