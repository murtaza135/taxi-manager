import * as React from 'react';
import { cn } from '@/utils/cn';

type ImageContextValue = {
  isLoading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isError: boolean;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
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

  const value = React.useMemo(() => ({
    isLoading, setLoading, isError, setError,
  }), [isLoading, setLoading, isError, setError]);

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
>(({ className, alt, onLoad, onError, ...props }, ref) => {
  const { isError, setLoading, setError } = useImageContext();

  const handleLoad: React.ReactEventHandler<HTMLImageElement> = (event) => {
    setLoading(false);
    setError(false);
    onLoad?.(event);
  };

  const handleError: React.ReactEventHandler<HTMLImageElement> = (event) => {
    setLoading(false);
    setError(true);
    onError?.(event);
  };

  return (
    <img
      {...props}
      ref={ref}
      className={cn('h-full w-full z-50', className, isError && 'hidden')}
      alt={alt}
      onLoad={handleLoad}
      onError={handleError}
    />
  );
});
ImageView.displayName = 'ImageView';

const ImageLoading = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => {
  const { isLoading } = useImageContext();

  if (isLoading) {
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
  const { isError } = useImageContext();

  if (isError) {
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

export { Image, ImageView, ImageLoading, ImageError };
