import { forwardRef, useState } from 'react';
import './Experience.scss';
import InViewSection from '../../molecules/InViewSection/InViewSection';
import useJYStore from '../../../store/useJYStore';
import RevealWrapper from '../../atoms/RevealWrapper/RevealWrapper';

const Experience = forwardRef<HTMLElement>((props, ref) => {
  // STATE
  const onSectionInViewActive = useJYStore(
    (state) => state.onSectionInViewActive,
  );
  const [isInViewReveal, setIsInViewReveal] = useState(false);

  if (isInViewReveal) {
    console.log('Experience is revealed!');
  }

  // FUNCTION(S)
  const onSectionInViewReveal = (isPartiallyOnScreen: boolean) => {
    if (isPartiallyOnScreen && !isInViewReveal) {
      setIsInViewReveal(true);
    }
  };

  return (
    <InViewSection
      sectionName="Experience"
      onSectionInViewActiveCallback={(isInView) =>
        onSectionInViewActive('Experience', isInView)
      }
      onSectionInViewRevealCallback={onSectionInViewReveal}
      ref={ref}
    >
      <RevealWrapper isInView={isInViewReveal}>
        <h2 style={{ fontSize: 50, color: 'black' }}>Experience</h2>
      </RevealWrapper>
    </InViewSection>
  );
});

Experience.displayName = 'Experience';

export default Experience;
