import { FaArrowUp } from 'react-icons/fa6';
import { Button } from '@/ui/Button';
import { useIsScrolled } from '@/features/scroll/useIsScrolled';

export function ScrollToTopButton() {
  const { y } = useIsScrolled();

  return y && (
    <Button
      variant="base"
      shape="circle"
      size="md"
      className="text-lg fixed bottom-6 left-auto right-[max(2rem,calc(50%-48rem+2rem))] z-30"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <FaArrowUp />
    </Button>
  );
}
