import { forwardRef } from 'react';
import './Hero.scss';
import { motion } from 'framer-motion';
import heroBackground from '../../../assets/images/hero-background.png';
import heroPortrait from '../../../assets/images/hero-portrait.png';
import InViewSection from '../InViewSection/InViewSection';
import useJYStore from '../../../store/useJYStore';

const Hero = forwardRef<HTMLElement>((props, ref) => {
  const handleScrollSection = useJYStore((state) => state.handleScrollSection);

  return (
    <InViewSection
      sectionKey="Home"
      onInViewChange={(isInView) => handleScrollSection('Home', isInView)}
      ref={ref}
    >
      <div
        className="hero-container"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <motion.div className="hero-text-container">
          <motion.div className="hero-text-hello">HELLO!</motion.div>
          <motion.span className="hero-text-im">I'm </motion.span>
          <motion.span className="hero-text-josh-young">
            Josh Young<span className="big-period">.</span>
          </motion.span>
          <motion.svg
            width="105"
            height="2"
            viewBox="0 0 105 2"
            xmlns="http://www.w3.org/2000/svg"
            className="hero-text-divider"
          >
            <motion.path
              d="M0 0 L105 0"
              stroke="#e4a53e"
              strokeWidth="3"
              fill="transparent"
              initial={{ pathLength: 0 }} // Initially, the path is not drawn
              animate={{ pathLength: 1 }} // Animates the path to full length
              transition={{
                duration: 2, // Duration of the animation
                ease: 'easeInOut',
              }}
            />
          </motion.svg>
          <motion.div className="hero-text-headline">
            A full-stack developer with design sense.
          </motion.div>
          <motion.button className="hero-contact-button">Contact</motion.button>
        </motion.div>
        <div className="hero-portrait-container">
          <img
            src={heroPortrait}
            alt="josh young portrait"
            className="hero-portrait"
          />
        </div>
      </div>
    </InViewSection>
  );
});

Hero.displayName = 'Hero';

export default Hero;
