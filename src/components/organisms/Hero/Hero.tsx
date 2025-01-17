import { forwardRef, useState } from 'react';
import './Hero.scss';
import { motion } from 'framer-motion';
import heroBackground from '../../../assets/images/hero-background.png';
import heroPortrait from '../../../assets/images/hero-portrait.png';
import InViewSection from '../../molecules/InViewSection/InViewSection';
import useJYStore from '../../../store/useJYStore';
import RevealWrapper from '../../atoms/RevealWrapper/RevealWrapper';
import SwipeButton from '../../atoms/SwipeButton/SwipeButton';
import { useScrollToSection } from '../../../utils/useScrollToSection';

const Hero = forwardRef<HTMLElement>((props, ref) => {
  // HOOK(S)
  const { scrollToSection } = useScrollToSection();

  // STATE
  const onSectionInViewActive = useJYStore(
    (state) => state.onSectionInViewActive,
  );
  const [isInViewReveal, setIsInViewReveal] = useState(false);
  const sectionRefs = useJYStore((state) => state.sectionRefs);

  // FUNCTION(S)
  const onSectionInViewReveal = (isPartiallyOnScreen: boolean) => {
    if (isPartiallyOnScreen && !isInViewReveal) {
      setIsInViewReveal(true);
    }
  };

  const handleScrollToPortfolio = () => {
    const contactRef = sectionRefs.Contact;
    const contactIndex = Object.keys(sectionRefs).indexOf('Contact');
    if (contactIndex !== -1) {
      scrollToSection(contactRef, contactIndex);
    }
  };

  return (
    <InViewSection
      sectionName="Home"
      onSectionInViewActiveCallback={(isInView) =>
        onSectionInViewActive('Home', isInView)
      }
      onSectionInViewRevealCallback={onSectionInViewReveal}
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
          <motion.div
            className="hero-text-divider"
            initial={{ width: 0 }}
            animate={{ width: '105px' }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 15,
            }}
          />
          <motion.div className="hero-text-headline">
            <RevealWrapper isInView={isInViewReveal}>
              A full-stack developer with design sense.
            </RevealWrapper>
          </motion.div>
          <RevealWrapper isInView={isInViewReveal} extraMargin>
            <SwipeButton large onClick={handleScrollToPortfolio}>
              CONTACT
            </SwipeButton>
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
