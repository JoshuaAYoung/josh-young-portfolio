// TODO get the JY. logo centered vertically in the navbar

import './Navbar.scss';
import HamburgerMenu from '../../molecules/HamburgerMenu/HamburgerMenu';
import NavMenu from '../../molecules/NavMenu/NavMenu';
import useMediaQuery from '../../../utils/useMediaQuery';
import { breakpoints } from '../../../constants/breakpoints';

function Navbar() {
  // const belowTablet = useMediaQuery(
  //   `(max-width: ${breakpoints['max-tablet']})`,
  // );
  const belowTablet = true;

  return (
    <header className="navbar-container" role="banner">
      <nav className="navbar-nav">
        <h1 className="navbar-logo">
          JY<span className="big-period">.</span>
        </h1>
        {belowTablet ? <HamburgerMenu /> : <NavMenu />}
      </nav>
    </header>
  );
}

export default Navbar;
