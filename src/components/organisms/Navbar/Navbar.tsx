// TODO using framer motion, put a line under the selected item
// animate this line to the next item

import { useState } from 'react';
import './Navbar.scss';
import HamburgerMenu from '../../molecules/HamburgerMenu/HamburgerMenu';
import useMediaQuery from '../../../utils/useMediaQuery';
import ScrollLink from '../../atoms/ScrollLink/ScrollLink';
import {
  NAV_LINKS_DESKTOP,
  NAV_LINKS_TABLET,
} from '../../../constants/navigation';

function Navbar() {
  const [activeSection, setActiveSection] = useState<string>('Home');

  console.log('activeSection', activeSection);

  const isMobile = useMediaQuery('(max-width: 600px)');
  const isTablet = useMediaQuery('(max-width: 768px)');

  const navLinks = isTablet ? NAV_LINKS_TABLET : NAV_LINKS_DESKTOP;

  return (
    <header className="navbar-container" role="banner">
      <nav className="navbar-nav">
        <h1 className="navbar-logo">
          JY<span className="big-period">.</span>
        </h1>
        {isMobile ? (
          <HamburgerMenu />
        ) : (
          <ul className="navbar-links-container">
            {navLinks.map((section, i) => (
              <li
                key={`nav-${i}`}
                className={`navbar-list-item ${section === activeSection ? 'active' : ''}`}
              >
                <ScrollLink
                  to="projects"
                  aria-label={section.toLowerCase()}
                  className="react-scroll-item"
                  onClick={() => setActiveSection(section)}
                >
                  {section}
                </ScrollLink>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
