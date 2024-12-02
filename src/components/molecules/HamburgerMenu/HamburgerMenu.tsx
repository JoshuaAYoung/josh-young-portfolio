// TODO grab the animation and stuff for the menu from Arter

import { useEffect, useRef, useState } from 'react';
import './HamburgerMenu.scss';
import { motion } from 'framer-motion';
import {
  NAV_LINKS_DESKTOP,
  NAV_LINKS_TABLET,
} from '../../../constants/navigation';
import useMediaQuery from '../../../utils/useMediaQuery';
import { useJYContext } from '../../../context/JYContext';
import { scrollToSection } from '../../../utils/scrollToSection';
import { breakpoints } from '../../../constants/breakpoints';
import SocialNavLinks from '../../atoms/SocialNavLinks/SocialNavLinks';

// Making this a constant so its obvious this syncs with
// menu-item-padding in the HamburgerMenu.scss file
const MENU_ITEM_PADDING = 50;

function HamburgerMenu() {
  const { activeSection, setActiveSection, sectionRefs, setIsScrolling } =
    useJYContext();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [lineProps, setLineProps] = useState<{ top: number; width: number }>({
    top: 0,
    width: 0,
  });
  const navRef = useRef<HTMLUListElement>(null);

  // TODO change this to whatever breakpoint we stack about and exp
  const belowTablet = useMediaQuery(
    `(max-width: ${breakpoints['max-medium']})`,
  );
  const navLinks = belowTablet ? NAV_LINKS_TABLET : NAV_LINKS_DESKTOP;

  useEffect(() => {
    if (navRef.current) {
      const activeItem = Array.from(navRef.current.children).find((child) =>
        child.classList.contains('active'),
      );

      if (activeItem && activeItem instanceof HTMLElement) {
        const { offsetTop, offsetHeight, offsetWidth } = activeItem;
        setLineProps({ top: offsetTop + offsetHeight, width: offsetWidth });
      }
    }
  }, [activeSection]);

  const handleNavClick = (index: number) => {
    const targetElement = Object.values(sectionRefs)[index];
    if (targetElement) {
      scrollToSection(targetElement, setIsScrolling);
      setActiveSection(navLinks[index]);
    }
  };

  return (
    <div className="hamburger-menu-container">
      <div className="hamburger-menu-trigger-container">
        <button
          type="button"
          id="trigger"
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={() => setIsOpen(!isOpen)}
          className={`hamburger-menu-trigger ${isOpen ? 'menu-open' : ''}`}
          aria-pressed={isOpen}
          aria-label="toggle navigation menu"
        >
          <span />
        </button>
      </div>
      <div className={`hamburger-menu ${isOpen ? 'menu-open' : 'menu-closed'}`}>
        <ul className="hamburger-menu-list" ref={navRef}>
          {navLinks.map((section, index) => (
            <li
              key={`nav-${index}`}
              className={`hamburger-menu-list-item ${section === activeSection ? 'active' : ''}`}
            >
              <button
                type="button"
                onClick={() => {
                  handleNavClick(index);
                }}
                onKeyDown={() => handleNavClick(index)}
                tabIndex={0}
              >
                {section}
              </button>
            </li>
          ))}
          <motion.div
            className="hamburger-menu-active-underline"
            initial={false}
            animate={{
              // 2 pixels higher looks about right for underline
              top: lineProps.top - 2,
              // account for button padding to make hitbox wider
              width: lineProps.width - MENU_ITEM_PADDING * 2,
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 15,
              duration: 0.5,
              bounce: 0.3,
            }}
          />
        </ul>
        <div className="hamburger-menu-social-container">
          <SocialNavLinks containerClassName="hamburger-menu-social-links" />
        </div>
      </div>
    </div>
  );
}

export default HamburgerMenu;
