import { useEffect, useState } from 'react';
import { Events } from 'react-scroll';
import './Navbar.scss';
import HamburgerMenu from '../../molecules/HamburgerMenu/HamburgerMenu';
import NavMenu from '../../molecules/NavMenu/NavMenu';
import useMediaQuery from '../../../utils/useMediaQuery';

function Navbar() {
  const [activeSection, setActiveSection] = useState<string>('Home');
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

  useEffect(() => {
    // const handleBegin = (to: string) => {
    //     setActiveSection(to);
    // };

    const handleEnd = (to: string) => {
      console.log('end scrolling');
      setActiveSection('');
    };

    // Events.scrollEvent.register('begin', handleBegin);
    Events.scrollEvent.register('end', handleEnd);

    return () => {
      Events.scrollEvent.remove('begin');
      Events.scrollEvent.remove('end');
    };
  }, []);

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
