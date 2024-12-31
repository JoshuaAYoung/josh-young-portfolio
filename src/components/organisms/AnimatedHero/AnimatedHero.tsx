import { forwardRef, useEffect, useRef, useState } from 'react';
import './AnimatedHero.scss';
import { motion, useAnimation, Variants } from 'framer-motion';
import heroBackground from '../../../assets/images/hero-background.png';
import heroPortrait from '../../../assets/images/hero-portrait.png';
import InViewSection from '../../molecules/InViewSection/InViewSection';
import useJYStore from '../../../store/useJYStore';
import RevealWrapper from '../../atoms/RevealWrapper/RevealWrapper';
import SwipeButton from '../../atoms/SwipeButton/SwipeButton';
import { useScrollToSection } from '../../../utils/useScrollToSection';
// import {useGetAnimations} from './heroAnimations';

const Hero = forwardRef<HTMLElement>((props, ref) => {
  // HOOK(S)
  const { scrollToSection } = useScrollToSection();
  const controls = useAnimation();
  const mounted = useRef(false);
  // const { helloVariants } = useGetAnimations();

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
  const gravityUpDownCurve = [0.3, 0, 0.1, 1];
  const imInDelay = 0.5;

  const helloVariants: Variants = {
    initial: { y: 220, opacity: 0 },
    // hello pops up and stops
    helloIn: {
      opacity: 1,
      y: [220, 160],
      transition: {
        opacity: {
          duration: 0.1,
          delay: 0.7,
        },
        y: {
          type: 'tween',
          ease: 'easeIn',
          duration: 0.2,
          delay: 0.6,
        },
      },
    },
    // hello gets hit by im and pops up high and comes back down with im
    helloUp: {
      y: [160, -20, 80],
      transition: {
        y: {
          type: 'tween',
          ease: gravityUpDownCurve,
          duration: 1.6,
          delay: imInDelay + 0.05,
        },
      },
    },
    // im hits hello on its way up from young growing
    lastNameIn: {
      y: [80, -20, 0],
      transition: {
        type: 'tween',
        ease: gravityUpDownCurve,
        duration: 0.8,
        delay: 0.2,
      },
    },
    end: { y: 0, opacity: 1 },
  };

  const imVariants: Variants = {
    initial: { y: 160, opacity: 0 },
    // im pops up and hits hello
    imIn: {
      opacity: 1,
      y: [160, 80],
      transition: {
        opacity: {
          delay: imInDelay,
        },
        y: {
          type: 'tween',
          ease: 'easeIn',
          duration: 0.2,
          delay: imInDelay,
        },
      },
    },
    // jy hits im and it pops up and comes back down with hello
    jyIn: {
      y: [80, -20, 80],
      transition: {
        type: 'tween',
        ease: gravityUpDownCurve,
        duration: 0.8,
        delay: 0.25,
      },
    },
    // as young pops back to full size, flings im up to base position
    lastNameIn: {
      y: [80, -20, 0],
      transition: {
        type: 'tween',
        ease: gravityUpDownCurve,
        duration: 0.8,
        delay: 0.1,
      },
    },
    end: { y: 0, opacity: 1 },
  };

  const squishTransition = {
    type: 'tween',
    ease: 'easeOut',
    duration: 0.2,
    delay: 0.75,
  };

  const squishHeight = 0.05;

  const jyVariants: Variants = {
    initial: { y: 80, opacity: 0, scaleY: 1 },
    // jy pops up and hits im and stops, then get squished by im
    jyIn: {
      opacity: 1,
      y: [80, 0],
      scaleY: squishHeight,
      backgroundColor: 'var(--primary-color)',
      scaleX: 3,
      transition: {
        opacity: {
          duration: 0.2,
          delay: 0.2,
        },
        y: {
          type: 'tween',
          ease: 'easeOut',
          duration: 0.2,
          delay: 0.2,
        },
        scaleY: squishTransition,
        scaleX: squishTransition,
        backgroundColor: {
          duration: 0.1,
          delay: 0.9,
        },
      },
    },
    lastNameIn: {
      opacity: 0,
      transition: {
        duration: 0,
      },
    },
    end: { y: 0, opacity: 1 },
  };

  const firstNameVariants: Variants = {
    initial: { opacity: 0 },
    end: { opacity: 1 },
  };

  const unsquishTransition = {
    duration: 0.3,
    type: 'tween',
    ease: 'easeIn',
  };

  const lastNameVariants: Variants = {
    initial: {
      opacity: 0,
      scaleY: squishHeight,
      scaleX: 1.25,
      backgroundColor: 'var(--primary-color)',
    },
    // jy squishes and turns to young and it grows to full size
    lastNameIn: {
      backgroundColor: 'transparent',
      opacity: 1,
      scaleY: 1,
      scaleX: 1,
      transition: {
        backgroundColor: {
          duration: 0.3,
        },
        opacity: {
          duration: 0,
        },
        scaleY: unsquishTransition,
        scaleX: unsquishTransition,
      },
    },
    end: { opacity: 1 },
  };

  const periodVariants: Variants = {
    initial: { opacity: 0 },
    end: { opacity: 1 },
  };

  const dividerVariants: Variants = {
    initial: { width: 0 },
    dividerIn: {
      width: '105px',
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 12,
      },
    },
    end: { opacity: 1 },
  };

  const portraitVariants: Variants = {
    initial: { opacity: 0 },
    end: { opacity: 1 },
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
