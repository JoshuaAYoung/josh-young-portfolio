// TODO using framer motion, put a line under the selected item
// animate this line to the next item

import { useState } from 'react';
import './Navbar.scss';
import HamburgerMenu from '../../molecules/HamburgerMenu/HamburgerMenu';
import NavMenu from '../../molecules/NavMenu/NavMenu';
import useMediaQuery from '../../../utils/useMediaQuery';

function Navbar() {
  const [activeSection, setActiveSection] = useState<string>('Home');

  console.log('activeSection', activeSection);

  const isMobile = useMediaQuery('(max-width: 600px)');

  const handleKeyDown = <T extends HTMLElement>(
    event: React.KeyboardEvent<T>,
    onClick: () => void,
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <header className="navbar-container" role="banner">
      <nav className="navbar-nav">
        <h1 className="navbar-logo">
          JY<span className="big-period">.</span>
        </h1>
        {isMobile ? (
          <HamburgerMenu
            setActiveSection={setActiveSection}
            handleKeyDown={handleKeyDown}
          />
        ) : (
          <NavMenu
            setActiveSection={setActiveSection}
            handleKeyDown={handleKeyDown}
            activeSection={activeSection}
          />
        )}
      </nav>
    </header>
  );
}

export default Navbar;
