import * as React from 'react';
import { cn } from '@/utils/cn';

const ErrorContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(
  ({ className, ...props }, ref) => (
    <div
      className={cn('flex flex-col justify-center items-center gap-4 text-center max-w-[40rem]', className)}
      ref={ref}
      {...props}
    />
  ),
);
ErrorContainer.displayName = 'ErrorContainer';

const ErrorImage = React.forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement>
>(
  ({ className, alt, ...props }, ref) => (
    <img
      className={cn('max-w-80', className)}
      alt={alt}
      ref={ref}
      {...props}
    />
  ),
);
ErrorImage.displayName = 'ErrorImage';

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
      className={cn('max-w-[30rem]', className)}
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
  ErrorTitle,
  ErrorMessage,
  ErrorButtons,
};
