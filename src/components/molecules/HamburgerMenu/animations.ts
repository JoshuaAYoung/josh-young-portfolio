// Entire menu animation
export const menuVariants = {
  hidden: {
    x: '100%',
    transition: {
      duration: 0.5,
      ease: 'easeIn',
    },
  },
  visible: {
    x: '0%',
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
};

// Individual menu item animation
export const menuItemVariants = {
  hidden: { x: 150, transition: { duration: 0, delay: 0.5 } },
  visible: {
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 150,
      damping: 15,
      duration: 0.5,
    },
  },
};

// Just for li staggered animation
export const listVariants = {
  hidden: {
    opacity: 1,
    transition: { duration: 0.2 },
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};
