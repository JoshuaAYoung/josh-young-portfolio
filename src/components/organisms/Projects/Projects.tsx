import { forwardRef, useMemo, useState } from 'react';
import './Projects.scss';
import { AnimatePresence, motion, Variants } from 'motion/react';
import InViewSection from '../../molecules/InViewSection/InViewSection';
import useJYStore from '../../../store/useJYStore';
// import useMediaQuery from '../../../globalUtils/useMediaQuery';
// import { breakpoints } from '../../../constants/breakpoints';
import GitHubIcon from '../../../assets/icons/github.svg?react';
import LinkIcon from '../../../assets/icons/link.svg?react';
import { projectData } from '../../../data/projects';
import ProjectsMenu from '../../molecules/ProjectsMenu/ProjectsMenu';
import { ProjectCategory } from '../../../types/projects.types';

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
  const [activeCategory, setActiveCategory] = useState(ProjectCategory.ALL);

  // COMPUTED VAR(S)
  const filteredProjectData = useMemo(() => {
    if (activeCategory === ProjectCategory.ALL) {
      return projectData;
    }
    return projectData.filter((project) =>
      project.categories.includes(activeCategory),
    );
  }, [activeCategory]);

  // FUNCTION(S)
  const onSectionInViewReveal = (isPartiallyOnScreen: boolean) => {
    if (isPartiallyOnScreen && !isInViewReveal) {
      setIsInViewReveal(true);
    }
  };

  const hoverInTransition = { duration: 0.3, ease: 'easeOut' };

  const projectVariants: Variants = {
    hidden: { opacity: 0, scale: 0 },
    // TODO try out spring animation here or some easing
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
    hoverIn: {
      boxShadow: 'var(--box-shadow-hover)',
      transition: hoverInTransition,
    },
    exit: {
      opacity: 0,
      scale: 0,
      transition: { duration: 0.2 },
    },
  };

  // TODO add some easing to the hover animations
  const hoverDownVariants: Variants = {
    visible: { opacity: 0, y: -20 },
    hoverIn: { opacity: 1, y: 0, transition: hoverInTransition },
  };

  const hoverUpVariants: Variants = {
    visible: { opacity: 0, y: 20 },
    hoverIn: { opacity: 1, y: 0, transition: hoverInTransition },
  };

  const overlayVariants: Variants = {
    visible: { opacity: 0 },
    hoverIn: { opacity: 1, transition: hoverInTransition },
  };

  // TODO animation for reveal (drop and stop each row)

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
        <div className="projects-header-container">
          <h2 className="section-title">
            Projects
            <span className="big-period">.</span>
          </h2>
          <ProjectsMenu
            activeCategory={activeCategory}
            onCategoryChange={(category: ProjectCategory) =>
              setActiveCategory(category)
            }
          />
        </div>
        <motion.div className="projects-grid-container" layout>
          <AnimatePresence mode="popLayout" initial={false}>
            {filteredProjectData.map((project, index) => (
              <motion.div
                className="projects-grid-item"
                key={`${project.title}-${index}`}
                style={{ backgroundImage: `url(${project.backgroundUrl})` }}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover="hoverIn"
                variants={projectVariants}
                layout
              >
                <motion.div
                  className="projects-grid-overlay"
                  variants={overlayVariants}
                >
                  <div className="projects-grid-title-container">
                    <motion.h3
                      className="projects-grid-title"
                      variants={hoverDownVariants}
                    >
                      {project.title}
                    </motion.h3>
                    <div className="projects-grid-title-divider" />
                  </div>
                  <motion.p
                    className="projects-grid-description"
                    variants={hoverUpVariants}
                  >
                    {project.description}
                  </motion.p>
                  <motion.div
                    className="projects-grid-button-container"
                    variants={hoverUpVariants}
                  >
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        className="projects-grid-link"
                      >
                        <GitHubIcon className="projects-grid-button" />
                      </a>
                    )}
                    {project.demoLink && (
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Demo"
                        className="projects-grid-link"
                      >
                        <LinkIcon className="projects-grid-button" />
                      </a>
                    )}
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </InViewSection>
  );
});

Projects.displayName = 'Projects';

export default Projects;
