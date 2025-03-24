import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
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
import SkillsCenterIcon from '../../atoms/SkillsCenterIcon/SkillsCenterIcon';

const Skills = forwardRef<HTMLElement>((_, ref) => {
  // HOOK(S)
  const maxMdWidth = useMediaQuery(`(max-width: ${breakpoints['max-medium']})`);
  const controls = useAnimation();

  // STATE
  const onSectionInViewActive = useJYStore(
    (state) => state.onSectionInViewActive,
  );
  const [isInViewReveal, setIsInViewReveal] = useState(false);
  const [isInitialMount, setIsInitialMount] = useState(true);
  const [hoveredSkillIndex, setHoveredSkillIndex] = useState<number | null>(
    null,
  );
  const connectedHoveredIndexes = useRef<number[] | null>(null);

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
      connectedHoveredIndexes.current = connectedIndexes;
    }
  };

  const handleMouseLeave = () => {
    if (!isInitialMount) {
      setHoveredSkillIndex(null);
      connectedHoveredIndexes.current = null;
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

  const hoverTransition = {
    duration: 0.2,
    ease: 'easeInOut',
  };

  const polylineDuration = 0.2;

  const centerCircleVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0,
      borderRadius: '0px',
      color: 'var(--secondary-color)',
    },
    reveal: {
      opacity: 1,
      scale: 1,
      color: 'var(--secondary-color)',
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
    visible: {
      opacity: 1,
      scale: 1,
      color: 'var(--secondary-color)',
      transition: hoverTransition,
    },
    hoverConnected: {
      color: 'var(--background-dark)',
      transition: {
        duration: 0,
        // delay:
        //   polylineDuration *
        //   (connectedHoveredIndexes.current
        //     ? connectedHoveredIndexes.current.length + 1
        //     : 0),
      },
    },
  };

  const centerCircleContentVariants: Variants = {
    visible: {
      color: 'var(--background-light)',
      transition: hoverTransition,
    },
    hoverConnected: {
      color: 'var(--primary-color)',
      transition: {
        duration: 0,
        // delay:
        //   polylineDuration *
        //   (connectedHoveredIndexes.current
        //     ? connectedHoveredIndexes.current.length + 1
        //     : 0),
      },
    },
  };

  const getSkillIconVariants: (icon: SkillsIcon) => Variants = useCallback(
    (icon) => {
      return {
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
          transition: hoverTransition,
        },
        hoverConnected: {
          color: 'var(--secondary-color)',
          transition: {
            // stagger the return path back to the center
            // to match polyline growth
            // ...hoverTransition,
            duration: 0,
            delay:
              polylineDuration *
              (connectedHoveredIndexes.current
                ? connectedHoveredIndexes.current.length - icon.layer + 1
                : 0),
          },
        },
      };
    },
    [],
  );

  const polylineVariants: Variants = {
    hidden: { pathLength: 0 },
    visible: {
      pathLength: 1,
      transition: {
        duration: connectedHoveredIndexes.current
          ? (connectedHoveredIndexes.current.length + 1) * polylineDuration
          : 0,
        ease: 'easeOut',
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
          transition: hoverTransition,
        },
        hover: {
          scale: 1.3,
          color: 'var(--background-dark)',
          stroke: 'var(--primary-color)',
          transition: hoverTransition,
        },
        hoverConnected: {
          color: 'var(--background-dark)',
          transition: {
            duration: 0,
            delay:
              polylineDuration *
              (connectedHoveredIndexes.current
                ? connectedHoveredIndexes.current.length - icon.layer + 1
                : 0),
          },
        },
      };
    },
    [maxMdWidth],
  );

  const getPolylinePoints = () => {
    const points = [];

    if (hoveredSkillIndex !== null) {
      const hoveredSkill = skillsData[hoveredSkillIndex];
      points.push(
        `${maxMdWidth ? hoveredSkill.x.vertical : hoveredSkill.x.horizontal},${
          maxMdWidth ? hoveredSkill.y.vertical : hoveredSkill.y.horizontal
        }`,
      );
    }

    if (connectedHoveredIndexes.current) {
      connectedHoveredIndexes.current.forEach((connectedIndex) => {
        const skill = skillsData[connectedIndex];
        points.push(
          `${maxMdWidth ? skill.x.vertical : skill.x.horizontal},${
            maxMdWidth ? skill.y.vertical : skill.y.horizontal
          }`,
        );
      });
    }

    return points.join(' ');
  };

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
            initial={isInitialMount ? 'hidden' : 'visible'}
            animate={
              isInitialMount
                ? 'reveal'
                : hoveredSkillIndex
                  ? 'hoverConnected'
                  : 'visible'
            }
            transition={{ duration: 0.5 }}
            className="skills-center-container"
            variants={centerCircleVariants}
          >
            <SkillsCenter
              className="skills-center-background"
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
            <motion.polyline
              points={getPolylinePoints()}
              fill="none"
              stroke="#1b1b21"
              strokeWidth="6"
              animate={
                connectedHoveredIndexes?.current?.length ? 'visible' : 'hidden'
              }
              variants={polylineVariants}
            />
          </g>
          <g className="skills-icons">
            {skillsData.map((icon, index) => {
              // handle reveal, hoverIn and hoverOut states
              const animateVar = isInitialMount
                ? 'reveal'
                : hoveredSkillIndex === index
                  ? 'hover'
                  : connectedHoveredIndexes.current?.includes(index)
                    ? 'hoverConnected'
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
                    animate={
                      hoveredSkillIndex === index
                        ? 'hover'
                        : connectedHoveredIndexes.current?.includes(index)
                          ? 'hoverConnected'
                          : 'visible'
                    }
                    variants={getSkillIconVariants(icon)}
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
