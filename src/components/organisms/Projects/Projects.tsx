import { forwardRef, useState } from 'react';
import './Projects.scss';
import InViewSection from '../../molecules/InViewSection/InViewSection';
import useJYStore from '../../../store/useJYStore';
// import useMediaQuery from '../../../globalUtils/useMediaQuery';
// import { breakpoints } from '../../../constants/breakpoints';
import GitHubIcon from '../../../assets/icons/github.svg?react';
import LinkIcon from '../../../assets/icons/link.svg?react';
import { projectData } from '../../../data/projects';

const Projects = forwardRef<HTMLElement>((props, ref) => {
  // HOOK(S)
  // const minXlWidth = useMediaQuery(`(min-width: ${breakpoints['min-xLarge']})`);
  // const maxLgWidth = useMediaQuery(`(max-width: ${breakpoints['max-large']})`);
  // const maxMdWidth = useMediaQuery(`(max-width: ${breakpoints['max-medium']})`);

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
          {projectData.map((project, index) => (
            <div
              className="projects-grid-item"
              key={index}
              style={{ backgroundImage: `url(${project.backgroundUrl})` }}
            >
              <div className="projects-grid-overlay">
                <div className="projects-grid-title-container">
                  <h3 className="projects-grid-title">{project.title}</h3>
                  <div className="projects-grid-title-divider" />
                </div>
                <p className="projects-grid-description">
                  {project.description}
                </p>
                <div className="projects-grid-button-container">
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="projects-grid-link"
                  >
                    <GitHubIcon className="projects-grid-button" />
                  </a>
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Demo"
                    className="projects-grid-link"
                  >
                    <LinkIcon className="projects-grid-button" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </InViewSection>
  );
});

Projects.displayName = 'Projects';

export default Projects;
