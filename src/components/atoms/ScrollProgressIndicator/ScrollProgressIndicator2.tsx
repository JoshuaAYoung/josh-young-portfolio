import { useEffect, useState } from 'react';
import { throttle } from 'lodash-es';
import {
  motion,
  useAnimation,
  useMotionValueEvent,
  useScroll,
} from 'framer-motion';
import useJYStore from '../../../store/useJYStore';
import './ScrollProgressIndicator2.scss';
import Arrow from '../../../assets/icons/arrow.svg?react';

const ScrollProgressIndicator: React.FC = () => {
  // HOOK(S)
  const { scrollYProgress: scrollyYProgressMotion } = useScroll();
  const pathLengthControls = useAnimation();
  const arrowControls = useAnimation();

  // STATE
  const [throttledScrollYProgress, setThrottledScrollYProgress] =
    useState<number>(0);
  const setScrollYProgress = useJYStore((state) => state.setScrollYProgress);

  // FUNCTION(S)
  // TODO if we decide not to use the line under the sticky header, we can remove
  // scrollYProgress from Zustand state
  const throttledUpdate = throttle((latest: number) => {
    setScrollYProgress(latest);
    setThrottledScrollYProgress(latest);
  }, 100);

  useMotionValueEvent(scrollyYProgressMotion, 'change', throttledUpdate);

  // COMPUTED VAR(S)
  const arrowVariants = {
    initial: { opacity: 0, y: -10, rotate: 0 },
    arrowFlipBack: {
      rotate: 0,
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
    arrowDrop: {
      opacity: [0, 1, 0], // Arrow fades in and out
      y: [-10, 0, 10], // Moves vertically
      transition: {
        duration: 2,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'loop' as const,
      },
    },
    arrowFlip: {
      rotate: 180,
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
  };

  const pathLengthVariants = {
    initial: { pathLength: 1.1 },
    transitionToScroll: {
      pathLength: 0.01,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
    transitionToTop: {
      pathLength: 1.1,
      transition: {
        duration: 0.5,
        ease: 'easeIn',
      },
    },
  };

  const arrowsVariant = {
    arrowDrop: { transition: { staggerChildren: 1 } },
  };

  const scrolledToTop = throttledScrollYProgress < 0.02;

  // EFFECT(S)
  useEffect(() => {
    if (scrolledToTop) {
      arrowControls.start('arrowDrop');
      arrowControls.start('arrowFlipBack');
      pathLengthControls.start('transitionToTop');
    } else {
      // arrowControls.stop();
      arrowControls.start('arrowFlip');
      pathLengthControls.start('transitionToScroll');
    }
  }, [arrowControls, pathLengthControls, scrolledToTop]);

  return (
    <div className="scroll-progress-indicator-container">
      <div className="scroll-progress-indicator-content">
        {/* Animated Circle */}
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
              style={{ pathLength: scrollyYProgressMotion }}
              className="scroll-progress-indicator-circle"
            />
          )}
        </svg>
        {/* {shouldAnimateArrows ? (
          <> */}
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

          <motion.div
            className="scroll-arrow arrow-second"
            variants={arrowVariants}
          >
            <Arrow />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ScrollProgressIndicator;
