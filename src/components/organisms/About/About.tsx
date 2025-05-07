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
import resumePDF from '../../../assets/pdfs/resume.pdf';

const About = forwardRef<HTMLElement>((props, ref) => {
  // HOOK(S)
  const { scrollToSection } = useScrollToSection();
  const maxMdWidth = useMediaQuery(`(max-width: ${breakpoints['max-medium']})`);
  const maxSmWidth = useMediaQuery(`(max-width: ${breakpoints['max-small']})`);

  // STATE
  const onSectionInViewActive = useJYStore(
    (state) => state.onSectionInViewActive,
  );
  const sectionRefs = useJYStore((state) => state.sectionRefs);
  const [isInViewReveal, setIsInViewReveal] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

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

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = resumePDF;
    link.download = 'resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
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
    >
      <div className="about-container">
        <div className={`about-text-container ${isExpanded ? 'expanded' : ''}`}>
          <RevealWrapper
            isInView={isInViewReveal}
            containerClassName="about-headline"
          >
            <p>{aboutData.firstParagraph}</p>
          </RevealWrapper>
          <RevealWrapper
            isInView={isInViewReveal}
            containerClassName="about-copy"
          >
            <p>{aboutData.secondParagraph}</p>
          </RevealWrapper>
        </div>
        {maxMdWidth && !isExpanded && (
          <div className="contact-expand-container">
            <button
              type="button"
              className="contact-expand-button"
              onClick={toggleExpand}
            >
              Read More
            </button>
          </div>
        )}
        <RevealWrapper
          isInView={isInViewReveal}
          containerClassName={`about-fact-list ${isExpanded ? 'expanded' : ''}`}
        >
          <ul>
            {Object.entries(aboutData.factList).map(([key, value], index) => {
              if (key === 'notable achievement') {
                return (
                  <li key={index}>
                    <span className="about-fact-label">
                      {key.toUpperCase()}:
                    </span>{' '}
                    Designed and built a{' '}
                    <span className="about-fact-link">
                      <a
                        href="https://www.archdaily.com/772843/nakai-residence-designbuildbluf"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        house
                      </a>
                    </span>{' '}
                    on the Navajo Reservation
                  </li>
                );
              }
              return (
                <li key={index}>
                  <span className="about-fact-label">{key.toUpperCase()}:</span>{' '}
                  {value}
                </li>
              );
            })}
          </ul>
        </RevealWrapper>
        {maxMdWidth ? (
          <div className="about-buttons-container">
            <RevealWrapper
              isInView={isInViewReveal}
              containerClassName="about-buttons-reveal"
              extraMargin
            >
              <SwipeButton
                variant="outline-dark"
                onClick={handleDownloadCV}
                size={maxSmWidth ? 'small' : 'medium'}
              >
                DOWNLOAD CV
              </SwipeButton>
            </RevealWrapper>
            <RevealWrapper
              isInView={isInViewReveal}
              containerClassName="about-buttons-reveal"
              extraMargin
            >
              <SwipeButton
                variant="solid-secondary"
                onClick={handleScrollToProjects}
                size={maxSmWidth ? 'small' : 'medium'}
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
              <SwipeButton variant="outline-dark" onClick={handleDownloadCV}>
                DOWNLOAD CV
              </SwipeButton>
              <SwipeButton
                variant="solid-secondary"
                onClick={handleScrollToProjects}
              >
                PROJECTS
              </SwipeButton>
            </div>
          </RevealWrapper>
        )}
      </div>
    </InViewSection>
  );
});

About.displayName = 'About';

export default About;
