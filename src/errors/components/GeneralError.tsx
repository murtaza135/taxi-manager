import { useNavigate, useRevalidator } from 'react-router-dom';
import { ErrorContainer, ErrorImage, ErrorTitle, ErrorMessage, ErrorButtons } from '@/ui/Error';
import { Button } from '@/ui/Button';
import { useIsDarkmode } from '@/features/darkmode/state/darkmodeStore';
import generalErrorLightImage from '@/assets/images/bug-fixing-light.svg';
import generalErrorDarkImage from '@/assets/images/bug-fixing-dark.svg';

export function GeneralError() {
  const isDarkMode = useIsDarkmode();
  const navigate = useNavigate();
  const { revalidate } = useRevalidator();

  return (
    <ErrorContainer>
      <ErrorImage
        src={isDarkMode ? generalErrorLightImage : generalErrorDarkImage}
        alt="Bug Fixing"
        className="max-w-60"
      />
      <div className="space-y-2">
        <ErrorTitle>Oops</ErrorTitle>
        <ErrorMessage>Something went wrong!</ErrorMessage>
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
