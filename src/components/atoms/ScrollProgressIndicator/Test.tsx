import React from 'react';
import { motion } from 'framer-motion';
import './Test.scss';
import Arrow from '../../../assets/icons/arrow.svg?react';

const arrowAnimation = {
  initial: { opacity: 0, top: '45%' },
  animate: {
    opacity: [0, 1, 0], // Arrow fades in and out
    top: ['45%', '50%', '55%'], // Moves vertically
    transition: {
      opacity: { duration: 2, ease: 'ease-in-out', repeat: Infinity },
      top: { duration: 2, ease: 'ease-in-out', repeat: Infinity },
    },
  },
};

const Test: React.FC = () => {
  return (
    <div className="container">
      {/* First Arrow */}
      <motion.div
        className="arrow arrow-first"
        initial="initial"
        animate="animate"
        variants={arrowAnimation}
        transition={{
          delay: 0, // First arrow starts immediately
          repeat: Infinity,
        }}
      >
        <Arrow />
      </motion.div>

      {/* Second Arrow */}
      <motion.div
        className="arrow arrow-second"
        initial="initial"
        animate="animate"
        variants={arrowAnimation}
        transition={{
          delay: 1, // Second arrow starts after a delay
          repeat: Infinity,
        }}
      >
        <Arrow />
      </motion.div>
    </div>
  );
};

export default Test;
