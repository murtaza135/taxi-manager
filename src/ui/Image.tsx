import * as React from 'react';
import { cn } from '@/utils/cn';

type ImageContextValue = {
  isLoading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isError: boolean;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  isNoSrc: boolean;
  setNoSrc: React.Dispatch<React.SetStateAction<boolean>>;
};

const ImageContext = React.createContext<ImageContextValue>(
  null as unknown as ImageContextValue,
);

function useImageContext() {
  const context = React.useContext<ImageContextValue>(
    ImageContext as unknown as React.Context<ImageContextValue>,
  );

  if (context === undefined) {
    throw new Error('useImageContext must be used within <Image />');
  }

  return context;
}

const Image = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const [isLoading, setLoading] = React.useState<boolean>(true);
  const [isError, setError] = React.useState<boolean>(false);
  const [isNoSrc, setNoSrc] = React.useState<boolean>(true);

  const value = React.useMemo(() => ({
    isLoading, setLoading, isError, setError, isNoSrc, setNoSrc,
  }), [isLoading, setLoading, isError, setError, isNoSrc, setNoSrc]);

  return (
    <ImageContext.Provider value={value}>
      <div
        className={cn('relative', className)}
        ref={ref}
        {...props}
      />
    </ImageContext.Provider>
  );
});
Image.displayName = 'Image';

const ImageView = React.forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement>
>(({ className, src, alt, onLoad, onError, ...props }, ref) => {
  const { isError, setLoading, setError, setNoSrc } = useImageContext();

  React.useEffect(() => {
    if (!src) {
      setNoSrc(true);
    }
  }, [src, setNoSrc]);

  const handleLoad: React.ReactEventHandler<HTMLImageElement> = (event) => {
    setLoading(false);
    setError(false);
    setNoSrc(false);
    onLoad?.(event);
  };

  const handleError: React.ReactEventHandler<HTMLImageElement> = (event) => {
    setLoading(false);
    setError(true);
    setNoSrc(true);
    onError?.(event);
  };

  return (
    <img
      {...props}
      ref={ref}
      className={cn('h-full w-full z-50', className, (!src || isError) && 'hidden')}
      src={src}
      alt={alt}
      onLoad={handleLoad}
      onError={handleError}
    />
  );
});
ImageView.displayName = 'ImageView';

const ImageFallback = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => {
  const { isNoSrc } = useImageContext();

  if (isNoSrc) {
    return (
      <span
        className={cn('absolute top-0 left-0 w-full h-full z-0', className)}
        ref={ref}
        {...props}
      />
    );
  }

  return null;
});
ImageFallback.displayName = 'ImageFallback';

const ImageLoading = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => {
  const { isLoading, isNoSrc } = useImageContext();

  if (isLoading && !isNoSrc) {
    return (
      <span
        className={cn('absolute top-0 left-0 w-full h-full z-0', className)}
        ref={ref}
        {...props}
      />
    );
  }

  return null;
});
ImageLoading.displayName = 'ImageLoading';

const ImageError = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => {
  const { isError, isLoading, isNoSrc } = useImageContext();

  if (isError && !isLoading && !isNoSrc) {
    return (
      <span
        className={cn('absolute top-0 left-0 w-full h-full z-0', className)}
        ref={ref}
        {...props}
      />
    );
  }

  return null;
});
ImageError.displayName = 'ImageError';

export { Image, ImageView, ImageFallback, ImageLoading, ImageError };
