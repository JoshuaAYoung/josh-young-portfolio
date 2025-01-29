import { steps, Variants } from 'motion/react';
import useMediaQuery from '../../../utils/useMediaQuery';
import { breakpoints } from '../../../constants/breakpoints';

export const useGetAnimations = () => {
  const lg = useMediaQuery(`(max-width: ${breakpoints['max-large']})`);
  const md = useMediaQuery(`(max-width: ${breakpoints['max-medium']})`);
  const sm = useMediaQuery(`(max-width: ${breakpoints['max-small']})`);

  // HELPER FUNCTION(S)
  const getResponsiveValue = (
    value: number,
    isCursorWidth?: boolean,
  ): number | number[] => {
    let multiplier = 1;

    // order is important here as small breakpoints will return true for max-large
    if (sm) {
      multiplier = 0.52;
    } else if (md) {
      multiplier = 0.67;
    } else if (lg) {
      multiplier = 0.8;
    }

    let result = value * multiplier;

    // creates an array of numbers that are multiples of 6
    if (isCursorWidth) {
      result = Math.round(result / 6) * 6;
      const step = result / 6;
      const widthArray = [];
      for (let i = 0; i <= 6; i += 1) {
        widthArray.push(step * i);
      }
      console.log('widthArray', widthArray);
      return widthArray;
    }

    result = Math.round(result);
    console.log('result', result);
    return result;
  };

  // VARIANT(S)
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

  const getBlinkingVariant = (actualDuration: number) => {
    const repeat = actualDuration - 1;
    return {
      opacity: [0, 0, 1, 1],
      transition: {
        duration: 1,
        repeat,
        repeatDelay: 0,
        ease: 'linear',
        times: [0, 0.5, 0.5, 1],
      },
    };
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
    initialDisplay = 'none',
  ): Variants => {
    return {
      initial: { display: initialDisplay },
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

  const initialContainerVariants: Variants = {
    initial: {
      height: getResponsiveValue(36),
    },
  };

  const cursorTextVariants: Variants = {
    initial: {
      height: '3.6rem',
      y: 5,
    },
    blinkingTextLong: getBlinkingVariant(2),
    blinkingTextShort: getBlinkingVariant(1),
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
    blinkingHeadlineLong: getBlinkingVariant(3),
    blinkingHeadlineShort: getBlinkingVariant(1),
  };

  const dividerVariants: Variants = {
    initial: { width: 0 },
    dividerGrow: {
      width: getResponsiveValue(108, true),
      transition: {
        duration: 0.6,
        ease: steps(1, 'start'),
        times: [0, 0.16, 0.33, 0.5, 0.66, 0.83, 1],
      },
    },
  };

  const portraitVariants: Variants = {
    initial: { opacity: 0 },
    portraitFadeIn: {
      opacity: 1,
      transition: {
        duration: 1,
        ease: 'easeIn',
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
    portraitVariants,
    initialContainerVariants,
  };
};
