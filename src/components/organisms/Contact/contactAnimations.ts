import { Variants } from 'motion/react';

export const getContactRevealVariants = (index: number): Variants => {
  return {
    hidden: { opacity: 0, y: 50 },
    reveal: {
      opacity: 1,
      y: 0,
      transition: {
        y: {
          duration: 0.4,
          // +3 gives a nice initial delay for the user to scroll section into view
          delay: (index + 3) * 0.2,
          ease: 'easeOut',
        },
        opacity: {
          duration: 0.8,
          // +3 gives a nice initial delay for the user to scroll section into view
          delay: (index + 3) * 0.2,
          ease: 'easeIn',
        },
      },
    },
  };
};
