import { useEffect, useState } from 'react';

// Sections
import Hero from '../../organisms/Hero/Hero';
import Resume from '../../organisms/Resume/Resume';
import Contact from '../../organisms/Contact/Contact';
import Portfolio from '../../organisms/Portfolio/Portfolio';

// Components
import Loader from '../../atoms/LoadingIndicator/LoadingIndicator';
import Navbar from '../../organisms/Navbar/Navbar';

import './Home.css';

// -------------------

function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const [fadeOffLoader, setFadeOffLoader] = useState<boolean>(false);

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
      <Navbar />
      <div>
        <div className="content-right">
          <div className="content-right-wrapper">
            <Hero />
            <Portfolio />
            <Resume />
            <Contact />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
