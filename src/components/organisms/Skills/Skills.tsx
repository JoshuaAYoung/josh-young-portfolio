import { forwardRef, useCallback, useEffect, useState } from 'react';
import { motion, useAnimation, Variants } from 'motion/react';
import './Skills.scss';
import InViewSection from '../../molecules/InViewSection/InViewSection';
import useJYStore from '../../../store/useJYStore';
import SkillsHexagon from '../../../assets/icons/tech/skills-hexagon.svg?react';
import SkillsCenter from '../../../assets/icons/tech/skills-center-circle.svg?react';
import SkillsCategory from '../../../assets/icons/tech/skills-category-circle.svg?react';
import CircularText from '../../atoms/CircularText/CircularText';
import useMediaQuery from '../../../globalUtils/useMediaQuery';
import { breakpoints } from '../../../constants/breakpoints';
import { SkillsIcon } from '../../../types/skills.types';
import { skillsData } from '../../../data/skills';

const Skills = forwardRef<HTMLElement>((_, ref) => {
  // HOOK(S)
  const maxMdWidth = useMediaQuery(`(max-width: ${breakpoints['max-medium']})`);
  const controls = useAnimation();

  // STATE
  const onSectionInViewActive = useJYStore(
    (state) => state.onSectionInViewActive,
  );
  const [isInViewReveal, setIsInViewReveal] = useState(false);
  const [hoveredSkillIndex, setHoveredSkillIndex] = useState<number | null>(
    null,
  );
  const [isInitialMount, setIsInitialMount] = useState(true);
  const [connectedHoveredIndexes, setConnectedHoveredIndexes] = useState<
    number[] | null
  >(null);

  // FUNCTION(S)
  const onSectionInViewReveal = (isPartiallyOnScreen: boolean) => {
    if (isPartiallyOnScreen && !isInViewReveal) {
      setIsInViewReveal(true);
    }
  };

  const handleMouseEnter = (index: number) => {
    if (!isInitialMount) {
      const connectedIndexes = [];
      let currentIndex = skillsData[index].connectedIndex;

      while (
        currentIndex !== undefined &&
        skillsData[currentIndex].layer !== 1
      ) {
        connectedIndexes.push(currentIndex);
        currentIndex = skillsData[currentIndex].connectedIndex!;
      }
      if (currentIndex !== undefined) {
        connectedIndexes.push(currentIndex); // Add the layer 1 index
      }

      console.log(connectedIndexes);

      setHoveredSkillIndex(index);
      setConnectedHoveredIndexes(connectedIndexes);
    }
  };

  const handleMouseLeave = () => {
    if (!isInitialMount) {
      setHoveredSkillIndex(null);
    }
  };

  // EFFECT(S)
  useEffect(() => {
    const startAnimation = async () => {
      if (isInViewReveal) {
        await controls.start('reveal');
        setIsInitialMount(false);
        controls.start('visible');
      }
    };

    startAnimation();
  }, [controls, isInViewReveal]);

  const getLineVariants: (icon: SkillsIcon) => Variants = (icon) => {
    return {
      hidden: { pathLength: 0 },
      reveal: {
        pathLength: 1,
        transition: {
          delay: icon.layer * 1,
          duration: 1,
          ease: 'easeOut',
        },
      },
    };
  };

  const skillIconVariants: Variants = {
    hidden: {
      color: 'var(--background-light)',
    },
    reveal: {
      color: 'var(--background-light)',
    },
    visible: {
      color: 'var(--background-light)',
      transition: {
        duration: 0.2,
        ease: 'easeInOut',
      },
    },
    hover: {
      color: 'var(--primary-color)',
      transition: {
        duration: 0.2,
        ease: 'easeInOut',
      },
    },
  };

  const getSkillVariants: (icon: SkillsIcon) => Variants = useCallback(
    (icon) => {
      const xPosition = maxMdWidth ? icon.x.vertical : icon.x.horizontal;
      const yPosition = maxMdWidth ? icon.y.vertical : icon.y.horizontal;

      return {
        hidden: {
          opacity: 0,
          scale: 0,
          borderRadius: '0px',
          color: 'var(--secondary-color)',
          stroke: '#1b1b21',
          x: xPosition,
          y: yPosition,
        },
        reveal: {
          opacity: 1,
          scale: 1,
          color: 'var(--secondary-color)',
          stroke: '#1b1b21',
          x: xPosition,
          y: yPosition,
          transition: {
            delay: icon.layer * 1,
            duration: 0.5,
            ease: 'easeOut',
          },
        },
        visible: {
          opacity: 1,
          scale: 1,
          color: 'var(--secondary-color)',
          stroke: '#1b1b21',
          transition: {
            duration: 0.2,
            ease: 'easeInOut',
          },
        },
        hover: {
          scale: 1.3,
          color: 'var(--background-dark)',
          stroke: '#1b1b21',
          transition: {
            duration: 0.2,
            ease: 'easeInOut',
          },
        },
      };
    },
    [maxMdWidth],
  );

  const longSide = 1000;
  const shortSide = 480;
  const centerX = maxMdWidth ? 287 : longSide / 2;
  const centerY = maxMdWidth ? longSide / 2 : 179;

  // KEEP IN CASE WE NEED TO RECALCULATE
  // const orbitRadii = [150, 256, 362, 468];
  // const responsiveRotation = maxMdWidth ? 90 : 0;

  // const computedPositions = useMemo(
  //   () =>
  //     skillsData.map(({ layer, angle, label }) => {
  //       const radians = ((angle + responsiveRotation) * Math.PI) / 180;
  //       const orbitRadius = orbitRadii[layer - 1];
  //       return {
  //         x: centerX + orbitRadius * Math.cos(radians),
  //         y: centerY + orbitRadius * Math.sin(radians),
  //         label,
  //       };
  //     }),
  //   [skillsData],
  // );

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
        <motion.svg
          className="orbit-container"
          viewBox={`0 0 ${maxMdWidth ? shortSide : longSide} ${
            maxMdWidth ? longSide : shortSide
          }`}
          preserveAspectRatio="xMidYMid meet"
          animate={controls}
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

          {/* TODO have it so that a line on top of the other line thicker and different color growws opposite direction when hovered skill */}

          <g className="skills-lines">
            {skillsData.map((icon, index) => {
              const connectedSkill =
                icon.connectedIndex !== undefined
                  ? skillsData[icon.connectedIndex]
                  : null;
              const xPosition = maxMdWidth
                ? icon.x.vertical
                : icon.x.horizontal;
              const yPosition = maxMdWidth
                ? icon.y.vertical
                : icon.y.horizontal;
              const xConnected = maxMdWidth
                ? connectedSkill?.x.vertical
                : connectedSkill?.x.horizontal;
              const yConnected = maxMdWidth
                ? connectedSkill?.y.vertical
                : connectedSkill?.y.horizontal;

              return (
                connectedSkill && (
                  <motion.line
                    key={`line-${index}`}
                    x1={xConnected}
                    y1={yConnected}
                    x2={xPosition}
                    y2={yPosition}
                    stroke="white"
                    strokeWidth={2}
                    initial="hidden"
                    animate={controls}
                    variants={getLineVariants(icon)}
                    className={`skills-line ${icon.label}`}
                  />
                )
              );
            })}
          </g>
          <g className="skills-icons">
            {skillsData.map((icon, index) => {
              // handle reveal, hoverIn and hoverOut states
              const animateVar = isInitialMount
                ? 'reveal'
                : hoveredSkillIndex === index
                  ? 'hover'
                  : 'visible';

              return (
                <motion.g
                  key={`icon-${index}`}
                  initial={isInitialMount ? 'hidden' : 'visible'}
                  animate={animateVar}
                  className="skills-icon"
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                  variants={getSkillVariants(icon)}
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
                  <motion.g
                    initial="visible"
                    animate={hoveredSkillIndex === index ? 'hover' : 'visible'}
                    variants={skillIconVariants}
                  >
                    <icon.icon
                      width={icon.iconWidth}
                      height={icon.iconHeight}
                      x={icon.iconX}
                      y={icon.iconY}
                    />
                  </motion.g>
                </motion.g>
              );
            })}
          </g>
        </motion.svg>
      </div>
    </InViewSection>
  );
});

Skills.displayName = 'Skills';

export default Skills;
