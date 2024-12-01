import { animate } from 'framer-motion';
import { NAVBAR_HEIGHT } from '../constants/navigation';

interface RefObject {
  current: {
    offsetTop: number;
  } | null;
}

let currentAnimation: ReturnType<typeof animate> | null = null;

export const scrollToSection = (
  ref: RefObject,
  setIsScrolling: (isScrolling: boolean) => void,
  offset?: number,
): void => {
  if (ref.current) {
    const { offsetTop } = ref.current;
    const targetPosition = offsetTop + (offset || NAVBAR_HEIGHT * -1);

    if (currentAnimation) {
      currentAnimation.stop();
    }

    setIsScrolling(true);

    currentAnimation = animate(window.scrollY, targetPosition, {
      type: 'spring',
      stiffness: 100,
      damping: 20,
      onUpdate: (latest: number) => window.scrollTo(0, latest),
      onComplete: () => {
        currentAnimation = null;
        setIsScrolling(false);
      },
    });

    const handleWheel = () => {
      if (currentAnimation) {
        currentAnimation.stop();
        currentAnimation = null;
        setIsScrolling(false);
      }
      window.removeEventListener('wheel', handleWheel);
    };

    window.addEventListener('wheel', handleWheel);
  }
};
