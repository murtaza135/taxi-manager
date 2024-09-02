import { FaFilePdf, FaFileImage, FaFileLines, FaFileCircleExclamation } from 'react-icons/fa6';
import { MdError } from 'react-icons/md';

export function FileLoadingDisplay() {
  return (
    <div className="rounded-lg w-[12.75rem] h-[12.75rem] dark:bg-achromatic-lighter" />
  );
}

type OtherFileDisplayProps = {
  filename?: string;
};

export function OtherFileDisplay({ filename }: OtherFileDisplayProps) {
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

export function FileErrorDisplay({ title, message }: FileErrorDisplayProps) {
  return (
    <div className="w-full h-full center border border-achromatic-dark dark:border-achromatic-lighter rounded-lg">
      <div className="flex flex-col justify-center items-center gap-2">
        <MdError className="text-5xl" />
        <p className="font-semibold">{message ?? 'Could not load file'}</p>
        {title && <p className="font-semibold text-xs opacity-70 capitalize">{title}</p>}
      </div>
    </div>
  );
}

export function ImageLogo() {
  return (
    <div className="w-full h-full center text-primary-dark">
      <FaFileImage className="text-xl" />
    </div>
  );
}

export function PDFLogo() {
  return (
    <div className="w-full h-full center text-primary-dark">
      <FaFilePdf className="text-xl" />
    </div>
  );
}

export function FileLogo() {
  return (
    <div className="w-full h-full center text-primary-dark">
      <FaFileLines className="text-xl" />
    </div>
  );
}

export function NoFileLogo() {
  return (
    <div className="w-full h-full center text-primary-dark">
      <FaFileCircleExclamation className="text-xl" />
    </div>
  );
}
