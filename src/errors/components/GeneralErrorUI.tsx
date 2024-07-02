import { useNavigate, useRevalidator, useRouteError } from 'react-router-dom';
import { FaTriangleExclamation } from 'react-icons/fa6';
import { ErrorContainer, ErrorIcon, ErrorTitle, ErrorMessage, ErrorButtons } from '@/ui/Error';
import { Button } from '@/ui/Button';
import { AppError } from '@/errors/AppError';

const defaultErrorData = {
  title: 'Oops! Something went wrong!',
  description: 'Looks like things didn\'t go as planned. Maybe you would like to retry?',
};

export function GeneralErrorUI() {
  const navigate = useNavigate();
  const { revalidate } = useRevalidator();
  const error = useRouteError();

  const errorData = error instanceof AppError
    ? { title: error.title, description: error.description }
    : defaultErrorData;

  return (
    <ErrorContainer>
      <ErrorIcon icon={<FaTriangleExclamation />} color="danger" className="pb-2" />
      <div className="space-y-2">
        <ErrorTitle className="text-2xl">{errorData.title}</ErrorTitle>
        <ErrorMessage>{errorData.description}</ErrorMessage>
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
