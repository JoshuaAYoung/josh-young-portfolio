import './StickyHeader.scss';
import HamburgerMenu from '../../molecules/HamburgerMenu/HamburgerMenu';
import NavMenu from '../../molecules/NavMenu/NavMenu';
import useMediaQuery from '../../../utils/useMediaQuery';
import { breakpoints } from '../../../constants/breakpoints';

function StickyHeader() {
  // HOOK(S)
  const belowMd = useMediaQuery(`(max-width: ${breakpoints['max-medium']})`);

  return (
    <header className="sticky-header-container" role="banner">
      <nav className="sticky-header-nav">
        <h1 className="sticky-header-logo">
          JY<span className="big-period">.</span>
        </h1>
        {belowMd ? <HamburgerMenu /> : <NavMenu />}
      </nav>
    </header>
  );
}

export default StickyHeader;
