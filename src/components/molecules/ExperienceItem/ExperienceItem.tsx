import { useEffect } from 'react';

import { motion, useAnimation } from 'framer-motion';
import './ExperienceItem.scss';
import { Experience } from '../../../types/experience.types';
import { useGetTransitions } from './animations';

interface ExperienceItemProps {
  experience: Experience;
  hasLine: boolean;
  index: number;
  revealDuration: number;
}

const ExperienceItem = ({
  experience,
  hasLine = true,
  index,
  revealDuration,
}: ExperienceItemProps) => {
  // HOOK(S)
  const controls = useAnimation();

  // 0.2 gives a slight pause between the reveal
  const revealDelay = index * (revealDuration + 0.2);
  const {
    pulseCircleVariants,
    lineVariants,
    paragraphVariants,
    triangleVariants,
    circleContainerVariants,
    hoverCircleVariants,
  } = useGetTransitions({ revealDuration, revealDelay });

  // EFFECT(S)
  useEffect(() => {
    const startAnimation = async () => {
      await controls.start('reveal');
      controls.start('hoverOut');
    };
    startAnimation();
  }, [controls]);

  // COMPUTED VAR(S)
  // coordinate these with css variables
  const circleContainerDiameter = 30;
  const circleContainerRadius = circleContainerDiameter / 2;

  return (
    <motion.div
      className="experience-item-container"
      initial="initial"
      animate={controls}
      whileHover="hoverIn"
    >
      <div className="experience-item-circle-container">
        <motion.svg
          viewBox={`0 0 ${circleContainerDiameter} ${circleContainerDiameter}`}
          width={circleContainerDiameter}
          height={circleContainerDiameter}
          variants={circleContainerVariants}
        >
          <motion.circle
            cx={circleContainerRadius}
            cy={circleContainerRadius}
            r="10"
            className="experience-item-pulse-circle"
            variants={pulseCircleVariants}
          />
          <circle
            cx={circleContainerRadius}
            cy={circleContainerRadius}
            r="10"
            className="experience-item-base-circle"
          />
          <motion.circle
            cx={circleContainerRadius}
            cy={circleContainerRadius}
            r="6"
            className="experience-item-hover-circle"
            variants={hoverCircleVariants}
          />
        </motion.svg>
        {hasLine && (
          <motion.svg
            className="experience-item-line"
            variants={lineVariants}
            initial="initial"
            animate={controls}
          >
            <line x1="1" y1="0" x2="1" y2="100%" />
          </motion.svg>
        )}
      </div>
      <motion.div
        className="experience-item-paragraph"
        variants={paragraphVariants}
        initial="initial"
        animate={controls}
        whileHover="hoverIn"
      >
        <p className="experience-item-year-range">
          {experience.yearRange.toUpperCase()}
        </p>
        <p className="experience-item-title">{experience.title}</p>
        <p className="experience-item-company-details">
          {`${experience.company.toUpperCase()} | ${experience.location} | ${
            experience.dateRange
          }`}
        </p>
        <p className="experience-item-description">{experience.description}</p>
      </motion.div>
      <motion.svg
        className="experience-item-triangle"
        width="14"
        height="28"
        viewBox="0 0 14 28"
        variants={triangleVariants}
        // animate={controls}
      >
        <polygon points="14,0 14,28 0,14" />
      </motion.svg>
    </motion.div>
  );
};

export default ExperienceItem;
