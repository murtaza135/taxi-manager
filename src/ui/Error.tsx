import * as React from 'react';
import { cn } from '@/utils/cn';
import { useIsDarkmode } from '@/features/darkmode/state/darkmodeStore';

const ErrorContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(
  ({ className, ...props }, ref) => (
    <div
      className={cn('flex flex-col justify-center items-center gap-4 text-center', className)}
      ref={ref}
      {...props}
    />
  ),
);
ErrorContainer.displayName = 'ErrorContainer';

type ErrorImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  srcLight?: string;
  srcDark?: string;
};

const ErrorImage = React.forwardRef<
  HTMLImageElement,
  ErrorImageProps
>(
  ({ className, alt, src, srcLight, srcDark, ...props }, ref) => {
    const isDarkMode = useIsDarkmode();
    const srcLightMode = srcLight ?? src;
    const srcDarkMode = srcDark ?? src;
    const imageSrc = isDarkMode ? srcDarkMode : srcLightMode;

    return (
      <img
        className={cn('max-w-80', className)}
        src={imageSrc}
        alt={alt}
        ref={ref}
        {...props}
      />
    );
  },
);
ErrorImage.displayName = 'ErrorImage';

type ErrorIconProps = React.HTMLAttributes<HTMLSpanElement> & {
  icon: React.ReactNode;
  color?: 'primary' | 'danger';
};

const ErrorIcon = React.forwardRef<
  HTMLSpanElement,
  ErrorIconProps
>(
  ({ icon, color = 'primary', className, ...props }, ref) => (
    <span
      className={cn('text-5xl', color === 'primary' && 'text-primary-dark dark:text-primary-light', color === 'danger' && 'text-red-800/90 dark:text-red-700/90', className)}
      ref={ref}
      {...props}
    >
      {icon}
    </span>
  ),
);
ErrorIcon.displayName = 'ErrorIcon';

const ErrorTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(
  ({ className, children, ...props }, ref) => (
    <h1
      className={cn('text-3xl text-primary-dark dark:text-primary-light', className)}
      ref={ref}
      {...props}
    >
      {children}
    </h1>
  ),
);
ErrorTitle.displayName = 'ErrorTitle';

const ErrorMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(
  ({ className, children, ...props }, ref) => (
    <p
      className={cn('max-w-[32.5rem]', className)}
      ref={ref}
      {...props}
    >
      {children}
    </p>
  ),
);
ErrorMessage.displayName = 'ErrorMessage';

const ErrorButtons = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(
  ({ className, ...props }, ref) => (
    <div
      className={cn('flex gap-3 flex-wrap justify-center pt-3 max-w-[30rem]', className)}
      ref={ref}
      {...props}
    />
  ),
);
ErrorButtons.displayName = 'ErrorButtons';

export {
  ErrorContainer,
  ErrorImage,
  ErrorIcon,
  ErrorTitle,
  ErrorMessage,
  ErrorButtons,
};
