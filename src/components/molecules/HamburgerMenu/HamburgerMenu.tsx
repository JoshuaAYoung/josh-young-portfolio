import { useEffect, useMemo, useRef, useState } from 'react';
import './HamburgerMenu.scss';
import { motion } from 'framer-motion';
import {
  NAV_LINKS_DESKTOP,
  NAV_LINKS_TABLET,
  STICKY_HEADER_HEIGHT_LARGE,
  STICKY_HEADER_HEIGHT_MEDIUM,
} from '../../../constants/navigation';
import useMediaQuery from '../../../utils/useMediaQuery';
import { useJYContext } from '../../../context/JYContext';
import { scrollToSection } from '../../../utils/scrollToSection';
import SocialNavLinks from '../../atoms/SocialNavLinks/SocialNavLinks';
import { breakpoints } from '../../../constants/breakpoints';

// Making this a constant so its obvious this syncs with
// menu-item-padding in the HamburgerMenu.scss file
const MENU_ITEM_PADDING = 50;

function HamburgerMenu() {
  // HOOK(S)
  const { activeSection, setActiveSection, sectionRefs, setIsScrolling } =
    useJYContext();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [lineProps, setLineProps] = useState<{ top: number; width: number }>({
    top: 0,
    width: 0,
  });
  const navRef = useRef<HTMLUListElement>(null);
  const belowMobile = useMediaQuery(`(max-width: ${breakpoints['max-small']})`);
  // TODO change this to whatever breakpoint we stack about and exp
  const belowTablet = useMediaQuery(
    `(max-width: ${breakpoints['max-medium']})`,
  );

  // COMPUTED VAR(S)
  const navLinks = useMemo(
    () => (belowTablet ? NAV_LINKS_TABLET : NAV_LINKS_DESKTOP),
    [belowTablet],
  );

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
        const { offsetTop, offsetHeight, offsetWidth } = activeItem;
        setLineProps({ top: offsetTop + offsetHeight, width: offsetWidth });
      }
    }
  }, [activeSection]);

  // ANIMATION

  // Entire menu animation
  const menuVariants = {
    hidden: {
      x: '100%',
      transition: {
        duration: 0.5,
        ease: 'easeIn',
      },
    },
    visible: {
      x: '0%',
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
  };

  // Individual menu item animation
  const menuItemVariants = {
    hidden: { x: '100%', transition: { duration: 0, delay: 0.5 } },
    visible: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 150,
        damping: 13,
        duration: 0.5,
      },
    },
  };

  // Just for li staggered animation
  const listVariants = {
    hidden: {
      opacity: 1,
      transition: { duration: 0.5 },
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // FUNCTION(S)
  const handleNavClick = (index: number) => {
    const targetElement = Object.values(sectionRefs)[index];
    if (targetElement) {
      scrollToSection(targetElement, setIsScrolling, stickyHeaderVariable);
      setActiveSection(navLinks[index]);
      setIsOpen(false);
    }
  };

  return (
    <div className="hamburger-menu-container">
      <div className="hamburger-menu-trigger-container">
        <button
          type="button"
          id="trigger"
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={() => setIsOpen(!isOpen)}
          className={`hamburger-menu-trigger ${isOpen ? 'menu-open' : ''}`}
          aria-pressed={isOpen}
          aria-label="toggle navigation menu"
        >
          <span />
        </button>
      </div>
      <motion.div
        className="hamburger-menu"
        initial="hidden"
        animate={isOpen ? 'visible' : 'hidden'}
        variants={menuVariants}
      >
        <motion.ul
          className="hamburger-menu-list"
          ref={navRef}
          initial="hidden"
          animate={isOpen ? 'visible' : 'hidden'}
          variants={listVariants}
        >
          {navLinks.map((section, index) => (
            <motion.li
              key={`nav-${index}`}
              className={`hamburger-menu-list-item ${section === activeSection ? 'active' : ''}`}
              variants={menuItemVariants}
            >
              <button
                type="button"
                onClick={() => {
                  handleNavClick(index);
                }}
                onKeyDown={() => handleNavClick(index)}
              >
                {section}
              </button>
            </motion.li>
          ))}
          <motion.div
            className="hamburger-menu-active-underline"
            initial={false}
            animate={{
              // 2 pixels higher looks about right for underline
              top: lineProps.top - 2,
              // account for button padding to make hitbox wider
              width: lineProps.width - MENU_ITEM_PADDING * 2,
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 15,
              duration: 0.5,
              bounce: 0.3,
            }}
          />
          <motion.div
            variants={menuItemVariants}
            className="hamburger-menu-social-container"
          >
            <SocialNavLinks containerClassName="hamburger-menu-social-links" />
          </motion.div>
        </motion.ul>
      </motion.div>
    </div>
  );
}

export default HamburgerMenu;
