import { useId, useState } from 'react';
import { Document, Page, Thumbnail, pdfjs } from 'react-pdf';
import { MdModeEdit, MdError } from 'react-icons/md';
import { FaTrashAlt } from 'react-icons/fa';
import { FaFilePdf, FaFileImage, FaFileLines, FaFileCircleExclamation } from 'react-icons/fa6';
import { Button } from '@/ui/Button';
import { cn } from '@/utils/cn';
import { Image, ImageView, ImageLoading, ImageError, ImageFallback } from '@/ui/Image';
import { FileType } from '@/utils/path/extractFileType';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

function FileLoadingDisplay() {
  return (
    <div className="rounded-lg w-[12.75rem] h-[12.75rem] dark:bg-achromatic-lighter" />
  );
}

type OtherFileDisplayProps = {
  filename?: string;
};

function OtherFileDisplay({ filename }: OtherFileDisplayProps) {
  return (
    <div className="w-full h-full center border border-achromatic-dark dark:border-achromatic-lighter rounded-lg">
      <div className="flex flex-col justify-center items-center gap-2">
        <FaFileLines className="text-3xl" />
        {filename && <p className="font-semibold text-sm opacity-70 px-3 w-40 text-center whitespace-nowrap text-ellipsis overflow-hidden">{filename}</p>}
      </div>
    </div>
  );
}

type FileErrorDisplayProps = {
  title?: string;
  message?: string;
};

function FileErrorDisplay({ title, message }: FileErrorDisplayProps) {
  return (
    <div className="w-full h-full center border border-achromatic-dark dark:border-achromatic-lighter rounded-lg">
      <div className="flex flex-col justify-center items-center gap-2">
        <MdError className="text-5xl" />
        <p className="font-semibold">{message ?? 'Could not load file'}</p>
        {title && (
          <p className="font-semibold text-xs opacity-70">{title}</p>
        )}
      </div>
    </div>
  );
}

function ImageLogo() {
  return (
    <div className="w-full h-full center text-primary-dark">
      <FaFileImage className="text-xl" />
    </div>
  );
}

function PDFLogo() {
  return (
    <div className="w-full h-full center text-primary-dark">
      <FaFilePdf className="text-xl" />
    </div>
  );
}

function FileLogo() {
  return (
    <div className="w-full h-full center text-primary-dark">
      <FaFileLines className="text-xl" />
    </div>
  );
}

function NoFileLogo() {
  return (
    <div className="w-full h-full center text-primary-dark">
      <FaFileCircleExclamation className="text-xl" />
    </div>
  );
}

export type FileListViewerOnChangeHandler = (
  file: File | undefined,
  index: number,
  event: React.ChangeEvent<HTMLInputElement>
) => void;

export type FileListViewerOnDeleteHandler = (
  index: number,
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>
) => void;

export type FileConfig = {
  key: string;
  title?: string;
  file?: string;
  fileType: FileType;
  accept?: string;
};

type Props = {
  files: FileConfig[];
  initial?: number;
  onChange?: FileListViewerOnChangeHandler;
  onDelete?: FileListViewerOnDeleteHandler;
  className?: string;
};

