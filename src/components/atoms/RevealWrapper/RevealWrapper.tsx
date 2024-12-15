import { ReactNode, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import './RevealWrapper.scss';
import useJYStore from '../../../store/useJYStore';

interface RevealWrapperProps {
  children: ReactNode;
  width?: string;
  isInView: boolean;
  containerClassName?: string;
  extraMargin?: boolean;
}

const RevealWrapper = ({
  children,
  width = 'fit-content',
  isInView,
  containerClassName = '',
  extraMargin = false,
}: RevealWrapperProps) => {
  // This should only update and cause a rerender when one of the nav menu items is clicked.
  // So relying on this to pause animations should only help.
  const isScrolling = useJYStore((state) => state.isScrolling);

  const mainControls = useAnimation();
  const slideControls = useAnimation();

  useEffect(() => {
    // TODO check to make sure that we want to wait until we're done scrolling to reveal everything.
    // If that doesn't look great, remove the isScrolling check.
    const startAnimation = async () => {
      if (isInView) {
        await slideControls.start('grow');
        if (!isScrolling) {
          mainControls.start('visible');
          slideControls.start('visible');
        }
      }
    };

    startAnimation();
  }, [isScrolling, isInView, mainControls, slideControls]);

  const duration = 0.15 + Math.random() * 0.15;

  const mainVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const slideVariants = {
    hidden: { width: 0 },
    grow: { width: '100%', transition: { duration, ease: 'easeIn' } },
    visible: {
      left: '100%',
      transition: { duration, ease: 'easeOut', delay: 0.1 },
    },
  };

  return (
    <div
      style={{ width }}
      className={`reveal-wrapper-container ${
        extraMargin ? 'reveal-wrapper-extra-margin' : ''
      } ${containerClassName}`}
    >
      <motion.div
        initial="hidden"
        animate={mainControls}
        variants={mainVariants}
      >
        {children}
      </motion.div>
      <motion.div
        variants={slideVariants}
        initial="hidden"
        animate={slideControls}
        className="reveal-wrapper-slide"
      />
    </div>
  );
};

export default RevealWrapper;
