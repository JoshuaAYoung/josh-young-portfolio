import { forwardRef, useEffect, useRef, useState } from 'react';
import './AnimatedHero.scss';
import { motion, useAnimation } from 'framer-motion';
import heroBackground from '../../../assets/images/hero-background.png';
import heroPortrait from '../../../assets/images/hero-portrait.png';
import InViewSection from '../../molecules/InViewSection/InViewSection';
import useJYStore from '../../../store/useJYStore';
import RevealWrapper from '../../atoms/RevealWrapper/RevealWrapper';
import SwipeButton from '../../atoms/SwipeButton/SwipeButton';
import { useScrollToSection } from '../../../utils/useScrollToSection';
import { useGetAnimations } from './heroAnimations';

const Hero = forwardRef<HTMLElement>((props, ref) => {
  // HOOK(S)
  const { scrollToSection } = useScrollToSection();
  const controls = useAnimation();
  const mounted = useRef(false);
  const {
    helloVariants,
    imVariants,
    jyVariants,
    firstNameVariants,
    lastNameVariants,
    periodVariants,
    dividerVariants,
    portraitVariants,
  } = useGetAnimations();

  // STATE
  const onSectionInViewActive = useJYStore(
    (state) => state.onSectionInViewActive,
  );
  const [isInViewReveal, setIsInViewReveal] = useState(false);
  const [showSwipeAnimations, setShowSwipeAnimations] = useState(false);
  const sectionRefs = useJYStore((state) => state.sectionRefs);

  // EFFECT(S)
  useEffect(() => {
    if (mounted.current) return; // Prevent starting animation if already mounted
    mounted.current = true;

    const sequence = async () => {
      await controls.start('initial');
      await Promise.all([
        controls.start('dividerIn'),
        controls.start('helloIn'),
      ]);
      controls.start('helloUp');
      await controls.start('imIn');
      await controls.start('jyIn');
      await controls.start('lastNameIn');
      // await controls.start('end');
      setShowSwipeAnimations(true); // Show the "delete-me" div after the initial animations
    };

    sequence();
  }, [controls]);

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

  // ANIMATION(S)

  return (
    <InViewSection
      sectionName="Home"
      onSectionInViewActiveCallback={(isInView) =>
        onSectionInViewActive('Home', isInView)
      }
      onSectionInViewRevealCallback={onSectionInViewReveal}
      ref={ref}
    >
      <motion.div
        className="hero-container"
        style={
          {
            '--hero-background': `url(${heroBackground})`,
          } as React.CSSProperties
        }
        animate={controls}
        initial="initial"
      >
        <div className="hero-text-container">
          <motion.div className="hero-text-hello" variants={helloVariants}>
            HELLO!
          </motion.div>
          <motion.div className="hero-text-im" variants={imVariants}>
            I'm
          </motion.div>
          <motion.div className="hero-text-jy" variants={jyVariants}>
            JY
          </motion.div>
          <motion.div className="hero-text-josh" variants={firstNameVariants}>
            Josh
          </motion.div>
          <motion.div className="hero-text-young" variants={lastNameVariants}>
            Young
          </motion.div>
          <motion.div
            className="hero-text-period big-period"
            variants={periodVariants}
          >
            .
          </motion.div>
          <motion.div
            className="hero-text-divider"
            variants={dividerVariants}
          />
          {showSwipeAnimations && false && (
            <div className="delete-me">
              <div className="hero-text-headline">
                <RevealWrapper isInView={isInViewReveal}>
                  A full-stack developer with design sense.
                </RevealWrapper>
              </div>
              <RevealWrapper isInView={isInViewReveal} extraMargin>
                <SwipeButton large onClick={handleScrollToPortfolio}>
                  CONTACT
                </SwipeButton>
              </RevealWrapper>
            </div>
          )}
        </div>
        <motion.div
          className="hero-portrait-container"
          variants={portraitVariants}
        >
          <img
            src={heroPortrait}
            alt="josh young portrait"
            className="hero-portrait"
          />
        </motion.div>
      </motion.div>
    </InViewSection>
  );
});

Hero.displayName = 'Hero';

export default Hero;
