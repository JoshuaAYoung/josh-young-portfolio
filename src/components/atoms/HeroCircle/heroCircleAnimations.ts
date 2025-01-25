import { Variants } from 'framer-motion';

export const useGetAnimations = () => {
  const circleContainerVariants: Variants = {
    initial: {},
    flingPeriod: { transition: { delayChildren: 0.2, staggerChildren: 0.25 } },
  };

  const circleVariants: Variants = {
    initial: { opacity: 1, visibility: 'hidden' },
    flingPeriod: {
      opacity: 0,
      visibility: 'visible',
      transition: {
        duration: 1.5,
        ease: 'easeOut',
      },
    },
  };

  return {
    circleContainerVariants,
    circleVariants,
  };
};
