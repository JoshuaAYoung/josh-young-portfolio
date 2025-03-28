import { AnimationControls, motion, Variants } from 'motion/react';
import CircularText from '../../atoms/CircularText/CircularText';
import SkillsCenterIcon from '../../atoms/SkillsCenterIcon/SkillsCenterIcon';
import SkillsCenterBackground from '../../../assets/icons/tech/skills-center-circle.svg?react';
import { useSkillsData } from '../../../data/skills';

interface SkillsCenterProps {
  isInitialMount: boolean;
  controls: AnimationControls;
  hoveredSkillIndex: number | null;
  centerX: number;
  centerY: number;
  centerCircleVariants: Variants;
  centerCircleContentVariants: Variants;
}

const SkillsCenter: React.FC<SkillsCenterProps> = ({
  isInitialMount,
  controls,
  hoveredSkillIndex,
  centerX,
  centerY,
  centerCircleVariants,
  centerCircleContentVariants,
}) => {
  const skillsData = useSkillsData();

  return (
    <motion.g
      initial={isInitialMount ? 'hidden' : 'visible'}
      animate={
        isInitialMount
          ? controls
          : hoveredSkillIndex
            ? 'hoverConnected'
            : 'visible'
      }
      variants={centerCircleVariants}
    >
      <SkillsCenterBackground
        x={centerX - 85}
        y={centerY - 85}
        width="170"
        height="170"
      />
      <motion.g
        initial="visible"
        animate={hoveredSkillIndex ? 'hoverConnected' : 'visible'}
        variants={centerCircleContentVariants}
      >
        <CircularText
          text={
            hoveredSkillIndex
              ? skillsData[hoveredSkillIndex].label.toUpperCase()
              : 'FULL STACK'
          }
          x={centerX - 63}
          y={centerY}
        />
        <SkillsCenterIcon
          hoveredSkillIndex={hoveredSkillIndex}
          centerX={centerX}
          centerY={centerY}
        />
      </motion.g>
    </motion.g>
  );
};

export default SkillsCenter;
