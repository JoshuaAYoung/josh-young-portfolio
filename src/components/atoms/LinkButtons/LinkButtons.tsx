import './LinkButtons.scss';
import LinkedInIcon from '../../../assets/icons/linkedin.svg?react';
import GitHubIcon from '../../../assets/icons/tech/github.svg?react';
import SunIcon from '../../../assets/icons/sun.svg?react';
import MoonIcon from '../../../assets/icons/moon.svg?react';
import EasterEggIcon from '../../../assets/icons/easter-egg.svg?react';
import useJYStore from '../../../store/useJYStore';
import { breakpoints } from '../../../constants/breakpoints';
import useMediaQuery from '../../../globalUtils/useMediaQuery';
import { useScrollToSection } from '../../../globalUtils/useScrollToSection';
import { PAGE_SECTIONS } from '../../../constants/navigation';

function LinkButtons({
  containerClassName,
  isOpen,
}: {
  containerClassName?: string;
  isOpen?: boolean;
}) {
  // HOOK(S)
  const minLgWidth = useMediaQuery(`(min-width: ${breakpoints['min-large']})`);
  const { scrollToSection } = useScrollToSection();

  // STATE
  const isDarkMode = useJYStore((state) => state.isDarkMode);
  const isEasterEgg = useJYStore((state) => state.isEasterEgg);
  const toggleDarkMode = useJYStore((state) => state.toggleDarkMode);
  const toggleEasterEgg = useJYStore((state) => state.toggleEasterEgg);
  const sectionRefs = useJYStore((state) => state.sectionRefs);

  const onToggleEasterEgg = () => {
    toggleEasterEgg(!isEasterEgg);
    const homeKey = 'Home';
    const homeIndex = PAGE_SECTIONS.findIndex((section) => section === homeKey);
    scrollToSection(sectionRefs[homeKey], homeIndex);
  };

  return (
    <div className={`link-buttons-container ${containerClassName}`}>
      <a
        href="https://www.linkedin.com/in/joshayoung/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className="link-button"
        tabIndex={!isOpen ? -1 : 0}
      >
        <LinkedInIcon className="link-button-image" />
      </a>
      <a
        href="https://github.com/joshuaayoung"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        className="link-button"
        tabIndex={!isOpen ? -1 : 0}
      >
        <GitHubIcon className="link-button-image" />
      </a>
      {isDarkMode ? (
        <button
          onClick={() => toggleDarkMode(false)}
          aria-label="Toggle Light Mode"
          className="link-button"
          tabIndex={!isOpen ? -1 : 0}
          type="button"
        >
          <SunIcon className="link-button-image" />
        </button>
      ) : (
        <button
          onClick={() => toggleDarkMode(true)}
          aria-label="Toggle Dark Mode"
          className="link-button"
          tabIndex={!isOpen ? -1 : 0}
          type="button"
        >
          <MoonIcon className="link-button-image" />
        </button>
      )}
      {minLgWidth && (
        <button
          onClick={onToggleEasterEgg}
          aria-label="Toggle Easter Egg Hero"
          className="link-button"
          tabIndex={!isOpen ? -1 : 0}
          type="button"
        >
          <EasterEggIcon className="link-button-image" />
        </button>
      )}
    </div>
  );
}

export default LinkButtons;
