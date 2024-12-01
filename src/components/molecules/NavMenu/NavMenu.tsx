import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  NAV_LINKS_DESKTOP,
  NAV_LINKS_TABLET,
  NAVBAR_HEIGHT,
} from '../../../constants/navigation';
import useMediaQuery from '../../../utils/useMediaQuery';
import ScrollLink from '../../atoms/ScrollLink/ScrollLink';
import './NavMenu.scss';

interface NavMenuProps {
  setActiveSection: (section: string) => void;
  handleKeyDown: <T extends HTMLElement>(
    event: React.KeyboardEvent<T>,
    onClick: () => void,
  ) => void;
  activeSection: string;
}

function NavMenu({
  setActiveSection,
  handleKeyDown,
  activeSection,
}: NavMenuProps) {
  const isTablet = useMediaQuery('(max-width: 768px)');
  const navLinks = isTablet ? NAV_LINKS_TABLET : NAV_LINKS_DESKTOP;
  const [lineProps, setLineProps] = useState<{ left: number; width: number }>({
    left: 0,
    width: 0,
  });
  const navRef = useRef<HTMLUListElement>(null);

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

  return (
    <ul className="nav-menu-container" ref={navRef}>
      {navLinks.map((section, i) => (
        <li
          key={`nav-${i}`}
          className={`nav-menu-list-item ${section === activeSection ? 'active' : ''}`}
        >
          <ScrollLink
            to={section.toLowerCase()}
            aria-label={section.toLowerCase()}
            className="react-scroll-item"
            onClick={() => setActiveSection(section)}
            onKeyDown={(event) =>
              handleKeyDown(event, () => setActiveSection(section))
            }
            offset={NAVBAR_HEIGHT}
          >
            {section}
          </ScrollLink>
        </li>
      ))}
      <motion.div
        className="nav-menu-active-underline"
        initial={false}
        animate={{ left: lineProps.left, width: lineProps.width * 1.3 }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 15,
          duration: 0.5,
          bounce: 0.3,
        }}
      />
    </ul>
  );
}

export default NavMenu;
