import { useCallback, useEffect, useMemo, useState } from 'react';
import { throttle } from 'lodash-es';
import {
  motion,
  useAnimation,
  useMotionValueEvent,
  useScroll,
} from 'motion/react';
import './ScrollProgressIndicator.scss';
import Arrow from '../../../assets/icons/arrow.svg?react';
import { useScrollToSection } from '../../../globalUtils/useScrollToSection';
import useJYStore from '../../../store/useJYStore';
import { PAGE_SECTIONS } from '../../../constants/navigation';
import {
  arrowsVariant,
  arrowVariants,
  pathLengthVariants,
} from './scrollProgressIndicatorAnimations';
import { breakpoints } from '../../../constants/breakpoints';
import useMediaQuery from '../../../globalUtils/useMediaQuery';

const ScrollProgressIndicator = ({
  fadeDuration,
}: {
  fadeDuration?: number;
}) => {
  // HOOK(S)
  const { scrollYProgress } = useScroll();
  const pathLengthControls = useAnimation();
  const arrowControls = useAnimation();
  const { scrollToSection } = useScrollToSection();
  const maxSmWidth = useMediaQuery(`(max-width: ${breakpoints['max-small']})`);
  const minLgWidth = useMediaQuery(`(min-width: ${breakpoints['min-large']})`);

  // STATE
  const [isScrolledToTop, setIsScrolledToTop] = useState<boolean>(true);
  const [isScrolledToBottom, setIsScrollToBottom] = useState<boolean>(false);
  const sectionRefs = useJYStore((state) => state.sectionRefs);

  // COMPUTED VAR(S)
  // handle the indicator overlapping the footer content
  const bottomOffset = useMemo(() => {
    if (isScrolledToBottom && maxSmWidth) {
      return '170px';
    }
    if (isScrolledToBottom && minLgWidth) {
      return '130px';
    }
    if (isScrolledToBottom) {
      return '100px';
    }
    return '20px';
  }, [isScrolledToBottom, maxSmWidth, minLgWidth]);

  // FUNCTION(S)
  // use this to handle the "barely scrolled" state
  const throttledUpdate = useMemo(
    () =>
      throttle((latest: number) => {
        if (latest > 0.02) {
          setIsScrolledToTop(false);

          if (latest >= 0.99) {
            setIsScrollToBottom(true);
          } else {
            setIsScrollToBottom(false);
          }
        } else {
          setIsScrolledToTop(true);
        }
      }, 100),
    [],
  );

  const handleScrollToTop = useCallback(() => {
    const homeKey = 'Home';
    const homeIndex = PAGE_SECTIONS.findIndex((section) => section === homeKey);
    scrollToSection(sectionRefs[homeKey], homeIndex);
  }, [scrollToSection, sectionRefs]);

  const handleScrollToAbout = useCallback(() => {
    const aboutKey = 'About';
    const aboutIndex = PAGE_SECTIONS.findIndex(
      (section) => section === aboutKey,
    );
    scrollToSection(sectionRefs[aboutKey], aboutIndex);
  }, [scrollToSection, sectionRefs]);

  useMotionValueEvent(scrollYProgress, 'change', throttledUpdate);

  // EFFECT(S)
  useEffect(() => {
    if (isScrolledToTop) {
      arrowControls.start('arrowDrop');
      arrowControls.start('arrowFlipBack');
      pathLengthControls.start('transitionToTop');
    } else {
      arrowControls.start('arrowFlip');
      pathLengthControls.start('transitionToScroll');
    }
  }, [arrowControls, pathLengthControls, isScrolledToTop]);

  return (
    <motion.div
      className="scroll-progress-indicator-container"
      initial={{ opacity: 0, bottom: '20px' }}
      animate={{
        opacity: [0, 0, 1],
        bottom: bottomOffset,
      }}
      transition={{
        opacity: {
          duration: fadeDuration,
          ease: 'easeInOut',
          times: [0, 0.5, 1],
        },
        bottom: {
          duration: 0.1,
        },
      }}
    >
      <div className="scroll-progress-indicator-content">
        <button
          className="scroll-top-button"
          onClick={isScrolledToTop ? handleScrollToAbout : handleScrollToTop}
          type="button"
          aria-label={
            isScrolledToTop ? 'Scroll to About section' : 'Scroll to Top'
          }
        >
          <svg
            viewBox="0 0 50 50"
            className="scroll-progress-circle-svg-container"
          >
            <motion.circle
              cx="25"
              cy="25"
              r="20"
              variants={pathLengthVariants}
              className="scroll-progress-indicator-circle"
              animate={pathLengthControls}
            />
            {!isScrolledToTop && (
              <motion.circle
                cx="25"
                cy="25"
                r="20"
                style={{ pathLength: scrollYProgress }}
                className="scroll-progress-indicator-circle"
              />
            )}
          </svg>
          <motion.div
            variants={arrowsVariant}
            initial="initial"
            animate={arrowControls}
            className="scroll-arrows"
          >
            <motion.div
              className="scroll-arrow arrow-first"
              variants={arrowVariants}
            >
              <Arrow />
            </motion.div>
            {isScrolledToTop && (
              <motion.div
                className="scroll-arrow arrow-second"
                variants={arrowVariants}
              >
                <Arrow />
              </motion.div>
            )}
          </motion.div>
        </button>
      </div>
    </motion.div>
  );
};

export default ScrollProgressIndicator;
