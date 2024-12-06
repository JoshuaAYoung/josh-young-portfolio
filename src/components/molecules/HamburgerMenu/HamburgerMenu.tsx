import { useState } from 'react';
import './HamburgerMenu.scss';
import { motion } from 'framer-motion';
import { PAGE_SECTIONS } from '../../../constants/navigation';
import useMediaQuery from '../../../utils/useMediaQuery';
import { useScrollToSection } from '../../../utils/useScrollToSection';
import SocialNavLinks from '../../atoms/SocialNavLinks/SocialNavLinks';
import { breakpoints } from '../../../constants/breakpoints';
import useJYStore from '../../../store/useJYStore';

function HamburgerMenu() {
  // HOOK(S)
  // TODO change this to whatever breakpoint we stack about and exp
  const aboveLg = useMediaQuery(`(min-width: ${breakpoints['min-large']})`);
  const { scrollToSection } = useScrollToSection();

  // STATE
  const activeSection = useJYStore((state) => state.activeSection);
  const sectionRefs = useJYStore((state) => state.sectionRefs);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // ANIMATION(S)
  // Entire menu animation
  const menuVariants = {
    hidden: {
      x: '100%',
      transition: {
        duration: 0.5,
        ease: 'easeIn',
      },
    },
    visible: {
      x: '0%',
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
  };

  // Individual menu item animation
  const menuItemVariants = {
    hidden: { x: 150, transition: { duration: 0, delay: 0.5 } },
    visible: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 150,
        damping: 15,
        duration: 0.5,
      },
    },
  };

  // Just for li staggered animation
  const listVariants = {
    hidden: {
      opacity: 1,
      transition: { duration: 0.2 },
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

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
          {PAGE_SECTIONS.filter((link) => aboveLg && link !== 'Experience').map(
            (section, index) => (
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
            ),
          )}
          <motion.div
            variants={menuItemVariants}
            className="hamburger-menu-social-container"
          >
            <SocialNavLinks
              containerClassName="hamburger-menu-social-links"
              isOpen={isOpen}
            />
          </motion.div>
        </motion.ul>
      </motion.div>
    </div>
  );
}

export default HamburgerMenu;
