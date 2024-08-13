import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import { NotFoundErrorUI } from '@/errors/components/NotFoundErrorUI';
import { GeneralErrorUI } from '@/errors/components/GeneralErrorUI';
import { APIError } from '@/errors/classes/APIError';

export function ErrorUI() {
  const error = useRouteError();

  if (isRouteErrorResponse(error) || error instanceof APIError) {
    if (error.status === 404) {
      return <NotFoundErrorUI />;
    }
  }

  return <GeneralErrorUI />;
}
