import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  NAV_LINKS_DESKTOP,
  NAV_LINKS_TABLET,
  STICKY_HEADER_HEIGHT_LARGE,
  STICKY_HEADER_HEIGHT_MEDIUM,
} from '../../../constants/navigation';
import useMediaQuery from '../../../utils/useMediaQuery';
import './NavMenu.scss';
import { scrollToSection } from '../../../utils/scrollToSection';
import { breakpoints } from '../../../constants/breakpoints';
import SocialNavLinks from '../../atoms/SocialNavLinks/SocialNavLinks';
import useJYStore from '../../../store/useJYStore';

function NavMenu() {
  // HOOK(S)
  const activeSection = useJYStore((state) => state.activeSection);
  const setActiveSection = useJYStore((state) => state.setActiveSection);
  const sectionRefs = useJYStore((state) => state.sectionRefs);
  const setIsScrolling = useJYStore((state) => state.setIsScrolling);
  const [lineProps, setLineProps] = useState<{ left: number; width: number }>({
    left: 0,
    width: 0,
  });
  const navRef = useRef<HTMLUListElement>(null);
  const belowMobile = useMediaQuery(`(max-width: ${breakpoints['max-small']})`);
  const belowTablet = useMediaQuery(
    `(max-width: ${breakpoints['max-medium']})`,
  );
  // COMPUTED VAR(S)
  const navLinks = belowTablet ? NAV_LINKS_TABLET : NAV_LINKS_DESKTOP;

  const underlinePercentWidth = 1.2;
  const underlineOffsetToCenter = (underlinePercentWidth - 1) / 2;

  const stickyHeaderVariable =
    (belowMobile ? STICKY_HEADER_HEIGHT_MEDIUM : STICKY_HEADER_HEIGHT_LARGE) *
    -1;

  // EFFECT(S)
  useEffect(() => {
    if (navRef.current) {
      const activeItem = Array.from(navRef.current.children).find((child) =>
        child.classList.contains('active'),
      );

      if (activeItem && activeItem instanceof HTMLElement) {
        const { offsetLeft, offsetWidth } = activeItem;
        setLineProps({ left: offsetLeft, width: offsetWidth });
      }
    }
  }, [activeSection]);

  // FUNCTION(S)
  const handleNavClick = (index: number) => {
    const targetElement = Object.values(sectionRefs)[index];
    if (targetElement) {
      scrollToSection(targetElement, setIsScrolling, stickyHeaderVariable);
      setActiveSection(navLinks[index]);
    }
  };

  return (
    <div className="nav-menu-container">
      <ul className="nav-menu-list" ref={navRef}>
        {navLinks.map((section, index) => (
          <li
            key={`nav-${index}`}
            className={`nav-menu-list-item ${
              section === activeSection ? 'active' : ''
            }`}
          >
            <button
              type="button"
              onClick={() => {
                handleNavClick(index);
              }}
              tabIndex={0}
            >
              {section}
            </button>
          </li>
        ))}
        <motion.div
          className="nav-menu-active-underline"
          initial={false}
          animate={{
            left: lineProps.left - lineProps.width * underlineOffsetToCenter,
            width: lineProps.width * underlinePercentWidth,
          }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 15,
            duration: 0.5,
            bounce: 0.3,
          }}
        />
      </ul>
      <div className="nav-menu-vertical-divider" />
      <SocialNavLinks containerClassName="nav-menu-social-links" />
    </div>
  );
}

export default NavMenu;
