import { useState } from 'react';
import './ProjectsMenu.scss';
import { motion } from 'motion/react';
import useMediaQuery from '../../../globalUtils/useMediaQuery';
import useJYStore from '../../../store/useJYStore';

function ProjectsMenu() {
  // HOOK(S)

  // STATE
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // COMPUTED VAR(S)

  // coordinate offset with padding style on the hamburger-menu-list
  // const menuItemVariants = getMenuItemVariants(maxSmHeight ? 240 : 200);

  // FUNCTION(S)

  return (
    <div className="projects-menu-container">
      <div className="projects-menu-trigger-container">
        <button
          type="button"
          id="trigger"
          onClick={() => setIsOpen(!isOpen)}
          className={`projects-menu-trigger ${isOpen ? 'menu-open' : ''}`}
          aria-pressed={isOpen}
          aria-label="toggle navigation menu"
        >
          <span />
        </button>
      </div>
      {/* <motion.div
        className="projects-menu"
        initial="hidden"
        animate={isOpen ? 'visible' : 'hidden'}
        variants={menuVariants}
      >
        <motion.ul
          className="projects-menu-list"
          initial="hidden"
          animate={isOpen ? 'visible' : 'hidden'}
          variants={listVariants}
        >
          {projectCategories.map((section, index) => (
            <motion.li
              key={`nav-${index}`}
              className={`projects-menu-list-item ${
                section === activeSection ? 'active' : ''
              }`}
              variants={menuItemVariants}
            >
              <button
                type="button"
                onClick={() => {
                  handleNavClick(index);
                }}
                className={`projects-menu-item-button ${
                  isOpen ? 'menu-open' : ''
                }`}
                tabIndex={!isOpen ? -1 : 0}
              >
                {section}
              </button>
            </motion.li>
          ))}
          <motion.div
            variants={menuItemVariants}
            className="projects-menu-social-container"
          >
            <LinkButtons
              containerClassName="projects-menu-link-buttons"
              isOpen={isOpen}
            />
          </motion.div>
        </motion.ul>
      </motion.div> */}
    </div>
  );
}

export default ProjectsMenu;
