import { forwardRef } from 'react';
import './Projects.scss';
import InViewSection from '../InViewSection/InViewSection';
import useJYStore from '../../../store/useJYStore';

const Projects = forwardRef<HTMLElement>((props, ref) => {
  const handleScrollSection = useJYStore((state) => state.handleScrollSection);
  return (
    <InViewSection
      sectionKey="Projects"
      onInViewChange={(isInView) => handleScrollSection('Projects', isInView)}
      ref={ref}
    >
      <h2 style={{ fontSize: 50, color: 'black' }}>Projects</h2>
    </InViewSection>
  );
});

Projects.displayName = 'Projects';

export default Projects;
