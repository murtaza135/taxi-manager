import { FaFilePdf, FaFileImage, FaFileLines } from 'react-icons/fa6';
import { MdError } from 'react-icons/md';

export function FileLoadingDisplay() {
  return (
    <div className="rounded-lg w-[12.75rem] h-[12.75rem] dark:bg-achromatic-lighter" />
  );
}

type FileErrorDisplayProps = {
  message?: string;
};

export function FileErrorDisplay({ message }: FileErrorDisplayProps) {
  return (
    <div className="w-full h-full center border border-achromatic-dark dark:border-achromatic-lighter rounded-lg">
      <div className="flex flex-col justify-center items-center gap-2">
        <MdError className="text-5xl" />
        <p className="font-semibold">{message ?? 'Could not load file'}</p>
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
