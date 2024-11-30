import './HamburgerMenu.scss';
import {
  NAV_LINKS_DESKTOP,
  NAV_LINKS_TABLET,
} from '../../../constants/navigation';
import useMediaQuery from '../../../utils/useMediaQuery';

type HamburgerButtonProps = {
  isOpen: boolean;
  onClick: () => void;
};

function HamburgerButton({ isOpen, onClick }: HamburgerButtonProps) {
  // TODO change this to whatever breakpoint we stack about and exp
  const isTablet = useMediaQuery('(max-width: 768px)');
  const navLinks = isTablet ? NAV_LINKS_TABLET : NAV_LINKS_DESKTOP;

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleKeyDown = <T extends HTMLElement>(
    event: React.KeyboardEvent<T>,
    onClick: () => void,
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick();
    }
  };

  // TODO fix classes!!!
  // TODO grab the animation and stuff for the menu from Arter

  return (
    <div className="hamburger-menu-container">
      <div className="toggle-holder">
        <button
          type="button"
          id="toggle"
          onClick={onClick}
          onKeyDown={(event) => handleKeyDown(event, onClick)}
          className={isOpen ? 'open' : 'closed'}
          aria-pressed={isOpen}
          aria-label="Toggle navigation menu"
        >
          <div className="menu-line" />
        </button>
      </div>
      <div className={isOpen ? 'menu-holder open' : 'menu-holder'}>
        <div className="menu-wrapper relative">
          <nav id="header-main-menu">
            <ul className="main-menu sm sm-clean">
              {navLinks.map((section, i) => (
                <li key={`nav-${i}`}>
                  <a
                    href={`#${section}`}
                    onClick={() => handleScroll(section)}
                    onKeyDown={(event) =>
                      handleKeyDown(event, () => handleScroll(section))
                    }
                    aria-label={section}
                  >
                    {section}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default HamburgerButton;
