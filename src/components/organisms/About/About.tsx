import { forwardRef, useState } from 'react';
import './About.scss';
import InViewSection from '../../molecules/InViewSection/InViewSection';
import useJYStore from '../../../store/useJYStore';
import RevealWrapper from '../../atoms/RevealWrapper/RevealWrapper';
import SwipeButton from '../../atoms/SwipeButton/SwipeButton';
import { aboutData } from '../../../data/about';
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

  const handleScrollToProjects = () => {
    const projectsRef = sectionRefs.Projects;
    const projectsIndex = Object.keys(sectionRefs).indexOf('Projects');
    if (projectsIndex !== -1) {
      scrollToSection(projectsRef, projectsIndex);
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
        <p>{aboutData.firstParagraph}</p>
      </RevealWrapper>
      <RevealWrapper isInView={isInViewReveal} containerClassName="about-copy">
        <p>{aboutData.secondParagraph}</p>
      </RevealWrapper>
      <RevealWrapper
        isInView={isInViewReveal}
        containerClassName="about-fact-list"
      >
        <ul>
          {Object.entries(aboutData.factList).map(([key, value], index) => (
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
              onClick={handleScrollToProjects}
            >
              PROJECTS
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
              onClick={handleScrollToProjects}
            >
              PROJECTS
            </SwipeButton>
          </div>
        </RevealWrapper>
      )}
    </InViewSection>
  );
});

About.displayName = 'About';

export default About;
