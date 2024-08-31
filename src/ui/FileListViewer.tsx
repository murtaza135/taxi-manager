import { useState } from 'react';
import { Button } from '@/ui/Button';
import { cn } from '@/utils/cn';

type FileConfig = {
  file: string;
  placeholder?: undefined;
} | {
  file?: undefined;
  placeholder?: string;
} | {
  file: string;
  placeholder: string;
};

type Props = {
  files: FileConfig[];
  initial?: number;
  className?: string;
};

export function FileListViewer({ files, initial, className }: Props) {
  const [current, setCurrent] = useState<number>(initial ?? 0);
  const currentConfig = files[current];

  const handleChange = (index: number) => {
    setCurrent(index);
  };

  return (
    <div
      className={cn('max-w-[32.25rem] space-y-1', className)}
    >
      <img src={currentConfig.file} alt="pic1" className="rounded-lg w-full" />
      <div className="flex gap-1 flex-wrap">
        {files.map((config, index) => (
          <Button
            key={config.file}
            type="submit"
            variant="ghost"
            className={cn('rounded-lg p-0 overflow-hidden flex-shrink-0', current === index && 'opacity-50')}
            onMouseEnter={() => handleChange(index)}
            onClick={() => handleChange(index)}
          >
            <img src={config.file} alt={`file-${index}`} className="w-12 h-12" />
          </Button>
        ))}
      </div>
    </div>
  );
}
