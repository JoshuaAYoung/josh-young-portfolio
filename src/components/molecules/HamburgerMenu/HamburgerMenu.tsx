import { useState } from 'react';
import './HamburgerMenu.scss';
import ScrollLink from '../../atoms/ScrollLink/ScrollLink';
import {
  NAV_LINKS_DESKTOP,
  NAV_LINKS_TABLET,
} from '../../../constants/navigation';
import useMediaQuery from '../../../utils/useMediaQuery';

function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // TODO change this to whatever breakpoint we stack about and exp
  const isTablet = useMediaQuery('(max-width: 768px)');
  const navLinks = isTablet ? NAV_LINKS_TABLET : NAV_LINKS_DESKTOP;

  const handleKeyDown = <T extends HTMLElement>(
    event: React.KeyboardEvent<T>,
    onClick: () => void,
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick();
    }
  };

  // TODO fix classes!!!
  // TODO grab the animation and stuff for the menu from Arter

  return (
    <div className="hamburger-menu-container">
      <div className="hamburger-menu-trigger-container">
        <button
          type="button"
          id="trigger"
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={(event) => handleKeyDown(event, () => setIsOpen(!isOpen))}
          className={`hamburger-menu-trigger ${isOpen ? 'menu-open' : ''}`}
          aria-pressed={isOpen}
          aria-label="toggle navigation menu"
        >
          {/* TODO why just one?? */}
          <span />
        </button>
      </div>
      <div className={`hamburger-menu ${isOpen ? 'menu-open' : 'menu-closed'}`}>
        <nav id="hamburger-menu-nav">
          <ul className="hamburger-menu-list">
            {navLinks.map((section, i) => (
              <li key={`nav-${i}`}>
                <ScrollLink
                  to={section.toLowerCase()}
                  onClick={() => setIsOpen(false)}
                  onKeyDown={(event) =>
                    handleKeyDown(event, () => setIsOpen(false))
                  }
                  aria-label={section.toLowerCase()}
                  className="hamburger-menu-item"
                  activeClass="hamburger-menu-item-active"
                >
                  {section}
                </ScrollLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default HamburgerMenu;
