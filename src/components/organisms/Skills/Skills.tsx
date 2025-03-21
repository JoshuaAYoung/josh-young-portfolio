import { forwardRef, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import './Skills.scss';
import InViewSection from '../../molecules/InViewSection/InViewSection';
import useJYStore from '../../../store/useJYStore';
import SkillsHexagon from '../../../assets/icons/tech/skills-hexagon.svg?react';
import SkillsCenter from '../../../assets/icons/tech/skills-center-circle.svg?react';
import SkillsCategory from '../../../assets/icons/tech/skills-category-circle.svg?react';
import CircularText from '../../atoms/CircularText/CircularText';

const Skills = forwardRef<HTMLElement>((props, ref) => {
  const onSectionInViewActive = useJYStore(
    (state) => state.onSectionInViewActive,
  );
  const [isInViewReveal, setIsInViewReveal] = useState(false);

  // FUNCTION(S)
  const onSectionInViewReveal = (isPartiallyOnScreen: boolean) => {
    if (isPartiallyOnScreen && !isInViewReveal) {
      setIsInViewReveal(true);
    }
  };

  // SVG ICONS
  const icon1 = <circle cx="0" cy="0" r="10" fill="blue" />;
  const icon2 = <rect x="-7.5" y="-7.5" width="15" height="15" fill="green" />;
  const icon3 = <polygon points="0,-10 8,5 -8,5" fill="orange" />;
  const icon4 = <circle cx="0" cy="0" r="10" fill="red" />;

  const orbitRadii = [150, 256, 362, 468];

  const iconsData = useMemo(
    () => [
      { label: 'Backend', icon: icon1, layer: 1, angle: 0 }, // 0
      { label: 'Devtools', icon: icon1, layer: 1, angle: 90 }, // 1
      { label: 'Frontend', icon: icon1, layer: 1, angle: 180 }, // 2
      //
      {
        label: 'Python',
        icon: icon2,
        layer: 2,
        angle: 328.5,
        connectedIndex: 0,
      }, // 3
      {
        label: 'PostgreSQL',
        icon: icon2,
        layer: 2,
        angle: 352,
        connectedIndex: 0,
      }, // 4
      {
        label: 'TypeScript', // Backend
        icon: icon2,
        layer: 2,
        angle: 14,
        connectedIndex: 0,
      }, // 5

      { label: 'CI/CD', icon: icon2, layer: 2, angle: 51, connectedIndex: 1 }, // 6
      { label: 'GitHub', icon: icon2, layer: 2, angle: 71, connectedIndex: 1 }, // 7
      { label: 'AWS', icon: icon2, layer: 2, angle: 95, connectedIndex: 1 }, // 8
      { label: 'Auth0', icon: icon2, layer: 2, angle: 117, connectedIndex: 1 }, // 9
      { label: 'CSS3', icon: icon2, layer: 2, angle: 148.5, connectedIndex: 2 }, // 10
      {
        label: 'TypeScript', // Frontend
        icon: icon2,
        layer: 2,
        angle: 171.5,
        connectedIndex: 2,
      }, // 11
      {
        label: 'HTML5',
        icon: icon2,
        layer: 2,
        angle: 195.5,
        connectedIndex: 2,
      }, // 12
      //
      {
        label: 'Node.js',
        icon: icon3,
        layer: 3,
        angle: 12,
        connectedIndex: 5,
      }, // 13
      {
        label: 'GraphQL',
        icon: icon3,
        layer: 3,
        angle: 30,
        connectedIndex: 5,
      }, // 14
      {
        label: 'jQuery',
        icon: icon3,
        layer: 3,
        angle: 155.5,
        connectedIndex: 11,
      }, // 15
      {
        label: 'React',
        icon: icon3,
        layer: 3,
        angle: 179.5,
        connectedIndex: 11,
      }, // 16

      {
        label: 'Express',
        icon: icon4,
        layer: 4,
        angle: 6.5,
        connectedIndex: 13,
      }, // 17
      {
        label: 'Sequelize',
        icon: icon4,
        layer: 4,
        angle: 17.5,
        connectedIndex: 13,
      }, // 18
      { label: 'Expo', icon: icon4, layer: 4, angle: 149, connectedIndex: 16 }, // 19
      {
        label: 'Framer Motion',
        icon: icon4,
        layer: 4,
        angle: 163,
        connectedIndex: 16,
      }, // 20
      {
        label: 'Redux',
        icon: icon4,
        layer: 4,
        angle: 175.5,
        connectedIndex: 16,
      }, // 21
      { label: 'Jest', icon: icon4, layer: 4, angle: 188, connectedIndex: 16 }, // 22
    ],
    [],
  );

  const width = 1000;
  const height = 466;
  const centerX = width / 2;
  const centerY = 172;

  const computedPositions = useMemo(
    () =>
      iconsData.map(({ layer, angle }) => {
        const radians = (angle * Math.PI) / 180;
        const orbitRadius = orbitRadii[layer - 1];
        return {
          x: centerX + orbitRadius * Math.cos(radians),
          y: centerY + orbitRadius * Math.sin(radians),
        };
      }),
    [iconsData],
  );

  console.log('computedPositions', computedPositions);

  return (
    <InViewSection
      sectionName="Skills"
      onSectionInViewActiveCallback={(isInView) =>
        onSectionInViewActive('Skills', isInView)
      }
      onSectionInViewRevealCallback={onSectionInViewReveal}
      ref={ref}
      title="Skills"
    >
      <div className="container">
        <svg
          className="orbit-container"
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="xMidYMid meet"
        >
          <motion.g
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="skills-center-container"
          >
            <SkillsCenter
              className="skills-center-background"
              x={centerX - 85}
              y={centerY - 85}
              width="170"
              height="170"
            />
            <CircularText text="FULL STACK" x={centerX - 63} y={centerY - 63} />
          </motion.g>

          <g className="skills-lines">
            {iconsData.map((icon, index) => {
              const connectedPosition =
                icon.connectedIndex !== undefined
                  ? computedPositions[icon.connectedIndex]
                  : null;
              const { x, y } = computedPositions[index];
              return (
                connectedPosition && (
                  <motion.line
                    key={`line-${index}`}
                    x1={connectedPosition.x}
                    y1={connectedPosition.y}
                    x2={x}
                    y2={y}
                    stroke="white"
                    strokeWidth={2}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      delay: icon.layer * 1,
                      duration: 1,
                      ease: 'easeOut',
                    }}
                    className={`skills-line ${icon.label}`}
                  />
                )
              );
            })}
          </g>
          <g className="skills-icons">
            {iconsData.map((icon, index) => {
              const { x, y } = computedPositions[index];
              return (
                <motion.g
                  key={`icon-${index}`}
                  initial={{ opacity: 0, scale: 0, x, y }}
                  animate={{ opacity: 1, scale: 1, x, y }}
                  transition={{
                    delay: icon.layer * 1,
                    duration: 0.5,
                    ease: 'easeOut',
                  }}
                  className="skills-icon"
                >
                  {icon.layer === 1 ? (
                    <SkillsCategory
                      className="skills-icon-background"
                      x="-49"
                      y="-49"
                      width="98"
                      height="98"
                    />
                  ) : (
                    <SkillsHexagon
                      className="skills-icon-background"
                      x="-31"
                      y="-34"
                      width="62"
                      height="68"
                    />
                  )}
                  {iconsData[index].icon}
                </motion.g>
              );
            })}
          </g>
        </svg>
      </div>
    </InViewSection>
  );
});

Skills.displayName = 'Skills';

export default Skills;
