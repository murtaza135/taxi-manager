import { ReactNode } from 'react';
import { MdEmail } from 'react-icons/md';
import { CgInternal } from 'react-icons/cg';
import { FaPhone } from 'react-icons/fa';
import { LuClipboardCopy, LuClipboardCheck } from 'react-icons/lu';
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
      <CgInternal className="-translate-y-[1px] text-lg transition-opacity opacity-0 group-hover:opacity-100 absolute -right-6" />
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
      <FaPhone className="-translate-y-[1px] transition-opacity opacity-0 group-hover:opacity-100 absolute -right-6" />
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
      <MdEmail className="text-lg transition-opacity opacity-0 group-hover:opacity-100 absolute -right-6" />
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
      className={cn('inline-flex items-center gap-2 p-0 transition-opacity hover:opacity-60 text-nowrap group relative', className)}
      onClick={handleCopy}
    >
      {children ?? text}
      {!isCopied && (
        <LuClipboardCopy
          className="-translate-y-[1px] text-lg transition-opacity opacity-0 group-hover:opacity-100 absolute -right-6"
        />
      )}
      {isCopied && (
        <LuClipboardCheck
          className="-translate-y-[1px] text-lg transition-opacity opacity-0 group-hover:opacity-100 absolute -right-6"
        />
      )}
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
