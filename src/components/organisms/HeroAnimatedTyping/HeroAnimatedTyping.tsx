import { forwardRef, useEffect, useRef, useState } from 'react';
import './HeroAnimatedTyping.scss';
import { motion, steps, useAnimation, Variants } from 'framer-motion';
import heroBackground from '../../../assets/images/hero-background.png';
import heroPortrait from '../../../assets/images/hero-portrait.png';
import InViewSection from '../../molecules/InViewSection/InViewSection';
import useJYStore from '../../../store/useJYStore';
import RevealWrapper from '../../atoms/RevealWrapper/RevealWrapper';
import SwipeButton from '../../atoms/SwipeButton/SwipeButton';
import { useScrollToSection } from '../../../utils/useScrollToSection';
import { useGetAnimations } from './heroAnimations';

const Hero = forwardRef<HTMLElement>((_props, ref) => {
  // HOOK(S)
  const { scrollToSection } = useScrollToSection();
  const controls = useAnimation();
  const mounted = useRef(false);
  // const { helloVariants, dividerVariants, cursorVariants } = useGetAnimations();

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
      await controls.start('headlineType');
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

  // ANIMATION(S)
  const containerVariants = {
    initial: { y: 155 },
    imType: {
      y: 82,
      transition: {
        duration: 0,
      },
    },
    youngType: {
      y: 0,
      transition: {
        duration: 0,
      },
    },
  };

  const getLetterVariants = (variantName: string): Variants => {
    return {
      initial: { display: 'none' },
      [variantName]: {
        display: 'inline',
        transition: { duration: 0.1 },
      },
    };
  };

  const getTypeStaggerVariants = (variantName: string): Variants => {
    return {
      initial: { display: 'none' },
      [variantName]: {
        display: 'inline-block',
        transition: {
          staggerChildren: 0.1,
        },
      },
    };
  };

  const getBreakVariants = (variantName: string): Variants => {
    return {
      initial: { display: 'none' },
      [variantName]: {
        display: 'block',
        transition: {
          duration: 0,
        },
      },
    };
  };

  const cursorVariants: Variants = {
    initial: {
      height: '3.6rem',
      y: 5,
    },
    blinkingStart: {
      opacity: [0, 0, 1, 1],
      transition: {
        duration: 1,
        repeat: 1,
        repeatDelay: 0,
        ease: 'linear',
        times: [0, 0.5, 0.5, 1],
      },
    },
    imType: {
      height: '6.5rem',
      y: 10,
      transition: {
        duration: 0,
      },
    },
    blinkingInfinite: {
      opacity: [0, 0, 1, 1],
      transition: {
        duration: 1,
        repeat: Infinity,
        repeatDelay: 0,
        ease: 'linear',
        times: [0, 0.5, 0.5, 1],
      },
    },
  };

  const dividerVariants: Variants = {
    initial: { width: 0 },
    dividerGrow: {
      width: [0, 18, 36, 54, 72, 90, 108],
      transition: {
        duration: 0.6,
        ease: steps(1, 'start'),
        times: [0, 0.16, 0.33, 0.5, 0.66, 0.83, 1],
      },
    },
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
              variants={getTypeStaggerVariants('helloType')}
            >
              {'HELLO!'.split('').map((letter, index) => (
                <motion.span
                  key={index}
                  variants={getLetterVariants('helloType')}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.div>
            <motion.br variants={getBreakVariants('imType')} />
            <motion.div
              className="hero-text-im"
              variants={getTypeStaggerVariants('imType')}
            >
              {"I'm ".split('').map((letter, index) => (
                <motion.span key={index} variants={getLetterVariants('imType')}>
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              ))}
            </motion.div>
            <motion.div
              className="hero-text-josh"
              variants={getTypeStaggerVariants('joshType')}
            >
              {'Josh'.split('').map((letter, index) => (
                <motion.span
                  key={index}
                  variants={getLetterVariants('joshType')}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.div>
            <motion.br variants={getBreakVariants('youngType')} />
            <motion.div
              className="hero-text-young"
              variants={getTypeStaggerVariants('youngType')}
            >
              {'Young.'.split('').map((letter, index) => (
                <motion.span
                  key={index}
                  variants={getLetterVariants('youngType')}
                  className={
                    index === 5 ? 'hero-letter big-period' : 'hero-letter'
                  }
                >
                  {letter}
                </motion.span>
              ))}
            </motion.div>
            <motion.div
              variants={cursorVariants}
              className="hero-text-cursor"
            />
          </motion.div>
          <motion.div
            className="hero-text-divider"
            variants={dividerVariants}
          />

          <div className="hero-swipe-container">
            <motion.div
              className="hero-text-headline"
              variants={getTypeStaggerVariants('headlineType')}
            >
              {'A full-stack developer with design sense.'
                .split('')
                .map((letter, index) => (
                  <motion.span
                    key={index}
                    variants={getLetterVariants('headlineType')}
                    className="hero-letter"
                  >
                    {letter}
                  </motion.span>
                ))}
            </motion.div>
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
