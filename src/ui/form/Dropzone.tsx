import { useCallback, useId, useState } from 'react';
import { useDropzone, DropzoneOptions, DropEvent } from 'react-dropzone';
import { FiUpload, FiZoomIn, FiZoomOut } from 'react-icons/fi';
import { FaTrashAlt } from 'react-icons/fa';
import { FaCloudArrowUp, FaFileLines } from 'react-icons/fa6';
import { MdError } from 'react-icons/md';
import { Document, Page, pdfjs } from 'react-pdf';
import { Button, buttonVariants } from '@/ui/Button';
import { cn } from '@/utils/cn';
import { useFileToSrc } from '@/hooks/useFileToSrc';
import { Image, ImageView, ImageLoading, ImageError, ImageFallback, ImageOptions } from '@/ui/Image';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

type DragTextProps = {
  isDragActive: boolean;
};

function DragText({ isDragActive }: DragTextProps) {
  const text = !isDragActive
    ? 'Drag and drop the files here'
    : 'Drop your file here';

  return (
    <div className="center">
      <p>{text}</p>
      <p className="text-sm text-achromatic-700 dark:text-achromatic-400">or</p>
    </div>
  );
}

type DropzonePreDropProps = {
  isDragActive: boolean;
  inputId: string;
};

function DropzonePreDrop({ isDragActive, inputId }: DropzonePreDropProps) {
  return (
    <div className={cn('border border-transparent dark:border-transparent rounded-lg w-full h-full flex flex-col justify-center items-center gap-2 px-3 py-2 overflow-hidden', isDragActive && 'border-primary-dark dark:border-primary-light')}>
      <FaCloudArrowUp className="text-4xl" />
      <DragText isDragActive={isDragActive} />
      <label htmlFor={inputId} className={buttonVariants({ className: 'flex items-center gap-2 cursor-pointer' })}>
        <FiUpload className="text-base" />
        <span>Click to Upload</span>
      </label>
    </div>
  );
}

type DropzoneImageProps = {
  file: File;
  inputId: string;
  onReset: () => void;
  isDragActive: boolean;
};

