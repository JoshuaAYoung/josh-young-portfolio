import { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import './HeroAnimatedTyping.scss';
import { motion, useAnimation, Variants } from 'motion/react';
import heroBackground from '../../../assets/images/hero-background.png';
import heroPortrait from '../../../assets/images/hero-portrait.png';
import InViewSection from '../../molecules/InViewSection/InViewSection';
import useJYStore from '../../../store/useJYStore';
import RevealWrapper from '../../atoms/RevealWrapper/RevealWrapper';
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

// above 202
// lg 164
// md 138
// sm 106

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
    initialContainerVariants,
  } = useGetAnimations();
  const aboveLg = useMediaQuery(`(min-width: ${breakpoints['min-large']})`);
  const md = useMediaQuery(`(max-width: ${breakpoints['max-medium']})`);
  const sm = useMediaQuery(`(max-width: ${breakpoints['max-small']})`);

  // STATE
  const onSectionInViewActive = useJYStore(
    (state) => state.onSectionInViewActive,
  );
  const activeSection = useJYStore((state) => state.activeSection);
  const [showSwipeAnimations, setShowSwipeAnimations] = useState(false);
  const [firstHeadlineText, setFirstHeadlineText] = useState(
    'A full-stack developer',
  );
  const [secondHeadlineText, setSecondHeadlineText] = useState('with ');
  const sectionRefs = useJYStore((state) => state.sectionRefs);

  console.log('activeSection', activeSection);

  // COMPUTED VAR(S)
  const headlineStrings: { [key: string]: string } = {
    headlineOne: 'design sense.',
    headlineTwo: 'a pottery obsession.',
    headlineThree: 'twin dad vibes.',
    headlineFour: 'controller skills.',
    headlineFive: 'bookish vibes.',
    headlineSix: '3d printer chops.',
  };

  const slowTypingSpeed = 0.1;
  const fastTypingSpeed = 0.05;
  const fastErasingSpeed = 0.03;

  const buttonSize = useMemo(() => {
    if (aboveLg) {
      return 'large';
    }
    if (md) {
      return 'medium';
    }
    return 'small';
  }, [aboveLg, md]);

  // FUNCTION(S)
  const handleScrollToPortfolio = () => {
    const contactRef = sectionRefs.Contact;
    const contactIndex = Object.keys(sectionRefs).indexOf('Contact');
    if (contactIndex !== -1) {
      scrollToSection(contactRef, contactIndex);
    }
  };

  const startHeadlineAnimationLoop = () => {
    let loopCounter = 0;
    let index = 0;

    const asyncSequence = async () => {
      const times = 4;
      // const times = Object.keys(headlineStrings).length * 1 + 1;
      if (loopCounter >= times) return; // Stop after 'times' loops

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
      loopCounter += 1;
      asyncSequence();
    };

    asyncSequence();
  };

  // EFFECT(S)
  useEffect(() => {
    // if (mounted.current) return;
    // mounted.current = true;

    const sequence = async () => {
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
      await sequence();
    };

    runSequence();
  }, [controls, activeSection]);

  useEffect(() => {
    if (sm) {
      setFirstHeadlineText('A full-stack');
      setSecondHeadlineText('developer with');
    }
  }, [sm]);

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
              {sm && (
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
            {showSwipeAnimations && (
              <RevealWrapper isInView extraMargin>
                <SwipeButton
                  size={buttonSize}
                  onClick={handleScrollToPortfolio}
                >
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
