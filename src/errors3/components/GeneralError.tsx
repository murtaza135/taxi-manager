import { useNavigate, useRevalidator } from 'react-router-dom';
import { FaTriangleExclamation } from 'react-icons/fa6';
import { ErrorContainer, ErrorIcon, ErrorTitle, ErrorMessage, ErrorButtons } from '@/ui/Error';
import { Button } from '@/ui/Button';

export function GeneralError() {
  const navigate = useNavigate();
  const { revalidate } = useRevalidator();

  return (
    <ErrorContainer>
      <ErrorIcon icon={<FaTriangleExclamation />} color="danger" className="pb-2" />
      <div className="space-y-2">
        <ErrorTitle className="text-2xl">Oops! Something went wrong!</ErrorTitle>
        <ErrorMessage>
          Looks like things didn&apos;t go as planned. Maybe you would like to retry?
        </ErrorMessage>
      </div>
      <ErrorButtons>
        <Button
          variant="outline"
          className="text-primary-dark dark:text-primary-light"
          onClick={() => navigate('/')}
        >
          Go Home
        </Button>
        <Button variant="primary" onClick={() => revalidate()}>Retry</Button>
      </ErrorButtons>
    </ErrorContainer>
  );
}
