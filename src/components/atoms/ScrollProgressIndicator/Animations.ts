export const arrowVariants = {
  initial: { opacity: 0, y: -10, rotate: 0 },
  arrowFlipBack: {
    rotate: 0,
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
  arrowDrop: {
    opacity: [0, 1, 0],
    y: [-10, 0, 10],
    transition: {
      duration: 2,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'loop' as const,
    },
  },
  arrowFlip: {
    rotate: 180,
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
};

export const pathLengthVariants = {
  initial: { pathLength: 1.1 },
  transitionToScroll: {
    pathLength: 0.01,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
  transitionToTop: {
    pathLength: 1.1,
    transition: {
      duration: 0.5,
      ease: 'easeIn',
    },
  },
};

export const arrowsVariant = {
  arrowDrop: { transition: { staggerChildren: 1 } },
};
