import { AnimationControls, motion, Variants } from 'motion/react';
import CircularText from '../../atoms/CircularText/CircularText';
import CircularRating from '../../atoms/CircularRating/CircularRating';
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
  const hoveredSkill = hoveredSkillIndex ? skillsData[hoveredSkillIndex] : null;

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
          text={hoveredSkill ? hoveredSkill.label.toUpperCase() : 'FULL STACK'}
          x={centerX - 63}
          y={centerY}
          iconIndex={999} // fake unique index, technically skill index 0 is backend
        />
        {hoveredSkill && (
          <CircularRating
            x={centerX - 56}
            y={centerY - 56}
            radius={56}
            stars={hoveredSkill.stars}
          />
        )}
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
