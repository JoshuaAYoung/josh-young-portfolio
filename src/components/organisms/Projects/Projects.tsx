import { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import './Projects.scss';
import { AnimatePresence, motion, useAnimation } from 'motion/react';
import InViewSection from '../../molecules/InViewSection/InViewSection';
import useJYStore from '../../../store/useJYStore';
import GitHubIcon from '../../../assets/icons/github-filled.svg?react';
import LinkIcon from '../../../assets/icons/link.svg?react';
import { projectData } from '../../../data/projects';
import ProjectsMenu from '../../molecules/ProjectsMenu/ProjectsMenu';
import { ProjectCategory } from '../../../types/projects.types';
import TechStackIcons from '../../atoms/TechStackIcons/TechStackIcons';
import {
  getProjectRevealVariants,
  overlayVariants,
  projectVariants,
} from './projectsAnimations';
import useMediaQuery from '../../../globalUtils/useMediaQuery';
import { breakpoints } from '../../../constants/breakpoints';

const Projects = forwardRef<HTMLElement>((_, ref) => {
  // HOOK(S)
  const maxSmWidth = useMediaQuery(`(max-width: ${breakpoints['max-small']})`);
  const controls = useAnimation();
  const hoveredProjectRefs = useRef(new Map<string, HTMLDivElement | null>());

  // STATE
  const onSectionInViewActive = useJYStore(
    (state) => state.onSectionInViewActive,
  );
  const activeSection = useJYStore((state) => state.activeSection);
  const [isInViewReveal, setIsInViewReveal] = useState(false);
  const [activeCategory, setActiveCategory] = useState(ProjectCategory.ALL);
  const [hoveredProject, setHoveredProject] = useState<string | null>('');
  const [isInitialMount, setIsInitialMount] = useState(true);
  const [tapLocked, setTapLocked] = useState(false);

  // COMPUTED VAR(S)
  const filteredProjectData = useMemo(() => {
    if (activeCategory === ProjectCategory.ALL) {
      return projectData;
    }
    return projectData.filter((project) =>
      project.categories.includes(activeCategory),
    );
  }, [activeCategory]);

  const isTouchDevice = 'ontouchstart' in window;

  // FUNCTION(S)
  const onSectionInViewReveal = (isPartiallyOnScreen: boolean) => {
    if (isPartiallyOnScreen && !isInViewReveal) {
      setIsInViewReveal(true);
    }
  };

  const handleButtonClick = (link: string | undefined) => {
    if (link) window.open(link, '_blank', 'noopener,noreferrer');
  };

  const handleProjectTap = (projectTitle: string) => {
    // Prevents taps on the buttons from triggering onTap and setting
    // tapLocked which disables the button clicks
    if (hoveredProject === projectTitle) {
      return;
    }

    setTapLocked(true);
    setHoveredProject(projectTitle);
  };

  // EFFECT(S)
  useEffect(() => {
    if (activeSection !== 'Projects') {
      setHoveredProject(null);
    }
  }, [activeSection]);

  useEffect(() => {
    const startAnimation = async () => {
      if (isInViewReveal) {
        await controls.start('reveal');
        setIsInitialMount(false);
      }
    };

    startAnimation();
  }, [controls, isInViewReveal]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const activeRef = hoveredProject
        ? hoveredProjectRefs.current.get(hoveredProject)
        : null;

      if (activeRef && !activeRef.contains(event.target as Node)) {
        setHoveredProject(null);
      }
    };

    if (hoveredProject) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [hoveredProject]);

  return (
    <InViewSection
      sectionName="Projects"
      onSectionInViewActiveCallback={(isInView) =>
        onSectionInViewActive('Projects', isInView)
      }
      onSectionInViewRevealCallback={onSectionInViewReveal}
      ref={ref}
      title="Projects"
      tooltipContent={
        isTouchDevice
          ? 'Click on a project for more info, or use the menu to filter projects.'
          : 'Hover over a project for more info, or use the menu to filter projects..'
      }
      tooltipPosition={maxSmWidth ? 'bottom-left' : 'left'}
      right={
        <ProjectsMenu
          activeCategory={activeCategory}
          onCategoryChange={(category: ProjectCategory) =>
            setActiveCategory(category)
          }
        />
      }
      tooltipPopupClassName="projects-tooltip"
    >
      <motion.div className="projects-grid-container" layout>
        <AnimatePresence mode="popLayout">
          {filteredProjectData.map((project, index) => (
            <motion.div
              animate={controls}
              layout
              key={project.title}
              initial={isInitialMount ? 'hidden' : 'visible'}
              variants={getProjectRevealVariants(index)}
            >
              <motion.div
                className="projects-grid-item"
                style={{ backgroundImage: `url(${project.backgroundUrl})` }}
                initial={
                  hoveredProject === project.title ? 'visible' : 'hidden'
                }
                animate={
                  hoveredProject === project.title ? 'hoverIn' : 'visible'
                }
                exit="exit"
                whileHover="hoverIn"
                variants={projectVariants}
                ref={(el) => hoveredProjectRefs.current.set(project.title, el)}
                onAnimationComplete={(definition) => {
                  if (definition === 'hoverIn' && isTouchDevice) {
                    setTapLocked(false);
                  }
                }}
                onTap={
                  isTouchDevice
                    ? () => handleProjectTap(project.title)
                    : undefined
                }
              >
                <motion.div
                  className="projects-grid-overlay"
                  variants={overlayVariants}
                >
                  <div className="projects-grid-title-container">
                    <h3 className="projects-grid-title">{project.title}</h3>
                  </div>
                  <div>
                    <p className="projects-grid-description">
                      {project.description}
                    </p>
                    <TechStackIcons
                      techStack={project.techStack}
                      projectKey={`${project.title}-${index}`}
                    />
                  </div>
                  <div className="projects-grid-button-container">
                    {project.githubLink && (
                      <button
                        onClick={() => handleButtonClick(project.githubLink)}
                        disabled={tapLocked && isTouchDevice}
                        aria-label="GitHub"
                        className="projects-grid-link"
                        type="button"
                      >
                        <GitHubIcon className="projects-grid-button" />
                      </button>
                    )}
                    {project.demoLink && (
                      <button
                        onClick={() => handleButtonClick(project.demoLink)}
                        disabled={tapLocked && isTouchDevice}
                        aria-label="Demo"
                        className="projects-grid-link"
                        type="button"
                      >
                        <LinkIcon className="projects-grid-button" />
                      </button>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </InViewSection>
  );
});

Projects.displayName = 'Projects';

export default Projects;
