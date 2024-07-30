import { useNavigate, useRevalidator, useRouteError } from 'react-router-dom';
import { FaTriangleExclamation } from 'react-icons/fa6';
import { useEffect } from 'react';
import { ErrorContainer, ErrorIcon, ErrorTitle, ErrorMessage, ErrorButtons } from '@/ui/Error';
import { Button } from '@/ui/Button';
import { AppError } from '@/errors/classes/AppError';
import { errorTitles, errorDescriptions } from '@/errors/errorMessages';
import { config } from '@/config/config';

const defaultErrorData = {
  title: errorTitles.unknown,
  description: errorDescriptions.unknown,
};

export function GeneralErrorUI() {
  const navigate = useNavigate();
  const { revalidate } = useRevalidator();
  const error = useRouteError();

  useEffect(() => {
    if (!config.env.PROD) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }, [error]);

  const { title, description } = error instanceof AppError
    ? error
    : defaultErrorData;

  return (
    <ErrorContainer>
      <ErrorIcon icon={<FaTriangleExclamation />} color="danger" className="pb-2" />
      <div className="space-y-2">
        <ErrorTitle className="text-2xl">{title}</ErrorTitle>
        <ErrorMessage>{description}</ErrorMessage>
      </div>
      <ErrorButtons>
        <Button
          variant="outline"
          className="text-primary-dark dark:text-primary-light"
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
        <Button variant="primary" onClick={() => revalidate()}>Retry</Button>
      </ErrorButtons>
    </ErrorContainer>
  );
}
