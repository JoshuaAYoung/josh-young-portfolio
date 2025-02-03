import { useState } from 'react';
import './HamburgerMenu.scss';
import { motion } from 'motion/react';
import { PAGE_SECTIONS } from '../../../constants/navigation';
import useMediaQuery from '../../../globalUtils/useMediaQuery';
import { useScrollToSection } from '../../../globalUtils/useScrollToSection';
import LinkButtons from '../../atoms/LinkButtons/LinkButtons';
import { breakpoints } from '../../../constants/breakpoints';
import useJYStore from '../../../store/useJYStore';
import {
  getMenuItemVariants,
  listVariants,
  menuVariants,
} from './hamburgerAnimations';

function HamburgerMenu() {
  // HOOK(S)
  // TODO change this to whatever breakpoint we stack about and exp
  const aboveLg = useMediaQuery(`(min-width: ${breakpoints['min-large']})`);
  const belowSmHeight = useMediaQuery(
    `(max-height: ${breakpoints['max-sm-height']})`,
  );
  const { scrollToSection } = useScrollToSection();

  // STATE
  const activeSection = useJYStore((state) => state.activeSection);
  const sectionRefs = useJYStore((state) => state.sectionRefs);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // COMPUTED VAR(S)
  const filteredPageSections = PAGE_SECTIONS.filter((link) => {
    if (aboveLg) {
      return link !== 'Experience';
    }
    return true;
  });

  // coordinate offset with padding style on the hamburger-menu-list
  const menuItemVariants = getMenuItemVariants(belowSmHeight ? 240 : 200);

  // FUNCTION(S)
  const handleNavClick = (index: number) => {
    const targetElement = Object.values(sectionRefs)[index];
    if (targetElement) {
      scrollToSection(targetElement, index);
      setIsOpen(false);
    }
  };

  return (
    <div className="hamburger-menu-container">
      <div className="hamburger-menu-trigger-container">
        <button
          type="button"
          id="trigger"
          onClick={() => setIsOpen(!isOpen)}
          className={`hamburger-menu-trigger ${isOpen ? 'menu-open' : ''}`}
          aria-pressed={isOpen}
          aria-label="toggle navigation menu"
        >
          <span />
        </button>
      </div>
      <motion.div
        className="hamburger-menu"
        initial="hidden"
        animate={isOpen ? 'visible' : 'hidden'}
        variants={menuVariants}
      >
        <motion.ul
          className="hamburger-menu-list"
          initial="hidden"
          animate={isOpen ? 'visible' : 'hidden'}
          variants={listVariants}
        >
          {filteredPageSections.map((section, index) => (
            <motion.li
              key={`nav-${index}`}
              className={`hamburger-menu-list-item ${
                section === activeSection ? 'active' : ''
              }`}
              variants={menuItemVariants}
            >
              <button
                type="button"
                onClick={() => {
                  handleNavClick(index);
                }}
                className={`hamburger-menu-item-button ${
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
            className="hamburger-menu-social-container"
          >
            <LinkButtons
              containerClassName="hamburger-menu-link-buttons"
              isOpen={isOpen}
            />
          </motion.div>
        </motion.ul>
      </motion.div>
    </div>
  );
}

export default HamburgerMenu;
