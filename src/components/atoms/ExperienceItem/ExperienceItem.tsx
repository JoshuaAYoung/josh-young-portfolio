import { useEffect } from 'react';

import { motion, useAnimation } from 'motion/react';
import './ExperienceItem.scss';
import { Experience } from '../../../types/experience.types';
import { useGetAnimations } from './experienceItemAnimations';

interface ExperienceItemProps {
  experience: Experience;
  hasLine: boolean;
  index: number;
  revealDuration: number;
  isInViewReveal: boolean;
}

const ExperienceItem = ({
  experience,
  hasLine = true,
  index,
  revealDuration,
  isInViewReveal,
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
  } = useGetAnimations({ revealDuration, revealDelay });

  // EFFECT(S)
  useEffect(() => {
    if (isInViewReveal) {
      controls.start('reveal');
    }
  }, [controls, isInViewReveal]);

  // COMPUTED VAR(S)
  // coordinate these with css variables
  const circleContainerDiameter = 30;
  const circleContainerRadius = circleContainerDiameter / 2;

  const computeDuration = (start: string, end: string): string => {
    const startDate = new Date(start);
    const endDate = end === 'Present' ? new Date() : new Date(end);
    const diffYears = endDate.getFullYear() - startDate.getFullYear();
    const diffMonths = endDate.getMonth() - startDate.getMonth() + 1; // Include the end month

    let years = diffYears;
    let months = diffMonths;

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    if (months >= 12) {
      years += Math.floor(months / 12);
      months %= 12;
    }

    const yearStr = years > 0 ? `${years} yr${years > 1 ? 's' : ''}` : '';
    const monthStr = months > 0 ? `${months} mo${months > 1 ? 's' : ''}` : '';

    return [yearStr, monthStr].filter(Boolean).join(' ');
  };

  const computedDuration = computeDuration(
    experience.dateStart,
    experience.dateEnd,
  );

  return (
    <div className="experience-item-container">
      <motion.div
        className="experience-item visible"
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
        >
          <p className="experience-item-year-range">
            {experience.yearRange.toUpperCase()}
          </p>
          <p className="experience-item-title">{experience.title}</p>
          <p className="experience-item-position-details">
            <span className="experience-item-company">
              {experience.company.toUpperCase()}
            </span>
            {` | ${experience.location} | ${experience.dateStart} - ${experience.dateEnd} (${computedDuration})`}
          </p>
          <p className="experience-item-description">
            {experience.description}
          </p>
        </motion.div>
        <motion.svg
          className="experience-item-triangle"
          width="14"
          height="28"
          viewBox="0 0 14 28"
          variants={triangleVariants}
        >
          <polygon points="14,0 14,28 0,14" />
        </motion.svg>
      </motion.div>
      {/* hidden copy of the paragraph to make height of section static */}
      <div className="experience-item hidden" aria-hidden="true">
        <div className="experience-item-paragraph">
          <p className="experience-item-year-range">
            {experience.yearRange.toUpperCase()}
          </p>
          <p className="experience-item-title">{experience.title}</p>
          <p className="experience-item-position-details">
            <span className="experience-item-company">
              {experience.company.toUpperCase()}
            </span>
            {` | ${experience.location} | ${experience.dateStart} - ${experience.dateEnd} (${computedDuration})`}
          </p>
          <p className="experience-item-description">
            {experience.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExperienceItem;
