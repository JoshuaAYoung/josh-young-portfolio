// TODO get the JY. logo centered vertically in the navbar

import './Navbar.scss';
import HamburgerMenu from '../../molecules/HamburgerMenu/HamburgerMenu';
import NavMenu from '../../molecules/NavMenu/NavMenu';
import useMediaQuery from '../../../utils/useMediaQuery';

function Navbar() {
  const isMobile = useMediaQuery('(max-width: 600px)');

  return (
    <header className="navbar-container" role="banner">
      <nav className="navbar-nav">
        <h1 className="navbar-logo">
          JY<span className="big-period">.</span>
        </h1>
        {isMobile ? <HamburgerMenu /> : <NavMenu />}
      </nav>
    </header>
  );
}

export default Navbar;
