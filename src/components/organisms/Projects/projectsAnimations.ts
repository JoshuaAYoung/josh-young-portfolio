import { Variants } from 'motion/react';

const hoverInTransition = { duration: 0.2, ease: 'easeOut' };

export const projectVariants: Variants = {
  hidden: { opacity: 0, scale: 0, borderRadius: '0px' },
  visible: {
    opacity: 1,
    scale: 1,
    borderRadius: '0px',
    transition: { duration: 0.4 },
  },
  reveal: {
    opacity: 1,
    scale: 1,
    borderRadius: '0px',
    transition: { duration: 1, delay: 1 },
  },
  hoverIn: {
    boxShadow: 'var(--box-shadow-hover)',
    scale: 1.05,
    borderRadius: '20px',
    transition: {
      type: 'spring',
      stiffness: 250,
      damping: 14,
    },
  },
  exit: {
    opacity: 0,
    scale: 0,
    transition: hoverInTransition,
  },
};

export const getProjectRevealVariants = (index: number): Variants => {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
    },
    reveal: {
      opacity: 1,
      transition: {
        duration: 0.8,
        // +3 gives a nice initial delay for the user to scroll section into view
        delay: (index + 3) * 0.1,
        ease: 'easeIn',
      },
    },
  };
};

export const overlayVariants: Variants = {
  visible: { opacity: 0 },
  hoverIn: { opacity: 1, transition: hoverInTransition },
};
