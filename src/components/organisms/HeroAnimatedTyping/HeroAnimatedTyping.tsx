import { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import './HeroAnimatedTyping.scss';
import { motion, useAnimation, Variants } from 'motion/react';
import heroBackground from '../../../assets/images/hero-background.png';
import heroPortraitDark from '../../../assets/images/hero-portrait-dark.png';
import heroPortraitLight from '../../../assets/images/hero-portrait-light.png';
import InViewSection from '../../molecules/InViewSection/InViewSection';
import useJYStore from '../../../store/useJYStore';
import SwipeButton from '../../atoms/SwipeButton/SwipeButton';
import { useScrollToSection } from '../../../globalUtils/useScrollToSection';
import { useGetAnimations } from './heroAnimations';
import useMediaQuery from '../../../globalUtils/useMediaQuery';
import { breakpoints } from '../../../constants/breakpoints';

const BlinkingCursor = ({
  cursorVariants,
  initialContainerVariants,
}: {
  cursorVariants: Variants;
  initialContainerVariants?: Variants;
}) => {
  return (
    <motion.div
      variants={initialContainerVariants}
      className="hero-cursor-container"
    >
      <motion.div variants={cursorVariants} className="hero-cursor" />
    </motion.div>
  );
};

const Hero = forwardRef<HTMLElement>((_props, ref) => {
  // HOOK(S)
  const { scrollToSection } = useScrollToSection();
  const controls = useAnimation();
  const isTextLoopFinished = useRef(true);
  const isMainAnimationFinished = useRef(false);
  const isMainAnimationRunning = useRef(false);
  const textLoopIndex = useRef(0);
  const textLoopFullCounter = useRef(0);

  const {
    containerVariants,
    getLetterVariants,
    getTypeStaggerVariants,
    getBreakVariants,
    cursorTextVariants,
    dividerVariants,
    cursorHeadlineVariants,
    portraitVariants,
    initialContainerVariants,
    contactButtonVariants,
  } = useGetAnimations();
  const maxMdWidth = useMediaQuery(`(max-width: ${breakpoints['max-medium']})`);
  const maxSmWidth = useMediaQuery(`(max-width: ${breakpoints['max-small']})`);
  const maxSmHeight = useMediaQuery(
    `(max-height: ${breakpoints['max-sm-height']})`,
  );

  // STATE
  const onSectionInViewActive = useJYStore(
    (state) => state.onSectionInViewActive,
  );
  const activeSection = useJYStore((state) => state.activeSection);
  const isDarkMode = useJYStore((state) => state.isDarkMode);
  const [firstHeadlineText, setFirstHeadlineText] = useState(
    'A full-stack developer',
  );
  const [secondHeadlineText, setSecondHeadlineText] = useState('with ');
  const sectionRefs = useJYStore((state) => state.sectionRefs);

  // COMPUTED VAR(S)
  const headlineStrings: { [key: string]: string } = {
    headlineOne: 'design sense.',
    headlineTwo: 'pottery skills.',
    headlineThree: 'twin dad vibes.',
    headlineFour: 'controller finesse.',
    headlineFive: 'a reading habit.',
    headlineSix: '3d printer chops.',
  };

  const slowTypingSpeed = 0.1;
  const fastTypingSpeed = 0.05;
  const fastErasingSpeed = 0.03;

  const buttonSize = useMemo(() => {
    if (maxSmWidth || maxSmHeight) {
      return 'small';
    }
    if (maxMdWidth) {
      return 'medium';
    }
    return 'large';
  }, [maxSmWidth, maxSmHeight, maxMdWidth]);

  // FUNCTION(S)
  const handleScrollToContact = () => {
    const contactRef = sectionRefs.Contact;
    const contactIndex = Object.keys(sectionRefs).indexOf('Contact');
    if (contactIndex !== -1) {
      scrollToSection(contactRef, contactIndex);
    }
  };

  const startHeadlineAnimationLoop = async () => {
    // first, if we're finished with 1 or more animations and the animation is done, we need to erase
    if (isTextLoopFinished.current && textLoopFullCounter.current !== 0) {
      await controls.start(
        `${Object.keys(headlineStrings)[textLoopIndex.current]}Erase`,
      );

      await new Promise((resolve) => {
        setTimeout(resolve, 500);
      });

      textLoopIndex.current =
        (textLoopIndex.current + 1) % Object.keys(headlineStrings).length;
    }

    let loopCounter = 0;
    isTextLoopFinished.current = false;

    const asyncSequence = async () => {
      const times = Object.keys(headlineStrings).length * 1;
      if (loopCounter >= times) return;

      const variantKey = Object.keys(headlineStrings)[textLoopIndex.current];
      await controls.start(`${variantKey}Type`);

      if (textLoopIndex.current === 0) {
        controls.start('contactReveal');
      }

      if (loopCounter >= times - 1) {
        isTextLoopFinished.current = true;
        loopCounter += 1;
        controls.start('blinkingHeadlineOff');
        return;
      }

      await controls.start('blinkingHeadlineLong');

      await controls.start(`${variantKey}Erase`);

      await new Promise((resolve) => {
        setTimeout(resolve, 500);
      });
      // loop counter incremented to restart at first string
      textLoopIndex.current =
        (textLoopIndex.current + 1) % (Object.keys(headlineStrings).length + 1);
      loopCounter += 1;
      asyncSequence();
    };

    asyncSequence();
    textLoopFullCounter.current += 1;
  };

  // EFFECT(S)
  useEffect(() => {
    const sequence = async () => {
      isMainAnimationRunning.current = true;
      controls.stop();
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
    };

    const runSequence = async () => {
      if (!isMainAnimationFinished.current && !isMainAnimationRunning.current) {
        await sequence();
      }

      // trigger the headline animation loop if activeSection is 'Home'
      if (
        activeSection === 'Home' &&
        isTextLoopFinished.current &&
        isMainAnimationFinished.current
      ) {
        startHeadlineAnimationLoop();
      }
    };

    runSequence();
  }, [controls, activeSection]);

  useEffect(() => {
    if (maxSmWidth) {
      setFirstHeadlineText('A full-stack');
      setSecondHeadlineText('developer with');
    }
  }, [maxSmWidth]);

  return (
    <InViewSection
      sectionName="Home"
      onSectionInViewActiveCallback={(isInView) =>
        onSectionInViewActive('Home', isInView)
      }
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
          <motion.div variants={containerVariants}>
            <motion.div
              className="hero-text-hello"
              variants={getTypeStaggerVariants(
                'helloType',
                slowTypingSpeed,
                undefined,
                undefined,
                'inline-block',
              )}
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
            <BlinkingCursor
              cursorVariants={cursorTextVariants}
              initialContainerVariants={initialContainerVariants}
            />
          </motion.div>
          <div className="hero-bottom-section">
            <motion.div
              className="hero-text-divider"
              variants={dividerVariants}
            />
            <div className="hero-headline-container">
              <motion.div
                variants={getTypeStaggerVariants(
                  'headlineFirstType',
                  fastTypingSpeed,
                )}
              >
                {firstHeadlineText.split('').map((letter, index) => (
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
              {/* TODO Get rid of this BR and combine "with" with the rest of the headline? */}
              <motion.br variants={getBreakVariants('headlineWithType')} />
              <motion.div
                variants={getTypeStaggerVariants(
                  'headlineWithType',
                  fastTypingSpeed,
                )}
                onAnimationComplete={(definition) => {
                  if (definition === 'headlineWithType') {
                    isMainAnimationFinished.current = true;
                    isMainAnimationRunning.current = false;
                  }
                }}
              >
                {secondHeadlineText.split('').map((letter, index) => (
                  <motion.span
                    key={index}
                    variants={getLetterVariants(
                      'headlineWithType',
                      fastTypingSpeed,
                    )}
                    className="hero-letter"
                  >
                    {letter === ' ' ? '\u00A0' : letter}
                  </motion.span>
                ))}
              </motion.div>
              {maxSmWidth && (
                <motion.br variants={getBreakVariants('headlineOneType')} />
              )}
              {Object.keys(headlineStrings).map((variantKey, index) => (
                <motion.div
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
              <BlinkingCursor cursorVariants={cursorHeadlineVariants} />
            </div>
            <motion.div variants={contactButtonVariants}>
              <SwipeButton size={buttonSize} onClick={handleScrollToContact}>
                CONTACT
              </SwipeButton>
            </motion.div>
          </div>
        </div>
        <motion.div
          className="hero-portrait-container"
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

Hero.displayName = 'Hero';

export default Hero;
