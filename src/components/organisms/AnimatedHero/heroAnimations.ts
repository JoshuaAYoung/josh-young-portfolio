import { Variants } from 'framer-motion';

export const useGetAnimations = () => {
  const gravityUpDownCurve = [0.3, 0, 0.1, 1];
  const dividerInDuration = 1;
  const imInDelay = 0.5;
  const jyInDelay = 0.4;

  const squishTransition = {
    type: 'tween',
    ease: 'easeOut',
    duration: 0.23,
    delay: jyInDelay + 0.52,
  };
  const squishHeight = 0.05;

  const helloVariants: Variants = {
    initial: { y: 220, opacity: 0, scale: 0.8 },
    // hello pops up and stops
    helloIn: {
      opacity: 1,
      y: [220, 160],
      scale: 1,
      transition: {
        opacity: {
          duration: 0.1,
          delay: dividerInDuration + 0.3,
        },
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
      y: [160, -50, 85],
      transition: {
        y: {
          type: 'tween',
          ease: gravityUpDownCurve,
          // lower to make sure we're not going to 110 early with start of lastNameIn
          duration: 1.88,
          delay: imInDelay + 0.04,
        },
      },
    },
    // im hits hello on its way up from young growing
    lastNameIn: {
      y: [85, -40, 0],
      transition: {
        type: 'tween',
        ease: gravityUpDownCurve,
        duration: 0.8,
        delay: 0.1,
      },
    },
    end: { y: 0, opacity: 1 },
  };

  const imVariants: Variants = {
    initial: { y: 160, opacity: 0 },
    // im pops up and hits hello
    imIn: {
      opacity: 1,
      y: [160, 80],
      transition: {
        opacity: {
          delay: imInDelay + 0.1,
        },
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
      y: [80, -20, 80],
      transition: {
        type: 'tween',
        ease: gravityUpDownCurve,
        duration: 0.8,
        delay: jyInDelay + 0.02,
      },
    },
    // as young pops back to full size, flings im up to base position
    lastNameIn: {
      y: [80, -30, 0],
      transition: {
        type: 'tween',
        ease: gravityUpDownCurve,
        duration: 0.8,
        delay: 0.1,
      },
    },
    end: { y: 0, opacity: 1 },
  };

  const jyVariants: Variants = {
    initial: { y: 80, opacity: 0, scaleY: 1 },
    // jy pops up and hits im and stops, then get squished by im
    jyIn: {
      opacity: 1,
      y: [80, 0],
      scaleY: squishHeight,
      scaleX: 2.9,
      backgroundColor: 'var(--primary-color)',
      transition: {
        opacity: {
          duration: 0.2,
          delay: jyInDelay,
        },
        y: {
          type: 'tween',
          ease: 'easeOut',
          duration: 0.2,
          delay: jyInDelay,
        },
        scaleY: squishTransition,
        scaleX: squishTransition,
        backgroundColor: {
          duration: 0.05,
          delay: jyInDelay + 0.68,
        },
      },
    },
    lastNameIn: {
      opacity: 0,
      transition: {
        duration: 0,
      },
    },
    end: { y: 0, opacity: 1 },
  };

  const firstNameVariants: Variants = {
    initial: { opacity: 0 },
    end: { opacity: 1 },
  };

  const lastNameVariants: Variants = {
    initial: {
      opacity: 0,
      scaleY: squishHeight,
      backgroundColor: 'var(--primary-color)',
      filter: 'blur(2px)',
    },
    // jy squishes and turns to young and it grows to full size
    lastNameIn: {
      opacity: 1,
      scaleY: 1,
      backgroundColor: 'transparent',
      filter: 'blur(0px)',
      transition: {
        backgroundColor: {
          duration: 0.04,
          delay: 0.05,
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
