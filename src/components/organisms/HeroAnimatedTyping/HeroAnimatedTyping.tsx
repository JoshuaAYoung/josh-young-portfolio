import { forwardRef, useEffect, useRef, useState } from 'react';
import './HeroAnimatedTyping.scss';
import { motion, useAnimation, Variants } from 'framer-motion';
import heroBackground from '../../../assets/images/hero-background.png';
import heroPortrait from '../../../assets/images/hero-portrait.png';
import InViewSection from '../../molecules/InViewSection/InViewSection';
import useJYStore from '../../../store/useJYStore';
import RevealWrapper from '../../atoms/RevealWrapper/RevealWrapper';
import SwipeButton from '../../atoms/SwipeButton/SwipeButton';
import { useScrollToSection } from '../../../utils/useScrollToSection';
import { useGetAnimations } from './heroAnimations';

const BlinkingCursor = ({ variants }: { variants: Variants }) => {
  return (
    <div className="hero-cursor-container">
      <motion.div variants={variants} className="hero-cursor" />
    </div>
  );
};

const Hero = forwardRef<HTMLElement>((_props, ref) => {
  // HOOK(S)
  const { scrollToSection } = useScrollToSection();
  const controls = useAnimation();
  const mounted = useRef(false);
  const {
    containerVariants,
    getLetterVariants,
    getTypeStaggerVariants,
    getBreakVariants,
    cursorTextVariants,
    dividerVariants,
    cursorHeadlineVariants,
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
    if (mounted.current) return; // Prvariant starting animation if already mounted
    mounted.current = true;

    const sequence = async () => {
      controls.start('initial');
      await controls.start('blinkingStart');
      controls.start('dividerGrow');
      await controls.start('helloType');
      await new Promise((resolve) => {
        setTimeout(resolve, 500);
      });
      await controls.start('imType');
      await controls.start('joshType');
      await controls.start('youngType');
      await controls.start('headlineFirstType');
      await controls.start('headlineSecondType');
      setShowSwipeAnimations(true);
      controls.start('blinkingInfinite');
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
          <motion.div
            className="hero-clip-path-container"
            variants={containerVariants}
          >
            <motion.div
              className="hero-text-hello"
              variants={getTypeStaggerVariants('helloType', 0.1)}
            >
              {'HELLO!'.split('').map((letter, index) => (
                <motion.span
                  key={index}
                  variants={getLetterVariants('helloType', 0.1)}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.div>
            <motion.br variants={getBreakVariants('imType')} />
            <motion.div
              className="hero-text-im"
              variants={getTypeStaggerVariants('imType', 0.1)}
            >
              {"I'm ".split('').map((letter, index) => (
                <motion.span
                  key={index}
                  variants={getLetterVariants('imType', 0.1)}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              ))}
            </motion.div>
            <motion.div
              className="hero-text-josh"
              variants={getTypeStaggerVariants('joshType', 0.1)}
            >
              {'Josh'.split('').map((letter, index) => (
                <motion.span
                  key={index}
                  variants={getLetterVariants('joshType', 0.1)}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.div>
            <motion.br variants={getBreakVariants('youngType')} />
            <motion.div
              className="hero-text-young"
              variants={getTypeStaggerVariants('youngType', 0.1)}
            >
              {'Young.'.split('').map((letter, index) => (
                <motion.span
                  key={index}
                  variants={getLetterVariants('youngType', 0.1)}
                  className={
                    index === 5 ? 'hero-letter big-period' : 'hero-letter'
                  }
                >
                  {letter}
                </motion.span>
              ))}
            </motion.div>
            <BlinkingCursor variants={cursorTextVariants} />
          </motion.div>
          <motion.div
            className="hero-text-divider"
            variants={dividerVariants}
          />

          <div className="hero-bottom-section">
            <div className="hero-headline-container">
              <motion.div
                className="hero-text-headline"
                variants={getTypeStaggerVariants('headlineFirstType', 0.05)}
              >
                {'A full-stack developer'.split('').map((letter, index) => (
                  <motion.span
                    key={index}
                    variants={getLetterVariants('headlineFirstType', 0.05)}
                    className="hero-letter"
                  >
                    {letter}
                  </motion.span>
                ))}
              </motion.div>
              <motion.br variants={getBreakVariants('headlineSecondType')} />
              <motion.div
                className="hero-text-headline"
                variants={getTypeStaggerVariants('headlineSecondType', 0.05)}
              >
                {'with design sense.'.split('').map((letter, index) => (
                  <motion.span
                    key={index}
                    variants={getLetterVariants('headlineSecondType', 0.05)}
                    className="hero-letter"
                  >
                    {letter}
                  </motion.span>
                ))}
              </motion.div>
              <BlinkingCursor variants={cursorHeadlineVariants} />
            </div>
            {showSwipeAnimations && (
              <RevealWrapper isInView={isInViewReveal} extraMargin>
                <SwipeButton large onClick={handleScrollToPortfolio}>
                  CONTACT
                </SwipeButton>
              </RevealWrapper>
            )}
          </div>
        </div>
        <motion.div className="hero-portrait-container">
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
