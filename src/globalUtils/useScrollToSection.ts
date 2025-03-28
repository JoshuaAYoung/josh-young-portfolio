import { animate } from 'motion/react';
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
  const maxSmWidth = useMediaQuery(`(max-width: ${breakpoints['max-small']})`);
  const maxMdWidth = useMediaQuery(`(max-width: ${breakpoints['max-medium']})`);
  const maxLgWidth = useMediaQuery(`(max-width: ${breakpoints['max-large']})`);
  const setIsScrolling = useJYStore((state) => state.setIsScrolling);
  const setActiveSection = useJYStore((state) => state.setActiveSection);

  const getSectionPadding = () => {
    if (maxSmWidth) return 40;
    if (maxMdWidth) return 60;
    if (maxLgWidth) return 70;
    return 90;
  };

  const stickyHeaderVariable =
    ((maxSmWidth ? STICKY_HEADER_HEIGHT_MEDIUM : STICKY_HEADER_HEIGHT_LARGE) -
      getSectionPadding()) *
    -1;

  const scrollToSection = (
    ref: RefObject,
    activeSectionIndex: number,
    offset: number = 0,
  ): void => {
    if (!ref.current) return;

    const { offsetTop } = ref.current;

    // for home, disregard offset and scroll to 0 (top)
    const targetPosition =
      activeSectionIndex !== 0
        ? offsetTop + (offset + stickyHeaderVariable)
        : 0;
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
