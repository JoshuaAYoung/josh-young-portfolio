import { useEffect, useState } from 'react';
import { useMotionValueEvent, useScroll } from 'framer-motion';

import Hero from '../../organisms/Hero/Hero';
import Contact from '../../organisms/Contact/Contact';
import Projects from '../../organisms/Projects/Projects';
import Experience from '../../organisms/Experience/Experience';
import Skills from '../../organisms/Skills/Skills';
import About from '../../organisms/About/About';

import { NAV_LINKS_DESKTOP } from '../../../constants/navigation';
import Loader from '../../atoms/LoadingIndicator/LoadingIndicator';
import { useJYContext } from '../../../context/JYContext';

import './Landing.scss';

function Landing() {
  const { setActiveSection, sectionRefs, isScrolling } = useJYContext();
  // const [loading, setLoading] = useState<boolean>(true);
  // const [fadeOffLoader, setFadeOffLoader] = useState<boolean>(false);
  const viewportHeight = window.innerHeight;

  const { scrollY } = useScroll();

  // Add a spring for smooth scrolling effects
  // const smoothScrollY = useSpring(scrollY, { stiffness: 100, damping: 20 });

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const middleOfViewport = latest + viewportHeight / 2;
    Object.values(sectionRefs).forEach((ref, index) => {
      if (ref.current) {
        const { offsetTop, offsetHeight } = ref.current;
        if (
          middleOfViewport >= offsetTop &&
          (index === Object.values(sectionRefs).length - 1 ||
            middleOfViewport < offsetTop + offsetHeight) &&
          !isScrolling
        ) {
          setActiveSection(NAV_LINKS_DESKTOP[index]);
        }
      }
    });
  });

  // TODO How do we really do this?
  // useEffect(() => {
  //   const loaderTimer = setTimeout(handleLoad, 750);
  //   return () => {
  //     clearTimeout(loaderTimer);
  //   };
  // }, []);

  // const handleLoad = () => {
  //   setFadeOffLoader(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 5000);
  // };

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
