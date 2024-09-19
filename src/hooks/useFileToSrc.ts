import { useCallback } from 'react';

export function useFileToSrc(file: File | undefined) {
  const src = file ? URL.createObjectURL(file) : undefined;

  const revoke = useCallback(() => {
    if (src) URL.revokeObjectURL(src);
  }, [src]);

  return { src, revoke };
}
