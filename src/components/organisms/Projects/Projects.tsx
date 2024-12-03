import { forwardRef, useState } from 'react';
import './Projects.scss';
import InViewSection from '../InViewSection/InViewSection';
import useJYStore from '../../../store/useJYStore';

const Projects = forwardRef<HTMLElement>((props, ref) => {
  // STATE
  const onSectionInViewScroll = useJYStore(
    (state) => state.onSectionInViewScroll,
  );
  const [isInViewReveal, setIsInViewReveal] = useState(false);

  if (isInViewReveal) {
    console.log('Projects is revealed!');
  }

  // FUNCTION(S)
  const onSectionInViewReveal = (isPartiallyOnScreen: boolean) => {
    if (isPartiallyOnScreen && !isInViewReveal) {
      setIsInViewReveal(true);
    }
  };

  return (
    <InViewSection
      sectionName="Projects"
      onSectionInViewScroll={(isInView) =>
        onSectionInViewScroll('Projects', isInView)
      }
      onSectionInViewReveal={onSectionInViewReveal}
      ref={ref}
    >
      <h2 style={{ fontSize: 50, color: 'black' }}>Projects</h2>
    </InViewSection>
  );
});

Projects.displayName = 'Projects';

export default Projects;
