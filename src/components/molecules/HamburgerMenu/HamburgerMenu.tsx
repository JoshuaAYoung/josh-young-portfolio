import { useState } from 'react';
import './HamburgerMenu.scss';
import ScrollLink from '../../atoms/ScrollLink/ScrollLink';
import {
  NAV_LINKS_DESKTOP,
  NAV_LINKS_TABLET,
  NAVBAR_HEIGHT,
} from '../../../constants/navigation';
import useMediaQuery from '../../../utils/useMediaQuery';

interface HamburgerMenuProps {
  setActiveSection: (section: string) => void;
  handleKeyDown: <T extends HTMLElement>(
    event: React.KeyboardEvent<T>,
    onClick: () => void,
  ) => void;
}

function HamburgerMenu({
  setActiveSection,
  handleKeyDown,
}: HamburgerMenuProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // TODO change this to whatever breakpoint we stack about and exp
  const isTablet = useMediaQuery('(max-width: 768px)');
  const navLinks = isTablet ? NAV_LINKS_TABLET : NAV_LINKS_DESKTOP;

  // TODO grab the animation and stuff for the menu from Arter

  const onItemClick = (section: string) => {
    setActiveSection(section);
    setIsOpen(false);
  };

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
                  onClick={() => onItemClick(section)}
                  onKeyDown={(event) =>
                    handleKeyDown(event, () => onItemClick(section))
                  }
                  offset={NAVBAR_HEIGHT}
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
