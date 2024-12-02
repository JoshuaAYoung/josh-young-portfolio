import { forwardRef } from 'react';
import './Skills.scss';
import InViewSection from '../InViewSection/InViewSection';
import useJYStore from '../../../store/useJYStore';

const Skills = forwardRef<HTMLElement>((props, ref) => {
  // STATE
  const handleScrollSection = useJYStore((state) => state.handleScrollSection);

  return (
    <InViewSection
      sectionKey="Skills"
      onInViewChange={(isInView) => handleScrollSection('Skills', isInView)}
      ref={ref}
    >
      <h2 style={{ fontSize: 50, color: 'black' }}>Skills</h2>
    </InViewSection>
  );
});

Skills.displayName = 'Skills';

export default Skills;
