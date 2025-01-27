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
    portraitVariants,
  } = useGetAnimations();

  // STATE
  const onSectionInViewActive = useJYStore(
    (state) => state.onSectionInViewActive,
  );
  const [isInViewReveal, setIsInViewReveal] = useState(false);
  const [showSwipeAnimations, setShowSwipeAnimations] = useState(false);
  const sectionRefs = useJYStore((state) => state.sectionRefs);

  // COMPUTED VAR(S)
  const headlineStrings: { [key: string]: string } = {
    headlineOne: ' design sense.',
    headlineTwo: ' a pottery passion.',
    headlineThree: ' twin daughters.',
    headlineFour: ' controller skills.',
    headlineFive: ' bookish vibes.',
    headlineSix: ' 3d printer chops.',
    headlineSeven: ' a lot of hobbies.',
  };

  const slowTypingSpeed = 0.1;
  const fastTypingSpeed = 0.05;
  const fastErasingSpeed = 0.03;

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

  const infiniteTypingSequence = () => {
    let index = 0; // To track the current string

    const asyncSequence = async () => {
      const variantKey = Object.keys(headlineStrings)[index];

      await controls.start(`${variantKey}Type`);
      if (index === 0) {
        setShowSwipeAnimations(true);
      }
      await controls.start('blinkingHeadlineLong');
      await controls.start(`${variantKey}Erase`);
      await new Promise((resolve) => {
        setTimeout(resolve, 500);
      });

      index = (index + 1) % Object.keys(headlineStrings).length;
      asyncSequence();
    };

    asyncSequence(); // Start the loop
  };

  // EFFECT(S)
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;

    const sequence = async () => {
      controls.start('initial');
      await controls.start('blinkingTextLong');
      controls.start('dividerGrow');
      await controls.start('helloType');
      await controls.start('blinkingTextShort');
      await controls.start('imType');
      await controls.start('joshType');
      await controls.start('youngType');
      controls.start('portraitFadeIn');
      await controls.start('blinkingTextShort');
      await controls.start('headlineFirstType');
      await controls.start('headlineWithType');

      infiniteTypingSequence();
    };

    sequence();
  }, [controls]);

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
              variants={getTypeStaggerVariants('helloType', slowTypingSpeed)}
            >
              {'HELLO!'.split('').map((letter, index) => (
                <motion.span
                  key={index}
                  variants={getLetterVariants('helloType', slowTypingSpeed)}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.div>
            <motion.br variants={getBreakVariants('imType')} />
            <motion.div
              className="hero-text-im"
              variants={getTypeStaggerVariants('imType', slowTypingSpeed)}
            >
              {"I'm ".split('').map((letter, index) => (
                <motion.span
                  key={index}
                  variants={getLetterVariants('imType', slowTypingSpeed)}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              ))}
            </motion.div>
            <motion.div
              className="hero-text-josh"
              variants={getTypeStaggerVariants('joshType', slowTypingSpeed)}
            >
              {'Josh'.split('').map((letter, index) => (
                <motion.span
                  key={index}
                  variants={getLetterVariants('joshType', slowTypingSpeed)}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.div>
            <motion.br variants={getBreakVariants('youngType')} />
            <motion.div
              className="hero-text-young"
              variants={getTypeStaggerVariants('youngType', slowTypingSpeed)}
            >
              {'Young.'.split('').map((letter, index) => (
                <motion.span
                  key={index}
                  variants={getLetterVariants('youngType', slowTypingSpeed)}
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
                variants={getTypeStaggerVariants(
                  'headlineFirstType',
                  fastTypingSpeed,
                )}
              >
                {'A full-stack developer'.split('').map((letter, index) => (
                  <motion.span
                    key={index}
                    variants={getLetterVariants(
                      'headlineFirstType',
                      fastTypingSpeed,
                    )}
                    className="hero-letter"
                  >
                    {letter}
                  </motion.span>
                ))}
              </motion.div>
              <motion.br variants={getBreakVariants('headlineWithType')} />
              <motion.div
                className="hero-text-headline"
                variants={getTypeStaggerVariants(
                  'headlineWithType',
                  fastTypingSpeed,
                )}
              >
                {'with'.split('').map((letter, index) => (
                  <motion.span
                    key={index}
                    variants={getLetterVariants(
                      'headlineWithType',
                      fastTypingSpeed,
                    )}
                    className="hero-letter"
                  >
                    {letter}
                  </motion.span>
                ))}
              </motion.div>
              {Object.keys(headlineStrings).map((variantKey, index) => (
                <motion.div
                  className="hero-text-headline"
                  variants={getTypeStaggerVariants(
                    `${variantKey}Type`,
                    fastTypingSpeed,
                    `${variantKey}Erase`,
                    fastErasingSpeed,
                  )}
                  key={`headline-word-${index}`}
                >
                  {headlineStrings[variantKey as keyof typeof headlineStrings]
                    .split('')
                    .map((letter, index) => (
                      <motion.span
                        key={`headline-letter-${index}`}
                        variants={getLetterVariants(
                          `${variantKey}Type`,
                          fastTypingSpeed,
                          `${variantKey}Erase`,
                          fastErasingSpeed,
                        )}
                        className="hero-letter"
                      >
                        {letter === ' ' ? '\u00A0' : letter}
                      </motion.span>
                    ))}
                </motion.div>
              ))}
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
