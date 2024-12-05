// TODO get the JY. logo centered vertically in the sticky-header

import './StickyHeader.scss';
import { motion } from 'framer-motion';
import HamburgerMenu from '../../molecules/HamburgerMenu/HamburgerMenu';
import NavMenu from '../../molecules/NavMenu/NavMenu';
import useMediaQuery from '../../../utils/useMediaQuery';
import { breakpoints } from '../../../constants/breakpoints';
import useJYStore from '../../../store/useJYStore';

function StickyHeader() {
  // HOOK(S)
  const belowTablet = useMediaQuery(
    `(max-width: ${breakpoints['max-medium']})`,
  );
  // const belowTablet = true;

  // TODO if we decide not to use the line under the sticky header, we can remove
  // scrollYProgress from Zustand state
  // STATE
  const scrollYProgress = useJYStore((state) => state.scrollYProgress);

  // COMPUTED VAR(S)
  const computedHorizontalScale =
    scrollYProgress / 0.25 <= 1 ? scrollYProgress / 0.25 : 1;

  return (
    <header className="sticky-header-container" role="banner">
      <nav className="sticky-header-nav">
        <h1 className="sticky-header-logo">
          JY<span className="big-period">.</span>
        </h1>
        {belowTablet ? <HamburgerMenu /> : <NavMenu />}
      </nav>
      <motion.div
        className="sticky-header-border"
        style={{ scaleX: computedHorizontalScale }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: computedHorizontalScale }}
        transition={{ duration: 0.2, ease: 'linear' }}
      />
    </header>
  );
}

export default StickyHeader;
