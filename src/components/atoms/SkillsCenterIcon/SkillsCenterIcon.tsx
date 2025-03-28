import { useSkillsData } from '../../../data/skills';
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
  const skillsData = useSkillsData();
  const hoveredSkill = hoveredSkillIndex ? skillsData[hoveredSkillIndex] : null;
  const Icon = hoveredSkill ? hoveredSkill.icon : FullStackIcon;

  const isDefaultIcon = hoveredSkillIndex === null;

  let dynamicWidth = 100;
  let dynamicHeight = 94;

  if (hoveredSkill) {
    dynamicWidth = hoveredSkill.iconWidth * hoveredSkill.centerMultiplier!;
    dynamicHeight = hoveredSkill.iconHeight * hoveredSkill.centerMultiplier!;
  }

  const dynamicX = centerX - dynamicWidth / 2;
  const dynamicY = isDefaultIcon ? centerY - 60 : centerY - dynamicHeight / 2;

  return (
    <Icon
      width={dynamicWidth}
      height={dynamicHeight}
      x={dynamicX}
      y={dynamicY}
      // color="var(--background-light)"
    />
  );
};

export default SkillsCenterIcon;
