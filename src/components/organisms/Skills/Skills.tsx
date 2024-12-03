import { forwardRef, useState } from 'react';
import './Skills.scss';
import InViewSection from '../InViewSection/InViewSection';
import useJYStore from '../../../store/useJYStore';

const Skills = forwardRef<HTMLElement>((props, ref) => {
  // STATE
  const onSectionInViewScroll = useJYStore(
    (state) => state.onSectionInViewScroll,
  );
  const [isInViewReveal, setIsInViewReveal] = useState(false);

  if (isInViewReveal) {
    console.log('Skills is revealed!');
  }

  // FUNCTION(S)
  const onSectionInViewReveal = (isPartiallyOnScreen: boolean) => {
    if (isPartiallyOnScreen && !isInViewReveal) {
      setIsInViewReveal(true);
    }
  };

  return (
    <InViewSection
      sectionName="Skills"
      onSectionInViewScroll={(isInView) =>
        onSectionInViewScroll('Skills', isInView)
      }
      onSectionInViewReveal={onSectionInViewReveal}
      ref={ref}
    >
      <h2 style={{ fontSize: 50, color: 'black' }}>Skills</h2>
    </InViewSection>
  );
});

Skills.displayName = 'Skills';

export default Skills;
