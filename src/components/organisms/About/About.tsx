import { forwardRef, useState } from 'react';
import './About.scss';
import InViewSection from '../InViewSection/InViewSection';
import useJYStore from '../../../store/useJYStore';

const About = forwardRef<HTMLElement>((props, ref) => {
  // STATE
  const onSectionInViewScroll = useJYStore(
    (state) => state.onSectionInViewScroll,
  );
  const [isInViewReveal, setIsInViewReveal] = useState(false);

  if (isInViewReveal) {
    console.log('About is revealed!');
  }

  // FUNCTION(S)
  const onSectionInViewReveal = (isPartiallyOnScreen: boolean) => {
    if (isPartiallyOnScreen && !isInViewReveal) {
      setIsInViewReveal(true);
    }
  };

  return (
    <InViewSection
      sectionName="About"
      onSectionInViewScroll={(isInView) =>
        onSectionInViewScroll('About', isInView)
      }
      onSectionInViewReveal={onSectionInViewReveal}
      ref={ref}
    >
      <h2 style={{ fontSize: 50, color: 'black' }}>About</h2>
    </InViewSection>
  );
});

About.displayName = 'About';

export default About;