function FileListViewer({ files, initial, onChange, onDelete, className }: Props) {
  const inputId = useId();
  const [currentFileIndex, setCurrent] = useState<number>(initial ?? 0);
  const currentConfig = files[currentFileIndex] as FileConfig | undefined;

  const handleChange = (index: number) => {
    setCurrent(index);
  };

  return (
    <div className={cn('w-[12.75rem] space-y-2', className)}>
      <div className="display relative rounded-lg w-[12.75rem] h-[12.75rem] overflow-hidden group">
        {/* no current file provided */}
        {!currentConfig && (
          <OtherFileDisplay />
        )}

        {/* image view */}
        {currentConfig?.fileType === 'image' && (
          <Image className="rounded-lg w-[12.75rem] h-[12.75rem] overflow-hidden">
            <ImageView
              src={currentConfig.file}
              alt="current"
              className="object-cover"
            />
            <ImageLoading><FileLoadingDisplay /></ImageLoading>
            <ImageError>
              <FileErrorDisplay title={currentConfig.title} message="Could not load image" />
            </ImageError>
            <ImageFallback>
              <FileErrorDisplay title={currentConfig.title} message="No image available" />
            </ImageFallback>
          </Image>
        )}

        {/* PDF view */}
        {currentConfig?.fileType === 'pdf' && (
          <Document
            file={currentConfig.file}
            className="rounded-lg w-[12.75rem] h-[12.75rem] overflow-hidden [&>div]:h-full"
            loading={<FileLoadingDisplay />}
            error={<FileErrorDisplay title={currentConfig.title} message="Could not load PDF" />}
            noData={<FileErrorDisplay title={currentConfig.title} message="No PDF available" />}
          >
            <Page
              pageIndex={0}
              height={16 * 12.75}
              scale={0.8}
              className="center h-full"
              loading={<FileLoadingDisplay />}
              error={<FileErrorDisplay title={currentConfig.title} message="Could not load PDF" />}
              noData={<FileErrorDisplay title={currentConfig.title} message="No PDF available" />}
            />
          </Document>
        )}

        {/* view for other file */}
        {currentConfig?.fileType === 'other' && (
          <OtherFileDisplay filename={currentConfig.title} />
        )}

        {/* view for no image or pdf */}
        {currentConfig?.fileType === 'none' && (
          <FileErrorDisplay title={currentConfig.title} message="No file available" />
        )}

        {/* title display */}
        {currentConfig?.title && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 rounded-lg px-3 py-1.5 text-sm font-bold text-nowrap whitespace-nowrap overflow-hidden text-ellipsis max-w-[11.75rem] bg-primary-dark dark:bg-achromatic-dark dark:border dark:border-achromatic-darker text-achromatic-lighter opacity-0 group-hover:opacity-100 transition-opacity">
            {currentConfig.title}
          </div>
        )}

        {/* change and delete buttons for view */}
        {(onChange || onDelete) && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-4 rounded-lg px-4 py-2 bg-primary-dark dark:bg-achromatic-dark dark:border dark:border-achromatic-darker text-achromatic-lighter opacity-0 group-hover:opacity-100 transition-opacity">
            {onChange && (
              <label htmlFor={inputId} className="flex justify-start items-center gap-2 cursor-pointer hover:opacity-50">
                <input
                  id={inputId}
                  aria-label="picture"
                  className="hidden"
                  type="file"
                  accept={currentConfig?.accept ?? 'image/*,.pdf'}
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
      {files.length > 1 && (
        <div className="gallery flex gap-1 flex-wrap">
          {files.map((config, index) => (
            <Button
              key={config.key}
              type="submit"
              variant="ghost"
              className={cn('rounded-lg p-0 overflow-hidden flex-shrink-0 bg-achromatic-lighter border border-solid border-achromatic-darker hover:opacity-100', currentFileIndex !== index && 'opacity-50')}
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
                  <ImageFallback><ImageLogo /></ImageFallback>
                </Image>
              )}

              {/* PDFs */}
              {config.fileType === 'pdf' && (
                <Document
                  file={config.file}
                  className="w-[3rem] h-[3rem] overflow-hidden [&>div]:h-full"
                  loading=""
                  error={<PDFLogo />}
                  noData={<PDFLogo />}
                >
                  <Thumbnail
                    pageIndex={0}
                    height={48}
                    scale={0.8}
                    className="center h-full"
                    loading=""
                    error={<PDFLogo />}
                    noData={<PDFLogo />}
                  />
                </Document>
              )}

              {/* other file */}
              {config.fileType === 'other' && (
                <div className="rounded-lg w-12 h-12 overflow-hidden">
                  <FileLogo />
                </div>
              )}

              {/* no file */}
              {config.fileType === 'none' && (
                <div className="rounded-lg w-12 h-12 overflow-hidden">
                  <NoFileLogo />
                </div>
              )}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}

export { FileListViewer };
