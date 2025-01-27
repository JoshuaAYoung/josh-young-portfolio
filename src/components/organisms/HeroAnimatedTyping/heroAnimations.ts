import { steps, Variants } from 'framer-motion';

export const useGetAnimations = () => {
  const containerVariants = {
    initial: { y: 155 },
    imType: {
      y: 82,
      transition: {
        duration: 0,
      },
    },
    youngType: {
      y: 0,
      transition: {
        duration: 0,
      },
    },
  };

  const getLetterVariants = (
    variantName: string,
    duration: number,
    eraseVariantName?: string,
    eraseDuration?: number,
  ): Variants => {
    return {
      initial: { display: 'none' },
      [variantName]: {
        display: 'inline',
        transition: { duration },
      },
      ...(eraseVariantName &&
        eraseDuration && {
        [eraseVariantName]: {
          display: 'none',
          transition: { duration: eraseDuration },
        },
      }),
    };
  };

  const getTypeStaggerVariants = (
    variantName: string,
    stagger: number,
    eraseVariantName?: string,
    eraseStagger?: number,
  ): Variants => {
    return {
      initial: { display: 'none' },
      [variantName]: {
        display: 'inline-block',
        transition: {
          staggerChildren: stagger,
        },
      },
      ...(eraseVariantName &&
        eraseStagger && {
        [eraseVariantName]: {
          display: 'inline-block',
          transition: {
            staggerDirection: -1,
            staggerChildren: eraseStagger,
          },
        },
      }),
    };
  };

  const getBreakVariants = (variantName: string): Variants => {
    return {
      initial: { display: 'none' },
      [variantName]: {
        display: 'block',
        transition: {
          duration: 0,
        },
      },
    };
  };

  const cursorTextVariants: Variants = {
    initial: {
      height: '3.6rem',
      y: 5,
    },
    blinkingStart: {
      opacity: [0, 0, 1, 1],
      transition: {
        duration: 1,
        repeat: 1,
        repeatDelay: 0,
        ease: 'linear',
        times: [0, 0.5, 0.5, 1],
      },
    },
    imType: {
      height: '6.5rem',
      y: 10,
      transition: {
        duration: 0,
      },
    },
    headlineFirstType: {
      opacity: 0,
      transition: {
        duration: 0,
      },
    },
  };

  const cursorHeadlineVariants: Variants = {
    initial: {
      height: '2.5rem',
      y: 5,
      opacity: 0,
    },
    headlineFirstType: {
      opacity: 1,
      transition: {
        duration: 0,
      },
    },
    blinkingInfinite: {
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
    dividerGrow: {
      width: [0, 18, 36, 54, 72, 90, 108],
      transition: {
        duration: 0.6,
        ease: steps(1, 'start'),
        times: [0, 0.16, 0.33, 0.5, 0.66, 0.83, 1],
      },
    },
  };

  return {
    containerVariants,
    getLetterVariants,
    getTypeStaggerVariants,
    getBreakVariants,
    cursorTextVariants,
    dividerVariants,
    cursorHeadlineVariants,
  };
};
