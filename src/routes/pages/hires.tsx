import { QueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useDocumentTitle } from '@/features/title/hooks/useDocumentTitle';
import { FileListViewer, FileConfig } from '@/ui/FileListViewer';
import { useTaxiDetails } from '@/features/taxis/general/hooks/useTaxiDetails';

const hiresPageLoader = (_queryClient: QueryClient) => () => null;

function HiresPageSuspenseBoundary() {
  useDocumentTitle('Hires');
  return <div>HiresPageSuspenseBoundary</div>;
}

function HiresPageErrorBoundary() {
  useDocumentTitle('Hires');
  return <div>HiresPageErrorBoundary</div>;
}

function HiresPageComponent() {
  useDocumentTitle('Hires');
  const { data } = useTaxiDetails(11);

  const files: FileConfig[] = useMemo(() => ([
    {
      file: data.picture_src as string,
      fileType: 'image',
    },
    {
      file: data.logbook_document_src as string,
      fileType: 'pdf',
    },
  ]), [data.picture_src, data.logbook_document_src]);

  return (
    // <div>HiresPageComponent</div>
    <FileListViewer files={files} />
  );
}

export const loader = hiresPageLoader;
export const SuspenseBoundary = HiresPageSuspenseBoundary;
export const ErrorBoundary = HiresPageErrorBoundary;
export const Component = HiresPageComponent;
