import { forwardRef, useState } from 'react';
import './About.scss';
import InViewSection from '../../molecules/InViewSection/InViewSection';
import useJYStore from '../../../store/useJYStore';
import RevealWrapper from '../../atoms/RevealWrapper/RevealWrapper';
import SwipeButton from '../../atoms/SwipeButton/SwipeButton';
import about from '../../../data/about.json';
import { useScrollToSection } from '../../../globalUtils/useScrollToSection';
import useMediaQuery from '../../../globalUtils/useMediaQuery';
import { breakpoints } from '../../../constants/breakpoints';

const About = forwardRef<HTMLElement>((props, ref) => {
  // HOOK(S)
  const { scrollToSection } = useScrollToSection();
  const maxMdWidth = useMediaQuery(`(max-width: ${breakpoints['max-medium']})`);

  // STATE
  const onSectionInViewActive = useJYStore(
    (state) => state.onSectionInViewActive,
  );
  const sectionRefs = useJYStore((state) => state.sectionRefs);
  const [isInViewReveal, setIsInViewReveal] = useState(false);

  console.log('sectionRefs', sectionRefs);

  if (isInViewReveal) {
    console.log('About is revealed!');
  }

  // FUNCTION(S)
  const onSectionInViewReveal = (isPartiallyOnScreen: boolean) => {
    if (isPartiallyOnScreen && !isInViewReveal) {
      setIsInViewReveal(true);
    }
  };

  const handleScrollToPortfolio = () => {
    const portfolioRef = sectionRefs.Portfolio;
    const portfolioIndex = Object.keys(sectionRefs).indexOf('Portfolio');
    if (portfolioIndex !== -1) {
      scrollToSection(portfolioRef, portfolioIndex);
    }
  };

  return (
    <InViewSection
      sectionName="About"
      onSectionInViewActiveCallback={(isInView) =>
        onSectionInViewActive('About', isInView)
      }
      onSectionInViewRevealCallback={onSectionInViewReveal}
      ref={ref}
      title="About"
      containerClassName="about-section-container"
    >
      <RevealWrapper
        isInView={isInViewReveal}
        containerClassName="about-headline"
      >
        <p>{about.firstParagraph}</p>
      </RevealWrapper>
      <RevealWrapper isInView={isInViewReveal} containerClassName="about-copy">
        <p>{about.secondParagraph}</p>
      </RevealWrapper>
      <RevealWrapper
        isInView={isInViewReveal}
        containerClassName="about-fact-list"
      >
        <ul>
          {Object.entries(about.factList).map(([key, value], index) => (
            <li key={index}>
              <span className="about-fact-label">{key.toUpperCase()}:</span>{' '}
              {value}
            </li>
          ))}
        </ul>
      </RevealWrapper>
      {maxMdWidth ? (
        <div className="about-buttons-container">
          <RevealWrapper
            isInView={isInViewReveal}
            containerClassName="about-buttons-reveal"
            extraMargin
          >
            <SwipeButton variant="outline-dark">DOWNLOAD CV</SwipeButton>
          </RevealWrapper>
          <RevealWrapper
            isInView={isInViewReveal}
            containerClassName="about-buttons-reveal"
            extraMargin
          >
            <SwipeButton
              variant="solid-secondary"
              onClick={handleScrollToPortfolio}
            >
              PORTFOLIO
            </SwipeButton>
          </RevealWrapper>
        </div>
      ) : (
        <RevealWrapper
          isInView={isInViewReveal}
          containerClassName="about-buttons-reveal"
          extraMargin
        >
          <div className="about-buttons-container">
            <SwipeButton variant="outline-dark">DOWNLOAD CV</SwipeButton>
            <SwipeButton
              variant="solid-secondary"
              onClick={handleScrollToPortfolio}
            >
              PORTFOLIO
            </SwipeButton>
          </div>
        </RevealWrapper>
      )}
    </InViewSection>
  );
});

About.displayName = 'About';

export default About;
