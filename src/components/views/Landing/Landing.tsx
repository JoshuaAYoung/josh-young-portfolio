// import Hero from '../../organisms/HeroAnimatedPop/HeroAnimatedPop';
import Hero from '../../organisms/HeroAnimatedTyping/HeroAnimatedTyping';
// import Hero from '../../organisms/Hero/Hero';
import Contact from '../../organisms/Contact/Contact';
import Projects from '../../organisms/Projects/Projects';
import Experience from '../../organisms/Experience/Experience';
import Skills from '../../organisms/Skills/Skills';
import About from '../../organisms/About/About';

import useJYStore from '../../../store/useJYStore';

import './Landing.scss';

function Landing() {
  // STATE
  const sectionRefs = useJYStore((state) => state.sectionRefs);

  return (
    <>
      {/* {loading && <Loader fadeOffLoader={fadeOffLoader} />} */}
      <div className="landing-container">
        <Hero ref={sectionRefs.Home} />
        <div className="landing-about-experience">
          <About ref={sectionRefs.About} />
          <Experience ref={sectionRefs.Experience} />
        </div>
        <Projects ref={sectionRefs.Projects} />
        <Skills ref={sectionRefs.Skills} />
        <Contact ref={sectionRefs.Contact} />
      </div>
    </>
  );
}

export default Landing;
