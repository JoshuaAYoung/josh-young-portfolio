import { useState } from 'react';
import './HamburgerMenu.scss';
import {
  NAV_LINKS_DESKTOP,
  NAV_LINKS_TABLET,
} from '../../../constants/navigation';
import useMediaQuery from '../../../utils/useMediaQuery';
import { useJYContext } from '../../../context/JYContext';
import { scrollToSection } from '../../../utils/scrollToSection';

function HamburgerMenu() {
  const { activeSection, setActiveSection, sectionRefs, setIsScrolling } =
    useJYContext();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // TODO change this to whatever breakpoint we stack about and exp
  const isTablet = useMediaQuery('(max-width: 768px)');
  const navLinks = isTablet ? NAV_LINKS_TABLET : NAV_LINKS_DESKTOP;

  // TODO grab the animation and stuff for the menu from Arter

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
        <nav id="hamburger-menu-nav">
          <ul className="hamburger-menu-list">
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
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default HamburgerMenu;
