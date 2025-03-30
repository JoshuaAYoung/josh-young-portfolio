import {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { motion, useAnimation, Variants } from 'motion/react';
import './Skills.scss';
import { throttle } from 'lodash-es';
import InViewSection from '../../molecules/InViewSection/InViewSection';
import useJYStore from '../../../store/useJYStore';
import useMediaQuery from '../../../globalUtils/useMediaQuery';
import { breakpoints } from '../../../constants/breakpoints';
import { SkillType } from '../../../types/skills.types';
import { useSkillsData } from '../../../data/skills';
import SkillLine from '../../atoms/SkillLine/SkillLine';
import SkillItem from '../../molecules/SkillItem/SkillItem';
import SkillsCenter from '../../molecules/SkillsCenter/SkillsCenter';
import SkillsOuterRing from '../../../assets/icons/tech/skills-outer-ring.svg?react';

const Skills = forwardRef<HTMLElement>((_, ref) => {
  // HOOK(S)
  const maxMdWidth = useMediaQuery(`(max-width: ${breakpoints['max-medium']})`);
  const maxSmWidth = useMediaQuery(`(max-width: ${breakpoints['max-small']})`);
  const controls = useAnimation();
  const skillsData = useSkillsData();

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

  // COMPUTED VAR(S)
  const isTouchDevice = 'ontouchstart' in window;

  // FUNCTION(S)
  const onSectionInViewReveal = useCallback(
    (isPartiallyOnScreen: boolean) => {
      if (isPartiallyOnScreen && !isInViewReveal) {
        setIsInViewReveal(true);
      }
    },
    [isInViewReveal],
  );

  const handleMouseEnter = throttle((index: number) => {
    if (!isInitialMount && skillsData[index].layer !== 1) {
      const connectedIndexes = [];
      let currentIndex = skillsData[index].connectedIndex;

      while (currentIndex !== undefined) {
        connectedIndexes.push(currentIndex);
        currentIndex = skillsData[currentIndex].connectedIndex!;
      }
      if (currentIndex !== undefined) {
        connectedIndexes.push(currentIndex); // Add the layer 1 index
      }

      setHoveredSkillIndex(index);
      connectedHoveredIndexes.current = connectedIndexes;
    }
  }, 200);

  const handleMouseLeave = throttle(() => {
    if (!isInitialMount) {
      setHoveredSkillIndex(null);
      connectedHoveredIndexes.current = null;
    }
  }, 200);

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

  const getLineVariants = useCallback(
    (skill: SkillType, connectedSkill: SkillType) => {
      return {
        hidden: { pathLength: 0 },
        reveal: {
          pathLength: 1,
          transition: {
            delay: connectedSkill.delay + revealSkillDuration,
            duration: skill.delay - connectedSkill.delay - revealSkillDuration,
            ease: 'linear',
          },
        },
      };
    },
    [],
  );

  const hoverTransition = {
    duration: 0.2,
    ease: 'easeInOut',
  };

  const revealSkillDuration = 0.4;

  const polylineDuration = 0.2;

  const centerCircleVariants: Variants = {
    hidden: {
      scale: 0,
      borderRadius: '0px',
      stroke: 'var(--dark-fill)',
      color: 'var(--secondary-color)',
    },
    reveal: {
      scale: 1,
      color: 'var(--secondary-color)',
      stroke: 'var(--dark-fill)',
      transition: {
        duration: revealSkillDuration,
        ease: 'easeOut',
      },
    },
    visible: {
      scale: 1,
      color: 'var(--secondary-color)',
      stroke: 'var(--dark-fill)',
      transition: hoverTransition,
    },
    hoverConnected: {
      color: 'var(--background-dark)',
      stroke: 'var(--primary-color)',
      transition: {
        duration: 0,
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
      },
    },
  };

  const getSkillItemVariants: (skill: SkillType) => Variants = useCallback(
    (skill) => {
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
            duration: 0,
            delay:
              polylineDuration *
              (connectedHoveredIndexes.current
                ? connectedHoveredIndexes.current.length - skill.layer + 1
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

  const getSkillVariants = useCallback(
    (skill: SkillType) => {
      const xPosition = maxMdWidth ? skill.x.vertical : skill.x.horizontal;
      const yPosition = maxMdWidth ? skill.y.vertical : skill.y.horizontal;
      const skillLayer = skill.layer;
      const skillDelaay = skill.delay;

      return {
        hidden: {
          scale: 0,
          borderRadius: '0px',
          color:
            skill.label === 'Python'
              ? 'var(--background-dark)'
              : 'var(--secondary-color)',
          stroke:
            skill.label === 'Python'
              ? 'var(--secondary-color)'
              : 'var(--dark-fill)',
          x: xPosition,
          y: yPosition,
        },
        reveal: {
          scale: 1,
          color:
            skill.label === 'Python'
              ? 'var(--background-dark)'
              : 'var(--secondary-color)',
          stroke:
            skill.label === 'Python'
              ? 'var(--secondary-color)'
              : 'var(--dark-fill)',
          x: xPosition,
          y: yPosition,
          transition: {
            delay: skillDelaay || 0,
            duration: revealSkillDuration,
            ease: 'easeOut',
          },
        },
        visible: {
          scale: 1,
          color:
            skill.label === 'Python'
              ? 'var(--background-dark)'
              : 'var(--secondary-color)',
          stroke:
            skill.label === 'Python'
              ? 'var(--secondary-color)'
              : 'var(--dark-fill)',

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
                ? connectedHoveredIndexes.current.length - skillLayer + 1
                : 0),
          },
        },
      };
    },
    [maxMdWidth],
  );

  const polylinePoints = useMemo(() => {
    if (hoveredSkillIndex === null || !connectedHoveredIndexes.current)
      return '';

    const points = [];
    const hoveredSkill = skillsData[hoveredSkillIndex];

    points.push(
      `${maxMdWidth ? hoveredSkill.x.vertical : hoveredSkill.x.horizontal},${
        maxMdWidth ? hoveredSkill.y.vertical : hoveredSkill.y.horizontal
      }`,
    );

    connectedHoveredIndexes.current.forEach((connectedIndex) => {
      const skill = skillsData[connectedIndex];
      points.push(
        `${maxMdWidth ? skill.x.vertical : skill.x.horizontal},${
          maxMdWidth ? skill.y.vertical : skill.y.horizontal
        }`,
      );
    });

    return points.join(' ');
  }, [hoveredSkillIndex, connectedHoveredIndexes, maxMdWidth, skillsData]);

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

  const skillsOuterRingVariants: Variants = {
    hidden: {
      scale: 0.8,
      opacity: 0,
    },
    reveal: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: revealSkillDuration,
        ease: 'easeOut',
      },
    },
  };

  return (
    <InViewSection
      sectionName="Skills"
      onSectionInViewActiveCallback={(isInView) =>
        onSectionInViewActive('Skills', isInView)
      }
      onSectionInViewRevealCallback={onSectionInViewReveal}
      ref={ref}
      title="Skills"
      tooltipContent={
        isTouchDevice
          ? [
              'Click on a skill from the tree for more info.',
              'Heart meter indicates proficiency level (out of 5).',
            ]
          : [
              'Hover over a skill from the tree for more info.',
              'Heart meter indicates proficiency level (out of 5).',
            ]
      }
      tooltipPosition={maxSmWidth ? 'bottom-left' : 'left'}
    >
      <div className="skills-container">
        <motion.svg
          className="skills-svg-container"
          viewBox={`0 0 ${maxMdWidth ? shortSide : longSide} ${
            maxMdWidth ? longSide : shortSide
          }`}
          preserveAspectRatio="xMidYMid meet"
          animate={controls}
        >
          <motion.g
            variants={skillsOuterRingVariants}
            initial="hidden"
            animate={controls}
          >
            <SkillsOuterRing
              x={centerX - 152}
              y={centerY - 152}
              width="304"
              height="304"
              stroke="var(--dark-fill)"
            />
          </motion.g>
          <SkillsCenter
            isInitialMount={isInitialMount}
            controls={controls}
            hoveredSkillIndex={hoveredSkillIndex}
            centerX={centerX}
            centerY={centerY}
            centerCircleVariants={centerCircleVariants}
            centerCircleContentVariants={centerCircleContentVariants}
          />
          <g>
            {skillsData.map((skill, index) => {
              const connectedSkill =
                skill.connectedIndex !== undefined
                  ? skillsData[skill.connectedIndex]
                  : null;

              return (
                connectedSkill && (
                  <SkillLine
                    key={`line-${index}`}
                    skill={skill}
                    variants={getLineVariants(skill, connectedSkill)}
                    animate={controls}
                    connectedSkill={connectedSkill}
                  />
                )
              );
            })}
            <motion.polyline
              points={polylinePoints}
              fill="none"
              stroke="var(--dark-fill)"
              strokeWidth="6"
              animate={
                connectedHoveredIndexes?.current?.length ? 'visible' : 'hidden'
              }
              variants={polylineVariants}
            />
          </g>
          <g>
            {skillsData.map((skill, index) => (
              <SkillItem
                key={`icon-${index}`}
                skill={skill}
                index={index}
                isInitialMount={isInitialMount}
                hoveredSkillIndex={hoveredSkillIndex}
                connectedHoveredIndexes={connectedHoveredIndexes}
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
                getSkillVariants={getSkillVariants}
                getSkillItemVariants={getSkillItemVariants}
                controls={controls}
              />
            ))}
          </g>
        </motion.svg>
      </div>
    </InViewSection>
  );
});

Skills.displayName = 'Skills';

export default Skills;
