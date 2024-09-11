import { LuClipboardCopy, LuClipboardCheck } from 'react-icons/lu';
import { cn } from '@/utils/cn';
import { useTimedBoolean } from '@/hooks/useTimedBoolean';
import { useToast } from '@/ui/toast';

type CopyFieldProps = {
  text?: string;
  defaultText?: string;
  disabled?: boolean;
  transitionDelay?: number;
};

export function CopyField({ text, defaultText, disabled, transitionDelay = 5000 }: CopyFieldProps) {
  const [isCopied, setIsCopied] = useTimedBoolean(transitionDelay);
  const { toast } = useToast();
  const displayText = text || defaultText || '';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(displayText);
    setIsCopied();
    toast({ title: 'Copied to Clipboard' });
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      disabled={disabled}
      className={cn('relative w-full text-left select-none border border-primary-dark dark:border-primary-light rounded-lg overflow-hidden transition-opacity hover:opacity-70', isCopied && 'border-green-600 dark:border-green-500', disabled && 'opacity-50 hover:opacity-50')}
      aria-label="copy"
    >
      <p className={cn('px-3 py-2 text-nowrap', isCopied && 'text-green-600 dark:text-green-500', !text && 'select-none')}>
        {displayText}
      </p>
      <div className={cn('absolute top-0 right-0 rounded-none h-full px-4 center bg-primary-dark dark:bg-primary-light text-achromatic-lighter dark:text-achromatic-dark', isCopied && 'bg-green-600 dark:bg-green-500')}>
        {!isCopied && <LuClipboardCopy className="text-lg" />}
        {isCopied && <LuClipboardCheck className="text-lg" />}
      </div>
    </button>
  );
}
