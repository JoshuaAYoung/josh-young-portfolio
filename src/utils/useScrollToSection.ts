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
  // TODO change 90 for smaller breakpoints based on the section padding
  const stickyHeaderVariable =
    ((belowSm ? STICKY_HEADER_HEIGHT_MEDIUM : STICKY_HEADER_HEIGHT_LARGE) -
      90) *
    -1;

  const scrollToSection = (
    ref: RefObject,
    activeSectionIndex: number,
    offset?: number,
  ): void => {
    if (!ref.current) return;

    const { offsetTop } = ref.current;
    const targetPosition = offsetTop + (offset || stickyHeaderVariable);
    const currentScrollY = window.scrollY;

    if (currentAnimation) {
      currentAnimation.stop();
    }

    setIsScrolling(true);

    const distance = Math.abs(targetPosition - currentScrollY);
    const baseDuration = 0.2;
    // This is only calculated once for every nav item click, and window.scrollY was already a req'd dep,
    // so these calcs shouldn't be too much of a performance hit.
    const duration = Math.min(baseDuration + distance / 10000, 1.5); // Cap at 1.5s for very long scrolls

    currentAnimation = animate(currentScrollY, targetPosition, {
      ease: [0.25, 0.1, 0.25, 1],
      duration,
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

    // Listen for interruptions
    window.addEventListener('wheel', handleWheel);

    setActiveSection(PAGE_SECTIONS[activeSectionIndex]);
  };

  return {
    scrollToSection,
  };
};
