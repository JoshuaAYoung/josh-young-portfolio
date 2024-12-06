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
import { arrowsVariant, arrowVariants, pathLengthVariants } from './animations';

const ScrollProgressIndicator: React.FC = () => {
  // HOOK(S)
  const { scrollYProgress } = useScroll();
  const pathLengthControls = useAnimation();
  const arrowControls = useAnimation();
  const { scrollToSection } = useScrollToSection();

  // STATE
  const [isScrolledToTop, setIsScrolledToTop] = useState<boolean>(true);
  const sectionRefs = useJYStore((state) => state.sectionRefs);

  // FUNCTION(S)
  // use this to handle the "barely scrolled" state
  const throttledUpdate = useMemo(
    () =>
      throttle((latest: number) => {
        if (latest > 0.02) {
          setIsScrolledToTop(false);
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
    <div className="scroll-progress-indicator-container">
      <div className="scroll-progress-indicator-content">
        <button
          className="scroll-top-button"
          onClick={isScrolledToTop ? handleScrollToAbout : handleScrollToTop}
          type="button"
          aria-label={
            isScrolledToTop ? 'Scroll to About section' : 'Scroll to Top'
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
      </div>
    </div>
  );
};

export default ScrollProgressIndicator;
