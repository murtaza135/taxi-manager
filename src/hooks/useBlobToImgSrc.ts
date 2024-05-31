import { useEffect, useState } from 'react';

export function useBlobToImgSrc(blob: Blob | null | undefined) {
  const [src, setSrc] = useState<string>('');

  useEffect(() => {
    const imgSrc = blob ? URL.createObjectURL(blob) : '';
    setSrc(imgSrc);

    return () => {
      if (blob) URL.revokeObjectURL(imgSrc);
    };
  }, [blob, setSrc]);

  return src;
}
