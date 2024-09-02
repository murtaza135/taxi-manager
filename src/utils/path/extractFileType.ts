import imageExtensions from 'image-extensions';
import { extname } from '@/utils/path/extname';

export type FileType = 'image' | 'pdf' | 'other' | 'none';

export function extractFileType(path?: string): FileType {
  if (!path) return 'none';
  const ext = extname(path).slice(1).toLowerCase();
  if (imageExtensions.includes(ext)) return 'image';
  if (ext === 'pdf') return 'pdf';
  return 'other';
}
