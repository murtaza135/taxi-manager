import * as React from 'react';
import { Card, CardTitle } from '@/ui/Card';
import { Separator } from '@/ui/Separator';
import { Button } from '@/ui/Button';
import { cn } from '@/utils/cn';

type FormConfirmationProps = {
  className?: string;
  children?: React.ReactNode;
};

function FormConfirmation({ className, children }: FormConfirmationProps) {
  return (
    <Card className={cn('w-full max-w-[32rem] space-y-8', className)}>
      {children}
    </Card>
  );
}

type FormConfirmationTitleProps = {
  className?: string;
  children?: React.ReactNode;
};

function FormConfirmationTitle({ className, children }: FormConfirmationTitleProps) {
  return (
    <CardTitle className={cn(className)}>
      {children}
    </CardTitle>
  );
}

type FormConfirmationHeaderProps = {
  title: string;
  onEdit?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
};

function FormConfirmationHeader({ title, onEdit, className }: FormConfirmationHeaderProps) {
  return (
    <div className={cn(className)}>
      <div className="flex justify-between items-center gap-2 pb-3">
        <h2 className="text-2xl font-bold">{title}</h2>
        {onEdit && (
          <Button variant="ghost" className="p-0" onClick={onEdit}>Edit</Button>
        )}
      </div>
      <Separator className="bg-primary-dark dark:bg-primary-light" />
    </div>
  );
}

type FormConfirmationFieldProps = {
  title: string;
  value?: string;
};

function FormConfirmationField({ title, value }: FormConfirmationFieldProps) {
  return (
    <div>
      <p className="font-bold">{title}</p>
      {value
        ? <p className="text-sm text-primary-dark/80 dark:text-primary-light/65">{value}</p>
        : <p className="text-sm text-achromatic-dark/60 dark:text-achromatic-lighter/50">N/A</p>}
    </div>
  );
}

export {
  FormConfirmation,
  FormConfirmationTitle,
  FormConfirmationHeader,
  FormConfirmationField,
};
