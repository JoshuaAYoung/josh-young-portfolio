import { forwardRef, useState } from 'react';
import './About.scss';
import InViewSection from '../../molecules/InViewSection/InViewSection';
import useJYStore from '../../../store/useJYStore';
import RevealWrapper from '../../atoms/RevealWrapper/RevealWrapper';
import SwipeButton from '../../atoms/SwipeButton/SwipeButton';

const About = forwardRef<HTMLElement>((props, ref) => {
  // STATE
  const onSectionInViewActive = useJYStore(
    (state) => state.onSectionInViewActive,
  );
  const [isInViewReveal, setIsInViewReveal] = useState(false);

  if (isInViewReveal) {
    console.log('About is revealed!');
  }

  // FUNCTION(S)
  const onSectionInViewReveal = (isPartiallyOnScreen: boolean) => {
    if (isPartiallyOnScreen && !isInViewReveal) {
      setIsInViewReveal(true);
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
        <p>
          Emphasizing the team above the individual, I firmly believe in the
          power of good communication in fostering a positive and collaborative
          work environment. Motivated by the warm and fuzzies I get from quality
          work, I approach each day with enthusiasm, eager problem-solving
          skills, meticulous attention to detail, and an insatiable passion for
          learning.
        </p>
      </RevealWrapper>
      <RevealWrapper isInView={isInViewReveal} containerClassName="about-copy">
        <p>
          Emphasizing the team above the individual, I firmly believe in the
          power of good communication in fostering a positive and collaborative
          work environment. Motivated by the warm and fuzzies I get from quality
          work, I approach each day with enthusiasm, eager problem-solving
          skills, meticulous attention to detail, and an insatiable passion for
          learning.
        </p>
      </RevealWrapper>
      <RevealWrapper
        isInView={isInViewReveal}
        containerClassName="about-fact-list"
      >
        <ul>
          <li>
            <span className="about-fact-label">LOCATION:</span> Missoula, MT
          </li>
          <li>
            <span className="about-fact-label">EMAIL:</span> joshua@young.net
          </li>
          <li>
            <span className="about-fact-label">PREVIOUS CAREER:</span> Building
            Architect
          </li>
          <li>
            <span className="about-fact-label">RECENT OBSESSION:</span> Pottery
          </li>
        </ul>
      </RevealWrapper>
      <RevealWrapper
        isInView={isInViewReveal}
        containerClassName="about-buttons-reveal"
      >
        <div className="about-buttons-container">
          <SwipeButton variant="outline-dark">DOWNLOAD CV</SwipeButton>
          <SwipeButton variant="solid-secondary">PORTFOLIO</SwipeButton>
        </div>
      </RevealWrapper>
    </InViewSection>
  );
});

About.displayName = 'About';

export default About;
