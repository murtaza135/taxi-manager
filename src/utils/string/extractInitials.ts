import { capitalize } from '@/utils/string/capitalize';

export function extractInitials(name: string) {
  const words = name.split(' ');
  if (words.length === 0) return '';
  if (words.length === 1) return capitalize(words[0].charAt(0));
  return `${words[0].charAt(0)}${words[words.length - 1].charAt(0)}`.toUpperCase();
}
