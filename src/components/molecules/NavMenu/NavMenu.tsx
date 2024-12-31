import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { PAGE_SECTIONS } from '../../../constants/navigation';
import './NavMenu.scss';
import { useScrollToSection } from '../../../utils/useScrollToSection';
import SocialNavLinks from '../../atoms/SocialNavLinks/SocialNavLinks';
import useJYStore from '../../../store/useJYStore';
import useMediaQuery from '../../../utils/useMediaQuery';
import { breakpoints } from '../../../constants/breakpoints';

function NavMenu() {
  // HOOK(S)
  const navRef = useRef<HTMLUListElement>(null);
  const { scrollToSection } = useScrollToSection();
  const aboveXLarge = useMediaQuery(
    `(min-width: ${breakpoints['min-xLarge']})`,
  );

  // STATE
  const activeSection = useJYStore((state) => state.activeSection);
  const sectionRefs = useJYStore((state) => state.sectionRefs);
  const [lineProps, setLineProps] = useState<{ left: number; width: number }>({
    left: 0,
    width: 0,
  });

  // COMPUTED VAR(S)
  const underlinePercentWidth = 1.2;
  const underlineOffsetToCenter = (underlinePercentWidth - 1) / 2;

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
  const handleNavClick = (section: string) => {
    const index = PAGE_SECTIONS.indexOf(section);
    const targetElement = Object.values(sectionRefs)[index];
    if (targetElement) {
      scrollToSection(targetElement, index);
    }
  };

  const pageSectionsLocal = aboveXLarge
    ? PAGE_SECTIONS.filter((section) => section !== 'Experience')
    : PAGE_SECTIONS;

  return (
    <div className="nav-menu-container">
      <ul className="nav-menu-list" ref={navRef}>
        {pageSectionsLocal.map((section, index) => (
          <li
            key={`nav-${index}`}
            className={`nav-menu-list-item ${
              section === activeSection ? 'active' : ''
            }`}
          >
            <button
              type="button"
              onClick={() => {
                handleNavClick(section);
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
          }}
        />
      </ul>
      <div className="nav-menu-vertical-divider" />
      <SocialNavLinks containerClassName="nav-menu-social-links" />
    </div>
  );
}

export default NavMenu;
