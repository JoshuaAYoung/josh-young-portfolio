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
    if (mounted.current) return; // Prevent starting animation if already mounted
    mounted.current = true;

    const sequence = async () => {
      controls.start('initial');
      await controls.start('blinkingStart');
      await controls.start('helloType');
      await new Promise((resolve) => {
        setTimeout(resolve, 500);
      });
      await controls.start('imType');
      await controls.start('joshType');
      await controls.start('youngType');
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
  const containerVarians = {
    initial: { y: 90 },
    imType: {
      y: 0,
      transition: {
        duration: 0,
      },
    },
  };

  const getLetterVariants = (eventName: string): Variants => {
    return {
      initial: { display: 'none' },
      [eventName]: {
        display: 'inline',
        transition: { duration: 0.1 },
      },
    };
  };

  const getTypeStaggerVariants = (eventName: string): Variants => {
    return {
      initial: { display: 'none' },
      [eventName]: {
        display: 'inline-block',
        transition: {
          staggerChildren: 0.1,
        },
      },
    };
  };

  const getBreakVariants = (eventName: string): Variants => {
    return {
      initial: { display: 'none' },
      [eventName]: {
        display: 'block',
        transition: {
          duration: 0,
        },
      },
    };
  };

  const cursorVariants: Variants = {
    blinkingStart: {
      opacity: [0, 0, 1, 1],
      transition: {
        duration: 1,
        repeat: 1.5,
        repeatDelay: 0,
        ease: 'linear',
        times: [0, 0.5, 0.5, 1],
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
    helloType: {
      width: 105,
      transition: {
        ease: 'linear',
        duration: 0.5,
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
            variants={containerVarians}
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
          {showSwipeAnimations && (
            <div className="hero-swipe-container">
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
