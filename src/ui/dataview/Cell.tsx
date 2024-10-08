import { ReactNode } from 'react';
import { MdEmail } from 'react-icons/md';
import { FaPhone } from 'react-icons/fa';
import { LuClipboardCopy, LuClipboardCheck } from 'react-icons/lu';
import { FiEye } from 'react-icons/fi';
import { Link, To } from 'react-router-dom';
import { Button } from '@/ui/Button';
import { cn } from '@/utils/cn';
import { useTimedBoolean } from '@/hooks/useTimedBoolean';
import { useToast } from '@/ui/toast';

function NoDataCell() {
  return (
    <p className="text-achromatic-dark/60 dark:text-achromatic-lighter/50">
      N/A
    </p>
  );
}

type LinkCellProps = {
  to: To;
  children?: ReactNode;
  className?: string;
};

function LinkCell({ to, children, className }: LinkCellProps) {
  return (
    <Link
      to={to}
      className={cn('inline-flex items-center gap-2 transition-opacity hover:opacity-70 text-nowrap group relative', className)}
    >
      {children}
      <span className="absolute -right-6 pl-6 -translate-y-[0px]">
        <FiEye className="text-base transition-opacity opacity-0 group-hover:opacity-100" />
      </span>
    </Link>
  );
}

type PhoneNumberCellProps = {
  phone: string;
  children?: ReactNode;
  className?: string;
};

function PhoneNumberCell({ phone, children, className }: PhoneNumberCellProps) {
  return (
    <a
      href={`tel:${phone}`}
      className={cn('inline-flex items-center gap-2 transition-opacity hover:opacity-60 text-nowrap group relative', className)}
    >
      {children ?? phone}
      <span className="icon absolute -right-6 pl-6 -translate-y-[1px]">
        <FaPhone className="transition-opacity opacity-0 group-hover:opacity-100" />
      </span>
    </a>
  );
}

type EmailCellProps = {
  email: string;
  children?: ReactNode;
  className?: string;
};

function EmailCell({ email, children, className }: EmailCellProps) {
  return (
    <a
      href={`mailto:${email}`}
      className={cn('inline-flex items-center gap-2 transition-opacity hover:opacity-60 text-nowrap group relative', className)}
    >
      {children ?? email}
      <span className="icon absolute -right-6 pl-6">
        <MdEmail className="text-lg transition-opacity opacity-0 group-hover:opacity-100" />
      </span>
    </a>
  );
}

type CopyCellProps = {
  text: string;
  children?: ReactNode;
  className?: string;
};

function CopyCell({ text, children, className }: CopyCellProps) {
  const [isCopied, setIsCopied] = useTimedBoolean(2500);
  const { toast } = useToast();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setIsCopied();
    toast({ title: 'Copied to Clipboard' });
  };

  return (
    <Button
      variant="ghost"
      className={cn('inline-flex items-center gap-2 p-0 transition-opacity hover:opacity-60 text-nowrap group relative font-normal', className)}
      onClick={handleCopy}
    >
      {children ?? text}
      <span className="absolute -right-6 pl-6 -translate-y-[1px]">
        {!isCopied && (
          <LuClipboardCopy
            className="text-lg transition-opacity opacity-0 group-hover:opacity-100"
          />
        )}
        {isCopied && (
          <LuClipboardCheck
            className="text-lg transition-opacity opacity-0 group-hover:opacity-100"
          />
        )}
      </span>
    </Button>
  );
}

export {
  NoDataCell,
  LinkCell,
  PhoneNumberCell,
  EmailCell,
  CopyCell,
};
