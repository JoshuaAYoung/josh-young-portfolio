import { useSkillsData } from '../../../data/skills';
import FullStackIcon from '../../../assets/icons/tech/fullstack.svg?react';
import PythonIcon from '../../../assets/icons/tech/python.svg?react';

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

  let Icon = FullStackIcon;

  if (hoveredSkill) {
    Icon = hoveredSkill?.label === 'Lock' ? PythonIcon : hoveredSkill.icon;
  }

  const isDefaultIcon = hoveredSkillIndex === null;

  let dynamicWidth = 100;
  let dynamicHeight = 94;

  if (hoveredSkill) {
    if (hoveredSkill?.label !== 'Lock') {
      dynamicWidth = hoveredSkill.iconWidth * hoveredSkill.centerMultiplier!;
      dynamicHeight = hoveredSkill.iconHeight * hoveredSkill.centerMultiplier!;
    } else {
      dynamicWidth = 69;
      dynamicHeight = 70;
    }
  }

  const dynamicX = centerX - dynamicWidth / 2;
  const dynamicY = isDefaultIcon ? centerY - 60 : centerY - dynamicHeight / 2;

  return (
    <Icon
      width={dynamicWidth}
      height={dynamicHeight}
      x={dynamicX}
      y={dynamicY}
    />
  );
};

export default SkillsCenterIcon;
