import { forwardRef } from 'react';
import './About.scss';
import InViewSection from '../InViewSection/InViewSection';
import useJYStore from '../../../store/useJYStore';

const About = forwardRef<HTMLElement>((props, ref) => {
  const handleScrollSection = useJYStore((state) => state.handleScrollSection);

  return (
    <InViewSection
      sectionKey="About"
      onInViewChange={(isInView) => handleScrollSection('About', isInView)}
      ref={ref}
    >
      <h2 style={{ fontSize: 50, color: 'black' }}>About</h2>
    </InViewSection>
  );
});

About.displayName = 'About';

export default About;
