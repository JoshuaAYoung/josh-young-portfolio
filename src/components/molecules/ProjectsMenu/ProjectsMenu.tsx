import { useEffect, useRef, useState } from 'react';
import './ProjectsMenu.scss';
import { motion } from 'motion/react';
import { projectCategoryData } from '../../../data/projects';
import { ProjectCategory } from '../../../types/projects.types';
import { listVariants, menuVariants } from './projectsMenuAnimations';

function ProjectsMenu({
  activeCategory,
  onCategoryChange,
}: {
  activeCategory: ProjectCategory;
  onCategoryChange: (category: ProjectCategory) => void;
}) {
  // STATE
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // EFFECT(S)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click is outside the menu and trigger
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // FUNCTION(S)
  const handleTriggerClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <div className="projects-menu-container">
      <div className="projects-menu-trigger-container">
        <button
          ref={triggerRef}
          type="button"
          id="trigger"
          onClick={handleTriggerClick}
          className={`projects-menu-trigger ${isOpen ? 'menu-open' : ''}`}
          aria-pressed={isOpen}
          aria-label="toggle navigation menu"
        >
          <span />
        </button>
      </div>
      <motion.div
        className="projects-menu"
        initial="hidden"
        animate={isOpen ? 'visible' : 'hidden'}
        variants={menuVariants}
        ref={menuRef}
      >
        <svg
          className="projects-menu-triangle"
          width="24"
          height="12"
          viewBox="0 0 24 12"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon points="0,12 24,12 12,0" />
        </svg>
        <motion.ul
          className="projects-menu-list"
          initial="hidden"
          animate={isOpen ? 'visible' : 'hidden'}
          variants={listVariants}
        >
          {projectCategoryData.map((category, index) => (
            <li
              key={`nav-${index}`}
              className={`projects-menu-list-item ${
                activeCategory === category ? 'active' : ''
              }`}
            >
              <button
                type="button"
                onClick={() => {
                  onCategoryChange(category);
                }}
                className="projects-menu-item-button"
                tabIndex={!isOpen ? -1 : 0}
              >
                {category}
              </button>
            </li>
          ))}
        </motion.ul>
      </motion.div>
    </div>
  );
}

export default ProjectsMenu;
