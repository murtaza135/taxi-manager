import { useNavigate } from 'react-router-dom';
import { ReactElement } from 'react';
import { Button } from '@/ui/Button';

type Props = {
  image: ReactElement<HTMLImageElement>;
  title: string;
  description: string;
  description2?: string;
};

export function ErrorComponent({ image, title, description, description2 }: Props) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center gap-4 text-center">
      {image}

      <div className="space-y-2">
        <h1 className="text-3xl text-primary-dark dark:text-primary-light">{title}</h1>
        <div>
          <p>{description}</p>
          {description2 && <p>{description2}</p>}
        </div>
      </div>

      <div className="flex gap-3 flex-wrap justify-center pt-3">
        <Button variant="primary" onClick={() => navigate(-1)}>Go Back</Button>
        <Button variant="primary" onClick={() => navigate('/')}>Go Home</Button>
      </div>
    </div>
  );
}
