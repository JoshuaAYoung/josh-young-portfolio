import { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import './HeroAnimatedPop.scss';
import { motion, useAnimation } from 'motion/react';
import heroBackground from '../../../assets/images/hero-background.png';
import heroPortraitDark from '../../../assets/images/hero-portrait-dark.png';
import heroPortraitLight from '../../../assets/images/hero-portrait-light.png';
import InViewSection from '../../molecules/InViewSection/InViewSection';
import useJYStore from '../../../store/useJYStore';
import RevealWrapper from '../../atoms/RevealWrapper/RevealWrapper';
import SwipeButton from '../../atoms/SwipeButton/SwipeButton';
import { useScrollToSection } from '../../../globalUtils/useScrollToSection';
import { useGetAnimations } from './heroAnimations';
import HeroCircle from '../../atoms/HeroCircle/HeroCircle';
import useMediaQuery from '../../../globalUtils/useMediaQuery';
import { breakpoints } from '../../../constants/breakpoints';

const HeroEasterEgg = forwardRef<HTMLElement>((props, ref) => {
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
  const minLgWidth = useMediaQuery(`(min-width: ${breakpoints['min-large']})`);
  const minMdWidth = useMediaQuery(`(min-width: ${breakpoints['min-medium']})`);

  // STATE
  const onSectionInViewActive = useJYStore(
    (state) => state.onSectionInViewActive,
  );
  const [isInViewReveal, setIsInViewReveal] = useState(false);
  const [showSwipeAnimations, setShowSwipeAnimations] = useState(false);
  const sectionRefs = useJYStore((state) => state.sectionRefs);
  const isDarkMode = useJYStore((state) => state.isDarkMode);

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
      controls.start('lastNameIn');
      await controls.start('lastNameGrow');
      await controls.start('lastNameSquish');
      controls.start('flingPeriod');
      setTimeout(() => {
        controls.start('periodBack');
        setShowSwipeAnimations(true);
      }, 2000);
    };

    sequence();
  }, [controls]);

  // FUNCTION(S)
  const onSectionInViewReveal = (isPartiallyOnScreen: boolean) => {
    if (isPartiallyOnScreen && !isInViewReveal) {
      setIsInViewReveal(true);
    }
  };

  const handleScrollToContact = () => {
    const contactRef = sectionRefs.Contact;
    const contactIndex = Object.keys(sectionRefs).indexOf('Contact');
    if (contactIndex !== -1) {
      scrollToSection(contactRef, contactIndex);
    }
  };

  // COMPUTED VAR(S)
  const buttonSize = useMemo(() => {
    if (minLgWidth) {
      return 'large';
    }
    if (minMdWidth) {
      return 'medium';
    }
    return 'small';
  }, [minLgWidth, minMdWidth]);

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
        className="hero-container-egg"
        style={
          {
            '--hero-background': `url(${heroBackground})`,
          } as React.CSSProperties
        }
        animate={controls}
        initial="initial"
      >
        <div className="hero-text-container-egg">
          <HeroCircle controls={controls} />
          <div className="hero-clip-path-container-egg">
            <motion.div
              className="hero-text-hello-egg"
              variants={helloVariants}
            >
              HELLO!
            </motion.div>
            <motion.div className="hero-text-im-egg" variants={imVariants}>
              I'm
            </motion.div>
            <motion.div className="hero-text-jy-egg" variants={jyVariants}>
              JY<span className="big-period">.</span>
            </motion.div>
            <motion.div
              className="hero-text-josh-egg"
              variants={firstNameVariants}
            >
              Josh
            </motion.div>
            <motion.div
              className="hero-text-young-egg"
              variants={lastNameVariants}
            >
              Young
              <motion.span className="big-period" variants={periodVariants}>
                .
              </motion.span>
            </motion.div>
          </div>
          <motion.div
            className="hero-text-divider-egg"
            variants={dividerVariants}
          />
          {showSwipeAnimations && (
            <div className="hero-swipe-container-egg">
              <div className="hero-text-headline-egg">
                <RevealWrapper isInView={isInViewReveal}>
                  A full-stack developer with design sense.
                </RevealWrapper>
              </div>
              <RevealWrapper isInView={isInViewReveal} extraMargin>
                <SwipeButton size={buttonSize} onClick={handleScrollToContact}>
                  CONTACT
                </SwipeButton>
              </RevealWrapper>
            </div>
          )}
        </div>
        <motion.div
          className="hero-portrait-container-egg"
          variants={portraitVariants}
        >
          <picture>
            {isDarkMode ? (
              <source srcSet={heroPortraitDark} />
            ) : (
              <source srcSet={heroPortraitLight} />
            )}
            <img
              src={isDarkMode ? heroPortraitDark : heroPortraitLight}
              alt="josh young portrait"
            />
          </picture>
        </motion.div>
      </motion.div>
    </InViewSection>
  );
});

HeroEasterEgg.displayName = 'HeroEasterEgg';

export default HeroEasterEgg;
