import { useEffect, useState } from 'react';

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
  const sectionRefs = useJYStore((state) => state.sectionRefs);
  const isEasterEgg = useJYStore((state) => state.isEasterEgg);
  const minLgWidth = useMediaQuery(`(min-width: ${breakpoints['min-large']})`);

  return (
    <div className="landing-container">
      {isEasterEgg && minLgWidth ? (
        <HeroEasterEgg ref={sectionRefs.Home} />
      ) : (
        <Hero ref={sectionRefs.Home} />
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
