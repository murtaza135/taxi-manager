import { useNavigate } from 'react-router-dom';
import { ErrorContainer, ErrorImage, ErrorTitle, ErrorMessage, ErrorButtons } from '@/ui/Error';
import { Button } from '@/ui/Button';
import { useIsDarkmode } from '@/features/darkmode/state/darkmodeStore';
import notFoundErrorLightImage from '@/assets/images/404-page-not-found-light.svg';
import notFoundErrorDarkImage from '@/assets/images/404-page-not-found-dark.svg';

export function NotFoundError() {
  const isDarkMode = useIsDarkmode();
  const navigate = useNavigate();

  return (
    <ErrorContainer>
      <ErrorImage
        src={isDarkMode ? notFoundErrorLightImage : notFoundErrorDarkImage}
        alt="404 Not Found"
      />
      <ErrorTitle>Page Not Found</ErrorTitle>
      <ErrorMessage>
        We looked everywhere for the page, but we couldn&apos;t find it!
        Are you sure the website URL is correct?
      </ErrorMessage>
      <ErrorButtons>
        <Button
          variant="outline"
          className="text-primary-dark dark:text-primary-light"
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
        <Button variant="primary" onClick={() => navigate('/')}>Go Home</Button>
      </ErrorButtons>
    </ErrorContainer>
  );
}
