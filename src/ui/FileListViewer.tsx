import { ReactNode, useId, useState } from 'react';
import { Document, Page, Thumbnail, pdfjs } from 'react-pdf';
import { FaFilePdf } from 'react-icons/fa6';
import { MdError, MdModeEdit } from 'react-icons/md';
import { FaTrashAlt } from 'react-icons/fa';
import { Button } from '@/ui/Button';
import { cn } from '@/utils/cn';
import { Skeleton } from '@/ui/Skeleton';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

function PDFLogo() {
  return (
    <div className="w-full h-full center text-primary-dark">
      <FaFilePdf className="text-xl" />
    </div>
  );
}

function FileViewerSkeleton() {
  return (
    <Skeleton className="rounded-lg w-[12.75rem] h-[12.75rem] dark:bg-achromatic-lighter" />
  );
}

function ErrorDisplay() {
  return (
    <div className="w-full h-full center border border-achromatic-dark dark:border-achromatic-lighter rounded-lg">
      <div className="flex flex-col justify-center items-center gap-2">
        <MdError className="text-5xl" />
        <p className="font-semibold">Could not load PDF</p>
      </div>
    </div>
  );
}

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

type FileType = 'image' | 'pdf' | 'other';

export type FileConfig = {
  file?: string;
  fileType: FileType;
  placeholder?: ReactNode;
};

type Props = {
  files: FileConfig[];
  initial?: number;
  onChange?: (
    file: File | undefined,
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  onDelete?: (index: number, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
};

export function FileListViewer({ files, initial, onChange, onDelete, className }: Props) {
  const [currentFileIndex, setCurrent] = useState<number>(initial ?? 0);
  const currentConfig = files[currentFileIndex];
  const inputId = useId();

  const handleChange = (index: number) => {
    setCurrent(index);
  };

  return (
    <div className={cn('w-[12.75rem] space-y-2', className)}>
      <div className="relative rounded-lg w-[12.75rem] h-[12.75rem] overflow-hidden group">
        {currentConfig.fileType === 'image' && (
          <img src={currentConfig.file} alt="pic1" className="rounded-lg w-[12.75rem] h-[12.75rem] object-cover" />
        )}

        {currentConfig.fileType === 'pdf' && (
          <Document file={currentConfig.file} className="rounded-lg w-[12.75rem] h-[12.75rem] overflow-hidden [&>div]:h-full" loading={FileViewerSkeleton} error={<ErrorDisplay />}>
            <Page pageIndex={0} height={16 * 12.75} className="center" loading={FileViewerSkeleton} error={<ErrorDisplay />} />
          </Document>
        )}

        {(onChange || onDelete) && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4 rounded-lg px-4 py-3 bg-primary-dark dark:bg-achromatic-dark text-achromatic-lighter opacity-0 group-hover:opacity-100 transition-opacity">
            {onChange && (
              <label htmlFor={inputId} className="flex justify-start items-center gap-2 cursor-pointer hover:opacity-50">
                <input
                  id={inputId}
                  aria-label="picture"
                  className="hidden"
                  type="file"
                  onChange={(event) => onChange(event.target.files?.[0], currentFileIndex, event)}
                />
                <span className="text-lg"><MdModeEdit /></span>
              </label>
            )}

            {onDelete && (
              <Button
                variant="ghost"
                className="p-0 gap-2 font-normal text-base"
                onClick={(event) => onDelete(currentFileIndex, event)}
              >
                <FaTrashAlt />
              </Button>
            )}
          </div>
        )}
      </div>

      <div className="flex gap-1 flex-wrap">
        {files.map((config, index) => (
          <Button
            key={config.file}
            type="submit"
            variant="ghost"
            className={cn('rounded-lg p-0 overflow-hidden flex-shrink-0 bg-achromatic-lighter', currentFileIndex === index && 'opacity-50')}
            onMouseEnter={() => handleChange(index)}
            onClick={() => handleChange(index)}
          >
            {config.fileType === 'image' && (
              <img src={config.file} alt={`file-${index}`} className="w-12 h-12" />
            )}

            {config.fileType === 'pdf' && (
              <Document file={config.file} className="w-[3rem] h-[3rem] overflow-hidden [&>div]:h-full" error={<PDFLogo />} loading="">
                <Thumbnail pageIndex={0} height={48} className="center" error={<PDFLogo />} loading="" />
              </Document>
            )}
          </Button>
        ))}
      </div>
    </div>
  );
}
