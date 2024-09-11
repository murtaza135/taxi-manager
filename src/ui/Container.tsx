import { ReactNode } from 'react';
import { cn } from '@/utils/cn';

type BasicContainerProps = {
  center?: boolean;
  className?: string;
  children?: ReactNode;
};

function BasicContainer({ center, className, children }: BasicContainerProps) {
  return (
    <div className={cn('w-full max-w-screen-2xl min-h-[calc(100dvh-4rem)] mx-auto px-5', center && 'center', className)}>
      {children}
    </div>
  );
}

type ContentContainerProps = {
  className?: string;
  children?: ReactNode;
};

function ContentContainer({ className, children }: ContentContainerProps) {
  return (
    <div className={cn('flex flex-col overflow-x-hidden w-full max-w-screen-2xl min-h-[calc(100dvh-4rem)] mx-auto pl-5 sm:pl-[9.625rem] md:pl-[18.5rem] pr-5 pt-20 pb-24 pwa:pb-36', className)}>
      <div className="flex-grow flex flex-col [&>*]:flex-grow w-full">
        {children}
      </div>
    </div>
  );
}

export {
  BasicContainer,
  ContentContainer,
};
