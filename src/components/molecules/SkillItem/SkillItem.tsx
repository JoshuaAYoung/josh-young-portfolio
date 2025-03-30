import { memo } from 'react';
import { AnimationControls, motion, Variants } from 'motion/react';
import SkillsCategory from '../../../assets/icons/tech/skills-category-circle.svg?react';
import SkillsHexagon from '../../../assets/icons/tech/skills-hexagon.svg?react';
import { SkillType } from '../../../types/skills.types';
import CircularText from '../../atoms/CircularText/CircularText';

interface SkillItemProps {
  skill: SkillType;
  index: number;
  isInitialMount: boolean;
  hoveredSkillIndex: number | null;
  connectedHoveredIndexes: React.MutableRefObject<number[] | null>;
  handleMouseEnter: (index: number) => void;
  handleMouseLeave: () => void;
  getSkillVariants: (icon: SkillType) => Variants;
  getSkillItemVariants: (icon: SkillType) => Variants;
  controls: AnimationControls;
}

const SkillItem = memo(
  ({
    skill,
    index,
    isInitialMount,
    hoveredSkillIndex,
    connectedHoveredIndexes,
    handleMouseEnter,
    handleMouseLeave,
    getSkillVariants,
    getSkillItemVariants,
    controls,
  }: SkillItemProps) => (
    <motion.g
      initial={isInitialMount ? 'hidden' : 'visible'}
      animate={
        isInitialMount
          ? controls
          : hoveredSkillIndex === index
            ? 'hover'
            : connectedHoveredIndexes.current?.includes(index)
              ? 'hoverConnected'
              : 'visible'
      }
      onMouseEnter={() => handleMouseEnter(index)}
      onMouseLeave={handleMouseLeave}
      variants={getSkillVariants(skill)}
    >
      {skill.layer === 1 ? (
        <SkillsCategory x="-49" y="-49" width="98" height="98" />
      ) : (
        <SkillsHexagon x="-31" y="-34" width="62" height="68" />
      )}
      <motion.g
        initial="visible"
        animate={
          hoveredSkillIndex === index
            ? 'hover'
            : connectedHoveredIndexes.current?.includes(index)
              ? 'hoverConnected'
              : 'visible'
        }
        variants={getSkillItemVariants(skill)}
      >
        {skill.layer === 1 && (
          <CircularText
            text={skill.label.toUpperCase()}
            x={-38}
            y={0}
            radius={38}
            fontSize={12}
            iconIndex={index}
            fontWeight="800"
            letterSpacing={2}
          />
        )}
        <skill.icon
          width={skill.iconWidth}
          height={skill.iconHeight}
          x={skill.iconX}
          y={skill.iconY}
        />
      </motion.g>
    </motion.g>
  ),
);

SkillItem.displayName = 'SkillItem';

export default SkillItem;
