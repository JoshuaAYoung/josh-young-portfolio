import { useEffect, useState } from 'react';

// Sections
import Hero from '../../organisms/Hero/Hero';
import Contact from '../../organisms/Contact/Contact';
import Projects from '../../organisms/Projects/Projects';
import Experience from '../../organisms/Experience/Experience';
import Skills from '../../organisms/Skills/Skills';
import About from '../../organisms/About/About';

// Components
import Loader from '../../atoms/LoadingIndicator/LoadingIndicator';

import './Landing.scss';

// -------------------

function Landing() {
  const [loading, setLoading] = useState<boolean>(true);
  const [fadeOffLoader, setFadeOffLoader] = useState<boolean>(false);

  // TODO How do we really do this?
  useEffect(() => {
    const loaderTimer = setTimeout(handleLoad, 750);
    return () => {
      clearTimeout(loaderTimer);
    };
  }, []);

  const handleLoad = () => {
    setFadeOffLoader(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  };

  return (
    <>
      {loading && <Loader fadeOffLoader={fadeOffLoader} />}
      <div className="landing-container">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </div>
    </>
  );
}

export default Landing;
