import './StickyHeader.scss';
import { motion } from 'framer-motion';
import HamburgerMenu from '../../molecules/HamburgerMenu/HamburgerMenu';
import NavMenu from '../../molecules/NavMenu/NavMenu';
import useMediaQuery from '../../../utils/useMediaQuery';
import { breakpoints } from '../../../constants/breakpoints';

function StickyHeader() {
  // HOOK(S)
  const belowMd = useMediaQuery(`(max-width: ${breakpoints['max-medium']})`);

  return (
    <motion.header
      className="sticky-header-container"
      role="banner"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0, 1] }}
      transition={{ duration: 3, ease: 'easeInOut', times: [0, 0.5, 1] }}
    >
      <nav className="sticky-header-nav">
        <h1 className="sticky-header-logo">
          JY<span className="big-period">.</span>
        </h1>
        {belowMd ? <HamburgerMenu /> : <NavMenu />}
      </nav>
    </motion.header>
  );
}

export default StickyHeader;
