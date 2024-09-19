import { ReactNode } from 'react';

type Props = {
  icon: ReactNode;
  subtitle?: ReactNode;
  title?: ReactNode;
  text: ReactNode;
};

export function DashboardGridCell({ icon, title, subtitle, text }: Props) {
  return (
    <div className="px-8 py-8 rounded-lg flex justify-start items-center gap-4 bg-achromatic-lighter text-primary-dark dark:bg-achromatic-dark dark:text-achromatic-lighter">
      <span className="text-6xl">{icon}</span>
      <div className="flex flex-col justify-center items-start gap-0.5 overflow-hidden text-ellipsis whitespace-nowrap">
        {title && <p className="text-nowrap text-sm font-bold overflow-hidden text-ellipsis whitespace-nowrap w-full">{title}</p>}
        {subtitle && <p className="text-nowrap text-[0.7rem] font-bold overflow-hidden text-ellipsis whitespace-nowrap w-full opacity-70 dark:opacity-50">{subtitle}</p>}
        <p className="text-lg">{text}</p>
      </div>
    </div>
  );
}
