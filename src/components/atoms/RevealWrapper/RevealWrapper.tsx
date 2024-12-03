import { ReactNode, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import './RevealWrapper.scss';

interface RevealWrapperProps {
  children: ReactNode;
  width?: string;
  isInView: boolean;
}

const RevealWrapper = ({
  children,
  width = 'fit-content',
  isInView,
}: RevealWrapperProps) => {
  const mainControls = useAnimation();
  const slideControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      slideControls.start('grow').then(() => {
        mainControls.start('visible');
        slideControls.start('visible');
      });
    }
  }, [isInView]);

  const mainVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const slideVariants = {
    hidden: { width: 0 },
    grow: { width: '100%', transition: { duration: 0.3, ease: 'easeOut' } },
    visible: { left: '100%', transition: { duration: 0.3, ease: 'easeIn' } },
  };

  return (
    <div style={{ width }} className="reveal-wrapper-container">
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
