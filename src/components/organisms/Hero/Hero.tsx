import { forwardRef, useMemo, useState } from 'react';
import './Hero.scss';
import heroBackground from '../../../assets/images/hero-background.png';
import heroPortrait from '../../../assets/images/hero-portrait.png';
import InViewSection from '../../molecules/InViewSection/InViewSection';
import useJYStore from '../../../store/useJYStore';
import RevealWrapper from '../../atoms/RevealWrapper/RevealWrapper';
import SwipeButton from '../../atoms/SwipeButton/SwipeButton';
import { useScrollToSection } from '../../../globalUtils/useScrollToSection';
import useMediaQuery from '../../../globalUtils/useMediaQuery';
import { breakpoints } from '../../../constants/breakpoints';

const Hero = forwardRef<HTMLElement>((props, ref) => {
  // HOOK(S)
  const { scrollToSection } = useScrollToSection();
  const aboveLg = useMediaQuery(`(min-width: ${breakpoints['min-large']})`);
  const aboveMd = useMediaQuery(`(min-width: ${breakpoints['min-medium']})`);
  const aboveSm = useMediaQuery(`(min-width: ${breakpoints['min-small']})`);

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

  // COMPUTED VAR(S)
  const buttonSize = useMemo(() => {
    if (aboveLg) {
      return 'large';
    }
    if (aboveMd) {
      return 'medium';
    }
    return 'small';
  }, [aboveLg, aboveMd]);

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
        <div className="hero-text-container">
          <span className="hero-text-hello">HELLO!</span>
          <br />
          <span className="hero-text-im">I'm </span>
          <span className="hero-text-josh-young">
            Josh Young<span className="big-period">.</span>
          </span>
          <div className="hero-text-divider" />
          <div className="hero-text-headline">
            <RevealWrapper isInView={isInViewReveal}>
              <span>A full-stack developer</span>
              {aboveSm ? <br /> : ' '}
              <span>with design sense.</span>
            </RevealWrapper>
          </div>
          <RevealWrapper isInView={isInViewReveal} extraMargin>
            <SwipeButton size={buttonSize} onClick={handleScrollToPortfolio}>
              CONTACT
            </SwipeButton>
          </RevealWrapper>
        </div>
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
