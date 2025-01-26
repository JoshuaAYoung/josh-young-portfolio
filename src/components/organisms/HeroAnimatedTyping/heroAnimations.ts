import { Variants } from 'framer-motion';

export const useGetAnimations = () => {
  const dividerInDuration = 1;

  const helloVariants: Variants = {
    initial: { y: 220, scale: 0.5 },
    // hello pops up and stops
    helloType: {
      y: [220, 160],
      scale: 1,
      transition: {
        y: {
          type: 'tween',
          ease: 'easeIn',
          duration: 0.2,
          delay: dividerInDuration + 0.2,
        },
        scale: {
          type: 'tween',
          ease: 'easeIn',
          duration: 0.2,
          delay: dividerInDuration + 0.2,
        },
      },
    },
  };

  const cursorVariants: Variants = {
    initial: {
      opacity: [0, 0, 1, 1],
      transition: {
        duration: 1,
        repeat: Infinity,
        repeatDelay: 0,
        ease: 'linear',
        times: [0, 0.5, 0.5, 1],
      },
    },
  };

  const dividerVariants: Variants = {
    initial: { width: 0 },
    dividerIn: {
      width: 100,
      transition: {
        ease: 'easeIn',
        duration: dividerInDuration,
      },
    },
  };

  return {
    helloVariants,
    dividerVariants,
    cursorVariants,
  };
};
