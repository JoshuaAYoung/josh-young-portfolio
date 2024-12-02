import './Experience.scss';
import { forwardRef } from 'react';
import InViewSection from '../InViewSection/InViewSection';
import useJYStore from '../../../store/useJYStore';

const Experience = forwardRef<HTMLElement>((props, ref) => {
  const handleScrollSection = useJYStore((state) => state.handleScrollSection);
  return (
    <InViewSection
      sectionKey="Experience"
      onInViewChange={(isInView) => handleScrollSection('Experience', isInView)}
      ref={ref}
    >
      <h2 style={{ fontSize: 50, color: 'black' }}>Experience</h2>
    </InViewSection>
  );
});

Experience.displayName = 'Experience';

export default Experience;
