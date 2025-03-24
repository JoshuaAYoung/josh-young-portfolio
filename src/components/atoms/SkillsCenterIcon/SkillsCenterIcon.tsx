import { skillsData } from '../../../data/skills';
import FullStackIcon from '../../../assets/icons/tech/fullstack.svg?react';

interface SkillsCenterIconProps {
  hoveredSkillIndex: number | null;
  centerX: number;
  centerY: number;
}

const SkillsCenterIcon: React.FC<SkillsCenterIconProps> = ({
  hoveredSkillIndex,
  centerX,
  centerY,
}) => {
  const Icon = hoveredSkillIndex
    ? skillsData[hoveredSkillIndex].icon
    : FullStackIcon;

  return (
    <Icon
      width="100"
      height="94"
      x={centerX - 50}
      y={centerY - 60}
      // color="var(--background-light)"
    />
  );
};

export default SkillsCenterIcon;
