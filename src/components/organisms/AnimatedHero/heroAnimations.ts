import { Variants } from 'framer-motion';

export const useGetAnimations = () => {
  const gravityUpDownCurve = [0.3, 0, 0.1, 1];
  const dividerInDuration = 1;
  const imInDelay = 0.5;
  const jyInDelay = 0.4;

  const squishDelay = jyInDelay + 0.68;
  const squishTransition = {
    type: 'tween',
    ease: 'easeOut',
    duration: 0.23,
    delay: squishDelay,
  };
  const squishHeight = 0.04;

  const helloVariants: Variants = {
    initial: { y: 220, scale: 0.5 },
    // hello pops up and stops
    helloIn: {
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
    // hello gets hit by im and pops up high and comes back down with im
    helloUp: {
      y: [160, -40, 90],
      transition: {
        y: {
          type: 'tween',
          ease: gravityUpDownCurve,
          // lower to make sure we're not going to 110 early with start of lastNameIn
          duration: 1.88,
          delay: imInDelay + 0.05,
        },
      },
    },
    // im hits hello on its way up from young growing
    lastNameIn: {
      y: [90, -50, 0],
      transition: {
        type: 'tween',
        ease: gravityUpDownCurve,
        duration: 0.8,
        delay: 0.09,
      },
    },
    end: { y: 0, opacity: 1 },
  };

  const imVariants: Variants = {
    initial: { y: 160 },
    // im pops up and hits hello
    imIn: {
      y: [160, 80],
      transition: {
        y: {
          type: 'tween',
          ease: 'easeIn',
          duration: 0.2,
          delay: imInDelay,
        },
      },
    },
    // jy hits im and it pops up and comes back down with hello
    jyIn: {
      y: [80, -40, 88],
      transition: {
        type: 'tween',
        ease: gravityUpDownCurve,
        duration: 1.02,
        delay: jyInDelay + 0.02,
      },
    },
    // as young pops back to full size, flings im up to base position
    lastNameIn: {
      y: [88, -30, 0],
      transition: {
        type: 'tween',
        ease: gravityUpDownCurve,
        duration: 0.8,
        delay: 0.06,
      },
    },
    end: { y: 0, opacity: 1 },
  };

  const jyVariants: Variants = {
    initial: {
      y: 80,
      scaleY: 1,
      filter: 'blur(0px)',
      backgroundColor: 'var(--primary-color-transparent)',
    },
    // jy pops up and hits im and stops, then get squished by im
    jyIn: {
      y: [80, 0],
      scaleY: squishHeight,
      scaleX: 2.5,
      backgroundColor: 'var(--primary-color)',
      filter: 'blur(1px)',
      transition: {
        y: {
          type: 'tween',
          ease: 'easeOut',
          duration: 0.2,
          delay: jyInDelay,
        },
        scaleY: squishTransition,
        scaleX: squishTransition,
        backgroundColor: {
          duration: 0.04,
          delay: squishDelay + 0.18,
        },
        filter: {
          duration: 0.05,
          delay: squishDelay + 0.14,
        },
      },
    },
    lastNameIn: {
      opacity: 0,
      transition: {
        duration: 0,
      },
    },
    end: { y: 0, opacity: 0 },
  };

  const firstNameVariants: Variants = {
    initial: {
      y: 80,
      opacity: 0,
      scaleY: 0.06,
      scaleX: 0.8,
    },
    // josh starts squishes with young and pops up into place with im
    lastNameIn: {
      y: [80, -30, 0],
      opacity: 1,
      scaleY: 1,
      scaleX: 1,
      transition: {
        y: {
          type: 'tween',
          ease: gravityUpDownCurve,
          duration: 0.8,
          delay: 0.06,
        },
        opacity: {
          duration: 0.1,
          delay: 0.05,
        },
        scaleY: { duration: 0.35, type: 'tween', ease: 'easeIn' },
        scaleX: { duration: 0.35, type: 'tween', ease: 'easeIn' },
      },
    },
    end: { opacity: 1 },
  };

  const lastNameVariants: Variants = {
    initial: {
      opacity: 0,
      scaleY: squishHeight,
      backgroundColor: 'var(--primary-color)',
      filter: 'blur(3px)',
    },
    // jy squishes and turns to young and it grows to full size
    lastNameIn: {
      opacity: 1,
      scaleY: 1,
      backgroundColor: 'var(--primary-color-transparent)',
      filter: 'blur(0px)',
      transition: {
        backgroundColor: {
          duration: 0.04,
          delay: 0.04,
        },
        opacity: {
          duration: 0,
        },
        scaleY: { duration: 0.27, type: 'tween', ease: 'easeIn' },
        filter: {
          duration: 0.2,
        },
      },
    },
    end: { opacity: 1 },
  };

  const periodVariants: Variants = {
    initial: { opacity: 0 },
    end: { opacity: 1 },
  };

  const dividerVariants: Variants = {
    initial: { opacity: 0 },
    dividerIn: {
      opacity: 1,
      transition: {
        ease: 'easeIn',
        duration: dividerInDuration,
      },
    },
    end: { opacity: 1 },
  };

  const portraitVariants: Variants = {
    initial: { opacity: 0 },
    end: { opacity: 1 },
  };

  return {
    helloVariants,
    imVariants,
    jyVariants,
    firstNameVariants,
    lastNameVariants,
    periodVariants,
    dividerVariants,
    portraitVariants,
  };
};
