import { ReactNode, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import './ExperienceItem.scss';
import useJYStore from '../../../store/useJYStore';
import { Experience } from '../../../types/experience.types';

interface ExperienceItemProps {
  experience: Experience;
}

const ExperienceItem = ({ experience }: ExperienceItemProps) => {
  const mainControls = useAnimation();
  const slideControls = useAnimation();

  const variants = {
    initial: { opacity: 0, y: 20 },
    hover: { opacity: 1, y: 0 },
  };

  const circleVariants = {
    initial: { borderColor: '#000' },
    hover: { borderColor: '#f0a53e' },
  };

  // TODO move all of these inline styles to scss
  // TODO figure out left side year (just start year? Kind of weird)
  // TODO all copy in experience.json
  // TODO Figure out how to animate the circle per VOLOS
  // TODO add all of the copy from experiences prop
  return (
    <motion.div
      className="experience-item-container"
      whileHover="hover" // Triggers the "hover" variant
      initial="initial"
      style={{
        padding: '2rem',
        backgroundColor: '#e4e4e4',
        borderRadius: '8px',
      }}
    >
      <motion.div
        className="child"
        variants={variants} // Child reacts to parent's hover state
        style={{
          padding: '1rem',
          backgroundColor: '#f0a53e',
          borderRadius: '4px',
        }}
      >
        {experience.dateStart}
      </motion.div>
      <motion.svg
        width="35"
        height="35"
        viewBox="0 0 35 35"
        initial="initial"
        whileHover="hover"
        variants={circleVariants}
        style={{
          border: '2px solid',
          borderRadius: '50%',
        }}
      >
        <motion.circle cx="17.5" cy="17.5" r="16.5" fill="none" />
      </motion.svg>
    </motion.div>
  );
};

export default ExperienceItem;
