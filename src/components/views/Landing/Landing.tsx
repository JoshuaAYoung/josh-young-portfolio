import Hero from '../../organisms/Hero/Hero';
import Contact from '../../organisms/Contact/Contact';
import Projects from '../../organisms/Projects/Projects';
import Experience from '../../organisms/Experience/Experience';
import Skills from '../../organisms/Skills/Skills';
import About from '../../organisms/About/About';

import useJYStore from '../../../store/useJYStore';

import './Landing.scss';

function Landing() {
  const sectionRefs = useJYStore((state) => state.sectionRefs);

  return (
    <>
      {/* {loading && <Loader fadeOffLoader={fadeOffLoader} />} */}
      <div className="landing-container">
        <Hero ref={sectionRefs.homeRef} />
        <About ref={sectionRefs.aboutRef} />
        <Experience ref={sectionRefs.experienceRef} />
        <Projects ref={sectionRefs.projectsRef} />
        <Skills ref={sectionRefs.skillsRef} />
        <Contact ref={sectionRefs.contactRef} />
      </div>
    </>
  );
}

export default Landing;
