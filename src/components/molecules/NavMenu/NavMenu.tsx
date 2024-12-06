import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { PAGE_SECTIONS } from '../../../constants/navigation';
import './NavMenu.scss';
import { useScrollToSection } from '../../../utils/useScrollToSection';
import SocialNavLinks from '../../atoms/SocialNavLinks/SocialNavLinks';
import useJYStore from '../../../store/useJYStore';

function NavMenu() {
  // HOOK(S)
  const navRef = useRef<HTMLUListElement>(null);
  const { scrollToSection } = useScrollToSection();

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
  const handleNavClick = (index: number) => {
    const targetElement = Object.values(sectionRefs)[index];
    if (targetElement) {
      scrollToSection(targetElement, index);
    }
  };

  return (
    <div className="nav-menu-container">
      <ul className="nav-menu-list" ref={navRef}>
        {PAGE_SECTIONS.map((section, index) => (
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
