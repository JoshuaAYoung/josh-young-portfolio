import { Variants } from 'motion/react';

export const menuVariants: Variants = {
  hidden: {
    scale: 0,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
  visible: {
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 150,
      damping: 17,
    },
  },
};

export const listVariants: Variants = {
  hidden: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
};
