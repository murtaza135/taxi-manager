import { useId, useState } from 'react';
import { Document, Page, Thumbnail, pdfjs } from 'react-pdf';
import { MdModeEdit } from 'react-icons/md';
import { FaTrashAlt } from 'react-icons/fa';
import { Button } from '@/ui/Button';
import { cn } from '@/utils/cn';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { Image, ImageView, ImageLoading, ImageError } from '@/ui/Image';
import { FileLoadingDisplay, FileErrorDisplay, ImageLogo, PDFLogo } from '@/ui/files/FileView';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

type FileType = 'image' | 'pdf' | 'other';

export type FileConfig = {
  file?: string;
  fileType: FileType;
  accept?: string;
};

type Props = {
  files: FileConfig[];
  initial?: number;
  onChange?: (
    file: File | undefined,
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  onDelete?: (
    index: number,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  className?: string;
};

export function FileListViewer({ files, initial, onChange, onDelete, className }: Props) {
  const inputId = useId();
  const [currentFileIndex, setCurrent] = useState<number>(initial ?? 0);
  const currentConfig = files[currentFileIndex];

  const handleChange = (index: number) => {
    setCurrent(index);
  };

  return (
    <div className={cn('w-[12.75rem] space-y-2', className)}>
      <div className="relative rounded-lg w-[12.75rem] h-[12.75rem] overflow-hidden group">
        {/* image view */}
        {currentConfig.fileType === 'image' && (
          <Image className="rounded-lg w-[12.75rem] h-[12.75rem] overflow-hidden">
            <ImageView
              src={currentConfig.file}
              alt="current"
              className="object-cover"
            />
            <ImageLoading><FileLoadingDisplay /></ImageLoading>
            <ImageError><FileErrorDisplay message="Could not load image" /></ImageError>
          </Image>
        )}

        {/* PDF view */}
        {currentConfig.fileType === 'pdf' && (
          <Document
            file={currentConfig.file}
            className="rounded-lg w-[12.75rem] h-[12.75rem] overflow-hidden [&>div]:h-full"
            loading={<FileLoadingDisplay />}
            error={<FileErrorDisplay message="Could not load PDF" />}
          >
            <Page
              pageIndex={0}
              height={16 * 12.75}
              className="center h-full"
              loading={<FileLoadingDisplay />}
              error={<FileErrorDisplay message="Could not load PDF" />}
            />
          </Document>
        )}

        {/* change and delete buttons for view */}
        {(onChange || onDelete) && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4 rounded-lg px-4 py-3 bg-primary-dark dark:bg-achromatic-dark text-achromatic-lighter opacity-0 group-hover:opacity-100 transition-opacity">
            {onChange && (
              <label htmlFor={inputId} className="flex justify-start items-center gap-2 cursor-pointer hover:opacity-50">
                <input
                  id={inputId}
                  aria-label="picture"
                  className="hidden"
                  type="file"
                  accept={currentConfig.accept ?? 'image/*,.pdf'}
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

      {/* small gallery */}
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
            {/* images */}
            {config.fileType === 'image' && (
              <Image className="rounded-lg w-12 h-12 overflow-hidden">
                <ImageView
                  src={config.file}
                  alt={`file-${index}`}
                  className="object-cover"
                />
                <ImageError><ImageLogo /></ImageError>
              </Image>
            )}

            {/* PDFs */}
            {config.fileType === 'pdf' && (
              <Document
                file={config.file}
                className="w-[3rem] h-[3rem] overflow-hidden [&>div]:h-full"
                loading=""
                error={<PDFLogo />}
              >
                <Thumbnail
                  pageIndex={0}
                  height={48}
                  scale={0.8}
                  className="center h-full"
                  loading=""
                  error={<PDFLogo />}
                />
              </Document>
            )}
          </Button>
        ))}
      </div>
    </div>
  );
}
