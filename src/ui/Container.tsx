import { ReactNode } from 'react';
import { cn } from '@/utils/cn';

type BasicContainerProps = {
  className?: string;
  children?: ReactNode;
};

function BasicContainer({ className, children }: BasicContainerProps) {
  return (
    <div className={cn('w-full max-w-screen-2xl mx-auto px-5', className)}>
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
    <div className={cn('flex flex-col w-full max-w-screen-2xl min-h-dvh mx-auto pl-5 sm:pl-[9.625rem] md:pl-[18.5rem] pr-5 pt-20 pb-5', className)}>
      <div className="flex-grow flex flex-col [&>*]:flex-grow w-full overflow-x-hidden">
        {children}
      </div>
    </div>
  );
}

export {
  BasicContainer,
  ContentContainer,
};
