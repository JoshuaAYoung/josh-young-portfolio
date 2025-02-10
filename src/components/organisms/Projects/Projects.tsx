import { forwardRef, useState } from 'react';
import './Projects.scss';
import InViewSection from '../../molecules/InViewSection/InViewSection';
import useJYStore from '../../../store/useJYStore';
import useMediaQuery from '../../../globalUtils/useMediaQuery';
import { breakpoints } from '../../../constants/breakpoints';
import GitHubIcon from '../../../assets/icons/github.svg?react';

const Projects = forwardRef<HTMLElement>((props, ref) => {
  // HOOK(S)
  const minXlWidth = useMediaQuery(`(min-width: ${breakpoints['min-xLarge']})`);
  const maxLgWidth = useMediaQuery(`(max-width: ${breakpoints['max-large']})`);
  const maxMdWidth = useMediaQuery(`(max-width: ${breakpoints['max-medium']})`);

  // STATE
  const onSectionInViewActive = useJYStore(
    (state) => state.onSectionInViewActive,
  );
  const [isInViewReveal, setIsInViewReveal] = useState(false);

  // FUNCTION(S)
  const onSectionInViewReveal = (isPartiallyOnScreen: boolean) => {
    if (isPartiallyOnScreen && !isInViewReveal) {
      setIsInViewReveal(true);
    }
  };

  return (
    <InViewSection
      sectionName="Projects"
      onSectionInViewActiveCallback={(isInView) =>
        onSectionInViewActive('Projects', isInView)
      }
      onSectionInViewRevealCallback={onSectionInViewReveal}
      ref={ref}
    >
      <div className="projects-container">
        <h2 className="section-title">
          Projects
          <span className="big-period">.</span>
        </h2>
        <div className="projects-grid-container">
          <div className="projects-grid-item">
            <div className="projects-grid-overlay">
              <div className="projects-grid-overlay-title">Project 1</div>
              <div className="projects-grid-overlay-description">
                This is a great project.
              </div>
              <a
                href="https://github.com/joshuaayoung"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="projects-grid-overlay-link"
              >
                <GitHubIcon className="projects-grid-overlay-button" />
              </a>
            </div>
            Item 1
          </div>
          <div className="projects-grid-item">Item 2</div>
          <div className="projects-grid-item">Item 3</div>
          <div className="projects-grid-item">Item 4</div>
          <div className="projects-grid-item">Item 5</div>
          <div className="projects-grid-item">Item 6</div>
        </div>
      </div>
    </InViewSection>
  );
});

Projects.displayName = 'Projects';

export default Projects;
