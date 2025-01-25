import './HeroCircle.scss';
import { AnimationControls, motion } from 'framer-motion';
import { useGetAnimations } from './heroCircleAnimations';

interface HeroCircleProps {
  controls: AnimationControls;
}

const HeroCircle = ({ controls }: HeroCircleProps) => {
  const { circleContainerVariants, circleVariants } = useGetAnimations();

  return (
    <motion.div
      className="hero-circle-container"
      animate={controls}
      initial="initial"
      variants={circleContainerVariants}
    >
      <motion.svg
        className="circle circle-28"
        width="28"
        height="28"
        variants={circleVariants}
      >
        <circle cx="14" cy="14" r="14" fill="currentColor" />
      </motion.svg>
      <motion.svg
        className="circle circle-56"
        width="56"
        height="56"
        variants={circleVariants}
      >
        <circle cx="28" cy="28" r="28" fill="currentColor" />
      </motion.svg>
      <motion.svg
        className="circle circle-116"
        width="116"
        height="116"
        variants={circleVariants}
      >
        <circle cx="58" cy="58" r="58" fill="currentColor" />
      </motion.svg>
      <motion.svg
        className="circle circle-260"
        width="260"
        height="260"
        variants={circleVariants}
      >
        <circle cx="130" cy="130" r="130" fill="currentColor" />
      </motion.svg>
    </motion.div>
  );
};

export default HeroCircle;
