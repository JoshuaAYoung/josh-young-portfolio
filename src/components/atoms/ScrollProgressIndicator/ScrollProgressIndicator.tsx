import { useCallback, useEffect, useMemo, useState } from 'react';
import { throttle } from 'lodash-es';
import {
  motion,
  useAnimation,
  useMotionValueEvent,
  useScroll,
} from 'framer-motion';
import './ScrollProgressIndicator.scss';
import Arrow from '../../../assets/icons/arrow.svg?react';
import { useScrollToSection } from '../../../utils/useScrollToSection';
import useJYStore from '../../../store/useJYStore';
import { PAGE_SECTIONS } from '../../../constants/navigation';
import { arrowsVariant, arrowVariants, pathLengthVariants } from './Animations';

const ScrollProgressIndicator: React.FC = () => {
  // HOOK(S)
  const { scrollYProgress } = useScroll();
  const pathLengthControls = useAnimation();
  const arrowControls = useAnimation();
  const { scrollToSection } = useScrollToSection();

  // STATE
  const [throttledScrollYProgress, setThrottledScrollYProgress] =
    useState<number>(0);
  const sectionRefs = useJYStore((state) => state.sectionRefs);

  // FUNCTION(S)
  const throttledUpdate = useMemo(
    () =>
      throttle((latest: number) => {
        setThrottledScrollYProgress(latest);
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

  // COMPUTED VAR(S)
  const scrolledToTop = useMemo(
    () => throttledScrollYProgress < 0.02,
    [throttledScrollYProgress],
  );

  // EFFECT(S)
  useEffect(() => {
    if (scrolledToTop) {
      arrowControls.start('arrowDrop');
      arrowControls.start('arrowFlipBack');
      pathLengthControls.start('transitionToTop');
    } else {
      arrowControls.start('arrowFlip');
      pathLengthControls.start('transitionToScroll');
    }
  }, [arrowControls, pathLengthControls, scrolledToTop]);

  return (
    <div className="scroll-progress-indicator-container">
      <div className="scroll-progress-indicator-content">
        <button
          className="scroll-top-button"
          onClick={scrolledToTop ? handleScrollToAbout : handleScrollToTop}
          type="button"
          aria-label={
            scrolledToTop ? 'Scroll to About section' : 'Scroll to Top'
          }
        />
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
          {!scrolledToTop && (
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
          {scrolledToTop && (
            <motion.div
              className="scroll-arrow arrow-second"
              variants={arrowVariants}
            >
              <Arrow />
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ScrollProgressIndicator;
