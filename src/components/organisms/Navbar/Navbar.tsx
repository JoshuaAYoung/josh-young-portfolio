import { useState } from 'react';
import './Navbar.scss';
import HamburgerButton from '../../atoms/HamburgerMenu/HamburgerMenu';
import useMediaQuery from '../../../utils/useMediaQuery';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 600px)');

  const onMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="navbar-container" role="banner">
      <nav className="navbar-nav">
        <h1 className="navbar-logo">
          JY<span className="big-period">.</span>
        </h1>
        {isMobile ? (
          <HamburgerButton isOpen={isOpen} onClick={onMenuToggle} />
        ) : (
          <ul className="navbar-links-container">
            <li className="navbar-link">
              <a href="#home">Home</a>
            </li>
            <li className="navbar-link">
              <a href="#about">About</a>
            </li>
            <li className="navbar-link">
              <a href="#experience">Experience</a>
            </li>
            <li className="navbar-link">
              <a href="#projects">Projects</a>
            </li>
            <li className="navbar-link">
              <a href="#skills">Skills</a>
            </li>
            <li className="navbar-link">
              <a href="#contact">Contact</a>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
