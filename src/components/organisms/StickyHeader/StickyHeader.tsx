// TODO get the JY. logo centered vertically in the sticky-header

import './StickyHeader.scss';
import { motion, useScroll } from 'framer-motion';
import HamburgerMenu from '../../molecules/HamburgerMenu/HamburgerMenu';
import NavMenu from '../../molecules/NavMenu/NavMenu';
import useMediaQuery from '../../../utils/useMediaQuery';
import { breakpoints } from '../../../constants/breakpoints';

function StickyHeader() {
  // HOOK(S)
  const belowMd = useMediaQuery(`(max-width: ${breakpoints['max-medium']})`);

  const { scrollYProgress } = useScroll();
  // const belowTablet = true;

  console.log("I'm rerendering");

  return (
    <header className="sticky-header-container" role="banner">
      <nav className="sticky-header-nav">
        <h1 className="sticky-header-logo">
          JY<span className="big-period">.</span>
        </h1>
        {belowMd ? <HamburgerMenu /> : <NavMenu />}
      </nav>
      <motion.div
        className="sticky-header-animated-background"
        style={{ opacity: scrollYProgress }}
        initial={{ opacity: 0 }}
      />
    </header>
  );
}

export default StickyHeader;
