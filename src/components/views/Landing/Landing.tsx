import { useEffect, useRef, useState } from 'react';

import HeroEasterEgg from '../../organisms/HeroAnimatedPop/HeroAnimatedPop';
import Hero from '../../organisms/HeroAnimatedTyping/HeroAnimatedTyping';
import Contact from '../../organisms/Contact/Contact';
import Projects from '../../organisms/Projects/Projects';
import Experience from '../../organisms/Experience/Experience';
import Skills from '../../organisms/Skills/Skills';
import About from '../../organisms/About/About';
import useMediaQuery from '../../../globalUtils/useMediaQuery';
import { breakpoints } from '../../../constants/breakpoints';

import useJYStore from '../../../store/useJYStore';

import './Landing.scss';

function Landing() {
  // STATE
  const isInitialMount = useRef(true);
  const [homeKey, setHomeKey] = useState(0);

  const sectionRefs = useJYStore((state) => state.sectionRefs);
  const isEasterEgg = useJYStore((state) => state.isEasterEgg);
  const minLgWidth = useMediaQuery(`(min-width: ${breakpoints['min-large']})`);
  const maxLgWidth = useMediaQuery(`(max-width: ${breakpoints['max-large']})`);
  const maxMdWidth = useMediaQuery(`(max-width: ${breakpoints['max-medium']})`);
  const maxSmWidth = useMediaQuery(`(max-width: ${breakpoints['max-small']})`);
  const maxSmHeight = useMediaQuery(
    `(max-height: ${breakpoints['max-sm-height']})`,
  );

  useEffect(() => {
    // skip on initial mount
    if (isInitialMount.current) {
      isInitialMount.current = false;
    }
    // force remount of hero to restart animations to avoid weird
    // visual bugs when switching between window sizes
    setHomeKey((prevKey) => prevKey + 1);
  }, [maxLgWidth, maxMdWidth, maxSmWidth, maxSmHeight]);

  return (
    <div className="landing-container">
      {isEasterEgg && minLgWidth ? (
        <HeroEasterEgg ref={sectionRefs.Home} />
      ) : (
        <Hero ref={sectionRefs.Home} key={homeKey} />
      )}
      <div className="landing-about-experience">
        <About ref={sectionRefs.About} />
        <Experience ref={sectionRefs.Experience} />
      </div>
      <Projects ref={sectionRefs.Projects} />
      <Skills ref={sectionRefs.Skills} />
      <Contact ref={sectionRefs.Contact} />
    </div>
  );
}

export default Landing;
