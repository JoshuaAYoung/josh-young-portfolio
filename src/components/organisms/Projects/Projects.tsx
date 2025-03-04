import { forwardRef, useEffect, useMemo, useState } from 'react';
import './Projects.scss';
import { AnimatePresence, motion, useAnimation } from 'motion/react';
import InViewSection from '../../molecules/InViewSection/InViewSection';
import useJYStore from '../../../store/useJYStore';
// import useMediaQuery from '../../../globalUtils/useMediaQuery';
// import { breakpoints } from '../../../constants/breakpoints';
import GitHubIcon from '../../../assets/icons/github.svg?react';
import LinkIcon from '../../../assets/icons/link.svg?react';
import { projectData } from '../../../data/projects';
import ProjectsMenu from '../../molecules/ProjectsMenu/ProjectsMenu';
import { ProjectCategory } from '../../../types/projects.types';
import TechStackIcons from '../../molecules/TechStackIcons/TechStackIcons';
import {
  getProjectRevealVariants,
  overlayVariants,
  projectVariants,
} from './projectsAnimations';

const Projects = forwardRef<HTMLElement>((props, ref) => {
  // HOOK(S)
  const controls = useAnimation();

  // STATE
  const onSectionInViewActive = useJYStore(
    (state) => state.onSectionInViewActive,
  );
  const [isInViewReveal, setIsInViewReveal] = useState(false);
  const [activeCategory, setActiveCategory] = useState(ProjectCategory.ALL);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [isInitialMount, setIsInitialMount] = useState(true);
  const activeSection = useJYStore((state) => state.activeSection);

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
                  onTap={
                    isTouchDevice
                      ? () => setHoveredProject(project.title)
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
                    </div>
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
