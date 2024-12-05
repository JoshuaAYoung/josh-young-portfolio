import { forwardRef, useState } from 'react';
import './Hero.scss';
import { motion } from 'framer-motion';
import heroBackground from '../../../assets/images/hero-background.png';
import heroPortrait from '../../../assets/images/hero-portrait.png';
import InViewSection from '../../molecules/InViewSection/InViewSection';
import useJYStore from '../../../store/useJYStore';
import RevealWrapper from '../../atoms/RevealWrapper/RevealWrapper';
import SwipeButton from '../../atoms/SwipeButton/SwipeButton';

const Hero = forwardRef<HTMLElement>((props, ref) => {
  // STATE
  const onSectionInViewScroll = useJYStore(
    (state) => state.onSectionInViewScroll,
  );
  const [isInViewReveal, setIsInViewReveal] = useState(false);

  if (isInViewReveal) {
    console.log('Hero is revealed!');
  }

  // FUNCTION(S)
  const onSectionInViewReveal = (isPartiallyOnScreen: boolean) => {
    if (isPartiallyOnScreen && !isInViewReveal) {
      setIsInViewReveal(true);
    }
  };

  return (
    <InViewSection
      sectionName="Home"
      onSectionInViewScroll={(isInView) =>
        onSectionInViewScroll('Home', isInView)
      }
      onSectionInViewReveal={onSectionInViewReveal}
      ref={ref}
    >
      <div
        className="hero-container"
        style={
          {
            '--hero-background': `url(${heroBackground})`,
          } as React.CSSProperties
        }
      >
        <motion.div className="hero-text-container">
          <motion.div className="hero-text-hello">HELLO!</motion.div>
          <motion.span className="hero-text-im">I'm </motion.span>
          <motion.span className="hero-text-josh-young">
            Josh Young<span className="big-period">.</span>
          </motion.span>
          <motion.svg // TODO this seems like major overkill, maybe we do this with css?
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
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 2,
                ease: 'easeInOut',
              }}
            />
          </motion.svg>
          <motion.div className="hero-text-headline">
            <RevealWrapper isInView={isInViewReveal}>
              A full-stack developer with design sense.
            </RevealWrapper>
          </motion.div>
          <RevealWrapper
            isInView={isInViewReveal}
            containerClassName="hero-contact-button-wrapper"
          >
            <SwipeButton>CONTACT</SwipeButton>
          </RevealWrapper>
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
