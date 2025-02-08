import { useCallback } from 'react';
import { steps, Variants } from 'motion/react';
import useMediaQuery from '../../../globalUtils/useMediaQuery';
import { breakpoints } from '../../../constants/breakpoints';

export const useGetAnimations = () => {
  const maxLgWidth = useMediaQuery(`(max-width: ${breakpoints['max-large']})`);
  const maxMdWidth = useMediaQuery(`(max-width: ${breakpoints['max-medium']})`);
  const maxSmWidth = useMediaQuery(`(max-width: ${breakpoints['max-small']})`);
  const maxSmHeight = useMediaQuery(
    `(max-height: ${breakpoints['max-sm-height']})`,
  );

  // HELPER FUNCTION(S)
  const getResponsiveValue = useCallback(
    (value: number, isCursorWidth?: boolean): number | number[] => {
      let multiplier = 1;

      if (maxSmWidth || maxSmHeight) {
        multiplier = 0.52;
      } else if (maxMdWidth) {
        multiplier = 0.67;
      } else if (maxLgWidth) {
        multiplier = 0.8;
      }

      let result = value * multiplier;

      if (isCursorWidth) {
        result = Math.round(result / 6) * 6;
        const step = result / 6;
        const widthArray = [];
        for (let i = 0; i <= 6; i += 1) {
          widthArray.push(step * i);
        }
        return widthArray;
      }

      result = Math.round(result);
      return result;
    },
    [maxSmWidth, maxMdWidth, maxLgWidth, maxSmHeight],
  );

  const getResponsiveHeadlineCursor = useCallback((): {
    height: number;
    y: number;
  } => {
    if (maxMdWidth || maxSmHeight) {
      return { height: 18, y: 3 };
    }
    if (maxLgWidth) {
      return { height: 20, y: 4 };
    }
    return { height: 25, y: 5 };
  }, [maxMdWidth, maxLgWidth, maxSmHeight]);

  // VARIANT(S)
  const containerVariants = {
    initial: { y: getResponsiveValue(155) },
    imType: {
      y: getResponsiveValue(82),
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
      height: getResponsiveValue(36),
      y: getResponsiveValue(5),
    },
    blinkingTextLong: getBlinkingVariant(2),
    blinkingTextShort: getBlinkingVariant(1),
    imType: {
      height: getResponsiveValue(65),
      y: getResponsiveValue(10),
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
      height: getResponsiveHeadlineCursor().height,
      y: getResponsiveHeadlineCursor().y,
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
    blinkingHeadlineOff: {
      opacity: 0,
      transition: {
        duration: 0,
      },
    },
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
