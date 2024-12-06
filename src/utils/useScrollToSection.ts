import { animate } from 'framer-motion';
import useJYStore from '../store/useJYStore';
import {
  PAGE_SECTIONS,
  STICKY_HEADER_HEIGHT_LARGE,
  STICKY_HEADER_HEIGHT_MEDIUM,
} from '../constants/navigation';
import { breakpoints } from '../constants/breakpoints';
import useMediaQuery from './useMediaQuery';

interface RefObject {
  current: {
    offsetTop: number;
  } | null;
}

let currentAnimation: ReturnType<typeof animate> | null = null;

export const useScrollToSection = () => {
  const belowSm = useMediaQuery(`(max-width: ${breakpoints['max-small']})`);
  const setIsScrolling = useJYStore((state) => state.setIsScrolling);
  const setActiveSection = useJYStore((state) => state.setActiveSection);
  const stickyHeaderVariable =
    (belowSm ? STICKY_HEADER_HEIGHT_MEDIUM : STICKY_HEADER_HEIGHT_LARGE) * -1;

  const scrollToSection = (
    ref: RefObject,
    activeSectionIndex: number,
    offset?: number,
  ): void => {
    if (ref.current) {
      const { offsetTop } = ref.current;
      const targetPosition = offsetTop + (offset || stickyHeaderVariable);
      console.log(ref);
      if (currentAnimation) {
        currentAnimation.stop();
      }

      setIsScrolling(true);

      // Animation settings for the page scroll
      currentAnimation = animate(window.scrollY, targetPosition, {
        type: 'spring',
        stiffness: 120,
        damping: 20,
        onUpdate: (latest: number) => window.scrollTo(0, latest),
        onComplete: () => {
          currentAnimation = null;
          setIsScrolling(false);
          window.removeEventListener('wheel', handleWheel);
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

      setActiveSection(PAGE_SECTIONS[activeSectionIndex]);
    }
  };

  return {
    scrollToSection,
  };
};
