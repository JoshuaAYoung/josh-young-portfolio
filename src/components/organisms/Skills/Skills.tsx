import { forwardRef, useState } from 'react';
import './Skills.scss';
import InViewSection from '../../molecules/InViewSection/InViewSection';
import useJYStore from '../../../store/useJYStore';
import RevealWrapper from '../../atoms/RevealWrapper/RevealWrapper';

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
      <RevealWrapper isInView={isInViewReveal}>
        <h2 style={{ fontSize: 50, color: 'black' }}>Skills</h2>
      </RevealWrapper>
    </InViewSection>
  );
});

Skills.displayName = 'Skills';

export default Skills;
