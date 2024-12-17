import { Variants } from 'framer-motion';

export const useGetTransitions = ({
  revealDuration,
  revealDelay,
}: {
  revealDuration: number;
  revealDelay: number;
}) => {
  const hoverDuration = 0.2;

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

  const paragraphVariants: Variants = {
    initial: { scaleX: 1, opacity: 0, transformOrigin: 'left' },
    reveal: {
      scaleX: 1,
      opacity: 1,
      backgroundColor: 'var(--background-medium)',
      transition: {
        duration: revealDuration,
        ease: 'easeOut',
        delay: revealDelay,
      },
    },
    hoverOut: {
      scaleX: 1,
      backgroundColor: 'var(--background-medium)',
      transition: { duration: hoverDuration, ease: 'easeInOut' },
    },
    hoverIn: {
      scaleX: 1.05,
      backgroundColor: 'var(--background-dark)',
      transformOrigin: 'left',
      transition: { duration: hoverDuration, ease: 'easeInOut' },
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
      opacity: 1,
    },
    hoverIn: {
      opacity: 0,
      transition: {
        duration: hoverDuration,
        ease: 'easeInOut',
      },
    },
  };

  return {
    pulseCircleVariants,
    paragraphVariants,
    lineVariants,
    triangleVariants,
  };
};
