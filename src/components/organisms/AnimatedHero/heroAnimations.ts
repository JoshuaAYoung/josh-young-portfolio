import { Variants } from 'framer-motion';

export const useGetAnimations = () => {
  const hoverDuration = 0.2;

  const helloVariants: Variants = {
    initial: {},
  };

  const imVariants: Variants = {
    initial: {},
  };

  const helloVariants: Variants = {
    initial: {},
  };

  const helloVariants: Variants = {
    initial: {},
  };

  const helloVariants: Variants = {
    initial: {},
  };

  const pulseCircleVariants: Variants = {
    initial: {
      scale: 1,
      opacity: 1,
    },
    hoverIn: {
      scale: 1.4,
      opacity: 0,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  const circleContainerVariants: Variants = {
    initial: {
      scale: 1,
      opacity: 0,
    },
    reveal: {
      opacity: 1,
      transition: {
        duration: revealDuration,
        ease: 'easeOut',
        delay: revealDelay,
      },
    },
    hoverIn: {
      scale: 1.2,
      transition: {
        duration: hoverDuration,
        ease: 'easeInOut',
      },
    },
  };

  const hoverCircleVariants: Variants = {
    initial: {
      opacity: 0,
    },
    hoverIn: {
      opacity: 1,
      transition: {
        duration: hoverDuration,
        ease: 'easeInOut',
      },
    },
  };

  const paragraphVariants: Variants = {
    initial: { height: 0, scale: 1, opacity: 0, transformOrigin: 'left' },
    reveal: {
      scale: 1,
      height: 'auto',
      opacity: 1,
      backgroundColor: 'var(--background-medium)',
      transition: {
        type: 'spring',
        stiffness: 150,
        damping: 17,
        mass: 1.8,
        delay: revealDelay,
      },
    },
    hoverIn: {
      scale: 1.05,
      backgroundColor: 'var(--background-dark)',
      transformOrigin: 'left',
      transition: {
        type: 'spring',
        stiffness: 250,
        damping: 15,
      },
    },
  };

  const lineVariants: Variants = {
    initial: { scaleY: 0, transformOrigin: 'top' },
    reveal: {
      scaleY: 1,
      transition: {
        duration: revealDuration,
        ease: 'easeOut',
        delay: revealDelay,
      },
    },
  };

  const triangleVariants = {
    initial: {
      fill: 'var(--background-medium)',
      opacity: 0,
    },
    reveal: {
      opacity: 1,
      transition: {
        duration: revealDuration,
        ease: 'easeOut',
        delay: revealDelay,
      },
    },
    hoverIn: {
      fill: 'var(--background-dark)',
      transition: {
        duration: hoverDuration,
        ease: 'easeInOut',
      },
    },
  };

  return {
    helloVariants,
    imVariants,
  };
};
