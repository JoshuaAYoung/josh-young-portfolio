import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  NAV_LINKS_DESKTOP,
  NAV_LINKS_TABLET,
} from '../../../constants/navigation';
import useMediaQuery from '../../../utils/useMediaQuery';
import './NavMenu.scss';
import { scrollToSection } from '../../../utils/scrollToSection';
import { useJYContext } from '../../../context/JYContext';

function NavMenu() {
  const { activeSection, setActiveSection, sectionRefs, setIsScrolling } =
    useJYContext();
  const isTablet = useMediaQuery('(max-width: 768px)');
  const [lineProps, setLineProps] = useState<{ left: number; width: number }>({
    left: 0,
    width: 0,
  });
  const navRef = useRef<HTMLUListElement>(null);

  const navLinks = isTablet ? NAV_LINKS_TABLET : NAV_LINKS_DESKTOP;

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

  const handleNavClick = (index: number) => {
    const targetElement = Object.values(sectionRefs)[index];
    if (targetElement) {
      scrollToSection(targetElement, setIsScrolling);
      setActiveSection(navLinks[index]);
    }
  };

  return (
    <ul className="nav-menu-container" ref={navRef}>
      {navLinks.map((section, index) => (
        <li
          key={`nav-${index}`}
          className={`nav-menu-list-item ${section === activeSection ? 'active' : ''}`}
        >
          <button
            type="button"
            onClick={() => {
              handleNavClick(index);
            }}
            onKeyDown={() => handleNavClick(index)}
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
          left: lineProps.left - lineProps.width * 0.1,
          width: lineProps.width * 1.2,
        }}
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
