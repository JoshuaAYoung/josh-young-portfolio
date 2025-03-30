import { memo } from 'react';
import { AnimationControls, motion, Variants } from 'motion/react';
import { SkillType } from '../../../types/skills.types';
import useMediaQuery from '../../../globalUtils/useMediaQuery';
import { breakpoints } from '../../../constants/breakpoints';

interface SkillLineProps {
  skill: SkillType;
  connectedSkill: SkillType;
  variants: Variants;
  animate: AnimationControls;
}

const SkillLine = memo(
  ({ skill, connectedSkill, variants, animate }: SkillLineProps) => {
    // HOOK(S)
    const maxMdWidth = useMediaQuery(
      `(max-width: ${breakpoints['max-medium']})`,
    );

    // COMPUTED VAR(S)
    const xPosition = maxMdWidth ? skill.x.vertical : skill.x.horizontal;
    const yPosition = maxMdWidth ? skill.y.vertical : skill.y.horizontal;
    const xConnected = maxMdWidth
      ? connectedSkill?.x.vertical
      : connectedSkill?.x.horizontal;
    const yConnected = maxMdWidth
      ? connectedSkill?.y.vertical
      : connectedSkill?.y.horizontal;

    return (
      <g>
        <motion.line
          x1={xConnected}
          y1={yConnected}
          x2={xPosition}
          y2={yPosition}
          stroke="var(--primary-color"
          strokeWidth={2}
          initial="hidden"
          animate={animate}
          variants={variants}
        />
        {skill.label === 'Python' && (
          <line
            x1={xConnected}
            y1={yConnected}
            x2={xPosition}
            y2={yPosition}
            strokeWidth={3}
            strokeDasharray={5.5}
            strokeMiterlimit={10}
            stroke="var(--background-light)"
          />
        )}
      </g>
    );
  },
);

SkillLine.displayName = 'SkillLine';

export default SkillLine;