function DropzoneFileView({ file, inputId, onReset, isDragActive }: DropzoneImageProps) {
  const [zoom, setZoom] = useState<boolean>(true);
  const { src, revoke } = useFileToSrc(file);

  if (file.type === 'application/pdf') {
    return (
      <div className="relative group w-full h-full">
        <Document
          file={file}
          className="w-full min-h-40 max-h-60 overflow-y-auto scrollbar-thin scrollbar-track-achromatic-lighter scrollbar-corner-primary-dark scrollbar-thumb-primary-dark dark:scrollbar-track-achromatic-dark dark:scrollbar-corner-achromatic-dark dark:scrollbar-thumb-primary-light"
          onLoad={() => revoke()}
          loading={<DropzonePreDrop isDragActive={isDragActive} inputId={inputId} />}
          error={(
            <div className="flex flex-col justify-center items-center gap-2 h-full">
              <MdError className="text-5xl" />
              <p>Something went wrong</p>
            </div>
          )}
          noData={(
            <div className="flex flex-col justify-center items-center gap-2 h-full">
              <FaFileLines className="text-4xl" />
              {file && <p>{file.name}</p>}
            </div>
          )}
        >
          <Page
            pageIndex={0}
            scale={0.8}
            width={430}
            className="flex justify-center items-center w-full h-[30rem] overflow-hidden"
            loading={<DropzonePreDrop isDragActive={isDragActive} inputId={inputId} />}
            error={(
              <div className="flex flex-col justify-center items-center gap-2 h-full">
                <MdError className="text-5xl" />
                <p>Something went wrong</p>
              </div>
            )}
            noData={(
              <div className="flex flex-col justify-center items-center gap-2 h-full">
                <FaFileLines className="text-4xl" />
                {file && <p>{file.name}</p>}
              </div>
            )}
          />
        </Document>
        <span
          className={cn('absolute z-20 bottom-2 left-1/2 -translate-x-1/2 flex gap-4 rounded-lg px-4 py-2 bg-primary-dark dark:bg-achromatic-dark dark:border dark:border-achromatic-darker text-achromatic-lighter opacity-100 group-hover:opacity-100 transition-opacity')}
        >
          <label
            htmlFor={inputId}
            aria-label="New Upload"
            className={buttonVariants({ variant: 'ghost', className: '!p-0 cursor-pointer' })}
          >
            <FiUpload className="text-xl" />
          </label>
          <Button
            type="button"
            variant="ghost"
            className="p-0"
            aria-label="Reset"
            onClick={onReset}
          >
            <FaTrashAlt className="text-lg" />
          </Button>
        </span>
      </div>
    );
  }

  return (
    <Image className="w-full h-full overflow-hidden">
      <ImageView
        src={src}
        alt="current file"
        className={cn(zoom ? 'object-cover' : 'object-contain')}
        onLoad={() => revoke()}
      />
      <ImageOptions>
        <label
          htmlFor={inputId}
          aria-label="New Upload"
          className={buttonVariants({ variant: 'ghost', className: '!p-0 cursor-pointer' })}
        >
          <FiUpload className="text-xl" />
        </label>
        <Button
          type="button"
          variant="ghost"
          className="p-0"
          aria-label="Reset"
          onClick={onReset}
        >
          <FaTrashAlt className="text-lg" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          className="p-0"
          aria-label="Zoom"
          onClick={() => setZoom((prev) => !prev)}
        >
          {!zoom
            ? <FiZoomIn className="text-xl" />
            : <FiZoomOut className="text-xl" />}
        </Button>
      </ImageOptions>
      <ImageFallback className="flex flex-col justify-center items-center gap-2">
        <FaFileLines className="text-4xl" />
        {file && <p>{file.name}</p>}
      </ImageFallback>
      <ImageLoading>
        <DropzonePreDrop isDragActive={isDragActive} inputId={inputId} />
      </ImageLoading>
      <ImageError className="flex flex-col justify-center items-center gap-2">
        <MdError className="text-5xl" />
        <p>Something went wrong</p>
      </ImageError>
    </Image>
  );
}

type OnDrop = NonNullable<DropzoneOptions['onDrop']>;
type OnChange = <T extends File>(
  acceptedFile: T | undefined,
  event: DropEvent,
) => void;

type DropzoneProps = Omit<
  DropzoneOptions,
  'maxFiles' | 'multiple' | 'noClick' | 'onDrop' | 'onDropAccepted' | 'onDropRejected'
> & {
  defaultValue?: File;
  onChange?: OnChange;
  onReset?: () => void;
};

export function Dropzone({ defaultValue, onChange, onReset, ...rest }: DropzoneProps) {
  const inputId = useId();

  // this is dumb, but react-dropzone does not let me manually change files
  // so I have store separate state for files
  const [file, setFile] = useState<File | undefined>(defaultValue);

  const handleDrop = useCallback<OnDrop>((acceptedFiles, _fileRejections, event) => {
    const acceptedFile = acceptedFiles[0] as File | undefined;

    if (acceptedFile) {
      setFile(acceptedFile);
      onChange?.(acceptedFile, event);
    }
  }, [onChange]);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    inputRef,
  } = useDropzone({ ...rest, noClick: true, onDrop: handleDrop });

  const handleReset = useCallback<() => void>(() => {
    if (inputRef.current) {
      inputRef.current.files = null;
      inputRef.current.value = '';
    }
    setFile(undefined);
    onReset?.();
  }, [onReset, inputRef]);

  return (
    <div {...getRootProps()} className={cn('overflow-hidden border border-dashed border-primary-dark dark:border-primary-light rounded-lg p-2 center w-full min-h-40 max-h-60', isDragActive && 'border-solid', file && 'border-solid p-0')}>
      <input id={inputId} {...getInputProps()} />

      {file
        ? (
          <DropzoneFileView
            file={file}
            inputId={inputId}
            onReset={handleReset}
            isDragActive={isDragActive}
          />
        )
        : (
          <DropzonePreDrop isDragActive={isDragActive} inputId={inputId} />
        )}
    </div>
  );
}
